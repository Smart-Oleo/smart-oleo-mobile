import React, {useRef, useCallback, useState} from 'react';

import {
  Container,
  Content,
  Header,
  LogoImage,
  Text,
  BackToSignIn,
  BackToSignInText,
  Description,
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
import RootToast from '../../components/Toast';

import api from '../../services/api';
import {colors, metrics} from '../../styles/global';

interface FormCollector {
  name: string;
  email: string;
  cellphone: string;
}

const CollectorForm: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignUp = useCallback(async (data: FormCollector) => {
    setLoading(true);
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('O email deve ser informado'),
        cellphone: Yup.string().required('Sobrenome obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api
        .post('collectors/want', data)
        .then(() => {
          setLoading(false);
          Toast.show({
            type: 'success',
            position: 'top',
            text1: `Tudo certo, ${data.name}!`,
            text2: 'Nós entraremos em contato.',
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 200,
            bottomOffset: 40,
          });
          // Alert.alert(
          //   `Por favor ${res.data.user.name}, Verifique seu email/contato de confirmação`,
          // );
          // navigation.goBack();
        })
        .catch(err => {
          setLoading(false);
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
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Container>
            <Content>
              <Header>
                <LogoImage source={imageLogo} />
                <Text> Desejo ser um coletor </Text>
                <Description>
                  Informe os campos abaixos e aguarde nossa análise para ser um
                  de nossos coletores
                </Description>
              </Header>

              <Form ref={formRef} onSubmit={handleSignUp}>
                <Input
                  name="name"
                  icon="user"
                  placeholder="Primeiro nome"
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
                  name="cellphone"
                  icon="phone"
                  placeholder="Digite o celular"
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
        <RootToast />
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

export default CollectorForm;
