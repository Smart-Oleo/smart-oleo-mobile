import React, {useCallback, useState, useEffect} from 'react';

import {
  Container,
  BackButton,
  Header,
  Title,
  OrderList,
  EmpresaDetail,
  EmpresaContent,
  EmpresaImage,
  EmpresaText,
  NameView,
  EmpresaTextInfo,
  EnderecoTitle,
} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import _ from 'lodash';
import api from '../../services/api';
import {Text} from 'react-native';
import {ActivityIndicator} from 'react-native';
import {colors, metrics} from '../../styles/global';

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
    <Container>
      <Header>
        <BackButton onPress={handleGoBack}>
          <Icon
            name="chevron-left"
            size={metrics.iconSize}
            color={colors.darkgray}
          />
          <Title> Meus Pedidos </Title>
        </BackButton>
      </Header>

      <OrderList
        data={orders}
        keyExtractor={item => item.id}
        onRefresh={refreshList}
        refreshing={refreshing}
        onEndReachedThreshold={0.2}
        onEndReached={() => getOrders()}
        ListFooterComponent={
          loading && (
            <ActivityIndicator
              size="small"
              color={colors.primary}
              style={{alignSelf: 'center', width: '100%'}}
            />
          )
        }
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <EmpresaDetail key={item.id}>
            <EmpresaImage source={{uri: item.product.image}} />

            <EmpresaContent>
              <EmpresaTextInfo style={{color: colors.white, marginTop: 0}}>
                {item.product.price_points}
              </EmpresaTextInfo>
              <Icon
                name="droplet"
                color={colors.white}
                size={metrics.iconSize - 12}
              />
            </EmpresaContent>
            <NameView>
              <EnderecoTitle numberOfLines={1}>
                {item?.product.title}
              </EnderecoTitle>
              <EmpresaText>
                Ordem:{' '}
                <EmpresaTextInfo style={{color: colors.gray}}>
                  {' '}
                  {item.order_number}{' '}
                </EmpresaTextInfo>
              </EmpresaText>
              <EmpresaText>
                Quantidade: <EmpresaTextInfo>{item.quantity}x</EmpresaTextInfo>
              </EmpresaText>
              <EmpresaText>
                Endereço:{' '}
                <EmpresaTextInfo numberOfLines={1}>
                  {item.destiny?.address} - {item.destiny?.number}
                </EmpresaTextInfo>
              </EmpresaText>
              <EmpresaText>
                Status:{' '}
                {item.status === 1 && (
                  <EmpresaTextInfo
                    style={{color: colors.darkgray, fontSize: 16}}>
                    aguardando confirmação
                  </EmpresaTextInfo>
                )}
                {item.status === 2 && (
                  <EmpresaTextInfo
                    style={{color: colors.success, fontSize: 16}}>
                    enviado
                  </EmpresaTextInfo>
                )}
                {item.status === 3 && (
                  <EmpresaTextInfo style={{color: colors.gray, fontSize: 16}}>
                    recebido
                  </EmpresaTextInfo>
                )}
              </EmpresaText>
            </NameView>
            {/* <EnderecoContent>
                <EnderecoText numberOfLines={2}>
                  {item.destiny?.address} - {item.destiny?.number} /{' '}
                  {item.destiny?.zipcode}
                </EnderecoText>
                <EnderecoText numberOfLines={2}>
                  {item.destiny?.district} - {item.destiny?.city}/{' '}
                  {item.destiny?.state}
                </EnderecoText>
              </EnderecoContent> */}
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
