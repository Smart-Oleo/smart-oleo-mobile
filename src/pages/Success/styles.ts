import styled from 'styled-components/native';
import {Platform} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const ContainerSuccess = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 60px;
  left: -10px;
`;

export const ContainerIcon = styled.View`
  padding: 10px;
  border-radius: 50px;
  background-color: #04d361;
`;

export const Title = styled.Text`
  font-size: 28px;
  color: #000;
  margin-top: 20px;
  text-align: center;
`;

export const Description = styled.Text`
  color: #000;
  font-size: 18px;
  margin-top: 16px;
`;

export const ConfirmButton = styled(RectButton)`
  background: #04d361;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 24px;
  padding: 12px 24px;
`;

export const ConfirmButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;
