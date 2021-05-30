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
} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import _ from 'lodash';
import api from '../../services/api';
import {Text} from '../Login/styles';
import {ActivityIndicator} from 'react-native';

export interface Order {
  id: string;
  order_number: string;
  quantity: number;
  status: number;
  response: string;
  created_at: Date;
  product: Product;
  destination: Address;
}

interface Product {
  id: string;
  title: string;
  image: string;
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
          <ContainerOrder key={item.id}>
            <ImageProduct source={{uri: item.product.image}} />
            <ContainerDetail>
              <TitleProduct numberOfLines={2}>
                {item.product.title}
              </TitleProduct>
              <InfoText> Pedido: #{item.order_number}</InfoText>
            </ContainerDetail>
          </ContainerOrder>
        )}
      />
    </Container>
    //   </ScrollView>
    // </KeyboardAvoidingView>
  );
};

export default Orders;
