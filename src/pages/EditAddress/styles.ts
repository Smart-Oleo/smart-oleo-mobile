import styled from 'styled-components/native';
import {Platform} from 'react-native';
import {colors, metrics} from '../../styles/global';

export const Container = styled.View`
  flex: 1;
  padding: ${Platform.OS === 'android' ? metrics.basePadding : 80}px
    ${metrics.basePadding}px;
  background-color: ${colors.white};
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
