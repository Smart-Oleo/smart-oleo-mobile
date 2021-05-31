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
  AlertMessage,
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
import NumericInput from 'react-native-numeric-input';

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

interface Data {
  quantity: number;
  product_id: string;
  destination_id: string;
}

const RescueProduct: React.FC = (...props: any) => {
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const {user, updateUser} = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<Product>();
  const [addressOption, setAddressOption] = useState<Select[]>([]);
  const [quantity, setQuantity] = useState<number>(1);

  const [points, setPoints] = useState<number>(0);

  const loadProduct = useCallback(async () => {
    await api
      .get(`products/${props[0].route.params.id}`)
      .then(res => {
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

  const handleSubmit = useCallback(async (data: Data) => {
    data.quantity = quantity;
    data.product_id = props[0].route.params.id;
    try {
      formRef.current?.setErrors({});

      // data.liters_oil = parseInt(data.liters_oil);

      const schema = Yup.object().shape({
        quantity: Yup.number()
          .integer('Deve ser um número inteiro')
          .moreThan(0, 'A quantidade deve ser maior que 1')
          .required('O campo é obrigatório'),
        product_id: Yup.string().required('O produto deve ser informado'),
        address_id: Yup.string().required('O endereço deve ser informado'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      console.log(data);

      await api
        .post('user-products', data)
        .then(res => {
          navigation.navigate('Success', {
            message: 'Endereço cadastrado.',
          });
        })
        .catch(err => {});
    } catch (err) {
      const errors = getValidationErros(err);

      formRef.current?.setErrors(errors);
      return;
    }
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
              onSubmit={handleSubmit}
              // initialData={{user: pickerOptions[0].value}}
            >
              <NumericInput
                value={quantity}
                type="plus-minus"
                totalWidth={100}
                totalHeight={36}
                minValue={1}
                iconSize={22}
                valueType="real"
                maxValue={10}
                rounded
                containerStyle={{marginTop: 10, marginBottom: 10}}
                onChange={value => {
                  setQuantity(value);
                }}
              />
              {/* <Input
                name="quantity"
                icon="hash"
                placeholder="Quantidade"
                autoCapitalize="none"
                keyboardType="numeric"
              /> */}
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
              enabled={
                !!(
                  product?.price_points &&
                  product?.price_points * quantity > points
                )
              }
              onPress={() => formRef.current?.submitForm()}
              isLoading={false}>
              Confirmar
            </Button>
            {product?.price_points &&
              product?.price_points * quantity > points && (
                <AlertMessage>
                  {' '}
                  Atenção: Você não tem saldo suficiente.{' '}
                </AlertMessage>
              )}

            <TitleDescription>
              Minha carteira: <MyWallet> {points} </MyWallet>
            </TitleDescription>

            <TitleDescription>
              Total: <MyWallet> {points} </MyWallet>
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
