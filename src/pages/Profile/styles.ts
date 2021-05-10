import styled from 'styled-components/native';
import {Platform} from 'react-native';
// import {getStatusBarHeight} from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 10}px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #000;
  margin: 24px 0;
  align-self: flex-start;
`;

export const UserAvatarButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: 156px;
  height: 156px;
  border-radius: 98px;
  margin-top: 64px;
  align-self: center;
  border-color: #fafafa;
  border-width: 1px;
`;
