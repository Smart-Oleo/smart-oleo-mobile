import styled, {css} from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {colors, metrics} from '../../styles/global';

export interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const TextInput = styled.TextInput`
  color: ${colors.darkgray};
  font-size: 16px;
  flex: 1;
`;

export const ErrorMessage = styled.Text`
  color: ${colors.danger};
  font-size: 14px;
  margin: 4px;
`;

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0px 16px;
  background: ${colors.secundary};
  border-radius: ${metrics.secundaryRadius}px;
  margin: ${metrics.baseMargin}px 0px;

  display: flex;
  flex-direction: row;
  align-items: center;
  ${props =>
    props.isErrored &&
    css`
      border: 1px solid ${colors.danger};
    `};

  ${props =>
    props.isFocused &&
    css`
      border: 1px solid ${colors.gray};
    `};
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
