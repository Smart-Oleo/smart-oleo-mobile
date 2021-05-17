import React from 'react';
import Imagem from '../../assets/images/natureza.jpg';

import {Container, Text, Image} from './styles';

const Card: React.FC = () => {
  return (
    <Container>
      <Image source={Imagem} />
      <Text>
        {' '}
        A reciclagem do óleo de cozinha usado pode produzir sabão, biodiesel,
        tintas e outros produtos, além de diminuir a poluição ao meio ambiente.{' '}
      </Text>
    </Container>
  );
};

export default Card;
