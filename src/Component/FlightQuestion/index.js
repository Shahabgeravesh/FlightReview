import React, { useEffect, useRef, useState } from "react";
import { Box, Heading, Text, VStack } from "native-base";
import { Image } from 'react-native';

import { axiosInstance } from "../../Helper";

import Swipeable from 'react-native-gesture-handler/Swipeable'
import { RectButton } from 'react-native-gesture-handler'

import colors from "../../Constraints/colors";
import { spacing } from "../../Constraints/size";

import { swipeLeft, swipeRight } from '../../../assets/icons'
import FlightComment from "../FlightComment";

const FlightQuestion = ({flight, answersSubmitted}) => {

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0)
  const [commentModal, setCommentModal] = useState(false);
  let swipableRef = useRef();

  const getQuestions = () => {
    axiosInstance.get('/question/1')
    .then((res)=>{
      setQuestions(res.data);
    })
  }

  const Item = ({data}) => {
    let { question, id } = data
    return(
      <VStack
        width={'100%'}
        rounded={spacing}
        padding={spacing*0.25}
        backgroundColor={colors.secondary}
      >
        <Heading textAlign={'center'}>{question}</Heading>
      </VStack>
    )
  }

  const submitAnswer = (index, answer, question_index) => {
    let payload = {
      question: questions[question_index]?.id,
      flight: flight?.id,
      index: index,
      option: answer
    };

    axiosInstance.post('/flight/answer', payload)
    .then((res)=>{
      console.log(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const handleSwipe = (answer) => {
    swipableRef.close();
    let question_index = current;
    let index = answer === 'yes' ? 0 : 1;
    submitAnswer(index, answer, question_index);
    if(questions[current+1]?.id){
      setCurrent(current+1);
    } else {
      setCurrent(current+1);
      setCommentModal(true)
    }
  }

  useEffect(()=>{
    getQuestions()
  },[])

  return(
    <Swipeable
      friction={1}
      overshootLeft={false}
      overshootRight={false}
      ref={ref => swipableRef = ref}
      renderLeftActions={()=>(
        <RectButton>
          <Image
            source={swipeLeft}
            resizeMode={'contain'}
            style={{
              width: 50,
              height: 50,
            }}
          />
        </RectButton>
      )}
      renderRightActions={()=>(
        <RectButton>
          <Image
            source={swipeRight}
            resizeMode={'contain'}
            style={{
              width: 50,
              height: 50,
            }}
          />
        </RectButton>
      )}
      onSwipeableLeftWillOpen={() => handleSwipe('no')}
      onSwipeableRightWillOpen={() => handleSwipe('yes')}
    >
      { questions[current]?.id ? !commentModal ? <Item data={questions[current]} /> : null : null }
      { commentModal ? <FlightComment /> : null }
    </Swipeable>
  )
}

export default FlightQuestion;