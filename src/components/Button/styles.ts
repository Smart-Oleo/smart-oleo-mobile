import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {metrics, colors} from '../../styles/global';

export const Container = styled(RectButton)`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 60px;
  border-radius: ${metrics.secundaryRadius}px;
  background-color: transparent;
`;

export const ButtonText = styled.Text`
  color: ${colors.secundary};
  font-size: 18px;
  font-weight: 600;
`;

export const Content = styled(LinearGradient)`
  width: 100%;
  height: 60px;
  margin: ${metrics.baseMargin}px 0px;
  border-radius: ${metrics.secundaryRadius}px;
`;
