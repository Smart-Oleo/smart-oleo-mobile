import styled from 'styled-components/native';
import {Platform} from 'react-native';
// import {getStatusBarHeight} from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 10}px;
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #000;
  margin: 24px 0;
  align-self: flex-start;
`;

export const UserAvatarButton = styled.TouchableOpacity``;
export const ButtonSignOut = styled.TouchableOpacity`
  margin-top: 60px;
  left: -10px;
  background-color: #2f4f4f;
  padding: 10px;
  width: 60px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const SignOutText = styled.Text`
  font-weight: bold;
  color: #fff;
`;

export const UserAvatar = styled.Image`
  width: 156px;
  height: 156px;
  border-radius: 98px;
  margin-top: 30px;
  align-self: center;
  border-color: #fafafa;
  border-width: 1px;
`;
