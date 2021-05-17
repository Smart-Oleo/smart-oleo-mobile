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

export const Badge = styled.View`
  background-color: red;
  padding: 2px;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  position: absolute;
  top: -10px;
  right: -8px;
  height: 20px;
  width: 20px;
`;

export const TextBadge = styled.Text`
  color: #fff;
  font-weight: bold;
`;

export const ContentHeader = styled.View`
  flex-direction: row;
  align-items: center;
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
