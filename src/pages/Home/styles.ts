import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {Platform, FlatList} from 'react-native';
import {HighlightsI} from '.';
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

export const HighligthsList = styled(
  FlatList as new () => FlatList<HighlightsI>,
)`
  margin: 10px 0px;
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

export const Content = styled.View`
  margin: 10px;
`;
export const ContentHeaderList = styled.View`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

export const TitleList = styled.Text`
  color: #222455;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 6px;
`;

export const TitleUser = styled.Text`
  color: #222455;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 6px;
`;

export const TextRight = styled.Text`
  color: #009abe;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0;
  opacity: 0.8;
`;

export const ContentUserHeader = styled.View`
  flex-direction: row;
`;

export const UserContainer = styled.View`
  left: 0px;
  width: 66%;
  height: 100px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 2px 3px 2px #808080;
  elevation: 10;
  margin-left: 6px;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
`;
