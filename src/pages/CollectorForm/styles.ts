import styled from 'styled-components/native';
import {Platform} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {colors} from '../../styles/global';

export const Container = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 10px ${Platform.OS === 'android' ? 120 : 40}px;
  margin-bottom: ${Platform.OS === 'android' ? 0 : 60}px;
`;

export const ImageFooter = styled.Image`
  width: 100%;
  height: 40%;
  bottom: 0px;
`;

export const Content = styled.View`
  width: 90%;
`;

export const Header = styled.View`
  margin-top: 100px;
  margin-bottom: 20px;
`;

export const Description = styled.Text`
  font-style: normal;
  font-size: 12px;
  line-height: 20px;
  margin: 0px 5px;

  text-align: left;

  color: ${colors.gray};
`;

export const Label = styled.Text`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 48px;
  display: flex;
  align-items: center;
  color: #383e71;
  margin-left: 10px;
`;

export const FormContainer = styled.View``;

export const LogoImage = styled.Image`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;

  height: 100px;
  width: 280px;
  margin-bottom: 20px;
`;

export const Text = styled.Text`
  color: ${colors.gray};
  font-size: 16px;
  font-weight: 500;
  margin: 10px 0px;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const ForgotPasswordText = styled.Text`
  color: #232129;
  font-size: 16px;
`;

export const BackToSignIn = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0%;
  background: #fff;
  border-top-width: 1px;
  border-color: #f4ede8;
  padding: 16px 0 ${8 + getBottomSpace()}px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const BackToSignInText = styled.Text`
  color: ${colors.darkgray};
  font-size: 16px;
  font-weight: 500;
  margin-left: 5px;
`;
