import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

export const Container = styled.View`
  left: 0px;
  width: 240px;
  height: 336px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 2px 2px 4px #000;
  elevation: 6;
  margin-left: 6px;
  margin-bottom: 10px;
`;

export const ImageItem = styled.Image`
  left: 0px;
  width: 240px;
  height: 220px;
  border-radius: 10px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  opacity: 1;
`;

export const InfoHeaderContent = styled.View`
  margin: 6px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const AddressContent = styled.View`
  margin: 4px 10px;
  flex-direction: row;
  align-items: center;
  margin-bottom: 6px;
`;

export const StatusView = styled.View`
  position: absolute;
  top: 16px;
  left: 10px;
  width: 50px;
  height: 18px;
  border-radius: 4px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

export const StarsView = styled.View`
  position: absolute;
  top: 16px;
  right: 10px;
  width: 40px;
  height: 18px;
  border-radius: 20px;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const StatusText = styled.Text`
  color: #4cd964;
  font-size: 10px;
  font-weight: bold;
`;

export const StatusTextClose = styled.Text`
  color: #ff0000;
  font-size: 10px;
  font-weight: bold;
`;

export const StarsText = styled.Text`
  color: #3e3f68;
  font-size: 12px;
  font-weight: bold;
`;

export const NameItem = styled.Text`
  color: #3e3f68;
  font-size: 16px;
  line-height: 20px;
  font-weight: bold;
`;

export const AberturaView = styled.View`
  position: absolute;
  top: 120px;
  left: 10px;
  width: 110px;
  height: 18px;
  border-radius: 5px;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const HorarioAbertura = styled.Text`
  color: #3e3f68;
  font-size: 12px;
  font-weight: bold;
`;

export const ViewLocalidade = styled(LinearGradient)`
  border-radius: 22px;
  opacity: 0.65;
  box-shadow: 0px 10px 99px #0000000d;
  width: 80px;
  height: 24px;
  /* background-color: #FF5673; */
  justify-content: center;
  align-items: center;
  margin-right: 6px;
`;

export const TextLocalidade = styled.Text`
  color: #fff;
  font-size: 14px;
  line-height: 20px;
  font-weight: bold;
`;

export const TextAddress = styled.Text`
  color: #a9a9a9;
  font-size: 12px;
  font-weight: bold;
`;

export const ViewAddress = styled.View`
  margin-bottom: 4px;
`;
