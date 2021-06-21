import React from 'react';
import {Container, ImageItem, ContentItem, TitleItem, TextItem} from './styles';
import {ImageSourcePropType, View, Platform} from 'react-native';
import {android} from './../../styles/global';
interface HighlightsI {
  image: ImageSourcePropType;
  title: string;
  description: string;
}

const Highlights: React.FC<HighlightsI> = (hightlight: HighlightsI) => {
  return (
    <Container
      key={hightlight.title}
      style={{
        ...Platform.select({
          android,
        }),
      }}>
      <ImageItem source={hightlight.image} />
      <ContentItem>
        <TitleItem>{hightlight.title}</TitleItem>
        <TextItem numberOfLines={5}>{hightlight.description}</TextItem>
      </ContentItem>
    </Container>
  );
};

export default Highlights;
