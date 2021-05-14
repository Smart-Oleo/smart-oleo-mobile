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
  const [loading, setLoading] = useState<boolean>(false);
  const [collects, setCollects] = useState<Collect[]>([]);
  const [statusActive, setStatusActive] = useState<IStatus>();

  const getCollects = useCallback(async () => {
    setLoading(true);
    try {
      await api
        .get('collects')
        .then(res => {
          console.log(res.data);
          setCollects(res.data.data);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    } catch (err) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getCollects();
  }, [getCollects]);

  const [status, setStatus] = useState<IStatus[]>([
    {name: 'Aguardando', value: 'created'},
    {name: 'Confirmado', value: 'confirmado'},
    {name: 'Coletado', value: 'colected'},
  ]);

  return (
    <Container>
      <Header>
        <FilterView>
          <Icon name="search" size={24} color="#312e38" />
          <FilterText
            placeholder="Pesquisar Coletas..."
            // onChangeText={text => {
            //   filterRestaurants(text);
            // }}
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
                  <StatusContentActive onPress={() => {}}>
                    <StatusTextActive> {item.name}</StatusTextActive>
                  </StatusContentActive>
                ) : (
                  <StatusContent onPress={() => {}}>
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
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <ContainerCollect key={item.id}>
                  <CollectHeader>
                    <CollectNumberView>
                      <CollectNumber> N°: {item.collect_number} </CollectNumber>
                    </CollectNumberView>

                    <ViewStatus>
                      <Status>
                        <Icon name="clock" size={12} color="#fff" />{' '}
                        Aguardando...
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
