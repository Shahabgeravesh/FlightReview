import React, { useEffect, useState } from "react";
import { Image, Modal } from 'react-native';
import { HStack, Text, VStack, Heading, Box, Pressable } from "native-base";
import { takeOff } from '../../../assets/icons'
import colors from "../../Constraints/colors";
import { spacing } from "../../Constraints/size";
import Button from "../Button";
import { axiosInstance, dateTime } from '../../Helper'
import Loading from "../Loading";
import FlightComment from "../FlightComment";
import FlightQuestion from "../FlightQuestion";
import { SharedElement } from "react-navigation-shared-element";

const FlightView = ({data, navigation}) => {

  const [loading, setLoading] = useState(false);

  const [getLoading, setGetLoading] = useState(false);
  const [isFlightExist, setIsFlightExist] = useState(false)
  const [flightData, setFlightData] = useState({});
  const [modelShow, setModelShow] = useState(false);

  const logFlight = () => {
    setLoading(true)
    axiosInstance.post('/user/flight_log', {flight: data?.inbound_fa_flight_id, flight_data: JSON.stringify(data)})
    .then((res)=>{
      getLogFlight()
      setLoading(false)
    })
    .catch((err)=>{
      setLoading(false)
    })
  }

  const getLogFlight = () => {
    setGetLoading(true)
    axiosInstance.get(`/user/flight_log/${data?.inbound_fa_flight_id}`)
    .then((res)=>{
      setGetLoading(false)
      setIsFlightExist(true)
      setFlightData(res.data)
      navigation.navigate('flightDetails', {data: data, flightLogObject: res.data})
    })
    .catch((err)=>{
      setGetLoading(false)
      setIsFlightExist(false)
    })
  }

  const submitAnswers = () => {
    setModelShow(true)
  }

  useEffect(()=>{
    getLogFlight()
  },[])

  return(
    <VStack
      flex={1}
      space={5}
      width={'100%'}
    >
        <VStack
          flex={2}
          space={3}
          id="main-section"
          borderRadius={spacing}
          padding={spacing*0.25}
          justifyContent={'center'}
          backgroundColor={colors.secondary}
        >
          <SharedElement id={data?.ident_iata}>
            <Heading fontSize={'xl'} textAlign={'center'}>{data?.ident_iata}</Heading>
          </SharedElement>
          <SharedElement id={data?.type}>
            <Heading fontSize={'md'} textAlign={'center'}>{data?.type}</Heading>
          </SharedElement>
          <HStack>
            <SharedElement id={data?.origin?.code_iata}>
              <Heading>{data?.origin?.code_iata}</Heading>
            </SharedElement>
            <SharedElement id="takeOff" style={{alignItems: 'center', flex:1}}>
              <Image
                source={takeOff}
                resizeMode={'contain'}
                style={{
                  width: 50,
                  height: 50,
                  flex: 1
                }}
              />
            </SharedElement>
            <SharedElement id={data?.destination?.code_iata}>
              <Heading>{data?.destination?.code_iata}</Heading>
            </SharedElement>
          </HStack>
          <SharedElement id={data?.scheduled_out}>
            <Text textAlign={'center'}>{dateTime(data?.scheduled_out)}</Text>
          </SharedElement>
        </VStack>
      {
          // isFlightExist ? <FlightQuestion flight={flightData} answersSubmitted={()=>submitAnswers()} /> :
          <VStack
            flex={1}
            space={3}
          >
            {
              getLoading ? <Loading /> :
              <>
                <Heading textAlign={'center'}>Is this your flight?</Heading>
                <HStack>
                  <Box flex={1} />
                  <Button
                    flex={1}
                    isLoading={loading}
                    color={colors.black}
                    onPress={()=>logFlight()}
                    title={<Heading>YES</Heading>}
                    backgroundColor={colors.secondary}
                  />
                  <Box flex={1} />
                </HStack>
                <Button
                  color={colors.light}
                  backgroundColor={colors.light}
                  onPress={()=>navigation.goBack()}
                  title={<Heading>Search for another flight</Heading>}
                />
              </>
            }
          </VStack>
      }
    </VStack>
  )
}

export default FlightView;