import styled from 'styled-components/native';
import {colors, metrics} from '../../styles/global';

export const Container = styled.View`
  left: 0px;
  width: 240px;
  background-color: ${colors.white};
  border-radius: ${metrics.secundaryRadius}px;
  margin: 0px 10px;
`;

export const ImageItem = styled.Image`
  left: 0px;
  width: 240px;
  height: 220px;
  border-radius: 10px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
`;

export const ContentItem = styled.View`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  padding: ${metrics.basePadding}px;
`;
export const TitleItem = styled.Text`
  font-size: 14px;
  line-height: 20px;
  font-weight: bold;
  color: ${colors.darkgray};
  margin-bottom: 5px;
`;
export const TextItem = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${colors.gray};
  text-align: left;
`;
