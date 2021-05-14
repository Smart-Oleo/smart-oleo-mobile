import styled from 'styled-components/native';

export const Container = styled.View`
  /* flex: 1; */
  /* justify-content: flex-end; */
  background-color: #fff;
  /* align-items: center; */
  /* height: 300px; */
  border-radius: 20px;
  padding: 30px;
`;

export const ButtonHeader = styled.TouchableOpacity`
  height: 30px;
  width: 20px;
  position: absolute;
  top: 10px;
  right: 10px;
`;

// export const Header = styled.View`
//   background-color: #fff;
//   border-radius: 20px;
//   padding: 30px;
// `;

export const Title = styled.Text`
  font-size: 20px;
  color: #000;
  align-self: flex-start;
  margin-bottom: 10px;
`;

export const ButtonOptions = styled.TouchableOpacity`
  border: 0.6px solid #a9a9a9;
  width: 100%;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin: 6px;
`;

export const TextButton = styled.Text`
  font-size: 14px;
  color: #000;
  font-weight: bold;
`;
