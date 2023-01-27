import React, { useState } from "react";
import { Box, Heading, Text, VStack } from "native-base";

import { useDispatch } from "react-redux";
import { signin } from "../../../Redux/Authentication";

import { Button, Input, SkipSignin } from "../../../Component";

import colors from '../../../Constraints/colors'
import { spacing } from '../../../Constraints/size'

import { axiosInstance } from '../../../Helper'

const SignIn = ({navigation}) => {

  const dispatch = useDispatch();

  const [form, setForm] = useState({email: '', password: ''})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);
  const setValue = (index, value) => {
    setForm({...form, [index]: value});
  }

  const signInHandler = () => {
    setError(null);
    setLoading(true);
    axiosInstance.post('/auth/signin', form)
    .then((res)=>{
      setLoading(false)
      dispatch(signin(res.data))
    })
    .catch((err)=>{
      setLoading(false)
      let { error } = err
      setError(error)
    })
  }

  return (
    <VStack
      flex={1}
      space={6}
      safeAreaTop
      alignItems={'center'}
      padding={spacing*0.25}
      justifyContent={'center'}
      backgroundColor={colors.white}
    >
      <Box
        rounded={'3xl'}
        padding={spacing*0.25}
        backgroundColor={colors.secondary}
      >
        <Heading color={colors.primary} size={'2xl'}>{('Flight Aware').toUpperCase()}</Heading>
      </Box>

      <VStack
        space={3}
        width={'100%'}
        rounded={'3xl'}
        padding={spacing*0.25}
        backgroundColor={colors.light}
      >
        <Box
          alignItems={'center'}
        >
          <Heading color={colors.primary}>Sign In</Heading>
        </Box>
        <Input
          title={'Email'}
          value={form.email}
          autoCapitalize={'none'}
          keyboardType={'email-address'}
          placeholder={'Enter email address'}
          onChangeText={(value)=>setValue('email', value)}
        />
        <Input
          secureTextEntry
          title={'Password'}
          value={form.password}
          placeholder={'Enter password'}
          onChangeText={(value)=>setValue('password', value)}
        />
        { error ? <Text fontSize={'xs'} textAlign={'center'} color={colors.error} >{error}</Text> : null }
        <Button title={'Sign In'} onPress={()=>signInHandler()} isLoading={loading} spinnerPlacement="end" />
      </VStack>
      <VStack
        width={'100%'}
        paddingLeft={spacing*0.25}
        paddingRight={spacing*0.25}
      >
        <Button
          color={colors.light}
          backgroundColor={colors.light_grey}
          onPress={()=>navigation.navigate('sign-up')}
          title={"Don't have an account?\nSign up for free now"}
        />
      </VStack>
      <SkipSignin />
    </VStack>
  )
}

export default SignIn;