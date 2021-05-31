import React, {useCallback, useState, useEffect} from 'react';

import {
  Container,
  BackButton,
  Header,
  Title,
  ContainerNotification,
  TitleNotification,
  DateNotification,
  ContentImage,
  ImageNoContent,
  TextNoContent,
  DescriptionNoContent,
  NotificationList,
  ContainerButtons,
  ButtonAcept,
  TextAcept,
} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {format} from 'date-fns';

import Imagem from '../../assets/images/notification.jpg';
import api from '../../services/api';

export interface Notification {
  id: string;
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

  const loadNotifications = useCallback(async () => {
    setLoading(true);
    await api
      .get('notifications/list')
      .then(res => {
        console.log(res.data.data);
        setNotifications(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
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
    // <KeyboardAvoidingView
    //   style={{flex: 1, backgroundColor: '#fff'}}
    //   behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    //   enabled>
    //   <ScrollView
    //     keyboardShouldPersistTaps="handled"
    //     showsVerticalScrollIndicator={false}>
    <Container>
      <Header>
        <BackButton onPress={handleGoBack}>
          <Icon name="chevron-left" size={24} />
        </BackButton>
        <Title> Notificações </Title>
      </Header>

      {notifications.length > 0 ? (
        <NotificationList
          data={notifications}
          keyExtractor={item => item.id}
          // style={{ marginTop: 200}}
          // ListFooterComponent={
          //   loading && <ActivityIndicator size="large" color="#FE2E2E" />
          // }

          showsVerticalScrollIndicator={false}
          // onRefresh={refreshList}
          // refreshing={refreshing}
          // onEndReachedThreshold={0.2}
          // onEndReached={() => loadProducts()}
          // ListFooterComponent={
          //   loading && (
          //     <ActivityIndicator
          //       size="small"
          //       color="#228B22"
          //       style={{alignSelf: 'center', width: '100%'}}
          //     />
          //   )
          // }
          renderItem={({item}) => (
            <ContainerNotification>
              <TitleNotification numberOfLines={3}>
                {item.content}
              </TitleNotification>
              <DateNotification>
                {format(
                  new Date(item.created_at.toLocaleString()),
                  'dd/MM/yyy HH:MM',
                )}
              </DateNotification>
            </ContainerNotification>
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
