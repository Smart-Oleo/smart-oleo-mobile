import React from 'react';
import {Title, Content} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import {colors, metrics} from '../../styles/global';

interface IContent {
  name: string;
  icon: string;
}

const SmallCard: React.FC<IContent> = (content: IContent) => {
  return (
    <Content colors={[colors.primary, colors.success]}>
      <Title> {content.name}</Title>
      <Icon name={content.icon} color={colors.white} size={metrics.iconSize} />
    </Content>
  );
};

export default SmallCard;
