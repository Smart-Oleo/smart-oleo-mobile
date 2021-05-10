import React, {useEffect, useState, useCallback} from 'react';
import {
  Container,
  Header,
  FilterView,
  FilterText,
  Content,
  // ImageNoContent,
  // TextNoContent,
  ProductList,
  ProductDetail,
  ProductImage,
  ProductContent,
  Title,
  PriceView,
  PriceText,
  ButtonProduct,
  TextButton,
  ButtonView,
  ViewIcon,
} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import NoContentImage from '../../assets/images/brinde_info.jpg';
import api from '../../services/api';
import {Alert, View, ActivityIndicator} from 'react-native';
import _ from 'lodash';

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
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState<Number>(0);
  const [page, setPage] = useState<Number>(1);
  // const [filter, setFilter] = useState<String>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const loadProducts = useCallback(
    async (pageNumber = page, input = '', shouldRefresh = false) => {
      console.log(pageNumber, total, input, loading, shouldRefresh);
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
      setPage(pageNumber + 1);
    },
    [page, total, loading, products],
  );

  const refreshList = useCallback(async () => {
    console.log('caiu aqui');
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
    loadProducts();
  }, []);

  return (
    <Container>
      <Header>
        <FilterView>
          <Icon name="search" size={28} color="#312e38" />
          <FilterText
            placeholder="Pesquisar Produtos"
            onChangeText={text => {
              filterProducts(text);
            }}
            placeholderTextColor="#000"
          />
        </FilterView>
      </Header>
      <Content>
        {/* {!loading ? ( */}
        <ProductList
          data={products}
          keyExtractor={item => item.id}
          // style={{ marginTop: 200}}
          // ListFooterComponent={
          //   loading && <ActivityIndicator size="large" color="#FE2E2E" />
          // }

          showsVerticalScrollIndicator={false}
          numColumns={2}
          onRefresh={refreshList}
          refreshing={refreshing}
          onEndReachedThreshold={0.2}
          onEndReached={() => loadProducts()}
          ListFooterComponent={
            loading && (
              <View style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator size="small" color="#228B22" />
              </View>
            )
          }
          renderItem={({item}) => (
            <ProductDetail key={item.id}>
              {item.image ? (
                <ProductImage source={{uri: item.image}} />
              ) : (
                <ViewIcon>
                  <Icon name="image" size={40} />
                </ViewIcon>
              )}

              <PriceView
                start={{x: 0, y: 1}}
                end={{x: 0, y: 0}}
                colors={['#D500F9', '#4A148C']}>
                <PriceText>
                  {item.price_points} <Icon name="droplet" size={14} />
                </PriceText>
              </PriceView>
              <ProductContent>
                <Title numberOfLines={2}>{item.title} </Title>
              </ProductContent>
              <ButtonView
                start={{x: 0.2, y: 0.6}}
                end={{x: 0, y: 0}}
                colors={['#228B22', '#00FF00']}>
                <ButtonProduct>
                  <TextButton>
                    Resgatar <Icon name="shopping-bag" size={14} />
                  </TextButton>
                </ButtonProduct>
              </ButtonView>

              {/* <TextNoContent> </TextNoContent> */}
            </ProductDetail>
          )}
        />
      </Content>
      {/* <Content>
        <ImageNoContent source={NoContentImage} />
        <TextNoContent> A Loja está vazia 😢 </TextNoContent>
      </Content> */}
    </Container>
  );
};

export default Store;
