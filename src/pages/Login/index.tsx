import React, {useRef, useCallback, useState} from 'react';

import {
  Container,
  Content,
  Header,
  Description,
  LogoImage,
  Text,
  ViewBottom,
  ForgotPassword,
  CreateAccountButton,
  CreateAccountButtonText,
  FormContainer,
  CollectorInfo,
} from './styles';
import {Form} from '@unform/mobile';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {FormHandles} from '@unform/core';
import {useAuth} from '../../hooks/auth';
import Toast from 'react-native-toast-message';
import RootToast from '../../components/Toast';
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import * as Yup from 'yup';
import getValidationErros from '../../utils/getValidationErrors';
import imageLogo from '../../assets/images/logo_horizontal.png';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {colors, metrics} from '../../styles/global';

interface SignInFormData {
  login: string;
  password: string;
}

const Login: React.FC = () => {
  const navigation = useNavigation();
  const passwordInputRef = useRef<TextInput>(null);
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const {signIn} = useAuth();

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      setLoading(true);
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          login: Yup.string().required('Digite o email ou celular'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          login: data.login,
          password: data.password,
        });
        setLoading(false);
      } catch (err) {
        setLoading(false);
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErros(err);

          formRef.current?.setErrors(errors);
          return;
        }

        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Ops! revise suas credenciais',
          text2: 'O email ou senha estão incorretos',
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 200,
          bottomOffset: 40,
        });
      }
    },
    [signIn],
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flex: 1}}>
          <Container>
            <Content>
              <Header>
                <LogoImage source={imageLogo} />
                <Text> Entrar</Text>
                <Description>
                  Faça o login no Smart Oleo para começar a ajudar o meio
                  ambiente por meio do descarte correto de óleo vegetal.
                </Description>
              </Header>

              <FormContainer>
                <Form ref={formRef} onSubmit={handleSignIn}>
                  <Input
                    autoCorrect={false}
                    autoCapitalize="none"
                    icon="mail"
                    name="login"
                    placeholder="Digite o email ou telefone"
                    returnKeyType="next"
                    onSubmitEditing={() => passwordInputRef.current?.focus()}
                  />
                  <Input
                    ref={passwordInputRef}
                    name="password"
                    icon="lock"
                    placeholder="Informe a senha"
                    secureTextEntry
                    returnKeyType="send"
                    onSubmitEditing={() => formRef.current?.submitForm()}
                  />
                </Form>
                {!loading ? (
                  <Button
                    onPress={() => formRef.current?.submitForm()}
                    isLoading={false}>
                    Entrar
                  </Button>
                ) : (
                  <ActivityIndicator size="large" color={colors.primary} />
                )}

                <ViewBottom>
                  <ForgotPassword
                    onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text>Esqueci minha senha</Text>
                  </ForgotPassword>
                  <CollectorInfo
                    onPress={() => navigation.navigate('CollectorForm')}>
                    <Text>Quero ser um coletor</Text>
                  </CollectorInfo>
                </ViewBottom>
              </FormContainer>
            </Content>
          </Container>
        </ScrollView>

        <RootToast />
      </KeyboardAvoidingView>

      <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={metrics.iconSize} color={colors.success} />
        <CreateAccountButtonText> Criar Conta </CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
};

export default Login;
