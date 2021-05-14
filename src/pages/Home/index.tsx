import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {useAuth} from '../../hooks/auth';
import {
  Container,
  Header,
  ContentUser,
  ContentPoints,
  PointsText,
  ImageHeader,
  Title,
  Body,
} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
const Home: React.FC = () => {
  const {signOut, user} = useAuth();
  const navigation = useNavigation();

  return (
    <Container>
      <Header>
        {user.photo ? (
          <ImageHeader source={{uri: user.photo}} />
        ) : (
          <ContentUser>
            <Icon name="user" size={24} />
          </ContentUser>
        )}

        <ContentPoints>
          <PointsText> 100</PointsText>
          <Icon name="droplet" size={16} />
        </ContentPoints>
        <TouchableOpacity onPress={() => navigation.navigate('Address')}>
          <Icon name="map-pin" size={24} />
        </TouchableOpacity>
      </Header>
      <Body>
        <Title>Olá, {user.name}!</Title>
        <TouchableOpacity onPress={signOut}>
          <Text> Sair </Text>
        </TouchableOpacity>
      </Body>
    </Container>
  );
};

export default Home;
