import React from "react";
import { VStack, HStack, Heading, Text } from "native-base"
import { SharedElement } from 'react-navigation-shared-element';
import { Image } from "react-native";
import { takeOff } from "../../../assets/icons";
import { dateTime } from "../../Helper";

const FlightHeader = ({airline, user, hideQuestion}) => {
    return(
        <VStack
            flex={1}
            space={3}
            id="main-section"
        >
            <VStack
                flex={1}
                space={3}
            >
                <SharedElement id={airline?.ident_iata}>
                <Heading fontSize={'xl'} textAlign={'center'}>{airline?.ident_iata}</Heading>
                </SharedElement>
                <SharedElement id={airline?.type}>
                <Heading fontSize={'md'} textAlign={'center'}>{airline?.type}</Heading>
                </SharedElement>
                <HStack>
                    <SharedElement id={airline?.origin?.code_iata}>
                        <Heading>{airline?.origin?.code_iata}</Heading>
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
                    <SharedElement id={airline?.destination?.code_iata}>
                        <Heading>{airline?.destination?.code_iata}</Heading>
                    </SharedElement>
                </HStack>
                <SharedElement id={airline?.scheduled_out}>
                    <Text textAlign={'center'}>{dateTime(airline?.scheduled_out)}</Text>
                </SharedElement>
            </VStack>
            { !hideQuestion ? <Heading fontSize={'3xl'} textAlign={'center'}>{user?.name}</Heading> : null  }
            </VStack>
    )
}

export default FlightHeader;