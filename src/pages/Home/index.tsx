import React, {useState, useCallback, useEffect} from 'react';
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
import api from '../../services/api';
const Home: React.FC = () => {
  const {signOut, user} = useAuth();
  const navigation = useNavigation();
  const [totalNotification, setTotalNotificaiton] = useState<number>(0);

  const loadNotifications = useCallback(async () => {
    await api
      .get('notifications/total')
      .then(res => {
        setTotalNotificaiton(res.data.total);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    loadNotifications();
  }, []);

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
              <TextBadge>{totalNotification} </TextBadge>
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
