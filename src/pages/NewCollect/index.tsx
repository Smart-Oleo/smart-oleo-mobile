import React, {useRef, useState} from 'react';
import {Container} from './styles';
import Input from '../../components/Input';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import RNPickerSelect from '../../components/RNPickerSelect';
import Button from '../../components/Button';

const NewCollect: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const pickerOptions = [
    {value: 'diego3g', label: 'Diego Fernandes'},
    {value: 'EliasGcf', label: 'Elias Gabriel'},
  ];

  return (
    <Container>
      <Form
        ref={formRef}
        onSubmit={() => {}}
        initialData={{user: pickerOptions[0].value}}>
        <Input
          name="name"
          icon="package"
          placeholder="Litros para coleta"
          autoCapitalize="none"
          keyboardType="numeric"
        />
        <RNPickerSelect name="user" items={pickerOptions} />
        <Button onPress={() => formRef.current?.submitForm()} isLoading={false}>
          Entrar
        </Button>
      </Form>
    </Container>
  );
};

export default NewCollect;
