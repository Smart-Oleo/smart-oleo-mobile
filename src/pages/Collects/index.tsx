import React, {useState, useEffect, useCallback} from 'react';
import {
  Container,
  Header,
  FilterView,
  FilterText,
  ContentImage,
  ImageNoContent,
  TextNoContent,
  DescriptionNoContent,
  CollectList,
  ContainerCollect,
  CollectNumberView,
  CollectNumber,
  EnderecoContent,
  EnderecoText,
  CollectHeader,
  ViewStatus,
  Status,
  CollectBody,
  TextOilNumber,
  StatusContainer,
  StatusList,
  StatusContentActive,
  StatusTextActive,
  StatusContent,
  StatusText,
} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import NoContentImage from '../../assets/images/coleta_info.jpg';
import api from '../../services/api';
import {ActivityIndicator, View} from 'react-native';
import _ from 'lodash';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
// import {ActivityIndicator} from 'react-native';

export interface Collect {
  id: string;
  collect_number: string;
  liters_oil: number;
  period_preference: string;
  status: string;
  observations: string;
  created_at: string;
  updated_at: string;
  address: Address;
}

interface Address {
  address: string;
  district: string;
  zipcode: string;
  complement: string;
  city: string;
  number: number;
  state: string;
}

export interface IStatus {
  name: string;
  value: string;
}

const Collects: React.FC = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const [collects, setCollects] = useState<Collect[]>([]);
  const [statusActive, setStatusActive] = useState<IStatus>();

  const [total, setTotal] = useState<Number>(0);
  const [page, setPage] = useState<Number>(1);
  // const [filter, setFilter] = useState<String>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const getCollects = useCallback(
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
            `collects?pageNumber=${
              pageNumber - 1
            }&pageView=8&filter=${input}&status=${status}`,
          )
          .then(res => {
            console.log(res.data);
            setCollects(
              shouldRefresh ? res.data.data : [...collects, ...res.data.data],
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
    [collects, page, loading, total],
  );

  const refreshList = useCallback(async () => {
    setRefreshing(true);
    await getCollects(1, '', true);
    setRefreshing(false);
  }, [getCollects]);

  const filterCollects = useCallback(
    (input: string) => {
      const search = _.debounce(getCollects, 1500);
      search(1, input, true, statusActive?.value);
    },
    [getCollects, statusActive],
  );

  const filterByStatus = useCallback(
    (value: IStatus) => {
      setStatusActive(value);
      getCollects(1, '', true, value.value);
    },
    [getCollects],
  );

  const cleanStatus = useCallback(() => {
    setStatusActive({name: '', value: ''});
    getCollects(1, '', true);
  }, [getCollects]);

  useEffect(() => {
    getCollects();
  }, []);

  const [status, setStatus] = useState<IStatus[]>([
    {name: 'Aguardando', value: 'created'},
    {name: 'Agendado', value: 'waiting'},
    {name: 'Coletado', value: 'colected'},
    {name: 'Cancelada', value: 'canceled'},
  ]);

  return (
    <Container>
      <Header>
        <FilterView>
          <Icon name="search" size={24} color="#312e38" />
          <FilterText
            placeholder="Pesquisar Coletas..."
            onChangeText={text => {
              filterCollects(text);
            }}
            placeholderTextColor="#000"
          />
        </FilterView>
        <StatusContainer>
          <StatusList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={status}
            keyExtractor={item => String(item.value)}
            renderItem={({item}) => (
              <>
                {statusActive === item ? (
                  <StatusContentActive onPress={cleanStatus}>
                    <StatusTextActive> {item.name}</StatusTextActive>
                  </StatusContentActive>
                ) : (
                  <StatusContent onPress={() => filterByStatus(item)}>
                    <StatusText> {item.name}</StatusText>
                  </StatusContent>
                )}
              </>
            )}
          />
        </StatusContainer>
      </Header>
      {!loading ? (
        <>
          {collects.length > 0 ? (
            <CollectList
              data={collects}
              keyExtractor={item => item.id}
              // style={{ marginTop: 200}}
              // ListFooterComponent={
              //   loading && <ActivityIndicator size="large" color="#FE2E2E" />
              // }
              onRefresh={refreshList}
              refreshing={refreshing}
              onEndReachedThreshold={0.2}
              onEndReached={() => getCollects()}
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
                <ContainerCollect
                  key={item.id}
                  onPress={() =>
                    navigation.navigate('CollectDetail', {id: item.id})
                  }>
                  <CollectHeader>
                    <CollectNumberView>
                      <CollectNumber> N°: {item.collect_number} </CollectNumber>
                    </CollectNumberView>

                    <ViewStatus status={item.status}>
                      <Status>
                        <Icon name="clock" size={12} color="#fff" />
                        {item.status === 'created' && ' Aguardando...'}
                        {item.status === 'waiting' && ' Agendado...'}
                        {item.status === 'collected' && 'Coletado'}
                        {item.status === 'canceled' && 'Cancelada'}
                      </Status>
                    </ViewStatus>
                  </CollectHeader>

                  <CollectBody>
                    <TextOilNumber>
                      Litros p/ coleta: {item.liters_oil}L{' '}
                      <Icon name="droplet" size={16} color="#228B22" />
                    </TextOilNumber>
                  </CollectBody>
                  <EnderecoContent>
                    <EnderecoText numberOfLines={2}>
                      {item.address.address}, {item.address.number}
                    </EnderecoText>
                    <EnderecoText numberOfLines={2}>
                      {item.address.district}, {item.address.city}/
                      {item.address.state} - Complemento:{' '}
                      {item.address.complement}
                    </EnderecoText>
                  </EnderecoContent>
                </ContainerCollect>
              )}
            />
          ) : (
            <ContentImage>
              <ImageNoContent source={NoContentImage} />
              <TextNoContent> Você ainda não possuí coleta. </TextNoContent>
              <DescriptionNoContent>
                Crie coletas de óleo e troque por brindes em nossa loja. 🎁
              </DescriptionNoContent>
            </ContentImage>
          )}
        </>
      ) : (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="small" color="#228B22" />
        </View>
      )}
    </Container>
  );
};

export default Collects;
