import styled, {css} from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import {Platform} from 'react-native';
import {colors, metrics} from '../../styles/global';

export interface StatusProps {
  status: string;
}

export const Container = styled.View`
  flex: 1;
  padding: ${Platform.OS === 'android' ? 10 : 40}px ${metrics.basePadding}px;
`;

export const Header = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  margin-top: 10px;
`;

export const BackButton = styled.TouchableOpacity`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
`;

export const Title = styled.Text`
  font-size: 18px;
  color: ${colors.gray};
  font-weight: 500;
`;

export const ContainerCollect = styled.View`
  justify-content: space-between;
  background-color: ${colors.white};
  box-shadow: 0px 6px 16px ${colors.lightgray};
  border-radius: ${metrics.basePadding}px;
  padding: ${metrics.basePadding}px;
  margin-top: ${metrics.baseMargin}px;
`;

export const Text = styled.Text`
  font-size: 16px;
  color: ${colors.gray};
  font-weight: bold;
`;

export const ImageNotification = styled.Image`
  height: 80px;
  width: 80px;
  border-radius: 80px;
  margin: 6px;
`;

export const DateNotification = styled.Text`
  font-size: 12px;
  color: ${colors.darkgray};
  top: 10px;
  align-self: flex-start;
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

export const CancelButtonText = styled.Text`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: ${colors.white};
  font-weight: bold;
`;

export const CancelButton = styled.TouchableOpacity`
  border-radius: 10px;
  background-color: red;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 10px 10px;
`;

export const TextAcept = styled.Text`
  color: #fff;
  font-weight: bold;
`;

export const EnderecoContent = styled.View`
  margin: 0px 6px;
  padding-top: 10px;
`;
export const EnderecoText = styled.Text`
  font-size: 13px;
  color: ${colors.gray};
  font-weight: 500;
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

export const CollectHeaderContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const ViewStatus = styled.View<StatusProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  padding: 5px;
  border-radius: 4px;
  margin: 4px;
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

export const CollectText = styled.Text`
  font-size: 14px;
  color: ${colors.gray};
  font-weight: 900;
  margin-left: 5px;
  margin-top: 3px;
`;

export const ContentSchedule = styled.View`
  margin-top: 10px;
`;

export const Divisor = styled.View`
  width: 100%;
  border: 0.6px solid #d3d3d3;
  margin-bottom: 10px;
`;

export const CollectorContent = styled.View`
  flex-direction: row;
  padding: 10px;
`;

export const CollectorImage = styled.Image`
  height: 60px;
  width: 60px;
  border-radius: 50px;
`;

export const ButtonView = styled(LinearGradient)`
  width: 100%;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
`;

export const ButtonProduct = styled.TouchableOpacity`
  width: 100%;
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

export const StatusInfo = styled.Text`
  font-size: 10px;
  color: ${colors.white};
  font-weight: bold;
  margin-left: 4px;
`;
