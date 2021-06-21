import styled, {css} from 'styled-components/native';
import {colors, metrics} from '../../styles/global';

export interface ContainerProps {
  // isFocused: boolean;
  // isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: ${colors.secundary};
  border: none;

  border-radius: 10px;
  margin-bottom: ${metrics.baseMargin}px;
  justify-content: center;

  ${props =>
    props.isErrored &&
    css`
      border: 1px solid ${colors.danger};
    `};
`;

export const ErrorMessage = styled.Text`
  color: ${colors.danger};
  font-size: 14px;
  margin: 4px;
`;
