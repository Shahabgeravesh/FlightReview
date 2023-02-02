import React, { useEffect, useState } from "react";
import { Box, Heading, Pressable, ScrollView, Text, VStack } from "native-base";

import { Button, FlightView, Input, InputDate, Loading } from '../../../Component';

import { spacing } from "../../../Constraints/size";
import colors from "../../../Constraints/colors";
import { useDispatch } from "react-redux";
import axios from "axios";
import moment from "moment";
import { ActivityIndicator } from "react-native";

const FlightSearch = ({navigation, route}) => {

  const { flight, date } = route.params;

  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null);
  const [noRecord, setNoRecord] = useState(true)

  const handle_request = () => {
    setLoading(true)
    setNoRecord(false)
    let start = moment(JSON.parse(date)).format("YYYY-MM-DD");
    let url = encodeURI(`https://aeroapi.flightaware.com/aeroapi/flights/${flight.trim()}?start=${start}`)
    axios({
      method: 'get',
      url: url,
      headers: {
        "Accept": "application/json",
        "x-apikey": "tiTyOkuL0EpVnZQAzfd27WSbbjiOyYEi"
      }
    })
    .then((res)=>{
      let { flights } = res.data;
      let result = flights.find(flight=>moment(flight.scheduled_out).format("YYYY-MM-DD") === start)
      if(!result){
        setNoRecord(true);
      } else {
        setData(result);
      }
      setLoading(false)
    })
    .catch((err)=>{
      setLoading(false);
      setNoRecord(true);
    })
  }

  useEffect(()=>{
    handle_request()
  },[])

    return (
      // <ScrollView
      //   flex={1}
      //   backgroundColor={colors.white}
      // >
        <VStack
          flex={1}
          space={3}
          safeAreaTop
        >
          {
            loading ? <Loading /> :
            <VStack
              flex={1}
              space={3}
              alignItems={'center'}
              padding={spacing*0.25}
              justifyContent={'center'}
            >
              {
                noRecord ?
                  <Pressable
                    width={'100%'}
                    rounded={'3xl'}
                    padding={spacing*0.25}
                    backgroundColor={colors.light}
                    onPress={()=>navigation.goBack()}
                  >
                    <Box
                      alignItems={'center'}
                    >
                      <Heading color={colors.primary}>Go back to find another one.</Heading>
                    </Box>
                  </Pressable>
                : <FlightView data={data} navigation={navigation} />
              }
            </VStack>
          }
        </VStack>
      // </ScrollView>
    )
}

export default FlightSearch;