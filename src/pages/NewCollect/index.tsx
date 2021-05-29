import React, {useRef, useCallback, useState} from 'react';
import {Container, Title, LogoImage} from './styles';
import Input from '../../components/Input';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import RNPickerSelect from '../../components/RNPickerSelect';
import Button from '../../components/Button';
import api from '../../services/api';
import imageLogo from '../../assets/images/logo_horizontal.png';
import {KeyboardAvoidingView, ScrollView, Platform} from 'react-native';
import * as Yup from 'yup';
import getValidationErros from '../../utils/getValidationErrors';
import Toast from 'react-native-toast-message';
import RootToast from '../../components/Toast';

interface CollectData {
  liters_oil: number;
  period_preference: string;
  address_id: string;
  observations: string;
}

interface Select {
  value: string;
  label: string;
}
const NewCollect: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [addressOption, setAddressOption] = useState<Select[]>([]);
  const pickerOptions = [
    {value: 'morning', label: 'Manhã'},
    {value: 'evening', label: 'Tarde'},
    {value: 'night', label: 'Noite'},
  ];

  const loadAdresses = useCallback(async () => {
    await api
      .get('address/user')
      .then(res => {
        const arr: [{value: string; label: string}] = [{value: '', label: ''}];
        for (let i = 0; i < res.data.length; i++) {
          arr.push({
            value: res.data[i].id,
            label: res.data[i].address + ', ' + res.data[i].number,
          });
        }
        arr.splice(0, 1);
        setAddressOption(arr);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleSubmit = useCallback(async (data: CollectData) => {
    try {
      formRef.current?.setErrors({});

      // data.liters_oil = parseInt(data.liters_oil);

      const schema = Yup.object().shape({
        liters_oil: Yup.number()
          .integer('Deve ser um número inteiro')
          .moreThan(1, 'A quantidade deve ser maior que 1')
          .required('Endereço obrigatório'),
        period_preference: Yup.string().required(
          'O período deve ser informado',
        ),
        address_id: Yup.string().required('O endereço deve ser informado'),
        observations: Yup.string(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      console.log(data);

      await api
        .post('collects', data)
        .then(res => {
          Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Tudo certo!',
            text2: `A coleta de nº ${res.data.collect_number} foi criada.`,
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
    } catch (err) {
      const errors = getValidationErros(err);

      formRef.current?.setErrors(errors);
      return;
    }
  }, []);

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
        showsVerticalScrollIndicator={false}>
        <Container>
          <LogoImage source={imageLogo} />
          <Title> Crie uma nova coleta.</Title>
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={{user: pickerOptions[0].value}}>
            <Input
              name="liters_oil"
              icon="package"
              placeholder="Litros para coleta"
              autoCapitalize="none"
              keyboardType="numeric"
            />
            <RNPickerSelect
              name="period_preference"
              placeholder={{
                label: 'Informe o período de preferência',
                color: '#000',
              }}
              items={pickerOptions}
            />
            <RNPickerSelect
              placeholder={{
                label: 'Informe o endereço',
                color: '#000',
              }}
              name="address_id"
              onOpen={loadAdresses}
              items={addressOption}
            />
            <Input
              name="observations"
              icon="message-circle"
              placeholder="Observações"
              autoCapitalize="none"
              numberOfLines={4}
            />
            <Button
              onPress={() => formRef.current?.submitForm()}
              isLoading={false}>
              Confirmar
            </Button>
          </Form>
        </Container>
      </ScrollView>
      <RootToast />
    </KeyboardAvoidingView>
  );
};

export default NewCollect;
