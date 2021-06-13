import React from 'react';

import {Container, Title, Content} from './styles';
// import Areia from '../../assets/images/Areia.jpg';
import Icon from 'react-native-vector-icons/Feather';

interface IContent {
  name: string;
  icon: string;
}
const SmallCard: React.FC<IContent> = (content: IContent) => {
  return (
    <Container>
      <Content>
        <Title> {content.name} </Title>
        <Icon name={content.icon} color="#fff" size={26} />
      </Content>
      {/* <ImageView  source={Areia}/> */}
    </Container>
  );
};

export default SmallCard;
