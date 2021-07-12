import React, {useRef, useCallback, useState} from 'react';
import {
  Container,
  Title,
  UserAvatarContainer,
  UserAvatarButton,
  UserAvatar,
  ButtonSignOut,
  SignOutText,
} from './styles';
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
  View,
  ActivityIndicator,
} from 'react-native';
import api from '../../services/api';
import {launchImageLibrary} from 'react-native-image-picker';
import getValidationErros from '../../utils/getValidationErrors';
import {android, colors, metrics} from '../../styles/global';
import Icon from 'react-native-vector-icons/Feather';
interface ProfileFormData {
  name: string;
  last_name: string;
  cellphone: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const {user, updateUser, signOut} = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingImage, setImageLoading] = useState<boolean>(false);

  const lastNameInputRef = useRef<TextInput>(null);
  const cellphoneInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);

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
          email: Yup.string().email('Email incorreto!'),
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
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          last_name,
          cellphone,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };
        await api
          .put('users', formData)
          .then(resp => {
            updateUser(resp.data.user);
          })
          .catch(err => {
            Alert.alert(
              err.response.data.error
                ? err.response.data.error
                : 'Ops! Houve algum problema',
            );
          });

        setLoading(false);
        Alert.alert('Perfil atualizado com sucesso!');
      } catch (err) {
        setLoading(false);
        const errors = getValidationErros(err);

        formRef.current?.setErrors(errors);
        return;
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
      async response => {
        if (response.didCancel) {
          return;
        }
        if (response.errorMessage) {
          Alert.alert('Erro ao atualizar imagem');
        }

        const source = {uri: response.uri};

        const data = new FormData();

        setImageLoading(true);
        data.append('avatar', {
          type: 'image/jpg',
          name: `${user.id}`,
          uri: source.uri,
        });

        await api
          .patch('users/avatar', data)
          .then(res => {
            console.log('Tô aquiiiii');
            updateUser(res.data.user);
            setImageLoading(false);
          })
          .catch(err => console.log(err));

        setImageLoading(false);

        console.log(source.uri);
      },
    );
  }, [updateUser, user.id]);
  console.log(user);
  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: colors.white}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Container>
            <UserAvatarContainer
              style={{
                backgroundColor: Platform.OS === 'android' && 'transparent',
              }}>
              {loadingImage ? (
                <View
                  style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    alignSelf: 'flex-start',
                  }}>
                  <ActivityIndicator size="small" color={colors.primary} />
                </View>
              ) : (
                <UserAvatarButton
                  onPress={handleUpdateAvatar}
                  style={{
                    borderRadius: 100,
                    ...Platform.select({
                      android,
                    }),
                    backgroundColor: Platform.OS === 'android' && 'transparent',
                  }}>
                  {user.photo === null ? (
                    <UserAvatar
                      source={require('../../assets/images/ic_launcher.png')}
                    />
                  ) : (
                    <UserAvatar source={{uri: user.photo}} />
                  )}
                </UserAvatarButton>
              )}
              <ButtonSignOut onPress={signOut}>
                <Icon
                  style={{marginRight: 5}}
                  name="log-out"
                  size={metrics.iconSize - 6}
                  color={colors.success}
                />
                <SignOutText>Sair</SignOutText>
              </ButtonSignOut>
            </UserAvatarContainer>

            <Form initialData={user} ref={formRef} onSubmit={handleUpdate}>
              <Title> Meu perfil </Title>
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
                onSubmitEditing={() => emailInputRef.current?.focus()}
              />
              <Input
                ref={emailInputRef}
                name="email"
                icon="mail"
                placeholder="Informe o email"
                editable={false}
                style={{opacity: 0.4}}
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
                isLoading={loading}>
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
