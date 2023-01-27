import React, { useEffect, useState } from "react";
import { Text, VStack, Heading, Box, TextArea } from "native-base";
import colors from "../../Constraints/colors";
import { spacing } from "../../Constraints/size";
import Button from "../Button";
import { axiosInstance } from '../../Helper'

const FlightComment = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)
  const [value, setValue] = useState('');

  const submit_comment = () => {

    // axiosInstance.post('/flight/comment', )
  }

  return(
    <VStack
      space={5}
      width={'100%'}
    >
      <Heading textAlign={'center'}>Any comments?</Heading>
      <TextArea
        value={value}
        rounded={spacing}
        variant={'unstyled'}
        padding={spacing*0.25}
        placeholder={"Enter here..."}
        backgroundColor={colors.secondary}
        onChangeText={(value)=>setValue(value)}
      />
      {error ? <Text fontSize={'xs'} color={colors.error} textAlign={'center'}>{error}</Text> : null}
      <Button title={"Submit"} />
    </VStack>
  )
}

export default FlightComment;