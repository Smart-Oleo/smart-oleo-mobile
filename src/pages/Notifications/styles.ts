import styled, {css} from 'styled-components/native';
import {FlatList, Platform} from 'react-native';
// import {Platform} from 'react-native'; box-shadow: 0px 6px 16px ${colors.lightgray};
import {Notification} from './index';
import {colors, metrics} from '../../styles/global';

export interface StatusProps {
  status: boolean;
}

export const Container = styled.View`
  flex: 1;
  padding: ${Platform.OS === 'android' ? metrics.basePadding : 60}px
    ${metrics.basePadding}px;
  background-color: ${colors.secundary};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
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

export const NotificationList = styled(
  FlatList as new () => FlatList<Notification>,
)``;

export const Content = styled.View`
  padding: 0px 10px;
  box-shadow: 0px 6px 16px ${colors.lightgray};
`;

export const ContainerNotification = styled.TouchableOpacity<StatusProps>`
  justify-content: flex-start;
  align-items: flex-start;

  padding: ${metrics.basePadding}px;
  background-color: ${colors.white};
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  margin-bottom: ${metrics.basePadding}px;

  ${props =>
    props.status !== true
      ? css`
          border-left-color: ${colors.success};
          border-top-color: transparent;
          border-right-color: transparent;
          border-bottom-color: transparent;
          border-width: 2px;
        `
      : css`
          border-left-color: ${colors.gray};
          border-top-color: transparent;
          border-right-color: transparent;
          border-bottom-color: transparent;
          border-width: 2px;
        `};
`;

export const ImageNotification = styled.Image`
  height: 80px;
  width: 80px;
  border-radius: 80px;
  margin: 6px;
`;

export const TitleNotification = styled.Text`
  font-size: 13px;
  color: ${colors.darkgray};
  font-weight: 500;
  align-self: flex-start;
`;

export const DateContainer = styled.View`
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;

  border-left-color: ${colors.secundary};
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-width: 1px;
  margin-bottom: 5px;
`;
export const Indicator = styled.View<StatusProps>`
  border-radius: 100px;
  height: 8px;
  width: 8px;

  ${props =>
    props.status !== true
      ? css`
          background-color: ${colors.success};
        `
      : css`
          background-color: ${colors.gray};
        `};
`;

export const DateNotification = styled.Text`
  font-size: 12px;
  color: ${colors.gray};
  font-weight: bold;
  align-self: flex-start;
  margin-left: 5px;
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

export const ContainerButtons = styled.Text`
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
  align-items: center;
`;

export const ButtonAcept = styled.TouchableOpacity`
  border-radius: 10px;
  background-color: green;
  justify-content: center;
  align-items: center;
  padding: 10px;
  align-self: center;
`;

export const TextAcept = styled.Text`
  color: #fff;
  font-weight: bold;
`;
