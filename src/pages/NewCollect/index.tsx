import React, {useRef, useCallback, useState, useEffect} from 'react';
import {Container} from './../../styles/global/general';
import {
  Content,
  Title,
  LogoImage,
  ModalBox,
  SelectBottom,
  TextSelect,
  ModalBoxContainer,
  ModalHeader,
  SelectText,
  SelectItem,
  Hidden,
} from './styles';
import Input from '../../components/Input';
import {FormHandles} from '@unform/core';
import RNPickerSelect from '../../components/RNPickerSelect';
import Button from '../../components/Button';
import api from '../../services/api';
import imageLogo from '../../assets/images/logo_horizontal.png';
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
  Alert,
} from 'react-native';
import * as Yup from 'yup';
import getValidationErros from '../../utils/getValidationErrors';
import Toast from 'react-native-toast-message';
import RootToast from '../../components/Toast';
import {colors, metrics} from '../../styles/global';
import ArrowDown from '../../assets/images/arrow_down.png';
import ArrowUp from '../../assets/images/arrow_up.png';
import Icon from 'react-native-vector-icons/Feather';

interface CollectData {
  liters_oil: number;
  period_preference: string;
  address_id: string;
  observations: string;
}

interface Select {
  value: string;
  label: string;
}

interface ValueAddress {
  value: string;
  label: string;
}

