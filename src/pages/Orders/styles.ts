import styled from 'styled-components/native';
import {FlatList} from 'react-native';
// import {Platform} from 'react-native';
import {Order} from './index';
export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const Header = styled.View`
  flex-direction: row;
  padding-left: 20px;
  padding-top: 10px;
  border-color: #dcdcdc;
`;

export const OrderList = styled(FlatList as new () => FlatList<Order>)`
  margin: 10px;
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

export const ContainerOrder = styled.View`
  padding: 10px;
  flex-direction: row;
  border: 1px solid black;
  border-radius: 10px;
`;

export const ContainerDetail = styled.View``;

export const ImageProduct = styled.Image`
  height: 100px;
  width: 100px;
  border-radius: 10px;
  border: 0.6px solid black;
`;

export const TitleProduct = styled.Text`
  font-size: 16px;
  color: #000;
  font-weight: bold;
  margin-left: 6px;
`;

export const InfoText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #000;
`;

export const ContainerInfo = styled.View`
  padding: 4px;
`;

export const EmpresaDetail = styled.TouchableOpacity`
  margin: 6px 0px;
  opacity: 1;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 2px 3px 2px #808080;
  border-radius: 10px;
  padding: 10px;
  elevation: 10;
  flex-direction: row;
  justify-content: space-between;
`;
export const EmpresaImage = styled.Image`
  height: 80px;
  width: 80px;
  border-radius: 10px;
`;

export const EmpresaContent = styled.View`
  flex: 1;
  margin-left: 10px;
`;

export const EmpresaText = styled.Text`
  font-size: 14px;
  color: #000;
  font-weight: bold;
`;

export const NameView = styled.View`
  width: 300px;
`;
export const EnderecoContent = styled.View`
  margin: 0px 6px;
  padding-top: 6px;
`;
export const EnderecoText = styled.Text`
  font-size: 12px;
  color: #a9a9a9;
  font-weight: bold;
`;

export const ReviewContent = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export const ReviewText = styled.Text`
  font-size: 16px;
  color: #000;
  font-weight: bold;
`;
