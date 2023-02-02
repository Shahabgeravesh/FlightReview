import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { RectButton } from 'react-native-gesture-handler'
import SwipeableImage from '../../Component/SwipeableImage'

function Swipes({ users, currentIndex, handleLike, handlePass, swipesRef, navigation, category, airline, flightLogObject, handleLikePress, handlePassPress }) {
  const [willLike, setWillLike] = useState(false)
  const [willPass, setWillPass] = useState(false)
  const renderLeftActions = () => {
    return (
      <RectButton style={styles.container}>
        <SwipeableImage user={users[currentIndex]} navigation={navigation} category={category} airline={airline} flightLogObject={flightLogObject} />
      </RectButton>
    )
  }
  const renderRightActions = () => {
    return (
      <RectButton style={styles.container}>
        <SwipeableImage user={users[currentIndex]} navigation={navigation} category={category} airline={airline} flightLogObject={flightLogObject} />
      </RectButton>
    )
  }

  return (
    <Swipeable
      ref={swipesRef}
      friction={2}
      leftThreshold={40}
      rightThreshold={40}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
      onSwipeableLeftOpen={() => {
        setWillLike(false)
        handlePass()
      }}
      onSwipeableRightOpen={() => {
        setWillPass(false)
        handleLike()
      }}
      onSwipeableLeftWillOpen={() => setWillLike(true)}
      onSwipeableRightWillOpen={() => setWillPass(true)}
      containerStyle={{
        width: '100%',
      }}
    >
      <SwipeableImage user={users[currentIndex]} willLike={willLike} willPass={willPass} navigation={navigation} category={category} airline={airline} flightLogObject={flightLogObject} handleLike={()=>handleLike()} handlePass={()=>handlePass()} handleLikePress={()=>handleLikePress()} handlePassPress={()=>handlePassPress()} />
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default React.forwardRef((props, ref) => <Swipes swipesRef={ref} {...props}></Swipes>)