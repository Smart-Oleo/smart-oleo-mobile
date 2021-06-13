import styled from 'styled-components/native';

export const Container = styled.View`
  left: 0px;
  width: 100px;
  height: 100px;
  background-color: #fff;
  elevation: 6;
  border-radius: 10px;
  box-shadow: 2px 3px 2px #808080;
  margin-left: 6px;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.View`
  height: 80px;
  width: 80px;
  border-radius: 80px;
  background: #9acd32;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
`;

export const ImageView = styled.Image`
  height: 100px;
  width: 100px;
  border-radius: 10px;
  border-radius: 60px;
  margin-bottom: 24px;
`;
