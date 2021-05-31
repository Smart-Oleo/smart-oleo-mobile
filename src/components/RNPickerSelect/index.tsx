import React, {useEffect, useRef, useState} from 'react';
import Picker, {PickerSelectProps} from 'react-native-picker-select';
import {useField} from '@unform/core';
import {Container} from './styles';
import {ErrorMessage} from '../Input/styles';
interface Props extends Omit<PickerSelectProps, 'onValueChange'> {
  name: string;
}
export default function RNPickerSelect({name, items, ...rest}: Props) {
  const pickerRef = useRef(null);
  const {fieldName, registerField, defaultValue = '', error} = useField(name);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  // const [isFocused, setIsFocused] = useState<boolean>(false);
  // const [isFilled, setIsFilled] = useState<boolean>(false);

  console.log('do lado', error);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: pickerRef.current,
      getValue: ref => {
        return ref.props.value || '';
      },
      clearValue: ref => {
        ref.props.onValueChange(ref.props.placeholder.value);
      },
      setValue: (_, value: string) => {
        setSelectedValue(value);
      },
    });
  }, [fieldName, registerField]);

  // const handleInputBlur = useCallback(() => {
  //   setIsFocused(false);

  //   setIsFilled(!!pickerRef.current?);
  // }, []);

  return (
    <>
      <Container
        // isFilled={isFilled}
        // isFocused={isFocused}
        isErrored={!!error}>
        <Picker
          ref={pickerRef}
          value={selectedValue}
          onValueChange={setSelectedValue}
          items={items}
          useNativeAndroidPickerStyle={false}
          {...rest}
        />
      </Container>
      {error && <ErrorMessage> {error} </ErrorMessage>}
    </>
  );
}
