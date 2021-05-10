import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from 'react';
import {Container, TextInput, ErrorMessage, Icon} from './styles';
import {TextInputProps} from 'react-native';
import {useField} from '@unform/core';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
  containerStyle?: {};
}
interface InputRef {
  focus(): void;
}
const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  {name, icon, containerStyle = {}, ...rest},
  ref,
) => {
  const inputRef = useRef<any>(null);
  const {fieldName, registerField, defaultValue, error} = useField(name);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isFilled, setIsFilled] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current.focus();
    },
  }));
  useEffect(() => {
    inputRef.current.value = defaultValue;
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      path: 'value',
      ref: inputRef.current,
    });
  }, [fieldName, registerField]);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    console.log(inputRef.current.value);

    setIsFilled(!!inputRef.current.value);
  }, []);

  return (
    <>
      <Container
        style={containerStyle}
        isFilled={isFilled}
        isFocused={isFocused}
        isErrored={!!error}>
        <Icon name={icon} size={20} color="#666360" />
        <TextInput
          ref={inputRef}
          onFocus={() => setIsFocused(true)}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
          keyboardAppearance="light"
          onChangeText={(value: any) => {
            if (inputRef.current) {
              inputRef.current.value = value;
            }
          }}
          placeholderTextColor="#383E71"
          {...rest}
        />
      </Container>
      {error && <ErrorMessage> {error} </ErrorMessage>}
    </>
  );
};

export default forwardRef(Input);
