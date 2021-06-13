import styled, {css} from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

export interface StatusProps {
  status: string;
}

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export const Header = styled.View`
  flex-direction: row;
  padding-left: 20px;
  padding-top: 10px;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 50px;
  left: -10px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #000;
  margin: 24px 0;
  align-self: flex-start;
  font-weight: bold;
  margin-top: 50px;
`;

export const ContainerCollect = styled.View`
  margin: 6px 10px;
  opacity: 1;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #0000001a;
  border-radius: 10px;
  padding: 10px;
  justify-content: space-between;
`;

export const Text = styled.Text`
  font-size: 16px;
  color: #000;
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
  color: #808080;
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
  color: #fff;
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
  padding-top: 6px;
`;
export const EnderecoText = styled.Text`
  font-size: 14px;
  color: #a9a9a9;
  font-weight: bold;
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
  justify-content: center;
  align-items: center;

  padding: 4px;
  border-radius: 4px;
  margin: 4px;
  ${props =>
    props.status === 'created' &&
    css`
      background-color: #545b62;
    `};
  ${props =>
    props.status === 'waiting' &&
    css`
      background-color: #daa520;
    `};
  ${props =>
    props.status === 'collected' &&
    css`
      background-color: #32cd32;
    `};
  ${props =>
    props.status === 'canceled' &&
    css`
      background-color: red;
    `};
`;

export const Status = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #fff;
`;

export const CollectText = styled.Text`
  font-size: 14px;
  color: #000;
  font-weight: bold;
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
