
import React, { useState } from 'react';
import { View, Dimensions, Image, StyleSheet, Pressable } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useAudioPlayer } from 'expo-audio';

const img1 = require('../../../assets/image/img1.png');
const img2 = require('../../../assets/image/img2.png');
const img3 = require('../../../assets/image/img3.png');
const img4 = require('../../../assets/image/img4.png');

const sound = require('../../../assets/sound1.mp3');

const images = [img1, img2, img3, img4];

const Home = () => {
  const router=useRouter();

  const { width, height } = Dimensions.get('window');

  // 8 independent zoom values
  const zoom = [
    useSharedValue(1),
    useSharedValue(1),
    useSharedValue(1),
    useSharedValue(1),
    useSharedValue(1),
    useSharedValue(1),
    useSharedValue(1),
    useSharedValue(1),
  ];

  // 8 audio players
  const player = [
    useAudioPlayer(sound),
    useAudioPlayer(sound),
    useAudioPlayer(sound),
    useAudioPlayer(sound),
    useAudioPlayer(sound),
    useAudioPlayer(sound),
    useAudioPlayer(sound),
    useAudioPlayer(sound),
  ];

  // Each piece has its own image number
  const [changedValue, setChangedValue] = useState([
    0, 0, 0, 0, 0, 0, 0, 0
  ]);

  // Store finger ID and cell index
  const touchId = React.useRef(new Map<number, number>());

  // Find the touched cell
  const checkIndex = (x: number, y: number) => {

    const column = Math.min(
      1,
      Math.max(0, Math.floor(x / (width / 2)))
    );

    const row = Math.min(
      3,
      Math.max(0, Math.floor(y / (height / 4)))
    );

    return row * 2 + column;
  };

  // Change only the touched piece
  const touchGrid = (index: number, id: number) => {

    if (index < 0 || index > 7) return;

    touchId.current.set(id, index);

    const next = [...changedValue];

    // Image sequence: 0 -> 1 -> 2 -> 3 -> 0
    next[index] = (next[index] + 1) % 4;

    setChangedValue(next);

    // Zoom effect
    zoom[index].value = withSpring(0.90, {
      damping: 12,
      stiffness: 180,
    });

    // Play sound
    player[index].seekTo(0);
    player[index].play();
  };

  // Release finger
  const release = (id: number) => {

    const index = touchId.current.get(id);

    if (index !== undefined) {
      zoom[index].value = withSpring(1);
    }

    touchId.current.delete(id);
  };

  // Gesture for the complete grid
  const HandleGesture = Gesture.Manual()
    .runOnJS(true)

    .onTouchesDown((event, manager) => {

      manager.activate();

      event.allTouches.forEach(e => {

        const index = checkIndex(e.x, e.y);

        touchGrid(index, e.id);
      });
    })

    .onTouchesMove(event => {

      event.allTouches.forEach(e => {

        const index = checkIndex(e.x, e.y);

        const previousIndex = touchId.current.get(e.id);

        if (previousIndex !== index) {
          touchGrid(index, e.id);
        }
      });
    })

    .onTouchesUp(event => {

      event.changedTouches.forEach(e => {
        release(e.id);
      });
    })

    .onTouchesCancelled(event => {

      event.changedTouches.forEach(e => {
        release(e.id);
      });
    });

  // 8 animation styles
  const gridStyle = [
    useAnimatedStyle(() => ({
      transform: [{ scale: zoom[0].value }],
    })),

    useAnimatedStyle(() => ({
      transform: [{ scale: zoom[1].value }],
    })),

    useAnimatedStyle(() => ({
      transform: [{ scale: zoom[2].value }],
    })),

    useAnimatedStyle(() => ({
      transform: [{ scale: zoom[3].value }],
    })),

    useAnimatedStyle(() => ({
      transform: [{ scale: zoom[4].value }],
    })),

    useAnimatedStyle(() => ({
      transform: [{ scale: zoom[5].value }],
    })),

    useAnimatedStyle(() => ({
      transform: [{ scale: zoom[6].value }],
    })),

    useAnimatedStyle(() => ({
      transform: [{ scale: zoom[7].value }],
    })),
  ];

  return (
<>

<View style={styles.d}>
  <View style={styles.n}>
     <Pressable onPress={()=>router.push("/components/Note")}>
      <Image style={styles.img} source={require("../../../assets/Note.png")}/>
    </Pressable>
     <Pressable onPress={()=>router.push("/components/Task")}>
      <Image style={styles.img} source={require("../../../assets/task.png")}/>
    </Pressable>
  </View>
  <View style={styles.n1}>
 <Pressable onPress={()=>router.push("/components/StudentInfo")}>
      <Image style={styles.img} source={require("../../../assets/info.png")}/>
    </Pressable>
  </View>
  <View style={styles.n2}>
 <Pressable onPress={()=>router.push("/components/Form")}>
      <Image style={styles.img} source={require("../../../assets/form.png")}/>
    </Pressable>
     <Pressable onPress={()=>router.push("/components/Setting")}>
      <Image style={{width:200,height:200}} source={require("../../../assets/setting.png")}/>
    </Pressable>
  </View>

</View>

    <GestureDetector gesture={HandleGesture}>

      <View style={styles.screen}>

        {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (

          <Animated.View
            key={i}
            style={[
              styles.cell,
              {
                width: width / 2,
                height: height / 4,
              },
              gridStyle[i],
            ]}
          >

            <Image
              source={images[changedValue[i]]}
              style={styles.image}
              resizeMode="stretch"
            />

          </Animated.View>

        ))}



      </View>

    </GestureDetector>

   

    </>
  );
};

const styles = StyleSheet.create({

  screen: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'hidden',
    backgroundColor:"#910085"
    
  },

  cell: {
    overflow: 'hidden',
    margin: 0,
    padding: 0,
  },

  image: {
    width: '100%',
    height: '100%',
  },
  d:{
    position:"relative",
    top:0,
    display:"flex",
    zIndex:10
  },
  n:{
    position:"absolute",
    flexDirection:"row",
    gap:20,
    top:100,
    zIndex:10,
    
  },
  img:{
    width:200,
    height:200
  },
  n1:{
     position:"absolute",
     alignItems:"center",
     justifyContent:"center",
     top:350,
     left:100,
     zIndex:10
  }
  ,n2:{
     position:"absolute",
    flexDirection:"row",
    gap:20,
    top:550,
    zIndex:10
  }

});

export default Home;
