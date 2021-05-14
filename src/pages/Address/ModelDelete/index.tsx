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

interface PropsModal {
  visible: boolean;
  onRequestClose: Function;
  item: Address;
  response: Function;
}

const ModalDelete: React.FC<PropsModal> = ({
  visible,
  onRequestClose,
  item,
  response,
}) => {
  const closeModal = useCallback(() => {
    onRequestClose();
  }, [onRequestClose]);

  const confirm = useCallback(() => {
    response();
  }, [response]);

  console.log(item);

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
        <ButtonOptions onPress={confirm}>
          <TextButton>
            Confirmar <Icon name="check" size={16} color="#a9a9a9" />{' '}
          </TextButton>
        </ButtonOptions>
        <ButtonOptions>
          <TextButton onPress={closeModal}>
            Cancelar <Icon name="cancel" size={16} color="#a9a9a9" />{' '}
          </TextButton>
        </ButtonOptions>
      </Container>
    </Modal>
  );
};

export default ModalDelete;
