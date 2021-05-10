import React, {useCallback} from 'react';

import {
  Container,
  BackButton,
  // ContainerAddress,
  // Text,
  // ContentAddress,
  ContentImage,
  ImageNoContent,
  TextNoContent,
  DescriptionNoContent,
  ButtonView,
  ButtonProduct,
  TextButton,
} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import ImageAddress from '../../assets/images/address.jpg';
import {useNavigation} from '@react-navigation/native';
const Address: React.FC = () => {
  const navigation = useNavigation();

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Container>
      <BackButton onPress={handleGoBack}>
        <Icon name="chevron-left" size={24} />
      </BackButton>
      <ContentImage>
        <ImageNoContent source={ImageAddress} />
        <TextNoContent> Você ainda não possuí nenhum endereço. </TextNoContent>
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

      {/* <ContainerAddress>
        <Icon name="map-pin" size={34} color="#c0c0c0" />
        <ContentAddress>
          <Text numberOfLines={2}>
            {' '}
            Rua caramuru, 99 - Bairro Divino Espírito Santo{' '}
          </Text>
        </ContentAddress>
      </ContainerAddress> */}
    </Container>
  );
};

export default Address;
