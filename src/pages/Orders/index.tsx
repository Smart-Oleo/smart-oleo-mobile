import React, {useCallback, useState, useEffect} from 'react';

import {
  Container,
  BackButton,
  Header,
  Title,
  OrderList,
  ContainerOrder,
  ImageProduct,
  ContainerDetail,
  TitleProduct,
  InfoText,
  EmpresaDetail,
  EmpresaContent,
  EmpresaImage,
  EmpresaText,
  EnderecoContent,
  EnderecoText,
  NameView,
  ReviewContent,
  ReviewText,
} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import _ from 'lodash';
import api from '../../services/api';
import {Text} from 'react-native';
import {ActivityIndicator} from 'react-native';

export interface Order {
  id: string;
  order_number: string;
  quantity: number;
  status: number;
  image: string;
  response: string;
  created_at: Date;
  product: Product;
  destiny: Address;
}

interface Product {
  id: string;
  title: string;
  image: string;
  price_points: number;
}

export interface Address {
  id: string;
  address: string;
  number: string;
  zipcode: string;
  district: string;
  city: string;
  complement: string;
  state: string;
  reference: string;
}

const Orders: React.FC = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<Order[]>([]);
  // const [statusActive, setStatusActive] = useState<IStatus>();

  const [total, setTotal] = useState<Number>(0);
  const [page, setPage] = useState<Number>(1);
  // const [filter, setFilter] = useState<String>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const getOrders = useCallback(
    async (
      pageNumber = page,
      input = '',
      shouldRefresh = false,
      status = '',
    ) => {
      if (pageNumber === total) {
        return;
      }
      if (loading) {
        return;
      }
      setLoading(true);
      try {
        await api
          .get(
            `user-products/user?pageNumber=${
              pageNumber - 1
            }&pageView=8&filter=${input}&status=${status}`,
          )
          .then(res => {
            console.log(res.data);
            setOrders(
              shouldRefresh ? res.data.data : [...orders, ...res.data.data],
            );
            setTotal(res.data.pages + 1);
            setLoading(false);
          })
          .catch(err => {
            console.log(err);
            setLoading(false);
          });
      } catch (err) {
        setLoading(false);
      }
      setPage(pageNumber + 1);
    },
    [orders, page, loading, total],
  );

  const refreshList = useCallback(async () => {
    setRefreshing(true);
    await getOrders(1, '', true);
    setRefreshing(false);
  }, [getOrders]);

  // const filterCollects = useCallback(
  //   (input: string) => {
  //     const search = _.debounce(getOrders, 1500);
  //     search(1, input, true, statusActive?.value);
  //   },
  //   [getCollects, statusActive],
  // );

  useEffect(() => {
    getOrders();
  }, []);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    // <KeyboardAvoidingView
    //   style={{flex: 1, backgroundColor: '#fff'}}
    //   behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    //   enabled>
    //   <ScrollView
    //     keyboardShouldPersistTaps="handled"
    //     showsVerticalScrollIndicator={false}>
    <Container>
      <Header>
        <BackButton onPress={handleGoBack}>
          <Icon name="chevron-left" size={24} />
        </BackButton>
        <Title> Meus Pedidos </Title>
      </Header>

      <OrderList
        data={orders}
        keyExtractor={item => item.id}
        // style={{ marginTop: 200}}
        // ListFooterComponent={
        //   loading && <ActivityIndicator size="large" color="#FE2E2E" />
        // }
        onRefresh={refreshList}
        refreshing={refreshing}
        onEndReachedThreshold={0.2}
        onEndReached={() => getOrders()}
        ListFooterComponent={
          loading && (
            <ActivityIndicator
              size="small"
              color="#228B22"
              style={{alignSelf: 'center', width: '100%'}}
            />
          )
        }
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <EmpresaDetail key={item.id}>
            <EmpresaImage source={{uri: item.product.image}} />
            <EmpresaContent>
              <NameView>
                <EmpresaText>{item?.product.title}</EmpresaText>
                <EmpresaText style={{marginTop: 4}}>
                  N ordem:{' '}
                  <Text style={{color: 'green'}}> {item.order_number} </Text>
                </EmpresaText>
                <EmpresaText style={{marginTop: 4}}>
                  Status{' '}
                  <Text style={{color: 'tomato'}}>
                    {item.status === 1 && 'Aguardando confirmação'}
                    {item.status === 2 && 'Enviado'}
                    {item.status === 3 && 'Recebido'}
                  </Text>
                </EmpresaText>
                <EmpresaText style={{marginTop: 4}}>
                  Quantidade:{' '}
                  <Text style={{color: 'tomato'}}>{item.quantity}x</Text>
                </EmpresaText>
              </NameView>
              <EnderecoContent>
                <EnderecoText numberOfLines={2}>
                  {item.destiny?.address} - {item.destiny?.number} /{' '}
                  {item.destiny?.zipcode}
                </EnderecoText>
                <EnderecoText numberOfLines={2}>
                  {item.destiny?.district} - {item.destiny?.city}/{' '}
                  {item.destiny?.state}
                </EnderecoText>
              </EnderecoContent>
            </EmpresaContent>
            <ReviewContent>
              <ReviewText style={{color: 'tomato'}}>
                {' '}
                {item.product.price_points}P{' '}
              </ReviewText>
            </ReviewContent>
          </EmpresaDetail>
          // <ContainerOrder key={item.id}>
          //   <ImageProduct source={{uri: item?.product.image}} />
          //   <ContainerDetail>
          //     <TitleProduct numberOfLines={2}>
          //       {item?.product.title}
          //     </TitleProduct>
          //     <InfoText> Pedido: #{item?.order_number}</InfoText>
          //   </ContainerDetail>
          // </ContainerOrder>
        )}
      />
    </Container>
    //   </ScrollView>
    // </KeyboardAvoidingView>
  );
};

export default Orders;
