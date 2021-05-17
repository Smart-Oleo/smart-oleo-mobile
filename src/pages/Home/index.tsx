import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {useAuth} from '../../hooks/auth';
import {
  Container,
  Header,
  ContentUser,
  ContentPoints,
  PointsText,
  ContentHeader,
  ImageHeader,
  Title,
  Body,
  Badge,
  TextBadge,
} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import Card from '../../components/Card';
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
        <ContentHeader>
          <TouchableOpacity onPress={() => navigation.navigate('Address')}>
            <Icon name="map-pin" size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => navigation.navigate('Notifications')}>
            <Icon name="bell" size={24} />
            <Badge>
              <TextBadge>7</TextBadge>
            </Badge>
          </TouchableOpacity>
        </ContentHeader>
      </Header>
      <Body>
        <Title>Olá, {user.name}!</Title>
        <Card />
        <TouchableOpacity onPress={signOut}>
          <Text> Sair </Text>
        </TouchableOpacity>
      </Body>
    </Container>
  );
};

export default Home;
