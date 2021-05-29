import React, {useCallback, useRef, useState} from 'react';
import Modal from '../../../components/Modal';
import {
  Container,
  Title,
  ButtonOptions,
  TextButton,
  ButtonHeader,
} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import RNPickerSelect from '../../../components/RNPickerSelect';
import {Form} from '@unform/mobile';
import Input from '../../../components/Input';
import {FormHandles} from '@unform/core';
import api from '../../../services/api';
import Button from '../../../components/Button';

interface PropsModal {
  visible: boolean;
  onRequestClose: Function;
  requestDelete: Function;
  item: Object;
}

interface Select {
  value: string;
  label: string;
}

const ModalRescue: React.FC<PropsModal> = ({
  visible,
  onRequestClose,
  item,
  requestDelete,
}) => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const [addressOption, setAddressOption] = useState<Select[]>([]);
  const closeModal = useCallback(() => {
    onRequestClose();
  }, [onRequestClose]);

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

  // const removeOption = useCallback(
  //   (item: Address) => {
  //     requestDelete(item);
  //   },
  //   [requestDelete],
  // );

  // const navigateEditAddress = useCallback(() => {
  //   onRequestClose();
  //   navigation.navigate('EditAddress', {address: item});
  // }, [onRequestClose, navigation, item]);

  return (
    <Modal visible={visible}>
      <Container>
        <ButtonHeader onPress={closeModal}>
          <Icon
            name="x"
            size={24}
            style={{position: 'absolute', right: 10, top: 0}}
          />
        </ButtonHeader>
        <Title>Fifa 2021</Title>
        <Form
          ref={formRef}
          onSubmit={() => {}}
          // initialData={{user: pickerOptions[0].value}}
        >
          <Input
            name="quantity"
            icon="hash"
            placeholder="Quantidade"
            autoCapitalize="none"
            keyboardType="numeric"
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
        </Form>
        <Button
          onPress={() => formRef.current?.submitForm()}
          // isLoading={false}
        >
          Confirmar
        </Button>
      </Container>
    </Modal>
  );
};

export default ModalRescue;
