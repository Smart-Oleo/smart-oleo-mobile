import styled from 'styled-components/native';
import {Dimensions, Platform} from 'react-native';
import {colors, metrics} from '../../styles/global';
import Modal from 'react-native-modalbox';

export const Container = styled.View`
  flex: 1;
  padding: ${Platform.OS === 'android' ? 1 : 40}px ${metrics.basePadding}px;
`;

export const Header = styled.View`
  flex-direction: row;

  margin: ${Platform.OS === 'android' ? 20 : 25}px 0px 15px 0px;
`;

export const BackButton = styled.TouchableOpacity`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: row;

  width: 100%;
`;

export const HeaderTitle = styled.Text`
  font-size: 18px;
  color: ${colors.gray};
  font-weight: 500;
`;

export const ContainerImage = styled.View`
  border-radius: ${metrics.secundaryRadius}px;
`;

export const Title = styled.Text`
  font-size: 18px;
  color: ${colors.gray};
  font-weight: bold;
`;

export const TitleDescription = styled.Text`
  font-size: 16px;
  color: ${colors.darkgray};
  margin: 30px 5px 5px 5px;
  font-weight: 700;
  align-self: flex-start;
`;

export const AlertMessage = styled.Text`
  font-size: 13px;
  color: ${colors.danger};
  margin: 20px 0;
  font-weight: bold;
  align-self: flex-start;
`;

export const ValuePoints = styled.Text`
  font-size: 15px;
  color: ${colors.success};
  padding-left: 10px;
  padding-right: 2px;
  font-weight: bold;
`;

export const MyWallet = styled.Text`
  font-size: 14px;
  color: ${colors.gray};
  font-weight: 500;
  align-self: flex-start;
`;

export const Description = styled.Text`
  font-size: 14px;
  color: ${colors.gray};
  margin: 10px 0;
  font-weight: 500;
  align-self: flex-start;
`;

export const ProductPhoto = styled.Image`
  width: 100%;
  height: 140px;
  align-self: center;
  border-radius: ${metrics.secundaryRadius}px;
`;

export const ContainerTitle = styled.View`
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
`;

export const Card = styled.View`
  margin-top: ${metrics.baseMargin}px;
  background-color: ${colors.white};
  box-shadow: 0px 6px 16px ${colors.lightgray};
  border-radius: ${metrics.basePadding}px;
`;

export const CardBody = styled.View`
  padding: ${metrics.basePadding}px;
`;

export const ViewInfo = styled.View`
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: row;

  margin-top: 5px;
`;
export const ContainerView = styled.View`
  justify-content: flex-start;
  align-items: flex-start;
`;

export const ContainerBody = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;

  width: 100%;
  margin-top: 20px;
`;

export const BottomInfo = styled.TouchableOpacity`
  justify-content: space-between;
  align-items: center;

  padding: 5px;
  background-color: ${colors.secundary};
  border-radius: 5px;
`;

export const Hr = styled.View`
  margin: 20px 0px 5px 0px;
  width: 100%;
  border-bottom-width: 2px;
  border-bottom-color: ${colors.lightgray};
`;

export const SelectBottom = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 70%;
  height: 35px;
  padding: 0px 16px;
  background-color: ${colors.white};
  border-radius: 5px;
  margin: ${metrics.baseMargin}px 0px;
`;

export const TextSelect = styled.Text`
  color: ${colors.lightgray};
  font-size: 16px;
`;

export const ModalBox = styled(Modal)`
  margin-top: ${Dimensions.get('window').height * 0.4};
  background-color: ${colors.white};
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  border-bottom-left-radius: ${props => props.BorderLeftBottom || 0}px;
  border-bottom-right-radius: ${props => props.BorderRightBottom || 0}px;
`;

export const ModalBoxContainer = styled.View`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  padding: ${metrics.basePadding}px;
`;

export const ModalHeader = styled.TouchableOpacity`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;

  margin-bottom: ${metrics.basePadding}px;
  width: 100%;
`;

export const SelectItem = styled.TouchableOpacity`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  margin-bottom: 10px;
`;

export const SelectText = styled.Text`
  color: ${colors.darkgray};
  font-size: 20px;
  margin-bottom: 15px;
`;
