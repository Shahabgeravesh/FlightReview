import React, { useState } from "react";

import { signin } from '../../Redux/Authentication';
import { useDispatch } from "react-redux";

import axiosInstance from '../../Helper/axiosInstance'

import colors from "../../Constraints/colors";

import Button from "../Button";
import { Text, VStack } from "native-base";

import * as Device from 'expo-device';
import * as Network from 'expo-network';
import * as Location from 'expo-location';

const SkipSignin = () => {

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);

  const requestHandler = async () => {
    setError(null);
    setLoading(true);
    let device = await Device.brand;
    let ip_address = await Network.getIpAddressAsync();
    let { status } = await Location.requestForegroundPermissionsAsync();
    let location = null;
    if (status === 'granted') {
      location = await Location.getCurrentPositionAsync({});
    }

    let payload = {
      location: location,
      ip_address: ip_address,
      device: device
    }
    axiosInstance.post('/auth/auto', payload)
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