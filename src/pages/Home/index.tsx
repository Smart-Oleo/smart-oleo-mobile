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
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import Card from '../../components/Card';
import api from '../../services/api';
const Home: React.FC = () => {
  const {signOut, user} = useAuth();
  const navigation = useNavigation();
  const [totalNotification, setTotalNotificaiton] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);

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

  const loadPoints = useCallback(async () => {
    await api
      .get('users/my-wallet')
      .then(res => {
        console.log(res.data);
        setPoints(res.data.points);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    loadNotifications();
    loadPoints();
  }, []);

  return (
    <Container>
      <Header>
        <ContentHeader>
          {user.photo ? (
            <ImageHeader source={{uri: user.photo}} />
          ) : (
            <ContentUser>
              <Icon name="user" size={24} />
            </ContentUser>
          )}
        </ContentHeader>
        <ContentPoints>
          <PointsText>{points}</PointsText>
          <Icon name="droplet" size={16} />
        </ContentPoints>
        <ContentHeader>
          <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
            <FontIcon
              style={{paddingRight: 10, color: '#009e00'}}
              name="shopping-bag"
              size={24}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Address')}>
            <Icon name="map-pin" size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => navigation.navigate('Notifications')}>
            <FontIcon name="bell" size={24} />
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
