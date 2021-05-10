import React from 'react';
import {Container, ButtonText} from './styles';
import {RectButtonProperties} from 'react-native-gesture-handler';
import {ActivityIndicator} from 'react-native';

interface ButtonProps extends RectButtonProperties {
  children: string;
  isLoading: boolean;
}

const Button: React.FC<ButtonProps> = ({children, isLoading, ...rest}) => (
  <Container {...rest} enabled={!isLoading}>
    {!isLoading ? (
      <ButtonText>{children}</ButtonText>
    ) : (
      <ActivityIndicator size="small" color="#FFFFFF" />
    )}
  </Container>
);

export default Button;
