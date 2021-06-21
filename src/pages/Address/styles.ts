import styled from 'styled-components/native';
import {Platform, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Address} from '.';
import {colors, metrics} from '../../styles/global';

export const Container = styled.View`
  flex: 1;
  /* background-color: ${colors.white}; */
  padding: ${Platform.OS === 'android' ? metrics.basePadding : 80}px
    ${metrics.basePadding}px;
`;

export const ContainerAddress = styled.TouchableOpacity`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row;

  background-color: ${colors.white};
  box-shadow: 0px 6px 16px ${colors.lightgray};
  border-radius: ${metrics.basePadding}px;
  padding: ${metrics.basePadding}px;
  margin-top: ${metrics.baseMargin + 5}px;
`;

export const Text = styled.Text`
  font-size: 14px;
  color: ${colors.gray};

  font-weight: 400;
  width: 90%;
  align-self: flex-start;
`;

export const BackButton = styled.TouchableOpacity`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
`;

export const ButtonCreate = styled.TouchableOpacity`
  padding: 10px;
`;

export const ContentAddress = styled.View`
  height: 100%;
  width: 90%;
  padding: 10px;
`;

export const ContentImage = styled.View`
  justify-content: center;
  align-items: center;
`;

export const ImageNoContent = styled.Image`
  height: 250px;
  width: 320px;
  border-radius: 50px;
`;

export const AddressList = styled(FlatList as new () => FlatList<Address>)`
  padding: ${metrics.basePadding}px;
`;

export const TextNoContent = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
`;

export const DescriptionNoContent = styled.Text`
  font-size: 16px;
  margin: 30px;
  text-align: center;
`;

export const ButtonView = styled(LinearGradient)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  width: 90%;
  height: 50px;
  border-radius: ${metrics.secundaryRadius}px;
  padding: 0px ${metrics.basePadding}px;
  margin: ${metrics.basePadding}px;
`;

export const ViewReference = styled.View`
  padding-top: 6px;
`;

export const TextReference = styled.Text`
  color: ${colors.gray};
  font-weight: bold;
  font-size: 15px;
`;

export const ButtonProduct = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  width: 100%;
  padding: 10px;
  border-radius: 6px;
`;

export const TextButton = styled.Text`
  color: ${colors.white};
  font-weight: bold;
  font-size: 16px;
`;

export const ButtonHeader = styled.TouchableOpacity`
  height: 30px;
  width: 20px;
  position: absolute;
  right: -25px;
  top: 10px;
`;

export const Title = styled.Text`
  font-size: 18px;
  color: ${colors.darkgray};
  font-weight: 500;
  margin-left: 5px;
`;
