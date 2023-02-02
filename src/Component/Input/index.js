import React from "react";
import { Box, Input as TextInput, Text, VStack } from "native-base";
import colors from "../../Constraints/colors";
import { spacing } from "../../Constraints/size";

const Title = ({title}) => {
  return(
    <Text color={colors.light_grey}>{title}</Text>
  )
}

const Input = ({title, placeholder, ...props}) => {
  return(
    <VStack
      space={1}
      rounded={'3xl'}
      padding={spacing*0.2}
      backgroundColor={colors.white}
    >
      {title ? <Title title={title} /> : null}
      <TextInput
        {...props}
        padding={0.5}
        fontSize={13}
        width={'100%'}
        variant={'unstyled'}
        placeholder={placeholder ? placeholder : 'Enter here ...'}
      />
    </VStack>
  )
}

export default Input;