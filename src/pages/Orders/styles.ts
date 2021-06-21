import styled from 'styled-components/native';
import {FlatList} from 'react-native';
import {Platform} from 'react-native';
import {Order} from './index';
import {colors, metrics} from '../../styles/global';
export const Container = styled.View`
  flex: 1;
  padding: ${Platform.OS === 'android' ? metrics.basePadding : 60}px
    ${metrics.basePadding}px;
  background-color: ${colors.secundary};
`;

export const Header = styled.View`
  /* flex-direction: row;
  padding-left: 20px;
  padding-top: 10px;
  border-color: #dcdcdc; */
  flex-direction: row;
  align-items: center;
`;

export const OrderList = styled(FlatList as new () => FlatList<Order>)`
  margin: 0px ${metrics.baseMargin}px;
`;

export const BackButton = styled.TouchableOpacity`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: 18px;
  color: ${colors.darkgray};
  font-weight: 500;
  margin-left: 5px;
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
  margin: 50px 0px 25px 0px;
  background-color: ${colors.white};
  box-shadow: 0px 6px 16px ${colors.lightgray};
  border-radius: ${metrics.secundaryRadius}px;
  padding: 10px 0px;
  elevation: 27;

  justify-content: center;
  align-items: center;
`;
export const EmpresaImage = styled.Image`
  height: 100px;
  width: 100px;
  border-radius: 50px;
  margin-top: -50px;
`;

export const EmpresaContent = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;

  background-color: ${colors.success};
  padding: 2px 4px;
  border-radius: 4px;
  position: absolute;
  top: -10px;
  left: 10px;
`;

export const EmpresaText = styled.Text`
  font-size: 14px;
  color: ${colors.gray};
  font-weight: bold;
  margin-top: 1px;
  margin-left: ${Platform.OS === 'ios' ? 14 : 32};
`;
export const EmpresaTextInfo = styled.Text`
  font-size: 13px;
  color: ${colors.gray};
  font-weight: 500;
  margin-top: 8px;
`;

export const NameView = styled.View`
  width: 90%;
  /* background-color: blue; */
  /* justify-content: center;
  align-items: center; */
  align-self: flex-start;
  margin: 2px ${metrics.baseMargin + 8}px;
`;
export const EnderecoTitle = styled.Text`
  font-size: 14px;
  color: ${colors.darkgray};
  font-weight: bold;
  align-self: center;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const EnderecoContent = styled.View`
  margin: 0px 6px;
  padding-top: 6px;
`;
export const EnderecoText = styled.Text`
  font-size: 12px;
  color: ${colors.gray};
  font-weight: bold;
  align-self: center;
  margin-top: 5px;
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
