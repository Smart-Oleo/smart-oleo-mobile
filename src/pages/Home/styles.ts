import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {Platform, FlatList} from 'react-native';
import {HighlightsI} from '.';
import {colors, metrics} from '../../styles/global';

export const Header = styled.View`
  padding: ${metrics.basePadding}px;
  background: ${colors.secundary};
  padding-top: ${Platform.OS === 'android' ? 10 : getStatusBarHeight() + 24}px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Body = styled.View`
  padding: ${metrics.basePadding}px;
`;

export const Badge = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${colors.success};
  padding: 2px;
  border-radius: ${metrics.baseRadius}px;
  position: absolute;
  top: -6px;
  right: -6px;
  height: 18px;
  width: 18px;
`;

export const TextBadge = styled.Text`
  color: ${colors.white};
  font-size: 12px;
  font-weight: bold;
  align-self: center;
  text-align: center;
`;

export const HighligthsList = styled(
  FlatList as new () => FlatList<HighlightsI>,
)`
  margin: 10px 0px;
  padding: 10px 0px;
`;

export const ContentUser = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ImageHeader = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  border-color: ${colors.primary};
  border-width: 1px;
`;

export const Content = styled.View`
  padding: 10px 0px;
  box-shadow: 0px 6px 16px ${colors.lightgray};
`;

export const ContentHeader = styled.View`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
`;

export const TitleList = styled.Text`
  color: ${colors.darkgray};
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 6px;
`;

export const IndicatorList = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 6px;

  border-radius: 10px;
  border-radius: 6px;
`;

export const TextRight = styled.Text`
  color: ${colors.gray};
  font-size: 16px;
  font-weight: 900;
`;

export const ContentUserHeader = styled.View`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;

  width: 100%;
  height: 100px;
  background-color: ${colors.white};
  border-radius: ${metrics.secundaryRadius}px;
  box-shadow: 0px 6px 16px ${colors.lightgray};
  margin-bottom: ${metrics.baseMargin * 2}px;
`;

export const UserContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: flex-start;

  padding: ${metrics.basePadding}px;
`;
