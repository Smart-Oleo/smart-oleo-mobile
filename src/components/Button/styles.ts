import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 100%;
  height: 50px;
  background: #009e00;
  border-radius: 10px;

  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #fafafa;
  font-size: 18px;
`;
// export const ButtonText = styled.Text`
//   color: #fafafa;
//   font-size: 18px;
// `;

// export const ButtonContainer = styled.View`
//   position: absolute;
//   width: 100%;
//   height: 48px;
//   border-radius: 10px;
//   bottom: -50px;
//   justify-content: center;
//   align-items: center;
//   align-self: center;
//   background-color: #009e00;
// `;

export const TextButton = styled.Text`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
`;
