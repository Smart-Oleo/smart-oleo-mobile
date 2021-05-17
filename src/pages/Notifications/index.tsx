import React, {useCallback} from 'react';

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
} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

import Imagem from '../../assets/images/notification.jpg';

const Notifications: React.FC = () => {
  const navigation = useNavigation();

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

      <ContainerNotification>
        <TitleNotification numberOfLines={3}>
          O coletor fez um agendamento para a coleta n 2019209128
        </TitleNotification>
        <DateNotification>01/06/2021 às 18:40</DateNotification>
      </ContainerNotification>

      <ContentImage>
        <ImageNoContent source={Imagem} />
        <TextNoContent> Ainda não há notificações. </TextNoContent>
        <DescriptionNoContent>
          Fique tranquilo, quando houver alguma novidade, nós informaremos. 🔔
        </DescriptionNoContent>
      </ContentImage>
    </Container>
    //   </ScrollView>
    // </KeyboardAvoidingView>
  );
};

export default Notifications;