interface ValuePreference {
  value: string;
  label: string;
}
const NewCollect: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [isOpenPreference, setIsOpenPreference] = useState(false);
  const [isOpenAddress, setIsOpenAddress] = useState(false);
  const [preference, setPreference] = useState<ValuePreference>(null);
  const [address, setAddress] = useState<ValueAddress>(null);
  const [addressOption, setAddressOption] = useState<Select[]>([]);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  const pickerOptions = [
    {value: 'morning', label: 'Manhã'},
    {value: 'evening', label: 'Tarde'},
    {value: 'night', label: 'Noite'},
  ];

  const loadAdresses = useCallback(async () => {
    console.log('caiu aqui');
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

  const handleSubmit = useCallback(async (data: CollectData) => {
    // console.log(data);
    // console.log(preference.value);
    // if (address.value === '') {
    //   Alert.alert('O endereço deve ser informado');
    // }

    // data.address_id = address.value;
    // data.period_preference = preference.value;

    // console.log(data);

    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        liters_oil: Yup.number()
          .integer('Deve ser um número inteiro')
          .moreThan(1, 'A quantidade deve ser maior que 1')
          .required('A quantidade é obrigatória'),
        period_preference: Yup.string().required(
          'O período deve ser informado',
        ),
        address_id: Yup.string().required('O Endereço deve ser informado'),
        observations: Yup.string(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      console.log(data);

      setLoadingSubmit(true);

      await api
        .post('collects', data)
        .then(res => {
          setLoadingSubmit(false);
          Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Tudo certo!',
            text2: `A coleta de nº ${res.data.collect_number} foi criada.`,
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 200,
            bottomOffset: 40,
          });
        })
        .catch(err => {
          setLoadingSubmit(false);
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

  useEffect(() => {
    loadAdresses();
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          backgroundColor: colors.white,
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Container>
            <Content
              ref={formRef}
              onSubmit={handleSubmit}
              initialData={{user: pickerOptions[0].value}}>
              <LogoImage source={imageLogo} />
              <Title> Crie uma nova coleta</Title>
              {Platform.OS === 'ios' ? (
                <>
                  <RNPickerSelect
                    name="period_preference"
                    placeholder={{
                      label: 'Informe o período de preferência',
                      color: colors.gray,
                    }}
                    items={pickerOptions}
                    Icon={() =>
                      isOpenPreference ? (
                        <Image source={ArrowUp} />
                      ) : (
                        <Image source={ArrowDown} />
                      )
                    }
                    onClose={() => setIsOpenPreference(false)}
                    onOpen={() => setIsOpenPreference(true)}
                    style={{
                      iconContainer: {
                        top: 6,
                        right: 10,
                      },
                      placeholder: {
                        color: colors.gray,
                        fontSize: 16,
                      },
                    }}
                  />
                  <RNPickerSelect
                    placeholder={{
                      label: 'Informe o endereço',
                      color: colors.gray,
                    }}
                    name="address_id"
                    onOpen={() => {
                      loadAdresses();
                      setIsOpenAddress(true);
                    }}
                    items={addressOption}
                    Icon={() =>
                      isOpenAddress ? (
                        <Image source={ArrowUp} />
                      ) : (
                        <Image source={ArrowDown} />
                      )
                    }
                    onClose={() => setIsOpenAddress(false)}
                    style={{
                      iconContainer: {
                        top: 6,
                        right: 10,
                      },
                      placeholder: {
                        color: colors.gray,
                        fontSize: 16,
                      },
                    }}
                  />
                </>
              ) : (
                <>
                  {/* <Hidden
                    name="period_preference"
                    defaultValue={preference?.value}
                  />
                  <Hidden
                    name="address_id"
                    vdefaultValuealue={address?.value}
                  /> */}
                  <RNPickerSelect
                    name="period_preference"
                    placeholder={{
                      label: 'Informe o período de preferência',
                      color: colors.darkBlue,
                    }}
                    items={pickerOptions}
                    style={{
                      placeholder: {
                        color: '#000',
                      },
                      inputAndroid: {
                        color: '#000',
                      },
                    }}
                  />
                  <RNPickerSelect
                    name="address_id"
                    placeholder={{
                      label: 'Informe o endereço',
                      color: colors.darkBlue,
                    }}
                    pickerProps={{
                      onAccessibilityAction: () => loadAdresses(),
                    }}
                    style={{
                      inputAndroid: {
                        color: '#000',
                      },
                      chevronDown: {
                        backgroundColor: '#000',
                      },
                    }}
                    // onDownArrow={() => loadAdresses()}
                    // onOpen={() => loadAdresses()}
                    items={addressOption}
                  />
                  {/* <SelectBottom
                    name="period_preference"
                    onPress={() => setIsOpenPreference(!isOpenPreference)}>
                    <TextSelect
                      style={{
                        color:
                          preference !== null
                            ? colors.darkgray
                            : colors.lightgray,
                      }}>
                      {preference === null
                        ? 'Selecione o período de preferência'
                        : preference?.label}
                    </TextSelect>
                    {isOpenPreference ? (
                      <Image source={ArrowUp} style={{marginRight: 8}} />
                    ) : (
                      <Image source={ArrowDown} style={{marginRight: 8}} />
                    )}
                  </SelectBottom> */}
                  {/* <SelectBottom
                    name="address_id"
                    onPress={() => {
                      setIsOpenAddress(!isOpenAddress);
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
                    {isOpenAddress ? (
                      <Image source={ArrowUp} style={{marginRight: 8}} />
                    ) : (
                      <Image source={ArrowDown} style={{marginRight: 8}} />
                    )}
                  </SelectBottom> */}
                </>
              )}
              <Input
                name="liters_oil"
                icon="package"
                placeholder="Litros para coleta"
                autoCapitalize="none"
                keyboardType="numeric"
              />
              <Input
                name="observations"
                icon="message-circle"
                placeholder="Observações"
                autoCapitalize="none"
                numberOfLines={4}
              />
              <Button
                onPress={() => formRef.current?.submitForm()}
                isLoading={loadingSubmit}>
                Confirmar
              </Button>
            </Content>
          </Container>
        </ScrollView>
        <RootToast />
      </KeyboardAvoidingView>
      {Platform.OS === 'android' && (
        <>
          {isOpenPreference && (
            <ModalBox
              isOpen={isOpenPreference}
              position="bottom"
              onClosed={setIsOpenPreference}
              keyboardTopOffset={0}
              swipeToClose
              backdropPressToClose={false}>
              <ModalBoxContainer>
                <ModalHeader onPress={() => setIsOpenPreference(false)}>
                  <Title>Selecione o período de preferência</Title>

                  <Image
                    source={ArrowDown}
                    style={{marginRight: 8, marginBottom: 5}}
                  />
                </ModalHeader>
                {pickerOptions.map(option => (
                  <SelectItem
                    key={option.value}
                    onPress={() => {
                      setPreference(option);
                      setIsOpenPreference(false);
                    }}>
                    <SelectText>{option.label}</SelectText>
                  </SelectItem>
                ))}
              </ModalBoxContainer>
            </ModalBox>
          )}
          {isOpenAddress && (
            <ModalBox
              isOpen={isOpenAddress}
              position="bottom"
              onClosed={setIsOpenAddress}
              keyboardTopOffset={0}
              swipeToClose
              backdropPressToClose={false}>
              <ModalBoxContainer>
                <ModalHeader onPress={() => setIsOpenAddress(false)}>
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
                      setAddress(option);
                      setIsOpenAddress(false);
                    }}>
                    <SelectText>{option.label}</SelectText>
                  </SelectItem>
                ))}
              </ModalBoxContainer>
            </ModalBox>
          )}
        </>
      )}
    </>
  );
};

export default NewCollect;
