import styled from 'styled-components/native';
import colors from './colors';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.white};
`;

export const Title = styled.Text`
  align-self: auto;
  text-align: auto;
  font-size: 18px;
  color: ${colors.darkgray};
  font-weight: 700;
`;

export const Text = styled.Text`
  align-self: auto;
  text-align: auto;
  font-size: 16px;
  color: ${colors.gray};
  font-weight: 600;
`;

export const Info = styled.Text`
  align-self: auto;
  text-align: auto;
  font-size: 14px;
  color: ${colors.lightgray};
  font-weight: 400;
`;
