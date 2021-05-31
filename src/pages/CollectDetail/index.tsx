import React, {useCallback, useState, useEffect} from 'react';

import {
  Container,
  BackButton,
  Header,
  Title,
  ContainerCollect,
  Text,
  CancelButton,
  CancelButtonText,
} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

import api from '../../services/api';
import {Alert} from 'react-native';

export interface Collect {
  id: string;
  collect_number: string;
  liters_oil: 2;
  period_preference: string;
  status: string;
  observations: string;
  created_at: Date;
  schedule?: Schedulle;
  address: Address;
}

export interface Schedulle {
  id: string;
  date: Date;
  period: string;
  user_status: string;
}

interface Address {
  address: string;
  number: string;
  zipcode: string;
  district: string;
  city: string;
  complement: string;
  state: string;
  reference: string;
}

const CollectDetail: React.FC = (...props: any) => {
  const navigation = useNavigation();
  const [collect, setCollect] = useState<Collect>();
  const [loading, setLoading] = useState<boolean>(false);

  const loadCollect = useCallback(async () => {
    setLoading(true);
    console.log(props[0]);
    await api
      .get(`collects/${props[0]?.route.params.id}`)
      .then(res => {
        console.log(res.data);
        setCollect(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    loadCollect();
  }, []);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleCancel = useCallback(async () => {
    console.log(props[0]?.route.params.id);
    await api
      .post(`collects/cancel/${props[0]?.route.params.id}`)
      .then(() => {
        loadCollect();
      })
      .catch(err => {
        Alert.alert('Erro' + err);
      });
  }, [props, loadCollect]);

  const openCancelOption = useCallback(() => {
    Alert.alert(
      'Remover Endereço',
      'Tem certeza que deseja cancelar a coleta?',
      [
        {
          text: 'Cancel',
          onPress: () => Alert.alert('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => handleCancel(),
          style: 'default',
        },
      ],
    );
  }, [handleCancel]);

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
        <Title> Coleta </Title>
      </Header>
      <ContainerCollect>
        <Text> #{collect?.collect_number}</Text>
      </ContainerCollect>
      {collect?.status === 'created' && (
        <CancelButton onPress={openCancelOption}>
          <CancelButtonText> Cancelar coleta </CancelButtonText>
        </CancelButton>
      )}
    </Container>
    //   </ScrollView>
    // </KeyboardAvoidingView>
  );
};

export default CollectDetail;
