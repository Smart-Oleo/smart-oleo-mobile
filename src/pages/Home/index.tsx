import React, {useState, useCallback, useEffect} from 'react';
import {
  TouchableOpacity,
  ImageSourcePropType,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {useAuth} from '../../hooks/auth';
import {
  Container,
  Header,
  ContentUser,
  ContentHeader,
  ImageHeader,
  Body,
  Badge,
  TextBadge,
  HighligthsList,
  Content,
  TextRight,
  UserContainer,
  ContentUserHeader,
  TitleList,
  TitleUser,
} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/api';
import Highlights from '../../components/Highlights';
import SmallCard from '../../components/SmallCard';
import Imagem from '../../assets/images/natureza.jpg';
import Planet from '../../assets/images/planet.png';
import Cashback from '../../assets/images/cashback.jpg';
import Notify from '../../assets/images/notify.jpg';
export interface HighlightsI {
  image: ImageSourcePropType;
  title: string;
  description: string;
}

const hightlist: HighlightsI = [
  {
    image: Imagem,
    title: 'Importância da reciclagem',
    description:
      'A reciclagem do óleo de cozinha usado pode produzir sabão, biodiesel,tintas e outros produtos, além de diminuir a poluição ao meio ambiente',
  },
  {
    image: Planet,
    title: 'Benefícios',
    description:
      'A reciclagem do óleo de cozinha usado pode produzir sabão, biodiesel,tintas e outros produtos, além de diminuir a poluição ao meio ambiente',
  },
];

const info: HighlightsI = [
  {
    image: Cashback,
    title: 'Ganhe recompensas',
    description:
      'Você ganha pontos a partir da quantidade de óleo por Litro, podendo trocar por nossos produtos',
  },
  {
    image: Notify,
    title: 'Notificações',
    description:
      'Você será notificado(a) quando receber algum agendamento ou quando o produto solicitado sair para entrega',
  },
];
const Home: React.FC = () => {
  const {user} = useAuth();
  const navigation = useNavigation();
  const [totalNotification, setTotalNotificaiton] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);
  const [refreshing, setRefreshing] = useState<boolean>(false);

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

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadPoints();
    await loadNotifications();
    setRefreshing(false);
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

      <ScrollView
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        showsVerticalScrollIndicator={false}>
        <Body>
          {/* <Title>Olá, {user?.name}!</Title> */}
          <ContentUserHeader>
            <UserContainer>
              <TitleUser> Olá, {user.name}, Bem-vindo(a).</TitleUser>
            </UserContainer>
            <SmallCard name={points.toString()} icon="droplet" />
          </ContentUserHeader>

          <Content>
            <ContentHeader>
              <TitleList> Informativos </TitleList>
              <TextRight> (2)</TextRight>
            </ContentHeader>

            <HighligthsList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={info}
              keyExtractor={item => item.title}
              renderItem={({item}) => (
                // <Categorys categoria={item}/>
                <Highlights
                  image={item.image}
                  title={item.title}
                  description={item.description}
                />
              )}
            />
          </Content>

          <Content>
            <ContentHeader>
              <TitleList> Para saber </TitleList>
              <TextRight> (2)</TextRight>
            </ContentHeader>

            <HighligthsList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={hightlist}
              keyExtractor={item => item.title}
              renderItem={({item}) => (
                // <Categorys categoria={item}/>
                <Highlights
                  image={item.image}
                  title={item.title}
                  description={item.description}
                />
              )}
            />
          </Content>
        </Body>
      </ScrollView>
    </Container>
  );
};

export default Home;
