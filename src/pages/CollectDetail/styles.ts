import styled from 'styled-components/native';
import {FlatList} from 'react-native';
// import {Platform} from 'react-native';
import {Notification} from './index';
export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const Header = styled.View`
  flex-direction: row;
  padding-left: 20px;
  padding-top: 10px;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 50px;
  left: -10px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #000;
  margin: 24px 0;
  align-self: flex-start;
  font-weight: bold;
  margin-top: 50px;
`;

export const ContainerCollect = styled.View`
  padding: 10px;
  border: 1px;
  border-color: #dcdcdc;
  margin: 10px;
  border-radius: 10px;
`;

export const Text = styled.Text`
  font-size: 16px;
  color: #000;
  font-weight: bold;
`;

export const ImageNotification = styled.Image`
  height: 80px;
  width: 80px;
  border-radius: 80px;
  margin: 6px;
`;

export const DateNotification = styled.Text`
  font-size: 12px;
  color: #808080;
  top: 10px;
  align-self: flex-start;
`;

export const ContentImage = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const ImageNoContent = styled.Image`
  height: 250px;
  width: 320px;
  border-radius: 50px;
`;

export const TextNoContent = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const DescriptionNoContent = styled.Text`
  font-size: 16px;
  margin: 30px;
  text-align: center;
`;

export const CancelButtonText = styled.Text`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-weight: bold;
`;

export const CancelButton = styled.TouchableOpacity`
  border-radius: 10px;
  background-color: red;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 10px 10px;
`;

export const TextAcept = styled.Text`
  color: #fff;
  font-weight: bold;
`;

// export const ButtonNoAcept = styled.TouchableOpacity`
//   border-radius: 10px;
//   background-color: #fff;
//   justify-content: center;
//   align-items: center;
//   padding: 10px;
//   width: 40%;
//   border: 1px solid black;
// `;

// export const TextNoAcept = styled.Text`
//   color: #000;
//   font-weight: bold;
// `;
