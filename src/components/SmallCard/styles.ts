import styled from 'styled-components/native';
import {colors, metrics} from '../../styles/global';
import LinearGradient from 'react-native-linear-gradient';

export const Content = styled(LinearGradient)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  width: 30%;
  height: 100%;
  padding: ${metrics.basePadding}px 10px;
  border-top-right-radius: ${metrics.secundaryRadius}px;
  border-bottom-right-radius: ${metrics.secundaryRadius}px;
`;

export const Title = styled.Text`
  color: ${colors.white};
  font-size: 25px;
  font-weight: bold;
  margin-right: 12px;
`;
