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
import {colors, metrics} from '../../../styles/global';

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

  const removeOption = useCallback(
    (item: Address) => {
      console.log('ANNNNN', item);
      requestDelete(item);
    },
    [requestDelete],
  );

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
            color={colors.gray}
          />
        </ButtonHeader>
        <Title>
          {item?.address}, {item?.number}
        </Title>
        <ButtonOptions onPress={navigateEditAddress}>
          <TextButton>Editar</TextButton>
          <Icon name="edit-2" size={metrics.iconSize - 5} color={colors.gray} />
        </ButtonOptions>
      </Container>
    </Modal>
  );
};

export default ModalOptions;
