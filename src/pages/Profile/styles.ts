import styled from 'styled-components/native';
import {Platform} from 'react-native';
import {colors, metrics} from '../../styles/global';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.white};
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 10}px;
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: ${colors.gray};
  margin: 24px 0;
  align-self: flex-start;
`;

export const UserAvatarContainer = styled.View`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;

  margin-top: ${Platform.OS === 'ios' ? 60 : 20}px;
  margin-bottom: 10px;
  width: 100%;
`;
export const UserAvatarButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: 0px 6px 16px ${colors.lightgray};
`;

export const UserAvatar = styled.Image`
  width: 90px;
  height: 90px;
  border-radius: ${metrics.baseRadius}px;
`;

export const ButtonSignOut = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  background-color: ${colors.white};
  padding: 10px;
  border-radius: 10px;
`;

export const SignOutText = styled.Text`
  font-weight: bold;
  color: ${colors.success};
  font-size: 15px;
  text-align: center;
  align-self: center;
`;
