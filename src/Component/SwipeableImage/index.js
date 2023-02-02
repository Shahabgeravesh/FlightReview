import React from 'react'
import { Box, Text, Heading, VStack, HStack } from 'native-base';
import { View, Image, StyleSheet, Pressable, Dimensions } from 'react-native'
import { SharedElement } from 'react-navigation-shared-element';
import colors from '../../Constraints/colors';
import { spacing } from '../../Constraints/size';
import { takeOff } from '../../../assets/icons';
import { dateTime } from '../../Helper';

import { swipeLeft, swipeRight } from '../../../assets/icons';
import FlightHeader from '../FlightHeader';
// import { image_url } from '../url'

const { width, height } = Dimensions.get("screen");
const CONTAINER_HEIGHT = (height*0.95) - (spacing*5)

export default function SwipeableImage({ user, willLike, willPass, navigation, category, airline, flightLogObject, handleLike, handlePass, handleLikePress, handlePassPress }) {
  return (
    <Pressable
      borderRadius={spacing}
      padding={spacing*0.25}
      height={CONTAINER_HEIGHT}
      backgroundColor={colors.secondary}
      onPress={()=>navigation.navigate('questions', {data: airline, category: user, flightLogObject: flightLogObject})}
    >
      <FlightHeader airline={airline} user={user} />
      <VStack
        flex={1}
        justifyContent={'flex-end'}
      >
        <HStack>
          <Box
            flex={1}
          >
            <Pressable
              onPress={()=>{
                handleLikePress()
              }}
            >
              <Image
                source={swipeLeft}
                style={{
                  width: 50,
                  height: 50
                }}
              />
            </Pressable>
          </Box>
          <Box
            flex={1}
            flexDirection={'row-reverse'}
          >
            <Pressable
              onPress={()=>{
                handlePassPress();
              }}
            >
              <Image
                source={swipeRight}
                style={{
                  width: 50,
                  height: 50
                }}
              />
            </Pressable>
          </Box>
        </HStack>
      </VStack>
    </Pressable>
  )
}

const boxStyle = {
  position: 'absolute',
  top: '50%',
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 20,
  paddingRight: 20,
  borderWidth: 3,
  borderRadius: 10,
}

const styles = StyleSheet.create({
  likeBox: {
    ...boxStyle,
    left: 40,
    borderColor: '#64EDCC',
  },
  passBox: {
    ...boxStyle,
    right: 40,
    borderColor: '#F06795',
  },
  photo: {
    height: width*1.8,
    width:width-20,
    borderRadius: 20,
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textPrimary: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
  },
  textSecondary: {
    color: 'white',
    marginLeft: 10,
    fontSize: 25,
  },
  textShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.80)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
})