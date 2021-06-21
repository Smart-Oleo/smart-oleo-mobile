import styled, {css} from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {FlatList, Platform} from 'react-native';
import {Collect, IStatus} from '.';
import {colors, metrics} from '../../styles/global';

export interface StatusProps {
  status: string;
}

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 22px;
  padding-top: ${Platform.OS === 'ios' ? getStatusBarHeight() + 24 : 24}px;
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
  flex: 1;
  margin-left: 10px;
  color: #312e38;
  font-size: 14px;
`;

export const ContentImage = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const ImageNoContent = styled.Image`
  height: 250px;
  width: 320px;
  border-radius: ${metrics.baseRadius}px;
`;

export const TextNoContent = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${colors.darkgray};
  margin-top: ${metrics.baseMargin * 2}px;
`;

export const DescriptionNoContent = styled.Text`
  font-size: 16px;
  margin: 30px;
  text-align: center;
  color: ${colors.gray};
`;

export const CollectList = styled(FlatList as new () => FlatList<Collect>)`
  margin: 20px;
`;

export const ContainerCollect = styled.TouchableOpacity`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  margin: 10px 0px;
  background-color: ${colors.white};
  box-shadow: 0px 6px 16px ${colors.lightgray};
  border-radius: ${metrics.basePadding}px;
  padding: ${metrics.basePadding}px;
`;

export const CollectNumberView = styled.View`
  /* padding: 6px; */
`;

export const CollectNumber = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${colors.gray};
`;

export const CollectHeader = styled.View`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
`;

export const CollectBody = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: 5px;
`;

export const TextOilNumber = styled.Text`
  font-size: 12px;
  font-weight: 500;
  color: ${colors.gray};
  text-align: left;
  margin-right: 10px;
`;

export const ViewStatus = styled.View<StatusProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 2px 5px;
  border-radius: 4px;
  margin: 0px 4px;
  ${props =>
    props.status === 'created' &&
    css`
      background-color: ${colors.darkgray};
    `};
  ${props =>
    props.status === 'waiting' &&
    css`
      background-color: ${colors.waring};
    `};
  ${props =>
    props.status === 'collected' &&
    css`
      background-color: ${colors.primary};
    `};
  ${props =>
    props.status === 'canceled' &&
    css`
      background-color: ${colors.danger};
    `};
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
  color: ${colors.gray};
  font-weight: bold;
`;

export const StatusContainer = styled.View`
  margin-top: 6px;
  justify-content: center;
  align-items: center;
  height: 34px;
`;

export const StatusContent = styled.TouchableOpacity`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  margin-right: 8px;
`;
export const StatusText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${colors.gray};
`;

export const StatusContentActive = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 12px;
  margin-right: 8px;
  border-bottom-color: ${colors.success};
  border-bottom-width: 2px;
`;

export const StatusTextActive = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${colors.success};
`;

export const StatusList = styled(FlatList as new () => FlatList<IStatus>)`
  margin-top: 0px;
`;

export const StatusInfo = styled.Text`
  font-size: 10px;
  color: ${colors.white};
  font-weight: bold;
  margin-left: 4px;
`;
