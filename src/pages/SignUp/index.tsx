import React, {useRef, useCallback, useState} from 'react';

import {
  Container,
  Content,
  Header,
  Label,
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
import Background from '../../components/Background';
import imageLogo from '../../assets/images/logo_horizontal.png';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

import api from '../../services/api';

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
          password: Yup.string().required('Senha obrigatória'),
          cellphone: Yup.string().required('Celular obrigatório'),
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
            Alert.alert(err.response.data.error);
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
        <Background
          fillOpacity={0.1}
          fill="#1EE494"
          style={{position: 'absolute', left: -64, top: 140}}
        />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Container>
            <Content>
              <Header>
                <LogoImage source={imageLogo} />
                <Text> Cadastro</Text>
                {/* <Description>
                  Informe seu email ou telefone cadastrado na plataforma para
                  recuperar a sua palavra chave
                </Description> */}
              </Header>

              <Form ref={formRef} onSubmit={handleSignUp}>
                <Label> NOME </Label>
                <Input
                  name="name"
                  icon="user"
                  placeholder="Primeiro nome"
                  autoCapitalize="none"
                />
                <Label> SOBRENOME </Label>
                <Input
                  name="last_name"
                  icon="user"
                  placeholder="Segundo nome"
                  autoCapitalize="none"
                />
                <Label> EMAIL </Label>
                <Input
                  name="email"
                  icon="mail"
                  placeholder="Digite o email"
                  autoCorrect={false}
                  autoCapitalize="none"
                />
                <Label> SENHA </Label>
                <Input
                  name="password"
                  icon="lock"
                  placeholder="*******"
                  secureTextEntry
                  autoCorrect={false}
                  autoCapitalize="none"
                />
                <Label> TELEFONE </Label>
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
                <ActivityIndicator size="large" color="#00c200" />
              )}
            </Content>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <BackToSignIn onPress={() => navigation.navigate('Login')}>
        <Icon name="arrow-left" size={20} color="#00c200" />
        <BackToSignInText> Voltar </BackToSignInText>
      </BackToSignIn>
    </>
  );
};

export default SignUp;
