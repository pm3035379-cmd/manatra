import React, { useCallback, useRef, useState } from 'react'
import {  Dimensions, ImageBackground, Pressable, StatusBar, View } from 'react-native'
import {useSharedValue,withSpring,useAnimatedStyle} from 'react-native-reanimated';
import {useAudioPlayer} from 'expo-audio'
import Animated from 'react-native-reanimated';
import { Gesture, GestureDetector  } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { useRouter } from 'expo-router';
const width=Dimensions.get("window").width;
const height=Dimensions.get("window").height;

const beforeImage=[
  require("../../assets/syrup.png"),
  require("../../assets/syrup.png"),
  require("../../assets/syrup.png"),
  require("../../assets/syrup.png"),
  require("../../assets/syrup.png"),
  require("../../assets/syrup.png"),
  require("../../assets/syrup.png"),
  require("../../assets/syrup.png"),

];

const afterImage=[
  require("../../assets/crackedSyrup.png"),
  require("../../assets/crackedSyrup.png"),
  require("../../assets/crackedSyrup.png"),
  require("../../assets/crackedSyrup.png"),
  require("../../assets/crackedSyrup.png"),
  require("../../assets/crackedSyrup.png"),
  require("../../assets/crackedSyrup.png"),
  require("../../assets/crackedSyrup.png"),
];

const sound=[
  require("../../assets/sound1.mp3"),
  require("../../assets/sound1.mp3"),
  require("../../assets/sound1.mp3"),
  require("../../assets/sound1.mp3"),
  require("../../assets/sound1.mp3"),
  require("../../assets/sound1.mp3"),
  require("../../assets/sound1.mp3"),
  require("../../assets/sound1.mp3"),
];

const index = () => {
const router = useRouter();
  const [changed,setChanged]=useState([false,false,false,false,false,false,false,false]);
const [ind,setInd]=useState(2);
const [allCracked, setAllCracked] = useState(false);

const [position,setPosition]=useState({
  top:Math.random()*(height-200),
  left:Math.random()*(width-200),
});
const [o,setO]=useState(1);
const zoom=[
  useSharedValue(1),
  useSharedValue(1),
  useSharedValue(1),
  useSharedValue(1),
  useSharedValue(1),
  useSharedValue(1),
  useSharedValue(1),
  useSharedValue(1),

];

const play =[
  useAudioPlayer(sound[0]),
  useAudioPlayer(sound[1]),
  useAudioPlayer(sound[2]),
  useAudioPlayer(sound[3]),
  useAudioPlayer(sound[4]),
  useAudioPlayer(sound[5]),
  useAudioPlayer(sound[6]),
  useAudioPlayer(sound[7]),
];

const changedValue = useRef([false,false,false,false,false,false,false,false]);
const activeTouches = useRef(new Map<number,number>());
const checkTime= useRef<ReturnType<typeof setTimeout> | null>(null);


const getIndex=(x:number,y:number)=>{
  const column= x<width/2?0:1;
  const row= Math.min(3,Math.floor(y/(height/4)));
  return row*2+column;
}

const updatedChanged=useCallback((I:boolean[])=>{
 changedValue.current=I;
      setChanged(I);
},[])

const touchGrid=useCallback((index:number,touchId:number)=>{
activeTouches.current.set(touchId,index);
if(changedValue.current[index]) return;
const I=[...changedValue.current];
I[index]= true;
updatedChanged(I);
zoom[index].value=withSpring(0.94,{
  damping:12,
  stiffness:180
});
play[index].seekTo(0);
play[index].play();


if (I.every(Boolean)) {
  setO(0);
  setInd(0);
  setAllCracked(true);
}


},[sound,changedValue,zoom]);

const releaseTouch=useCallback((index:number)=>{
  activeTouches.current.delete(index);
  
},[])

const gesture= Gesture.Manual().runOnJS(true).onTouchesDown((event,manager)=>{
  manager.activate(),
  event.allTouches.forEach((e)=>{
    const x=e.absoluteX;
    const y=e.absoluteY;
    const index=getIndex(x,y);
    touchGrid(index,e.id);
  
  })
}).onTouchesUp((event,manager)=>{
  event.changedTouches.forEach(e=>{
          releaseTouch(e.id);
  })
}).onTouchesCancelled((event)=>{
  event.changedTouches.forEach((e)=>{
    releaseTouch(e.id);
  })
}).onTouchesMove((event,manager)=>{
  event.changedTouches.forEach((t)=>{
    const x=t.absoluteX;
    const y=t.absoluteY;
    const i=getIndex(x,y);
    const preview = activeTouches.current.get(t.id);
    if(preview!=i){
    touchGrid(i,t.id);
    }

  })
})


const gridStyle=[
  useAnimatedStyle(()=>({
    transform:[{scale:zoom[0].value}],

  })),
  useAnimatedStyle(()=>({
    transform:[{scale:zoom[1].value}],

  })),
  useAnimatedStyle(()=>({
    transform:[{scale:zoom[2].value}],

  })),
  useAnimatedStyle(()=>({
    transform:[{scale:zoom[3].value}],

  })),
  useAnimatedStyle(()=>({
    transform:[{scale:zoom[4].value}],

  })),
  useAnimatedStyle(()=>({
    transform:[{scale:zoom[5].value}],

  })),
  useAnimatedStyle(()=>({
    transform:[{scale:zoom[6].value}],

  })),
  useAnimatedStyle(()=>({
    transform:[{scale:zoom[7].value}],

  })),
]


const cellWidth=width/2;
const cellHeight=height/4;


  return (
  <View style={styles.screen}>
    <StatusBar hidden />

    {/* Background image */}
    <ImageBackground
      source={require("../../assets/crackedSyrup.png")}
      resizeMode="cover"
      style={StyleSheet.absoluteFill}
    />
<Pressable onPress={()=> router.push("/FrontPage")} style={[styles.fp, position]}>



    {/* Random 200 x 200 image */}
    <Image
      source={require("../../assets/fp.png")}
      resizeMode="cover"
      style={{width:200,height:200}}
    />
    </Pressable>
<View
  pointerEvents={allCracked ? "none" : "auto"}
  style={styles.grid}
>
    {/* Eight fixed pieces */}
    {[0,1,2,3,4,5,6,7].map((i) => (
      <GestureDetector
  key={i}
  gesture={gesture}
 
>
        <Animated.View
          style={[
            styles.cell,
            { width: cellWidth, height: cellHeight },
            gridStyle[i],
          ]}
        >
          <Image
            source={changed[i] ? afterImage[i] : beforeImage[i]}
            resizeMode="cover"
            style={[styles.image,{
              opacity:o, zIndex:ind
            }]}

          />
        </Animated.View>
      </GestureDetector>
    ))}
    </View>
  </View>
);
}

const styles=StyleSheet.create({
  screen:{
    flex:1,
    flexDirection:"row",
    flexWrap:"wrap",
    
    overflow:"hidden",
    position:"relative"

  },
  cell:{
    overflow:"hidden",
    margin:0,
    padding:0
  },
  image:{
    width:"100%",
    height:"100%",
    position:"absolute",
   zIndex:3
    
  },
  fp: {
  position: "absolute",
  width:200,
  height:200,
  zIndex: 0,
},
grid: {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  flexDirection: "row",
  flexWrap: "wrap",
  zIndex: 2,
},
})


export default index
