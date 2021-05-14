import React, {useRef, useCallback, useState} from 'react';
import {Container, Title, UserAvatarButton, UserAvatar} from './styles';
import {Form} from '@unform/mobile';
import Input from '../../components/Input';
import {FormHandles} from '@unform/core';
import Button from '../../components/Button';
import {useAuth} from '../../hooks/auth';
import * as Yup from 'yup';
import {
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Platform,
  Alert,
} from 'react-native';
import api from '../../services/api';
import {launchImageLibrary} from 'react-native-image-picker';

interface ProfileFormData {
  name: string;
  last_name: string;
  cellphone: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const {user, updateUser} = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const lastNameInputRef = useRef<TextInput>(null);
  const cellphoneInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const handleUpdate = useCallback(
    async (data: ProfileFormData) => {
      setLoading(true);
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome Obrigatório!'),
          last_name: Yup.string().required('Sobrenome Obrigatório!'),
          cellphone: Yup.string()
            .max(11, 'O telefone deve conter 11 digitos')
            .min(11, 'O telefone deve conter 11 digitos')
            .required('Sobrenome Obrigatório!'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (val: any) => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (val: any) => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), null], 'Confirmação incorreta'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          last_name,
          cellphone,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          last_name,
          cellphone,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };
        const response = await api.put('users', formData);

        updateUser(response.data.user);

        setLoading(false);
        Alert.alert('Perfil atualizado com sucesso!');
      } catch (err) {
        setLoading(false);
        Alert.alert(err.response.data.error);
      }
    },
    [updateUser],
  );

  const handleUpdateAvatar = useCallback(async () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
      },
      response => {
        if (response.didCancel) {
          return;
        }
        if (response.errorMessage) {
          Alert.alert('Erro ao atualizar imagem');
        }

        const source = {uri: response.uri};

        console.log(source);
      },
    );
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: '#fff'}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Container>
            <UserAvatarButton onPress={handleUpdateAvatar}>
              <UserAvatar source={{uri: user.photo}} />
            </UserAvatarButton>
            <Title> Meu perfil </Title>

            <Form initialData={user} ref={formRef} onSubmit={handleUpdate}>
              <Input
                name="name"
                icon="user"
                placeholder="Primeiro nome"
                autoCapitalize="words"
                onSubmitEditing={() => lastNameInputRef.current?.focus()}
              />
              <Input
                ref={lastNameInputRef}
                name="last_name"
                icon="user"
                placeholder="Segundo nome"
                autoCapitalize="none"
                onSubmitEditing={() => cellphoneInputRef.current?.focus()}
              />
              <Input
                ref={cellphoneInputRef}
                name="cellphone"
                icon="phone"
                placeholder="Digite o telefone"
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
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Nova senha"
                returnKeyType="next"
                onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
              />
              <Input
                ref={confirmPasswordInputRef}
                secureTextEntry
                name="password_confirmation"
                icon="lock"
                placeholder="Confirmar senha"
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
