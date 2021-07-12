import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {FlatList, Platform} from 'react-native';
import {Product} from '.';
import LinearGradient from 'react-native-linear-gradient';
import {colors, metrics} from '../../styles/global';

export const Content = styled.View`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex: 1;
  margin-left: 4px;
`;

export const Header = styled.View`
  padding: ${metrics.basePadding}px;
  background: ${colors.secundary};
  padding-top: ${Platform.OS === 'ios' ? getStatusBarHeight() + 24 : 24}px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const FilterView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100%;
  height: 50px;
  padding: 0px ${metrics.basePadding}px;
  background: ${colors.white};
  border-radius: ${metrics.secundaryRadius}px;
  margin-bottom: 10px;
  border: none;
  box-shadow: 0px 6px 16px ${colors.lightgray};
`;

export const FilterText = styled.TextInput`
  margin-left: 10px;
  color: ${colors.black};
  font-size: 14px;
`;

export const TextNoContent = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const ProductList = styled(FlatList as new () => FlatList<Product>)`
  flex-wrap: wrap;
  box-shadow: 3px 3px 16px ${colors.lightgray};
  width: 100%;
`;

export const ProductDetail = styled.View`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  align-self: center;

  background-color: ${colors.white};
  margin: 4px;
  border-radius: ${metrics.secundaryRadius}px;
  height: 280px;
  width: 170px;
  align-items: center;
`;

export const ProductImage = styled.Image`
  height: 160px;
  width: 170px;

  border-top-left-radius: ${metrics.secundaryRadius}px;
  border-top-right-radius: ${metrics.secundaryRadius}px;
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
  padding: ${metrics.baseMargin}px;
  width: 100%;
`;

export const Title = styled.Text`
  font-size: 13px;
  color: ${colors.darkgray};
  font-weight: 600;
  letter-spacing: 0.02px;
`;

export const Shadow = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  position: absolute;
  width: 100%;
  height: 160px;
  background-color: rgba(0, 0, 0, 0.3);
  border-top-left-radius: ${metrics.secundaryRadius}px;
  border-top-right-radius: ${metrics.secundaryRadius}px;
`;

export const ButtonView = styled(LinearGradient)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;

  position: absolute;
  top: 70;
  left: 10;
  width: 100%;
  border-radius: 6px;
  padding: 0px ${metrics.basePadding}px;
`;

export const ButtonProduct = styled.TouchableOpacity`
  padding: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
`;

export const PriceProduct = styled.TouchableOpacity`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;

  padding: 5px 0px;
  position: absolute;
  top: 42;
  left: 10;
`;

export const PriceText = styled.Text`
  color: ${colors.success};
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  padding: 2px;
`;

export const TextButton = styled.Text`
  color: ${colors.white};
  font-weight: bold;
  font-size: 14px;
`;

export const ContentVoid = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

export const ButtonRefresh = styled.TouchableOpacity`
  padding: 10px 20px;
  background-color: ${colors.primary};
  justify-content: center;
  border-radius: 10px;
`;

export const TextButtonRefresh = styled.Text`
  color: ${colors.white};
`;
