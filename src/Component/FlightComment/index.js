import React, { useEffect, useState } from "react";
import { Text, VStack, Heading, Box, TextArea, ScrollView } from "native-base";
import colors from "../../Constraints/colors";
import { spacing } from "../../Constraints/size";
import Button from "../Button";
import { axiosInstance } from '../../Helper'
import { Modal } from "react-native";
import FlightHeader from "../FlightHeader";

const FlightComment = ({ navigation, route }) => {

  const { flight, user, airline } = route.params

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)
  const [value, setValue] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(null)

  const submit_comment = () => {
    setLoading(true)
    setSubmitSuccess(null)
    axiosInstance.post('/flight/comment', {flight: flight, comment: value})
    .then((res)=>{
      setLoading(false)
      setValue('');
      setSubmitSuccess(res?.data)
    })
    .catch((err)=>{
      setLoading(false)
    })
  }

  return(
    <VStack
      flex={1}
    >
      <ScrollView
        flex={1}
        padding={spacing*0.5}
      >
        <VStack
          space={6}
          safeAreaTop
        >  
          <FlightHeader user={user} airline={airline} hideQuestion={true} />
          <VStack
            flex={3}
            space={5}
            width={'100%'}
          >
            <Heading textAlign={'center'}>Any comments?</Heading>
            <TextArea
              value={value}
              rounded={spacing}
              padding={spacing*0.25}
              placeholder={"Enter here..."}
              backgroundColor={colors.secondary}
              onChangeText={(value)=>setValue(value)}
            />
            {error ? <Text fontSize={'xs'} color={colors.error} textAlign={'center'}>{error}</Text> : null}
            {submitSuccess ? <Text fontSize={'xs'} color={colors.primary} textAlign={'center'}>{submitSuccess?.message}</Text> : null}
            <Button title={"Submit"} isLoading={loading} onPress={()=>submit_comment()} />
          </VStack>
        </VStack>
      </ScrollView>
    </VStack>
  )
}

export default FlightComment;