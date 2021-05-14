import React from 'react';
import {
  Container,
  ContainerIcon,
  Title,
  Description,
  BackButton,
  ContainerSuccess,
  ConfirmButton,
  ConfirmButtonText,
} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

const Success: React.FC = (...props: any) => {
  const navigation = useNavigation();

  const message = props[0].route.params.message;
  return (
    <Container>
      <BackButton onPress={() => {}}>
        <Icon name="chevron-left" size={24} />
      </BackButton>
      <ContainerSuccess>
        <ContainerIcon>
          <Icon name="check" size={80} color="#fff" />
        </ContainerIcon>
        <Title> Sucesso!</Title>
        <Description> {message} </Description>
        <ConfirmButton onPress={() => navigation.navigate('Home')}>
          <ConfirmButtonText> Ir para o início </ConfirmButtonText>
        </ConfirmButton>
      </ContainerSuccess>
    </Container>
  );
};

export default Success;
