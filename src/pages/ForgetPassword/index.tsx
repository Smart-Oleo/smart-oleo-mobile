import React, {useRef, useCallback} from 'react';

import {
  Container,
  Content,
  Header,
  Description,
  Label,
  LogoImage,
  Text,
  BackToSignIn,
  BackToSignInText,
  FormContainer,
} from './styles';
import {Form} from '@unform/mobile';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {FormHandles} from '@unform/core';
import {KeyboardAvoidingView, ScrollView, Platform} from 'react-native';
import * as Yup from 'yup';
import getValidationErros from '../../utils/getValidationErrors';
import Background from '../../components/Background';
import imageLogo from '../../assets/images/logo_horizontal.png';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {colors, metrics} from '../../styles/global';

interface SignInFormData {
  email: string;
  password: string;
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const handleSignIn = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().required('Senha obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      // setLoading(false);
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErros(err);

        formRef.current?.setErrors(errors);
        return;
      }
    }
  }, []);

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
                <Text> Recuperar Senha </Text>
                <Description>
                  Informe seu email ou telefone cadastrado na plataforma para
                  recuperar a sua palavra chave
                </Description>
              </Header>
              <FormContainer>
                <Form ref={formRef} onSubmit={handleSignIn}>
                  <Text> EMAIL / TELEFONE </Text>
                  <Input
                    name="email"
                    icon="mail"
                    placeholder="Digite o email ou o telefone"
                    autoCorrect={false}
                    autoCapitalize="none"
                  />
                </Form>
                <Button
                  onPress={() => formRef.current?.submitForm()}
                  isLoading={false}>
                  Enviar
                </Button>
              </FormContainer>
            </Content>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <BackToSignIn onPress={() => navigation.navigate('Login')}>
        <Icon
          name="arrow-left"
          size={metrics.iconSize}
          color={colors.primary}
        />
        <BackToSignInText> Voltar </BackToSignInText>
      </BackToSignIn>
    </>
  );
};

export default ForgotPassword;
