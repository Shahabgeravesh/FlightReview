import React, { useState } from "react";

import { signin } from '../../Redux/Authentication';
import { useDispatch } from "react-redux";

import axiosInstance from '../../Helper/axiosInstance'

import colors from "../../Constraints/colors";

import Button from "../Button";
import { Text, VStack } from "native-base";

const SkipSignin = () => {

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);

  const requestHandler = () => {
    setError(null);
    setLoading(true);
    axiosInstance.post('/auth/auto')
    .then((res)=>{
      setLoading(false);
      dispatch(signin(res.data))
    })
    .catch((err)=>{
      setLoading(false)
      let { error } = err
      setError(error)
    })
  }

  return(
    <VStack
      space={1}
    >
      <Button
        isLoading={loading}
        color={colors.primary}
        onPress={()=>requestHandler()}
        backgroundColor={colors.secondary}
        title={"Skip sign in & use the application"}
      />
      {error ? <Text fontSize={'xs'} color={colors.error} textAlign={'center'}>{error}</Text> : null}
    </VStack>
  )
}

export default SkipSignin;