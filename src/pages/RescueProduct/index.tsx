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
  ContainerTitle,
  Card,
  CardBody,
  ViewInfo,
  ContainerView,
  ContainerBody,
  BottomInfo,
  Hr,
  SelectBottom,
  TextSelect,
  ModalBox,
  ModalBoxContainer,
  ModalHeader,
  SelectItem,
  SelectText,
} from './styles';
import {Form} from '@unform/mobile';
import Input from '../../components/Input';
import {FormHandles} from '@unform/core';
import Button from '../../components/Button';
import {useAuth} from '../../hooks/auth';
import * as Yup from 'yup';
import {KeyboardAvoidingView, ScrollView, Platform, Image} from 'react-native';
import api from '../../services/api';
import getValidationErros from '../../utils/getValidationErrors';
import RNPickerSelect from '../../components/RNPickerSelect';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import NumericInput from 'react-native-numeric-input';
import Toast from 'react-native-toast-message';
import RootToast from '../../components/Toast';
import {colors, metrics} from '../../styles/global';
import Eye from '../../assets/images/eye.png';
import EyeClosed from '../../assets/images/eye_closed.png';
import Paper from '../../assets/images/paper.png';
import Wallet from '../../assets/images/wallet.png';
import ArrowDown from '../../assets/images/arrow_down.png';
import ArrowUp from '../../assets/images/arrow_up.png';

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
  const [isOpenDetails, setIsOpenDetails] = useState<boolean>(false);
  const [isOpenAdress, setIsOpenAdress] = useState<boolean>(false);
  const [points, setPoints] = useState<number>(0);
  const [address, setAddress] = useState(null);

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
        destination_id: Yup.string().required('O endereço deve ser informado'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api
        .post('user-products', data)
        .then(res => {
          loadPoints();
          Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Tudo certo!',
            text2: 'Aguarde o envio do produto',
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 200,
            bottomOffset: 40,
          });
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Ops! Houve um problema.',
            text2: err.response.data.error
              ? err.response.data.error
              : 'Ops! Houve algum problema',
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 200,
            bottomOffset: 40,
          });
        });
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
        style={{flex: 1, backgroundColor: colors.secundary}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Container>
            <Header>
              <BackButton onPress={handleGoBack}>
                <Icon
                  name="chevron-left"
                  size={metrics.iconSize}
                  color={colors.gray}
                />
                <HeaderTitle> Resgatar Produto </HeaderTitle>
              </BackButton>
            </Header>
            <Card>
              <ContainerImage>
                <ProductPhoto source={{uri: product?.image}} />
              </ContainerImage>
              <CardBody>
                <ContainerTitle>
                  <Title style={{width: '85%'}} numberOfLines={1}>
                    {' '}
                    {product?.title}{' '}
                  </Title>
                  <ValuePoints> {product?.price_points}</ValuePoints>
                  <Icon
                    name="droplet"
                    size={metrics.iconSize - 12}
                    color={colors.success}
                  />
                </ContainerTitle>
                <ContainerBody>
                  <BottomInfo onPress={() => setIsOpenDetails(!isOpenDetails)}>
                    {isOpenDetails ? (
                      <Image source={Eye} style={{marginRight: 5}} />
                    ) : (
                      <Image source={EyeClosed} style={{marginRight: 5}} />
                    )}
                    <MyWallet>Detalhes </MyWallet>
                  </BottomInfo>
                  <ContainerView>
                    <ViewInfo>
                      <Image source={Paper} style={{marginRight: 5}} />
                      <MyWallet>Minha carteira: {points} </MyWallet>
                    </ViewInfo>
                    <ViewInfo>
                      <Image source={Wallet} style={{marginRight: 5}} />
                      <MyWallet>Total: {points} </MyWallet>
                    </ViewInfo>
                  </ContainerView>
                </ContainerBody>
                {isOpenDetails && (
                  <>
                    <Hr />
                    <TitleDescription> Descrição do produto </TitleDescription>
                    <Description>{product?.description} </Description>
                  </>
                )}
              </CardBody>
            </Card>
            <Hr />
            <TitleDescription>
              Selecione o endereço e a quantidade {'\n'}para confirmar o seu
              resgate.
            </TitleDescription>

            <Form
              ref={formRef}
              onSubmit={handleSubmit}
              // initialData={{user: pickerOptions[0].value}}
            >
              <ContainerBody>
                <NumericInput
                  value={quantity}
                  type="plus-minus"
                  totalWidth={100}
                  totalHeight={35}
                  minValue={1}
                  iconSize={22}
                  valueType="integer"
                  maxValue={10}
                  rounded
                  containerStyle={{
                    marginTop: 10,
                    marginBottom: 10,

                    borderWidth: 0.5,
                  }}
                  inputStyle={{
                    borderWidth: 0.2,
                    backgroundColor: colors.white,
                    borderColor: colors.lightgray,
                  }}
                  separatorWidth={0.5}
                  borderColor={colors.lightgray}
                  onChange={value => {
                    setQuantity(value);
                  }}
                  editable={false}
                />

                {Platform.OS === 'ios' ? (
                  <RNPickerSelect
                    placeholder={{
                      label: 'Selecione o endereço',
                      color: colors.gray,
                    }}
                    name="destination_id"
                    items={addressOption}
                    Icon={() =>
                      isOpenAdress ? (
                        <Image source={ArrowUp} />
                      ) : (
                        <Image source={ArrowDown} />
                      )
                    }
                    onClose={() => setIsOpenAdress(false)}
                    onOpen={() => {
                      loadAdresses();
                      setIsOpenAdress(true);
                    }}
                    style={{
                      viewContainer: {
                        backgroundColor: colors.white,
                        borderRadius: 5,
                        width: '70%',
                        height: 35,
                        justifyContent: 'center',
                        top: 4,
                      },
                      iconContainer: {
                        top: 6,
                        right: 10,
                      },
                      placeholder: {
                        color: colors.gray,
                        fontSize: 16,
                      },
                      inputIOSContainer: {
                        marginLeft: 10,
                      },
                    }}
                  />
                ) : (
                  <SelectBottom
                    onPress={() => {
                      setIsOpenAdress(!isOpenAdress);
                      loadAdresses();
                    }}>
                    <TextSelect
                      style={{
                        color:
                          address !== null ? colors.darkgray : colors.lightgray,
                      }}>
                      {address === null
                        ? 'Selecione o endereço'
                        : address.label}
                    </TextSelect>
                    {isOpenAdress ? (
                      <Image source={ArrowUp} style={{marginRight: 2}} />
                    ) : (
                      <Image source={ArrowDown} style={{marginRight: 2}} />
                    )}
                  </SelectBottom>
                )}
              </ContainerBody>
            </Form>
            <Hr />
            {!(
              product?.price_points && product?.price_points * quantity > points
            ) && (
              <Button
                enabled={
                  !!(
                    product?.price_points &&
                    !(product?.price_points * quantity > points)
                  )
                }
                activeOpacity={
                  product?.price_points &&
                  !(product?.price_points * quantity > points)
                    ? 0.6
                    : 1
                }
                onPress={() => formRef.current?.submitForm()}
                isLoading={false}>
                Confirmar
              </Button>
            )}

            {product?.price_points &&
              product?.price_points * quantity > points && (
                <AlertMessage>
                  {' '}
                  Atenção: {'\n'} Você não tem saldo suficiente.{' '}
                </AlertMessage>
              )}

            {isOpenAdress && Platform.OS === 'android' && (
              <ModalBox
                isOpen={isOpenAdress}
                position="bottom"
                onClosed={setIsOpenAdress}
                keyboardTopOffset={0}
                swipeToClose
                backdropPressToClose={false}>
                <ModalBoxContainer>
                  <ModalHeader onPress={() => setIsOpenAdress(false)}>
                    <Title>Selecione o endereço</Title>

                    <Image
                      source={ArrowDown}
                      style={{marginRight: 8, marginBottom: 5}}
                    />
                  </ModalHeader>
                  {addressOption.map(option => (
                    <SelectItem
                      key={option.value}
                      onPress={() => {
                        console.log(option);
                        setAddress(option);
                        setIsOpenAdress(false);
                      }}>
                      <SelectText>{option.label}</SelectText>
                    </SelectItem>
                  ))}
                </ModalBoxContainer>
              </ModalBox>
            )}
          </Container>
        </ScrollView>
        <RootToast />
      </KeyboardAvoidingView>
    </>
  );
};

export default RescueProduct;
