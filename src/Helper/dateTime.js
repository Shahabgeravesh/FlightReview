import moment from "moment"

const dateTime = (date) => {
  if(date){
    return moment(date).format("DD-MM-YYYY - h:mm A")
  }

  return null
}

export {
  dateTime
}