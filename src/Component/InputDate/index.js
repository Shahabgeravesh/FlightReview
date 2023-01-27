import React, { useState } from "react";
import { Pressable, Text, VStack } from "native-base";
import colors from "../../Constraints/colors";
import { spacing } from "../../Constraints/size";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";

const Title = ({title}) => {
  return(
    <Text color={colors.light_grey}>{title}</Text>
  )
}

const InputDate = ({title, placeholder, ...props}) => {

  const { value, onChangeText } = {...props};

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    onChangeText(date)
    hideDatePicker();
  };

  return(
    <>
      <Pressable onPress={()=>showDatePicker()} >
        <VStack
          space={1}
          rounded={'3xl'}
          padding={spacing*0.2}
          backgroundColor={colors.white}
        >
          {title ? <Title title={title} /> : null}
          <Text fontSize={'sm'} color={colors.light_grey}>{placeholder ? value ? moment(value).format('DD-MM-YYYY') : placeholder : 'Enter here ...'}</Text>
        </VStack>
      </Pressable>
      <DateTimePickerModal
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        isVisible={isDatePickerVisible}
        date={value ? value : new Date()}
      />
    </>
  )
}

export default InputDate;