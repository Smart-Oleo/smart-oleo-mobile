import React, {useCallback} from 'react';

import {Container, BackButton} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

const NewAddress: React.FC = () => {
  const navigation = useNavigation();

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Container>
      <BackButton onPress={handleGoBack}>
        <Icon name="chevron-left" size={24} />
      </BackButton>
    </Container>
  );
};

export default NewAddress;
