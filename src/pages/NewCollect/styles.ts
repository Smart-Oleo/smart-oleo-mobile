import styled from 'styled-components/native';
import {Form} from '@unform/mobile';
import Modal from 'react-native-modalbox';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {colors, metrics} from '../../styles/global';
import {Platform, Dimensions} from 'react-native';

export const Content = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  padding: 0px ${metrics.basePadding}px;
  margin-top: ${Platform.OS === 'ios' ? 80 : 30}px;
`;

export const LogoImage = styled.Image`
  align-self: flex-start;

  height: 50px;
  width: 140px;
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: ${colors.gray};
  margin: 20px 0px 30px 0px;
  align-self: flex-start;
`;

export const SelectBottom = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 60px;
  padding: 0px 16px;
  background-color: ${colors.secundary};
  border-radius: ${metrics.secundaryRadius}px;
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

export const Hidden = styled.TextInput``;
