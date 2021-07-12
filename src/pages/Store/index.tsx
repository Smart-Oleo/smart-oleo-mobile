import React, {useEffect, useState, useCallback} from 'react';
import {Platform} from 'react-native';
import {
  Header,
  FilterView,
  FilterText,
  Content,
  ProductList,
  ProductDetail,
  ProductImage,
  ProductContent,
  PriceProduct,
  Title,
  Shadow,
  PriceText,
  ButtonProduct,
  TextButton,
  ButtonView,
  ViewIcon,
  ContentVoid,
  ButtonRefresh,
  TextButtonRefresh,
} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import api from '../../services/api';
import {Alert, ActivityIndicator, View, Image} from 'react-native';
import _ from 'lodash';
import ModalRescue from './ModalRescue';
import {useNavigation} from '@react-navigation/native';
import {colors, metrics, android} from '../../styles/global';
import {Container, Text} from '../../styles/global/general';
import notFoundImage from './../../assets/images/not_found.png';
export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
  price_points: number;
  promotional_points: number;
}
const Store: React.FC = () => {
  const navigation = useNavigation();

  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState<Number>(0);
  const [page, setPage] = useState<Number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [selected, setSelected] = useState<Object>();

  const toggleModal = useCallback(
    (item: Object) => {
      setSelected(item);
      setVisible(!visible);
    },
    [visible],
  );

  const loadProducts = useCallback(
    async (pageNumber = page, input = '', shouldRefresh = false) => {
      if (pageNumber === total) {
        return;
      }
      if (loading) {
        return;
      }

      setLoading(true);
      await api
        .get(`products?pageNumber=${pageNumber - 1}&pageView=8&filter=${input}`)
        .then(res => {
          // console.log(res.data.data);
          setProducts(
            shouldRefresh ? res.data.data : [...products, ...res.data.data],
          );
          setTotal(res.data.pages + 1);
          setLoading(false);
        })
        .catch(err => {
          Alert.alert(err.response.data.error);
          setLoading(false);
        });
      setLoading(false);
      setPage(pageNumber + 1);
    },
    [page, total, loading, products],
  );

  const refreshList = useCallback(async () => {
    setRefreshing(true);
    await loadProducts(1, '', true);
    setRefreshing(false);
  }, [loadProducts]);

  const filterProducts = useCallback(
    (input: string) => {
      const search = _.debounce(loadProducts, 1500);
      search(1, input, true);
    },
    [loadProducts],
  );

  useEffect(() => {
    console.log(loading);
    loadProducts();
  }, []);

  return (
    <Container>
      <Header>
        <FilterView
          style={{
            ...Platform.select({
              android,
            }),
          }}>
          <Icon name="search" size={metrics.iconSize} color={colors.gray} />
          <FilterText
            placeholder="Pesquisar Produtos"
            onChangeText={text => {
              filterProducts(text);
            }}
            placeholderTextColor={colors.gray}
          />
        </FilterView>
      </Header>
      <Content>
        {!loading ? (
          <>
            {products.length > 0 ? (
              <ProductList
                data={products}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                onRefresh={refreshList}
                refreshing={refreshing}
                onEndReachedThreshold={0.2}
                onEndReached={() => loadProducts()}
                ListFooterComponent={
                  loading && (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <ActivityIndicator
                        size="small"
                        color={colors.primary}
                        style={{alignSelf: 'center', width: '100%'}}
                      />
                    </View>
                  )
                }
                renderItem={({item}) => (
                  <ProductDetail
                    key={item.id}
                    style={{
                      ...Platform.select({
                        android,
                      }),
                    }}>
                    {item.image ? (
                      <ProductImage source={{uri: item.image}} />
                    ) : (
                      <ViewIcon>
                        <Icon name="image" size={40} />
                      </ViewIcon>
                    )}
                    <Shadow />
                    <ProductContent>
                      <Title numberOfLines={2}>{item.title}</Title>
                      <PriceProduct>
                        <PriceText>{item.price_points}</PriceText>
                        <Icon
                          name="droplet"
                          size={metrics.iconSize - 8}
                          color={colors.success}
                        />
                      </PriceProduct>
                      <ButtonView colors={[colors.primary, colors.success]}>
                        <ButtonProduct
                          onPress={() =>
                            navigation.navigate('Rescue', {id: item.id})
                          }>
                          <TextButton>Resgatar</TextButton>
                        </ButtonProduct>
                        <Icon
                          name="shopping-bag"
                          size={metrics.iconSize - 6}
                          color={colors.white}
                        />
                      </ButtonView>
                    </ProductContent>
                  </ProductDetail>
                )}
              />
            ) : (
              <ContentVoid>
                <Image
                  source={notFoundImage}
                  style={{width: 300, height: 400}}
                />
                <Text>Desculpe, nenhum produto foi</Text>
                <Text>encontrado encontrado.</Text>
                <ButtonRefresh onPress={loadProducts}>
                  <TextButtonRefresh>
                    {' '}
                    Atualizar{' '}
                    {loading ? (
                      <ActivityIndicator
                        size="small"
                        color={colors.white}
                        style={{alignSelf: 'center', width: '100%'}}
                      />
                    ) : (
                      ''
                    )}{' '}
                  </TextButtonRefresh>
                </ButtonRefresh>
              </ContentVoid>
            )}
          </>
        ) : (
          <View
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <ActivityIndicator size="small" color={colors.primary} />
          </View>
        )}
      </Content>
      <ModalRescue
        visible={visible}
        onRequestClose={toggleModal}
        item={selected}
      />
    </Container>
  );
};

export default Store;
