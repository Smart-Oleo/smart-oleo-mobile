import styled from 'styled-components/native';
import {colors, metrics} from '../../../styles/global';

export const Container = styled.View`
  background-color: ${colors.white};
  border-top-left-radius: ${metrics.secundaryRadius}px;
  border-top-right-radius: ${metrics.secundaryRadius}px;
  padding: 30px;
`;

export const ButtonHeader = styled.TouchableOpacity`
  height: 30px;
  width: 20px;
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const Title = styled.Text`
  font-size: 15px;
  color: ${colors.gray};
  align-self: flex-start;
  margin-bottom: 20px;
  margin-left: 8px;
`;

export const ButtonOptions = styled.TouchableOpacity`
  border: 1px solid ${colors.lightgray};
  width: 100%;
  height: 40px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 10px;
  margin: 6px;
`;

export const TextButton = styled.Text`
  font-size: 18px;
  color: ${colors.gray};
  font-weight: bold;
  margin-right: 5px;
`;
