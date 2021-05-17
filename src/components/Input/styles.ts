import styled, {css} from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const TextInput = styled.TextInput`
  color: #000;
  font-size: 16px;
  flex: 1;
`;

export const ErrorMessage = styled.Text`
  color: #ff377f;
  font-size: 14px;
  margin: 4px;
`;

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #fafafa;
  border-radius: 10px;
  margin-bottom: 8px;

  flex-direction: row;
  align-items: center;
  ${props =>
    props.isErrored &&
    css`
      border: 1px solid red;
    `};

  ${props =>
    props.isFocused &&
    css`
      border: 1px solid #4b0082;
    `};
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
