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
import {colors, metrics} from '../../styles/global';

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
  const {fieldName, registerField, defaultValue = '', error} = useField(name);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isFilled, setIsFilled] = useState<boolean>(false);

  useEffect(() => {
    inputRef.current.value = defaultValue;
  }, [defaultValue]);

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current.focus();
    },
  }));
  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(value: string) {
        inputRef.current.value = value;
        inputRef.current.setNativeProps({text: value});
      },
      clearValue() {
        inputRef.current.value = '';
        inputRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current.value);
  }, []);

  return (
    <>
      <Container
        style={containerStyle}
        isFilled={isFilled}
        isFocused={isFocused}
        isErrored={!!error}>
        <Icon name={icon} size={metrics.iconSize} color={colors.gray} />
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
          placeholderTextColor={colors.lightgray}
          {...rest}
        />
      </Container>
      {error && <ErrorMessage> {error} </ErrorMessage>}
    </>
  );
};

export default forwardRef(Input);
