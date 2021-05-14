import React, {useCallback} from 'react';
import Modal from '../../../components/Modal';
import {
  Container,
  Title,
  ButtonOptions,
  TextButton,
  ButtonHeader,
} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import {Address} from '..';
import {useNavigation} from '@react-navigation/native';

interface PropsModal {
  visible: boolean;
  onRequestClose: Function;
  item: Address;
  requestDelete: Function;
}

const ModalOptions: React.FC<PropsModal> = ({
  visible,
  onRequestClose,
  item,
  requestDelete,
}) => {
  const navigation = useNavigation();
  const closeModal = useCallback(() => {
    onRequestClose();
  }, [onRequestClose]);

  const removeOption = useCallback(() => {
    requestDelete();
  }, [requestDelete]);

  const navigateEditAddress = useCallback(() => {
    onRequestClose();
    navigation.navigate('EditAddress', {address: item});
  }, [onRequestClose, navigation, item]);

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
        <Title>
          {item?.address}, {item?.number} 📌
        </Title>
        <ButtonOptions onPress={navigateEditAddress}>
          <TextButton>
            Editar <Icon name="edit-2" size={16} color="#a9a9a9" />{' '}
          </TextButton>
        </ButtonOptions>
        <ButtonOptions onPress={removeOption}>
          <TextButton>
            Remover <Icon name="trash" size={16} color="#a9a9a9" />{' '}
          </TextButton>
        </ButtonOptions>
      </Container>
    </Modal>
  );
};

export default ModalOptions;
