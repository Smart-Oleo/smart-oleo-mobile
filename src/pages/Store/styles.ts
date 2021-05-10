import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {FlatList} from 'react-native';
import {Product} from '.';
import LinearGradient from 'react-native-linear-gradient';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const Content = styled.View`
  justify-content: center;
  align-items: flex-start;
  flex: 1;
  margin-left: 4px;
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

export const ImageNoContent = styled.Image`
  height: 250px;
  width: 320px;
  border-radius: 50px;
`;

export const TextNoContent = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const ProductList = styled(FlatList as new () => FlatList<Product>)`
  margin-top: 10px;
`;

export const ProductDetail = styled.TouchableOpacity`
  margin: 6px 10px;
  opacity: 1;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #0000001a;
  border-radius: 10px;
  height: 280px;
  width: 170px;
  align-items: center;
`;

export const ProductImage = styled.Image`
  height: 180px;
  width: 120px;
  border-radius: 10px;
  margin: 4px;
`;

export const ViewIcon = styled.View`
  height: 180px;
  width: 120px;
  border-radius: 10px;
  margin: 4px;
  justify-content: center;
  align-items: center;
`;

export const ProductContent = styled.View`
  padding: 10px;
`;

export const Title = styled.Text`
  font-size: 12px;
  color: #000;
  font-weight: 500;
`;

export const PriceView = styled(LinearGradient)`
  position: absolute;
  top: 16px;
  right: 4px;
  width: 50px;
  height: 20px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const ButtonView = styled(LinearGradient)`
  width: 90%;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
`;

export const PriceText = styled.Text`
  color: #fff;
  font-size: 12px;
  font-weight: bold;
`;

export const ButtonProduct = styled.TouchableOpacity`
  width: 90%;
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
