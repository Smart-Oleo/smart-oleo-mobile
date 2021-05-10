import styled from 'styled-components/native';
import {Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const ContainerAddress = styled.View`
  margin: 10px;
  border: 0.4px solid #c0c0c0;
  height: 80px;
  border-radius: 10px;
  background-color: #fff;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  position: relative;
`;

export const Text = styled.Text`
  font-size: 14px;
  color: #000;
  line-height: 20px;
  font-weight: 400;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 50px;
  left: -10px;
`;

export const ButtonCreate = styled.TouchableOpacity`
  padding: 10px;
`;

export const ContentAddress = styled.View`
  height: 100%;
  width: 90%;
  padding: 10px;
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
  margin-top: 10px;
`;

export const DescriptionNoContent = styled.Text`
  font-size: 16px;
  margin: 30px;
  text-align: center;
`;

export const ButtonView = styled(LinearGradient)`
  width: 100%;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
`;

export const ButtonProduct = styled.TouchableOpacity`
  width: 100%;
  padding: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
`;

export const TextButton = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 14px;
`;
