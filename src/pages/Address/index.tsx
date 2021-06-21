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
import {Alert, Platform} from 'react-native';
import {colors, metrics, android} from '../../styles/global';

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

  const handleRemoveAddress = useCallback(
    async (id: string) => {
      await api
        .delete(`address/remove/${id}`)
        .then(res => {
          console.log(res);
          Alert.alert('O endereço foi removido!');
          loadAdresses();
        })
        .catch(err => {
          Alert.alert('Houve um erro ao remover o endereço!' + err);
        });
    },
    [loadAdresses],
  );

  const openDeleteOption = useCallback(
    (item: Address) => {
      setVisible(false);
      Alert.alert(
        'Remover Endereço',
        'Tem certeza que deseja remover o endereço?',
        [
          {
            text: 'Cancel',
            onPress: () => Alert.alert('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Confirmar',
            onPress: () => handleRemoveAddress(item.id),
            style: 'default',
          },
        ],
      );
    },
    [handleRemoveAddress],
  );

  useEffect(() => {
    loadAdresses();
  }, [loadAdresses]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const navigateEditAddress = useCallback(() => {
    navigation.navigate('EditAddress', {address: adresses});
  }, [navigation, adresses]);

  return (
    <Container>
      <BackButton onPress={handleGoBack}>
        <Icon
          name="chevron-left"
          size={metrics.iconSize}
          color={colors.darkgray}
        />
        <Title> Meus endereços </Title>
      </BackButton>

      {adresses.length > 0 ? (
        <>
          <AddressList
            style={{
              ...Platform.select({
                android: {
                  backgroundColor: 'transparent',
                  shadowColor: `${colors.lightgray}`,
                  elevation: 24,

                  shadowRadius: 16,
                },
              }),
            }}
            data={adresses}
            onRefresh={loadAdresses}
            refreshing={refreshing}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <ContainerAddress onPress={navigateEditAddress}>
                {/* <Icon
                  name="map-pin"
                  size={metrics.iconSize}
                  color={colors.gray}
                  style={{marginTop: 10}}
                /> */}
                <ContentAddress>
                  <Text numberOfLines={4}>
                    {item.address}, {item.number}. {item.district}, {item.city}{' '}
                    -{item.state}. {item.zipcode}{' '}
                    {item.complement ? ', ' + item.complement + '.' : ''}
                  </Text>
                  <ViewReference>
                    <TextReference> {item.reference} </TextReference>
                  </ViewReference>
                  <ButtonHeader>
                    <Icon
                      name="edit"
                      size={metrics.iconSize - 8}
                      color={colors.gray}
                    />
                  </ButtonHeader>
                </ContentAddress>
              </ContainerAddress>
            )}
          />
          <ButtonView colors={[colors.primary, colors.success]}>
            <ButtonProduct onPress={() => navigation.navigate('NewAddress')}>
              <TextButton>Novo endereço </TextButton>
              <Icon
                name="map-pin"
                size={metrics.iconSize - 5}
                color={colors.white}
              />
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
          <ButtonView colors={[colors.primary, colors.success]}>
            <ButtonProduct onPress={() => navigation.navigate('NewAddress')}>
              <TextButton>Novo endereço </TextButton>
              <Icon
                name="map-pin"
                size={metrics.iconSize - 5}
                color={colors.white}
              />
            </ButtonProduct>
          </ButtonView>
        </ContentImage>
      )}
      {/* <ModalOptions
        visible={visible}
        onRequestClose={toggleModal}
        item={selected}
        requestDelete={openDeleteOption}
      /> */}
    </Container>
  );
};

export default Address;
