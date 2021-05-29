import styled from 'styled-components/native';
import {Platform} from 'react-native';
// import {getStatusBarHeight} from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 10}px;
  margin-bottom: 20px;
`;

export const Header = styled.View`
  flex-direction: row;
  padding-top: 10px;
  border-color: #dcdcdc;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 50px;
  left: -10px;
`;

export const HeaderTitle = styled.Text`
  font-size: 20px;
  color: #000;
  margin: 24px 0;
  align-self: flex-start;
  font-weight: bold;
  margin-top: 50px;
`;

export const ContainerImage = styled.View`
  background-color: #fff;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #000;
  margin: 10px 0;
  font-weight: bold;
  align-self: flex-start;
`;

export const TitleDescription = styled.Text`
  font-size: 14px;
  color: #000;
  margin: 10px 0;
  font-weight: bold;
  align-self: flex-start;
`;

export const ValuePoints = styled.Text`
  font-size: 20px;
  color: #009e00;
  margin-bottom: 10px;
  font-weight: bold;
  align-self: flex-start;
`;

export const MyWallet = styled.Text`
  font-size: 16px;
  color: #009e00;
  margin-bottom: 10px;
  font-weight: bold;
  align-self: flex-start;
`;

export const Description = styled.Text`
  font-size: 14px;
  color: #000;
  margin-bottom: 10px;

  align-self: flex-start;
`;

export const ProductPhoto = styled.Image`
  width: 60%;
  height: 140px;
  margin-top: 10px;
  align-self: center;
`;
