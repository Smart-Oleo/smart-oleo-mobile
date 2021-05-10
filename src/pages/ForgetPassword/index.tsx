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
// import {useAuth} from '../../hooks/auth';
// import Toast from 'react-native-toast-message';
// import RootToast from '../../components/Toast';
import {KeyboardAvoidingView, ScrollView, Platform} from 'react-native';
import * as Yup from 'yup';
import getValidationErros from '../../utils/getValidationErrors';
import Background from '../../components/Background';
import imageLogo from '../../assets/images/logo_horizontal.png';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

interface SignInFormData {
  email: string;
  password: string;
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  // const [loading, setLoading] = useState<boolean>(false);
  // const {signIn} = useAuth();

  const handleSignIn = useCallback(async (data: SignInFormData) => {
    // setLoading(true);
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

      // await signIn({
      //   email: data.email,
      //   password: data.password,
      // });
      // setLoading(false);
    } catch (err) {
      // setLoading(false);
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErros(err);

        formRef.current?.setErrors(errors);
        return;
      }

      // Toast.show({
      //   type: 'error',
      //   position: 'top',
      //   text1: 'Erro ao fazer o login!',
      //   text2: 'O email ou senha estão incorretos',
      //   visibilityTime: 4000,
      //   autoHide: true,
      //   topOffset: 200,
      //   bottomOffset: 40,
      // });
    }
  }, []);

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
                  <Label> EMAIL / TELEFONE </Label>
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
        <Icon name="arrow-left" size={20} color="#00c200" />
        <BackToSignInText> Voltar </BackToSignInText>
      </BackToSignIn>
    </>
  );
};

export default ForgotPassword;
