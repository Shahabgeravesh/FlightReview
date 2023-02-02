import React from "react";
import { Box } from "native-base";
import { ActivityIndicator } from "react-native";

const Loading = () => {
  return(
    <Box>
      <ActivityIndicator color={'black'} />
    </Box>
  )
}

export default Loading;