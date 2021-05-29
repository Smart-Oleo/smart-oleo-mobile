import React, {useRef, useCallback, useState, useEffect} from 'react';
import {
  Container,
  Title,
  Description,
  UserAvatarButton,
  ProductPhoto,
  BackButton,
  Header,
  HeaderTitle,
  ContainerImage,
  ValuePoints,
  TitleDescription,
  MyWallet,
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
} from 'react-native';
import api from '../../services/api';
import {launchImageLibrary} from 'react-native-image-picker';
import getValidationErros from '../../utils/getValidationErrors';
import RNPickerSelect from '../../components/RNPickerSelect';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

interface ProfileFormData {
  name: string;
  last_name: string;
  cellphone: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

interface Select {
  value: string;
  label: string;
}

interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
  price_points: number;
  promotional_points: number;
  active: boolean;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}

const RescueProduct: React.FC = (...props: any) => {
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const {user, updateUser} = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<Product>();
  const [addressOption, setAddressOption] = useState<Select[]>([]);

  const [points, setPoints] = useState<number>(0);

  const loadProduct = useCallback(async () => {
    await api
      .get(`products/${props[0].route.params.id}`)
      .then(res => {
        console.log(res.data);
        setProduct(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [props]);

  const loadPoints = useCallback(async () => {
    await api
      .get('users/my-wallet')
      .then(res => {
        console.log(res.data);
        setPoints(res.data.points);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    loadProduct();
    loadPoints();
  }, []);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const loadAdresses = useCallback(async () => {
    await api
      .get('address/user')
      .then(res => {
        const arr: [{value: string; label: string}] = [{value: '', label: ''}];
        for (let i = 0; i < res.data.length; i++) {
          arr.push({
            value: res.data[i].id,
            label: res.data[i].address + ', ' + res.data[i].number,
          });
        }
        arr.splice(0, 1);
        setAddressOption(arr);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

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
            <Header>
              <BackButton onPress={handleGoBack}>
                <Icon name="chevron-left" size={24} />
              </BackButton>
              <HeaderTitle> Resgatar Produto </HeaderTitle>
              {/* {loadingCep && <ActivityIndicator size="small" color="#000" />} */}
            </Header>
            <ContainerImage>
              <ProductPhoto source={{uri: product?.image}} />
            </ContainerImage>

            <Title> {product?.title} </Title>
            <ValuePoints> {product?.price_points}</ValuePoints>

            <TitleDescription>
              Selecione a quantidade e o endereço de entrega e confirme o
              resgate.
            </TitleDescription>
            <Form
              ref={formRef}
              onSubmit={() => {}}
              // initialData={{user: pickerOptions[0].value}}
            >
              <Input
                name="quantity"
                icon="hash"
                placeholder="Quantidade"
                autoCapitalize="none"
                keyboardType="numeric"
              />
              <RNPickerSelect
                placeholder={{
                  label: 'Informe o endereço',
                  color: '#000',
                }}
                name="address_id"
                onOpen={loadAdresses}
                items={addressOption}
              />
            </Form>
            <Button
              onPress={() => formRef.current?.submitForm()}
              isLoading={false}>
              Confirmar
            </Button>
            <TitleDescription>
              Minha carteira: <MyWallet> {points} </MyWallet>
            </TitleDescription>

            <TitleDescription> Descrição do produto </TitleDescription>
            <Description> {product?.description} </Description>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default RescueProduct;
