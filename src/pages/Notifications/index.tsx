import React, {useCallback, useState, useEffect} from 'react';

import {
  Container,
  BackButton,
  Header,
  Title,
  ContainerNotification,
  Indicator,
  TitleNotification,
  DateContainer,
  DateNotification,
  ContentImage,
  ImageNoContent,
  TextNoContent,
  DescriptionNoContent,
  NotificationList,
  Content,
} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {format} from 'date-fns';

import Imagem from '../../assets/images/notification.jpg';
import api from '../../services/api';
import {colors, metrics, android} from '../../styles/global';
import {Platform} from 'react-native';

export interface Notification {
  _id: string;
  content: string;
  recipient_id: string;
  link: string;
  params: string;
  type: number;
  read: boolean;
  created_at: Date;
  updated_at: Date;
}

const Notifications: React.FC = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleReadAndNavigate = useCallback(
    async (read: boolean, id: string, route: string, params: string) => {
      if (!read) {
        await api.post(`notifications/read/${id}`);
      }
      console.log(params);
      if (!params) {
        navigation.navigate(route);
      } else {
        navigation.navigate(route, {id: params});
      }
    },
    [navigation],
  );

  const loadNotifications = useCallback(async () => {
    setLoading(true);
    await api
      .get('notifications/list')
      .then(res => {
        setNotifications(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleGoBack}>
          <Icon
            name="chevron-left"
            size={metrics.iconSize}
            color={colors.darkgray}
          />
          <Title> Notificações </Title>
        </BackButton>
      </Header>

      {notifications.length > 0 ? (
        <NotificationList
          data={notifications}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <Content
              style={{
                borderBottomRightRadius: 5,
                borderTopRightRadius: 5,
              }}>
              <ContainerNotification
                key={item._id}
                status={item.read}
                onPress={() =>
                  handleReadAndNavigate(
                    item.read,
                    item._id,
                    item.link,
                    item.params,
                  )
                }>
                <DateContainer>
                  <Indicator status={item.read} />
                  <DateNotification>
                    {format(
                      new Date(item.created_at.toLocaleString()),
                      'dd/MM/yyy HH:MM',
                    )}
                  </DateNotification>
                </DateContainer>
                <TitleNotification numberOfLines={3}>
                  {item.content}
                </TitleNotification>
                {/* <DateNotification>
                {format(
                  new Date(item.created_at.toLocaleString()),
                  'dd/MM/yyy HH:MM',
                )}
              </DateNotification> */}
              </ContainerNotification>
            </Content>
          )}
        />
      ) : (
        <ContentImage>
          <ImageNoContent source={Imagem} />
          <TextNoContent> Ainda não há notificações. </TextNoContent>
          <DescriptionNoContent>
            Fique tranquilo, quando houver alguma novidade, nós informaremos. 🔔
          </DescriptionNoContent>
        </ContentImage>
      )}
    </Container>
    //   </ScrollView>
    // </KeyboardAvoidingView>
  );
};

export default Notifications;
