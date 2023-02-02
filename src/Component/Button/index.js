import React from "react";
import { Button as PressButton, Text } from 'native-base'
import colors from "../../Constraints/colors";

const Button = ({title, backgroundColor, color, ...props}) => {
  return(
    <PressButton
      {...props}
      rounded={'full'}
      variant={'unstyled'}
      backgroundColor={backgroundColor ? backgroundColor : colors.primary}
      _loading={{
        bg: "amber.400:alpha.70",
        _text: {
          color: "coolGray.700"
        }
      }}
    >
      <Text color={color ? color : colors.white} textAlign={'center'}>{title ? title : "Press me"}</Text>
    </PressButton>
  )
}

export default Button;