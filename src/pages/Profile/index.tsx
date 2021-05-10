import React, {useRef} from 'react';
import {Container, Title, UserAvatarButton, UserAvatar} from './styles';
import {Form} from '@unform/mobile';
import Input from '../../components/Input';
import {FormHandles} from '@unform/core';
import Button from '../../components/Button';
import {useAuth} from '../../hooks/auth';
import {
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Platform,
} from 'react-native';

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const {user} = useAuth();

  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

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
            <UserAvatarButton>
              <UserAvatar source={{uri: user.photo}} />
            </UserAvatarButton>
            <Title> Meu perfil </Title>

            <Form ref={formRef} onSubmit={() => {}}>
              <Input
                name="name"
                icon="user"
                placeholder="Primeiro nome"
                autoCapitalize="none"
              />
              <Input
                name="last_name"
                icon="user"
                placeholder="Segundo nome"
                autoCapitalize="none"
                onSubmitEditing={() => emailInputRef.current?.focus()}
              />
              <Input
                name="email"
                icon="mail"
                placeholder="Digite o email"
                autoCorrect={false}
                autoCapitalize="none"
                onSubmitEditing={() => oldPasswordInputRef.current?.focus()}
              />
              <Input
                ref={oldPasswordInputRef}
                containerStyle={{marginTop: 16}}
                secureTextEntry
                name="old_password"
                icon="lock"
                placeholder="Senha atual"
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Nova senha"
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
              />
              <Input
                ref={confirmPasswordInputRef}
                secureTextEntry
                name="confirm_password"
                icon="lock"
                placeholder="Confirmar senha"
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
              <Button
                onPress={() => formRef.current?.submitForm()}
                isLoading={false}>
                Confirmar Alterações
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Profile;
