import React from 'react';
import RNModal from 'react-native-modal';
import {KeyboardAvoidingView} from 'react-native';

interface ModalProps {
  visible: boolean;
}

const Modal: React.FC<ModalProps> = ({visible, children}) => {
  return (
    <RNModal
      style={{justifyContent: 'flex-end', margin: 0}}
      isVisible={visible}>
      <KeyboardAvoidingView>{children}</KeyboardAvoidingView>
    </RNModal>
  );
};

export default Modal;
