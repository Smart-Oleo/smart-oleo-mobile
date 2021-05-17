import styled from 'styled-components/native';
// import {Platform} from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const Header = styled.View`
  flex-direction: row;
  padding-left: 20px;
  padding-top: 10px;
  border-bottom-width: 1px;
  border-color: #dcdcdc;
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

export const ContainerNotification = styled.View`
  padding: 10px;
  border-bottom-width: 1px;
  border-color: #dcdcdc;
  height: 100px;
  justify-content: space-between;
  padding-bottom: 20px;
  background-color: #fafafa;
`;

export const ImageNotification = styled.Image`
  height: 80px;
  width: 80px;
  border-radius: 80px;
  margin: 6px;
`;

export const TitleNotification = styled.Text`
  font-size: 14px;
  color: #000;
  font-weight: 500;
  align-self: flex-start;
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
