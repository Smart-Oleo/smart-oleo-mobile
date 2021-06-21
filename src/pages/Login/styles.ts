import styled from 'styled-components/native';
import {Platform} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {colors, metrics} from '../../styles/global';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 20px ${Platform.OS === 'android' ? 120 : 100}px;
`;

export const ImageHeader = styled.Image`
  width: 100%;
  height: 60%;
  top: 0px;
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
  margin-top: 0px;
  margin-bottom: 14px;
`;

export const SubHeader = styled.View`
  justify-content: center;
  align-items: center;
  width: 139px;
  height: 64px;
`;

export const Description = styled.Text`
  font-style: normal;
  font-size: 12px;
  line-height: 20px;
  margin: 0px 5px;

  text-align: left;
  color: ${colors.gray};
`;

export const FormContainer = styled.View`
  justify-content: center;
`;

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
  font-size: 14px;
  font-weight: bold;
  color: ${colors.gray};
  margin-top: 12px;
`;

export const ViewBottom = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

export const ForgotPassword = styled.TouchableOpacity`
  align-self: center;
`;

export const CollectorInfo = styled.TouchableOpacity`
  align-self: center;
`;

export const CreateAccountButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0%;
  border-top-width: 1px;
  border-color: ${colors.secundary};
  padding: ${metrics.basePadding}px 0 ${10 + getBottomSpace()}px;
  background-color: ${colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const CreateAccountButtonText = styled.Text`
  color: ${colors.darkgray};
  font-size: 16px;
  font-weight: 500;
  margin-left: 5px;
`;
