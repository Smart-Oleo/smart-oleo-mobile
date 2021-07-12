import React, {useRef, useCallback, useState} from 'react';

import {
  Container,
  Content,
  Header,
  LogoImage,
  Text,
  BackToSignIn,
  BackToSignInText,
} from './styles';
import {Form} from '@unform/mobile';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {FormHandles} from '@unform/core';
// import {useAuth} from '../../hooks/auth';
import Toast from 'react-native-toast-message';
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as Yup from 'yup';
import getValidationErros from '../../utils/getValidationErrors';
import imageLogo from '../../assets/images/logo_horizontal.png';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

import api from '../../services/api';
import {colors, metrics} from '../../styles/global';

interface SignInFormData {
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignUp = useCallback(
    async (data: SignInFormData) => {
      setLoading(true);
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          last_name: Yup.string().required('Sobrenome obrigatório'),
          email: Yup.string().email('Digite um e-mail válido'),
          password: Yup.string()
            .min(6, 'A senha deve ter no mínimo 6 caracteres')
            .required('A senha é obrigatória'),
          confirm_password: Yup.string()
            .required()
            .oneOf([Yup.ref('password'), null], 'Confirmação incorreta'),
          cellphone: Yup.string()
            .min(11, 'Deve conter 11 caracteres')
            .max(11, 'Deve conter 11 caracteres')
            .required('Celular obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api
          .post('users', data)
          .then(res => {
            setLoading(false);
            Alert.alert(
              `Por favor ${res.data.user.name}, Verifique seu email/contato de confirmação`,
            );
            navigation.goBack();
          })
          .catch(err => {
            setLoading(false);
            console.log(err.response);
            Alert.alert(
              err.response.data.error
                ? err.response.data.error
                : 'Ops! Houve algum problema',
            );
          });
      } catch (err) {
        setLoading(false);
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);

          formRef.current?.setErrors(errors);
          return;
        }

        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Erro ao fazer o login!',
          text2: 'O email ou senha estão incorretos',
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 200,
          bottomOffset: 10,
        });
      }
    },
    [navigation],
  );

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
            <Content>
              <Header>
                <LogoImage source={imageLogo} />
                <Text> Cadastro</Text>
              </Header>

              <Form ref={formRef} onSubmit={handleSignUp}>
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
                />
                <Input
                  name="email"
                  icon="mail"
                  placeholder="Digite o email"
                  autoCorrect={false}
                  autoCapitalize="none"
                />
                <Input
                  name="password"
                  icon="lock"
                  placeholder="Informe a senha"
                  secureTextEntry
                  autoCorrect={false}
                  autoCapitalize="none"
                />
                <Input
                  name="confirm_password"
                  icon="lock"
                  placeholder="Confirme sua senha"
                  secureTextEntry
                  autoCorrect={false}
                  autoCapitalize="none"
                />
                <Input
                  name="cellphone"
                  icon="phone"
                  placeholder="Informe o número"
                  autoCapitalize="none"
                />
              </Form>
              {!loading ? (
                <Button
                  onPress={() => formRef.current?.submitForm()}
                  isLoading={false}>
                  Confirmar
                </Button>
              ) : (
                <ActivityIndicator size="large" color={colors.primary} />
              )}
            </Content>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <BackToSignIn onPress={() => navigation.navigate('Login')}>
        <Icon
          name="arrow-left"
          size={metrics.iconSize}
          color={colors.success}
        />
        <BackToSignInText> Voltar </BackToSignInText>
      </BackToSignIn>
    </>
  );
};

export default SignUp;
