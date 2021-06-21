import React from 'react';
import {Container, ButtonText, Content} from './styles';
import {RectButtonProperties} from 'react-native-gesture-handler';
import {ActivityIndicator} from 'react-native';
import {colors} from '../../styles/global';

interface ButtonProps extends RectButtonProperties {
  children: string;
  isLoading: boolean;
}

const Button: React.FC<ButtonProps> = ({children, isLoading, ...rest}) => (
  <Content colors={[colors.primary, colors.success]}>
    <Container {...rest} enabled={!isLoading}>
      {!isLoading ? (
        <ButtonText>{children}</ButtonText>
      ) : (
        <ActivityIndicator size="small" color={colors.white} />
      )}
    </Container>
  </Content>
);

export default Button;
