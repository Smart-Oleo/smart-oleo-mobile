import React, {useCallback, useRef, useState} from 'react';

import {Container, BackButton, Title, Header} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import Input from '../../components/Input';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import * as Yup from 'yup';
import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Button from '../../components/Button';
import api from '../../services/api';
import Toast from 'react-native-toast-message';
import RootToast from '../../components/Toast';
import getValidationErros from '../../utils/getValidationErrors';

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

interface AddressByCep {
  zipcode: string;
  address: string;
  district: string;
  city: string;
  state: string;
}

const EditAddress: React.FC = (...props: any) => {
  const formRef = useRef<FormHandles>(null);

  const addressEdit = props[0].route.params.address;

  const navigation = useNavigation();
  const [loadingCep, setLoadingCep] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  console.log(addressEdit);
  // const address = formRef.current?.getFieldValue('address');
  // const district = formRef.current?.getFieldValue('district');
  // const city = formRef.current?.getFieldValue('city');
  // const state = formRef.current?.getFieldValue('state');

  // const [addressByCep, setAddressByCep] = useState<AddressByCep>();

  const handleCreate = useCallback(
    async (data: Address) => {
      data.zipcode = data.zipcode.replace('-', '');
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          address: Yup.string().required('Endereço obrigatório'),
          number: Yup.string().required('Número obrigatório'),
          zipcode: Yup.string()
            .max(8, 'Deve conter 8 caracteres')
            .required('Cep obrigatório'),
          district: Yup.string().required('Bairro é obrigatório'),
          city: Yup.string().required('Cidade é obrigatório'),
          state: Yup.string()
            .min(2, 'Deve conter 2 caracteres')
            .max(2, 'Deve conter 2 caracteres')
            .required('Estado é obrigatório'),
          reference: Yup.string().required('Referência é obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api
          .post('address', data)
          .then(res => {
            console.log(res);
            setLoading(false);
            navigation.navigate('Success', {
              message: 'Endereço cadastrado.',
            });
          })
          .catch(err => {
            console.log(err);
            setLoading(false);
            Toast.show({
              type: 'error',
              position: 'top',
              text1: 'Ops! Houve um problema',
              text2: err.response.data.error,
              visibilityTime: 4000,
              autoHide: true,
              topOffset: 200,
              bottomOffset: 40,
            });
          });
        setLoading(false);
      } catch (err) {
        setLoading(false);
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);

          formRef.current?.setErrors(errors);
          return;
        }

        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Ops! houve algum Erro!',
          text2: 'Verifique suas informações.',
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 200,
          bottomOffset: 10,
        });
      }
    },
    [navigation],
  );

  const loadAddress = useCallback(async (cep: string) => {
    if (cep.length === 8) {
      setLoadingCep(true);
      api
        .get(`address/getbycep/${cep}`)
        .then(res => {
          setLoadingCep(false);
          console.log(formRef);
          addressEdit.address = res.data.logradouro;
          console.log(res);
          // formRef.current?.setData({
          //   zipcode: cep,
          //   address: res.data.logradouro,
          //   district: res.data.bairro,
          //   city: res.data.localidade,
          //   state: res.data.uf,
          // });
          // formRef.current?.setFieldValue('zipcode', cep);
          // formRef.current?.setFieldValue('address', res.data.logradouro);
          // formRef.current?.setFieldValue('district', res.data.bairro);
          // formRef.current?.setFieldValue('city', res.data.localidade);
          // formRef.current?.setFieldValue('state', res.data.uf);
        })
        .catch(err => {
          setLoadingCep(false);
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Ops! Houve um problema',
            text2: err.response.data.error,
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 200,
            bottomOffset: 40,
          });
        });
    }
  }, []);

  const numberInputRef = useRef<TextInput>(null);
  const addressInputRef = useRef<TextInput>(null);
  const districtInputRef = useRef<TextInput>(null);
  const cityInputRef = useRef<TextInput>(null);
  const complementInputRef = useRef<TextInput>(null);
  const stateInputRef = useRef<TextInput>(null);
  const referenceInputRef = useRef<TextInput>(null);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Container>
            <BackButton onPress={handleGoBack}>
              <Icon name="chevron-left" size={24} />
            </BackButton>

            <Header>
              <Title> Editar endereço</Title>
              {loadingCep && <ActivityIndicator size="small" color="#000" />}
            </Header>

            <Form
              initialData={addressEdit}
              ref={formRef}
              onSubmit={handleCreate}>
              <Input
                name="zipcode"
                icon="navigation"
                placeholder="CEP"
                returnKeyType="send"
                onChangeText={text => {
                  loadAddress(text);
                }}
                onSubmitEditing={() => addressInputRef.current?.focus()}
              />
              <Input
                ref={addressInputRef}
                name="address"
                icon="map-pin"
                placeholder="Endereço"
                autoCapitalize="none"
                onSubmitEditing={() => numberInputRef.current?.focus()}
              />
              <Input
                ref={numberInputRef}
                name="number"
                icon="hash"
                placeholder="Número"
                autoCapitalize="none"
                onSubmitEditing={() => districtInputRef.current?.focus()}
              />
              <Input
                ref={districtInputRef}
                name="district"
                icon="map-pin"
                placeholder="Bairro"
                returnKeyType="next"
                onSubmitEditing={() => cityInputRef.current?.focus()}
              />
              <Input
                ref={cityInputRef}
                name="city"
                icon="map"
                placeholder="Cidade"
                returnKeyType="next"
                onSubmitEditing={() => complementInputRef.current?.focus()}
              />
              <Input
                ref={complementInputRef}
                name="complement"
                icon="more-horizontal"
                placeholder="Complemento"
                returnKeyType="send"
                onSubmitEditing={() => stateInputRef.current?.focus()}
              />
              <Input
                ref={stateInputRef}
                name="state"
                icon="map"
                placeholder="Estado"
                returnKeyType="send"
                onSubmitEditing={() => referenceInputRef.current?.focus()}
              />
              <Input
                ref={referenceInputRef}
                name="reference"
                icon="edit-2"
                placeholder="Referência... Ex: Casa, Trabalho"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
              {!loading ? (
                <Button
                  onPress={() => formRef.current?.submitForm()}
                  isLoading={false}>
                  Confirmar
                </Button>
              ) : (
                <ActivityIndicator size="large" color="#000" />
              )}
            </Form>
          </Container>
        </ScrollView>
        <RootToast />
      </KeyboardAvoidingView>
    </>
  );
};

export default EditAddress;
