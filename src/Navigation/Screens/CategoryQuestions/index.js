import React, { useEffect, useState } from "react";

import { Dimensions, Image, StyleSheet, View } from "react-native";
import { Box, Heading, HStack, Pressable, Text, VStack } from "native-base";

import colors from "../../../Constraints/colors";
import { spacing } from "../../../Constraints/size";
import { takeOff } from "../../../../assets/icons";
import { dateTime } from "../../../Helper";
import { SharedElement } from "react-navigation-shared-element";

import { axiosInstance } from "../../../Helper"


const CategoryQuestions = ({navigation, route}) => {

  const { data, category, flightLogObject } = route.params

  const [answer, setAnswer] = useState([]);
  const [questions, setQuestions] = useState([]);

  const ifPosted = (question) => {
    let result = answer.filter(ans=>ans.flight === flightLogObject.id && ans.question === question)
    return result.length > 0 ? true : false
  }

  const getPercentage = (question) => {
    let payload = {
      total: answer.filter(ans=>ans.question === question.id).length,
      index1: answer.filter(ans=>ans.question === question.id && ans.index === 0).length,
      index2: answer.filter(ans=>ans.question === question.id && ans.index === 1).length
    }
    if(payload.total > 0){
      let index1 = (payload.index1/payload.total)*100;
      payload.index1 = index1

      let index2 = (payload.index2/payload.total)*100;
      payload.index2 = index2
    }

    return payload
  }

  const fetchQuestions = () => {
    axiosInstance.get(`/question/${category.id}`)
    .then((res)=>setQuestions(res.data))
    .catch((err)=>console.log(err))
  }

  const fetchAnswer = () => {
    axiosInstance.get(`/flight/subAnswer/fetch/${flightLogObject?.id}`)
    .then((res)=>setAnswer(res.data))
    .catch((err)=>console.log(err))
  }

  const postAnswer = async (question, index, option) => {
    let payload = await {
      question:question,
      index: index,
      option: option,
      flight: flightLogObject.id
    }

    axiosInstance.post("/flight/subAnswer/save", payload)
    .then((res)=>fetchAnswer())
    .catch((err)=>console.log(err))
  }

  const PercentageView = ({question}) => {
    return (
      <View
        style={{
          flex:1,
          overflow: "hidden",
          height:50,
          borderRadius: spacing
        }}
      >
        <View
          style={{
            flex:1,
            backgroundColor: "white",
            borderRadius: spacing
          }}
        />
        <View style={[StyleSheet.absoluteFill, {width: `${getPercentage(question).index1}%`, backgroundColor: "lightgrey"}]} />
        <View
          style={{
            top:0,
            left:0,
            right:0,
            bottom:0,
            borderWidth: 2,
            borderRadius: spacing,
            alignItems:"center",
            position: "absolute",
            flexDirection: "row",
            borderColor: "black",
            justifyContent: "center",

          }}
        >
          <View
            style={{
              flex:1,
              padding: 5,
              alignItems: "center",
              borderColor: "black",

            }}
          >
            <Text>{JSON.parse(question.options)[0]}</Text>
            <Text>{getPercentage(question).index1.toFixed(0)}%</Text>
          </View>
          <View
            style={{
              flex:1,
              padding: 5,
              alignItems: "center",
              borderColor: "black"
            }}
          >
            <Text>{JSON.parse(question.options)[1]}</Text>
            <Text>{getPercentage(question).index2.toFixed(0)}%</Text>
          </View>
        </View>
      </View>
    )
  }

  useEffect(()=>{
    fetchAnswer();
    fetchQuestions();
  },[])

  return(
    <VStack
      flex={1}
      safeAreaTop
      space={3}
      padding={spacing*0.25}
    >
      <Pressable
        flex={1}
        borderRadius={spacing}
        padding={spacing*0.25}
        // height={CONTAINER_HEIGHT}
        onPress={()=>navigation.goBack()}
        backgroundColor={colors.secondary}
      >
        <VStack
          flex={1}
          space={3}
          id="main-section"
        >
          <VStack
            flex={1}
            space={3}
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
          <Heading fontSize={'3xl'} textAlign={'center'}>{category.name}</Heading>
        </VStack>
      </Pressable>
      <VStack
        flex={2}
        space={3}
      >
        {
          questions.map((question, key)=>{
            return(
              <HStack
                key={key}
                alignItems={'center'}
              >
                <View
                  style={{
                    marginRight: 5,
                    flex:1

                  }}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: "bold",
                      color:"#391e3e",


                    }}
                  >{question.question}</Text>
                </View>
                {
                  ifPosted(question.id) ?
                    <PercentageView question={question} />
                  :
                  <View
                    style={{
                      flex:1,
                      borderWidth:2,
                      flexDirection:'row',
                      borderColor: "black",
                      borderRadius: spacing
                    }}
                  >
                    {
                      JSON.parse(question.options).map((option, key)=>{
                        return(
                          <Pressable key={key}
                            style={{
                              flex:1,
                              padding: 5,
                              alignItems: "center",
                              borderColor: "black",
                              borderRightWidth:JSON.parse(question.options).length > key+1 ? 2 : 0
                            }}
                            onPress={()=>postAnswer(question.id, key, option)}
                          >
                            <Text>{option}</Text>
                          </Pressable>
                        )
                      })
                    }
                  </View>
                }
              </HStack>
            )
          })
        }
      </VStack>
    </VStack>
  )
}

export default CategoryQuestions;