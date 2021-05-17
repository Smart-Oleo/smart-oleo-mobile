import styled, {css} from 'styled-components/native';

export interface ContainerProps {
  // isFocused: boolean;
  // isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 50px;
  padding: 0 16px;
  background: #fff;
  border: 2px solid #000;
  border-width: 0.4px;

  border-radius: 10px;
  margin-bottom: 8px;
  justify-content: center;

  ${props =>
    props.isErrored &&
    css`
      border: 1px solid red;
    `};
`;

export const ErrorMessage = styled.Text`
  color: #ff377f;
  font-size: 14px;
  margin: 4px;
`;
