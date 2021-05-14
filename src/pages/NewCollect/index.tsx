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

interface CollectData {
  liters_oil: number;
  period_preference: string;
  observations: string;
  address_id: string;
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

        // setAddressOption([
        //   {value: res.data[i].id, label: res.data[i].address},
        // ]);

        console.log('aqui');
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleSubmit = useCallback(async (data: Object) => {
    formRef.current?.setErrors({});
  }, []);

  console.log(addressOption);

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
            onSubmit={() => {}}
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
              name="address"
              onOpen={loadAdresses}
              items={addressOption}
            />
            <Input
              name="observations"
              icon="message-circle"
              placeholder="Observações"
              autoCapitalize="none"
              keyboardType="numeric"
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
    </KeyboardAvoidingView>
  );
};

export default NewCollect;
