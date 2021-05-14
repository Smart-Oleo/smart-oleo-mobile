import styled from 'styled-components/native';
import {Platform} from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 10}px;
  margin-top: 100px;
`;

// flex: 1;
// align-items: center;
// justify-content: center;

// margin-bottom: ${Platform.OS === 'android' ? 0 : 60}px;
export const LogoImage = styled.Image`
  height: 70px;
  width: 210px;
  align-self: center;
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #000;
  margin: 24px 0;
  align-self: flex-start;
`;
