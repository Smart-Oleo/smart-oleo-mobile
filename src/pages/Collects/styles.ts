import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {FlatList} from 'react-native';
import {Collect} from '.';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const Header = styled.View`
  padding: 22px;
  background: #fafafa;
  padding-top: ${getStatusBarHeight() + 24}px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const FilterView = styled.View`
  width: 100%;
  height: 46px;
  padding: 0px 14px;
  background: #fff;
  border-radius: 10px;
  margin-bottom: 10px;
  border: 1px solid #e6e6e6;

  flex-direction: row;
  align-items: center;
`;

export const FilterText = styled.TextInput`
  flex: 1;
  margin-left: 10px;
  color: #312e38;
  font-size: 14px;
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

export const CollectList = styled(FlatList as new () => FlatList<Collect>)`
  margin: 10px;
`;

export const ContainerCollect = styled.TouchableOpacity`
  margin: 6px 0px;
  opacity: 1;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 10px;
  border: 1px solid #0000001a;
  padding: 10px;
  justify-content: space-between;
`;

export const CollectNumberView = styled.View`
  padding: 6px;
  border: 1px solid #228b22;
  border-radius: 10px;
`;

export const CollectNumber = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const CollectHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CollectBody = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
`;

export const TextOilNumber = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #000;
`;

export const ViewStatus = styled.View`
  justify-content: center;
  align-items: center;
  background-color: #545b62;
  padding: 4px;
  border-radius: 4px;
  margin: 4px;
`;

export const Status = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #fff;
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
