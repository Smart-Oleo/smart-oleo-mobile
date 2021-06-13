import React from 'react';
import {
  Container,
  ImageItem,
  NameItem,
  InfoHeaderContent,
  ViewLocalidade,
  TextLocalidade,
  AddressContent,
  TextAddress,
  StatusView,
  StarsView,
  StatusText,
  StarsText,
  ViewAddress,
  StatusTextClose,
  AberturaView,
  HorarioAbertura,
} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import {ImageSourcePropType} from 'react-native';

interface HighlightsI {
  image: ImageSourcePropType;
  title: string;
  description: string;
}

const Highlights: React.FC<HighlightsI> = (hightlight: HighlightsI) => {
  return (
    <Container key={hightlight.title}>
      <ImageItem source={hightlight.image} />
      {/* <StatusView>
        <StatusTextClose> FECHADO </StatusTextClose>
      </StatusView>
      <StarsView>
        <Icon name="star" size={12} color="#FFCC00" />
        <StarsText> 4.5 </StarsText>
      </StarsView> */}
      {/* <AberturaView>
        <HorarioAbertura numberOfLines={1}> 1</HorarioAbertura>
      </AberturaView> */}

      <InfoHeaderContent>
        <NameItem> {hightlight.title} </NameItem>
        {/* <ViewLocalidade colors={['#FF8C48', '#FF5673']} start={{x: 0, y: 0}}>
          <TextLocalidade numberOfLines={1}>Alguma coisa</TextLocalidade>
        </ViewLocalidade> */}
      </InfoHeaderContent>
      <AddressContent>
        <ViewAddress>
          <TextAddress numberOfLines={5}>{hightlight.description}</TextAddress>
        </ViewAddress>
      </AddressContent>
    </Container>
  );
};

export default Highlights;
