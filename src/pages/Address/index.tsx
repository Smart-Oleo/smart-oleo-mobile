import React, {useCallback, useState, useEffect} from 'react';

import {
  Container,
  BackButton,
  ContainerAddress,
  Text,
  ContentAddress,
  ContentImage,
  ImageNoContent,
  TextNoContent,
  DescriptionNoContent,
  ButtonView,
  ButtonProduct,
  TextButton,
  AddressList,
  Title,
  ViewReference,
  TextReference,
  ButtonHeader,
} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import ImageAddress from '../../assets/images/address.jpg';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/api';
import ModalOptions from './ModalOptions';
import ModalDelete from './ModelDelete';

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

const Address: React.FC = () => {
  const navigation = useNavigation();
  const [adresses, setAdresses] = useState<Address[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleDelete, setVisibleDelete] = useState<boolean>(false);
  const [selected, setSelected] = useState<Address>();
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const toggleModal = useCallback(
    (item: Address) => {
      setSelected(item);
      setVisible(!visible);
    },
    [visible],
  );

  // const toggleModalDelete = useCallback(() => {
  //   setVisibleDelete(!visibleDelete);
  // }, [visibleDelete]);

  const openDeleteOption = useCallback(() => {
    setVisible(false);
    console.log('vai abrir aqui, hein');
    setVisibleDelete(true);
  }, []);

  const loadAdresses = useCallback(async () => {
    await api
      .get('address/user')
      .then(res => {
        setAdresses(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    loadAdresses();
  }, [loadAdresses]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Container>
      <BackButton onPress={handleGoBack}>
        <Icon name="chevron-left" size={24} />
      </BackButton>
      <Title> Meus endereços 📍 </Title>
      {adresses.length > 0 ? (
        <>
          <AddressList
            data={adresses}
            onRefresh={loadAdresses}
            refreshing={refreshing}
            keyExtractor={item => item.id}
            // style={{ marginTop: 200}}
            // ListFooterComponent={
            //   loading && <ActivityIndicator size="large" color="#FE2E2E" />
            // }
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <ContainerAddress>
                <Icon name="map-pin" size={34} color="#c0c0c0" />
                <ContentAddress>
                  <Text numberOfLines={4}>
                    {item.address}, {item.number}. {item.district}, {item.city}{' '}
                    -{item.state}. {item.zipcode}{' '}
                    {item.complement ? ', ' + item.complement + '.' : ''}
                  </Text>
                  <ViewReference>
                    <TextReference> {item.reference} 📌 </TextReference>
                  </ViewReference>
                  <ButtonHeader onPress={() => toggleModal(item)}>
                    <Icon
                      name="more-vertical"
                      size={24}
                      style={{position: 'absolute', right: 10, top: 0}}
                    />
                  </ButtonHeader>
                </ContentAddress>
              </ContainerAddress>
            )}
          />
          <ButtonView
            start={{x: 0.2, y: 0.6}}
            end={{x: 0, y: 0}}
            colors={['#228B22', '#00FF00']}>
            <ButtonProduct onPress={() => navigation.navigate('NewAddress')}>
              <TextButton>
                Novo endereço <Icon name="map-pin" size={16} />
              </TextButton>
            </ButtonProduct>
          </ButtonView>
        </>
      ) : (
        <ContentImage>
          <ImageNoContent source={ImageAddress} />
          <TextNoContent>
            {' '}
            Você ainda não possuí nenhum endereço.{' '}
          </TextNoContent>
          <DescriptionNoContent>
            Cadastre um endereço para solicitar uma coleta no endereço desejado.
            🎁
          </DescriptionNoContent>
          <ButtonView
            start={{x: 0.2, y: 0.6}}
            end={{x: 0, y: 0}}
            colors={['#228B22', '#00FF00']}>
            <ButtonProduct onPress={() => navigation.navigate('NewAddress')}>
              <TextButton>
                Novo endereço <Icon name="map-pin" size={16} />
              </TextButton>
            </ButtonProduct>
          </ButtonView>
        </ContentImage>
      )}

      {/* <ContainerAddress>
        <Icon name="map-pin" size={34} color="#c0c0c0" />
        <ContentAddress>
          <Text numberOfLines={2}>
            {' '}
            Rua caramuru, 99 - Bairro Divino Espírito Santo{' '}
          </Text>
        </ContentAddress>
      </ContainerAddress> */}
      <ModalOptions
        visible={visible}
        onRequestClose={toggleModal}
        item={selected}
        requestDelete={openDeleteOption}
      />
    </Container>
  );
};

export default Address;
