import React, { useRef, useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import Constants from 'expo-constants'
import Swipes from "../../../Component/Swipes"
import { axiosInstance } from "../../../Helper";
import FlightComment from "../../../Component/FlightComment";

const CategoryScreen = ({navigation, route}) => {

    const [items, setItems] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0)
    const swipesRef = useRef(null)

    const {data, flightLogObject} = route.params;

    const fetchListing = async () => {
      axiosInstance.get('/category')
      .then((res)=>setItems(res.data))
      .catch((err)=>console.log(err))
    }

    const handleListingLike = async (index) => {
      if(!items[currentIndex]?.userAction) {
        let option = "NO";
        if(index === 0) {
          option = "YES";
        }

        let payload = {
          question: items[currentIndex]?.id,
          flight: flightLogObject?.id,
          index: index,
          option: option
        }

        // fetchListing()
        axiosInstance.post("/flight/answer", payload)
        .then((res)=>null)
        .catch((err)=>console.log(err))
      }
    }

    useEffect(()=>{
        fetchListing();
    },[])

    function handleLike() {
        // swiping right
        handleListingLike(1)
        nextUser()
      }

      function handlePass() {
        // swiping left
        handleListingLike(0)
        nextUser()
      }

      function nextUser() {
        const nextIndex = currentIndex + 1
        if(items.length - 1 === currentIndex){
          navigation.navigate('flightComment', {flight: flightLogObject?.id, user: items[currentIndex], airline: data})
        } else {
          setCurrentIndex(nextIndex)
        }
      }

      function handleLikePress() {
        swipesRef.current.openRight()
        handleListingLike(1)
      }
      function handlePassPress() {
        swipesRef.current.openLeft()
        handleListingLike(0)
      }

      return (
          <View style={styles.container}>
              <View style={styles.swipes}>
                  {items.length > 0 &&
                  items.map((u, i) =>{
                    return(
                      currentIndex === i && (
                        <Swipes
                          key={i}
                          ref={swipesRef}
                          currentIndex={currentIndex}
                          users={items}
                          handleLike={handleLike}
                          handleLikePress={handleLikePress}
                          handlePass={handlePass}
                          handlePassPress={handlePassPress}
                          navigation={navigation}
                          category={data}
                          airline={data}
                          flightLogObject={flightLogObject}
                        />
                      )
                    )
                  })}
              </View>
              {/* <FlightComment isVisible={commentBox}  /> */}
          </View>
      )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Constants.statusBarHeight,
    },
    swipes: {
      flex: 1,
      padding: 10,
      paddingTop: 8
    },
  })

export default CategoryScreen;