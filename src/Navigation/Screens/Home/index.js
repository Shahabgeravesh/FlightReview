import React, { useState } from "react";
import { Box, Heading, Text, VStack } from "native-base";

import { Button, Input, InputDate } from '../../../Component';

import { spacing } from "../../../Constraints/size";
import colors from "../../../Constraints/colors";

import { signout } from "../../../Redux/Authentication";
import { useDispatch } from "react-redux";
import axiosInstance from "../../../Helper/axiosInstance";
import moment from "moment";

const Home = ({navigation}) => {

  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({flight: '', date: null});

  const setValue = (index, value) => {
    setForm({...form, [index]: value});
  }

  const handle_request = () => {
    setError(null)
    if(form.flight.length > 0 && form.date !== null) {
      navigation.navigate("flight-search", {...form, date: JSON.stringify(form.date)});
    } else {
      setError('Please enter flight number & date')
    }
  }

    return (
      <VStack
        flex={1}
        safeAreaTop
        backgroundColor={colors.white}
      >
        <Box
          rounded={'3xl'}
          padding={spacing*0.25}
          marginLeft={spacing*0.25}
          marginRight={spacing*0.25}
          backgroundColor={colors.secondary}
        >
          <Heading color={colors.primary} size={'2xl'} textAlign={'center'}>{('Flight Aware').toUpperCase()}</Heading>
        </Box>
        <VStack
          flex={1}
          space={6}
          safeAreaTop
          alignItems={'center'}
          padding={spacing*0.25}
        >
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
              <Heading color={colors.primary}>Search your flight</Heading>
            </Box>
            <Input
              value={form.flight}
              title={'Flight number'}
              autoCapitalize={'none'}
              placeholder={'Enter flight number'}
              onChangeText={(value)=>setValue('flight', value)}
            />
            <InputDate
              value={form.date}
              title={'Flight date'}
              placeholder={'Select flight date'}
              onChangeText={(value)=>setValue('date', value)}
            />
            {error ? <Text fontSize={'xs'} color={colors.error} textAlign={'center'}>{error}</Text> : null}
            <Button title={'Search'} onPress={()=>handle_request()} isLoading={loading} spinnerPlacement="end" />
          </VStack>
        </VStack>
      </VStack>
    )
}

export default Home;