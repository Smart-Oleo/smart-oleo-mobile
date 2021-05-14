import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {Platform} from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #000;
  align-self: flex-start;
  margin-right: 10px;
`;

export const Header = styled.View`
  padding: 20px;
  background: #fafafa;
  padding-top: ${Platform.OS === 'android' ? 10 : getStatusBarHeight() + 24}px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Body = styled.View`
  margin: 10px;
`;

export const ContentUser = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ContentPoints = styled.View`
  flex-direction: row;
`;

export const PointsText = styled.Text`
  font-size: 16px;
  color: #000;
  font-weight: bold;
`;

export const ImageHeader = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  border-color: #00c200;
  border-width: 1px;
`;
