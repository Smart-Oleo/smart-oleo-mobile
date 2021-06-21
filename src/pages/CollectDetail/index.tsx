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
  EnderecoContent,
  EnderecoText,
  CollectHeaderContent,
  ViewStatus,
  CollectText,
  ContentSchedule,
  Divisor,
  CollectorContent,
  CollectorImage,
  ButtonView,
  ButtonProduct,
  TextButton,
  StatusInfo,
} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {format} from 'date-fns';
import api from '../../services/api';
import {Alert, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import Toast from 'react-native-toast-message';
import RootToast from '../../components/Toast';
import {colors, metrics, android} from '../../styles/global';
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
  collector: Collector;
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

interface Collector {
  id: string;
  name: string;
  last_name: string;
  email: string;
  cellphone: string;
  photo: string;
}

const CollectDetail: React.FC = (...props: any) => {
  const navigation = useNavigation();
  const [collect, setCollect] = useState<Collect>();
  const [loading, setLoading] = useState<boolean>(false);

  const loadCollect = useCallback(async () => {
    setLoading(true);
    console.log(props[0]?.route.params.id);
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
    await api
      .post(`collects/cancel/${props[0]?.route.params.id}`)
      .then(() => {
        loadCollect();
      })
      .catch(err => {
        Alert.alert('Erro' + err);
      });
  }, [props, loadCollect]);

  const handleConfirm = useCallback(
    async (schedule_id: string, response: string) => {
      await api
        .post('schedules/confirm', {
          schedule_id: schedule_id,
          response: response,
        })
        .then(res => {
          console.log(res);
          loadCollect();
          Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Tudo certo!',
            text2: `A coleta ${collect?.collect_number} foi respondida.`,
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 200,
            bottomOffset: 40,
          });
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Ops! Houve um problema.',
            text2: err.response.data.error
              ? err.response.data.error
              : 'Ops! Houve algum problema',
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 200,
            bottomOffset: 40,
          });
        });
    },
    [],
  );

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
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: colors.secundary,
        }}>
        <Container>
          <Header>
            <BackButton onPress={handleGoBack}>
              <Icon
                name="chevron-left"
                size={metrics.iconSize}
                color={colors.gray}
              />
              <Title> Coleta </Title>
            </BackButton>
          </Header>
          <ContainerCollect>
            <CollectHeaderContent>
              <Text> {collect?.collect_number}</Text>
              <ViewStatus status={collect?.status} style={{borderRadius: 5}}>
                <Icon name="clock" size={12} color={colors.white} />
                <StatusInfo>
                  {collect?.status === 'created' && ' Aguardando...'}
                  {collect?.status === 'waiting' && ' Agendado...'}
                  {collect?.status === 'collected' && 'Coletado'}
                  {collect?.status === 'canceled' && 'Cancelada'}
                </StatusInfo>
              </ViewStatus>
            </CollectHeaderContent>
            <CollectText>
              Quantidade:{' '}
              <Text style={{color: colors.gray, fontSize: 13}}>
                {collect?.liters_oil}L
              </Text>
            </CollectText>
            <CollectText>
              Perído de preferência:{' '}
              <Text style={{color: colors.gray, fontSize: 13}}>
                {collect?.period_preference === 'morning' && 'Manhã'}
                {collect?.period_preference === 'evening' && 'Tarde'}
                {collect?.period_preference === 'night' && 'Noite'}
              </Text>
            </CollectText>
            <CollectText>
              Observações :{' '}
              <Text style={{fontSize: 14}}>
                {!collect?.observations
                  ? 'Não há observações'
                  : collect?.observations}{' '}
              </Text>
            </CollectText>
            <EnderecoContent>
              <EnderecoText numberOfLines={2}>
                {collect?.address.address} - {collect?.address.number} /{' '}
                {collect?.address.zipcode}
              </EnderecoText>
              <EnderecoText numberOfLines={2}>
                {collect?.address.district} - {collect?.address.city}/{' '}
                {collect?.address.state}
              </EnderecoText>
            </EnderecoContent>
            {collect?.schedule && (
              <ContentSchedule>
                <Divisor />
                <Text> Informações agendamento </Text>
                <CollectText style={{marginTop: 10}}>
                  Data do agendamento :{' '}
                  <Text style={{fontSize: 14, color: colors.gray}}>
                    {format(
                      new Date(collect?.schedule.date.toLocaleString()),
                      'dd/MM/yyy',
                    )}
                  </Text>
                </CollectText>
                <CollectText style={{marginTop: 4}}>
                  Perído da coleta:{' '}
                  <Text style={{color: colors.gray}}>
                    {collect?.schedule.period === 'morning' && 'Manhã'}
                    {collect?.schedule.period === 'evening' && 'Tarde'}
                    {collect?.schedule.period === 'night' && 'Noite'}
                  </Text>
                </CollectText>
                <CollectText style={{marginTop: 4}}>Coletor: </CollectText>
                <CollectorContent>
                  <CollectorImage
                    source={{uri: collect?.schedule.collector.photo}}
                  />
                  <Text> {collect?.schedule.collector.name}</Text>
                </CollectorContent>
                {collect?.schedule.user_status === 'waiting' && (
                  <>
                    <ButtonView colors={[colors.primary, colors.success]}>
                      <ButtonProduct
                        onPress={() =>
                          handleConfirm(collect?.schedule?.id, 'aproved')
                        }>
                        <TextButton>Confirmar Agendamento</TextButton>
                      </ButtonProduct>
                    </ButtonView>
                    <ButtonView
                      style={{marginTop: 10}}
                      colors={['#B22222', colors.danger]}>
                      <ButtonProduct onPress={() => handleConfirm('rejected')}>
                        <TextButton> Rejeitar Agendamento</TextButton>
                      </ButtonProduct>
                    </ButtonView>
                  </>
                )}
              </ContentSchedule>
            )}
          </ContainerCollect>
          {collect?.status === 'created' && (
            <CancelButton onPress={openCancelOption}>
              <CancelButtonText> Cancelar coleta </CancelButtonText>
            </CancelButton>
          )}
        </Container>
      </ScrollView>
      <RootToast />
    </KeyboardAvoidingView>
  );
};

export default CollectDetail;
