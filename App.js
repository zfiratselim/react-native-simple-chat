import { StatusBar } from 'expo-status-bar';
import React,{useState, useEffect} from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, Button, Image,TouchableHighlight } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import IO from "socket.io-client";

let sckt;
function NicknameScreen({navigation}) {
  const [nn, setNn]=useState('');
  const [btnClick,setBtnClick]=useState(false);

  useEffect(() => {
    if(!btnClick) return;
    fetch('https://simple-chat-server-20210711.herokuapp.com/login',{
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nick: nn,
    })
  })
      .then((response) => response.json())
      .then(json=>navigation.navigate('Chat',json))
      .catch((error) => console.error(error))
  }, [btnClick]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput 
      placeholder="Nickname" 
      style={styles.nicknametextInput}
      onChangeText={setNn}
      value={nn}
      />
      <Button title="Join Chat" onPress={()=>{
       setBtnClick(true);
      }}/>
    </View>
  );
}



function MessageBaloon({nick, message, time, gOra}){
  return(
    <View style={gOra?styles.messageBaloon0Con:styles.messageBaloon1Con}>
       <View style={[styles.messageBaloon,gOra?styles.messageBaloon0:styles.messageBaloon1]}>
      <Text>{nick}</Text>
      <Text>{message}</Text>
      <View style={styles.timeCon}><Text style={styles.time}>{time}</Text></View>
    </View>
    </View>
  )
}

function ChatScreen({route, navigation}) {
  const { nick,token } = route.params;
  const [messages,setMessages]=useState([
    {nick:"system", message:'Hello '+nick, time:"00.00",gOra:true},
  ]);
  const [btnClick,setBtnClick]=useState(false);
  const [message,setMessage]=useState('');
  const [socket, setSocket] = useState(null);
      useEffect(()=>{
        const sckt=IO("https://simple-chat-server-20210711.herokuapp.com",{transports:["websocket"],query:{token:token}});
         /* sckt.on('connect', (d) => {
            console.log("connected",d);
            subscribeToDateEvent();
          });
          sckt.on('disconnect', () => {
          });*/
          setSocket(sckt);
        },[])
        useEffect(()=>{
          if(!socket) return;
          socket.on('connect', () => {
            console.log("connected");
            subscribeToDateEvent();
          });
          socket.on('disconnect', () => {
          });
          socket.on('chat',d=>{
            d.gOra=d.token==token?false:true;
            setMessages(state=>[...state,d]);
          });
        },[socket])
        useEffect(()=>{
          if(!btnClick && message!=""){
            setMessage("");
          }
          if(!btnClick)return 
            socket.emit('chat',{token, message, nick});
            setBtnClick(false);

          },[btnClick]);
            // subscribe to socket date event
  const subscribeToDateEvent = (interval = 1000) => {
    socket.emit('subscribeToDateEvent', interval);
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ScrollView style={{width:"100%", height:"100%", paddingVertical:15, marginBottom:40}}>
        {messages.map((e,i)=>{
          return <MessageBaloon key={i} nick={e.nick} message={e.message} time={e.time} gOra={e.gOra}/>
        })}
      </ScrollView>
      <View style={styles.messageArea}>
        <TextInput 
          placeholder="send a message"
          style={styles.message}
          value={message}
          onChangeText={setMessage}
        />
        <TouchableHighlight
        onPress={()=>{setBtnClick(true);
        }}
        >
          <Image 
          source={require('./img/send.png')} 
          style={styles.sendImg}
          />
        </TouchableHighlight>
        
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Nickname">
      <Stack.Screen name="Nickname">
        {props => <NicknameScreen {...props}/>}
      </Stack.Screen>
      <Stack.Screen name="Chat">
        {props => <ChatScreen {...props}/>}
      </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nicknametextInput:{
    width:300,
    height:40,
    borderRadius:4,
    paddingHorizontal:10,
    marginBottom:5,
    backgroundColor:"#FFF"
  },
  messageArea:{
    flexDirection:"row",
    position:"absolute",
    paddingBottom:5,
    backgroundColor:"#FFF",
    bottom:0
  },
  message:{
    width:300,
    height:40,
    borderRadius:5,
    backgroundColor:"#FFF",
    paddingHorizontal:12,
    paddingVertical:10
  },
  sendImg:{
    width:40,
    height:40,
    borderRadius:5,
    marginLeft:5,
    backgroundColor:"#6886F7",
  },
  messageBaloon0Con:{
    paddingLeft:5,
    width:'100%',
    flexDirection:"row",
  },
  messageBaloon1Con:{
    paddingRight:5,
    width:'100%',
    flexDirection:"row-reverse",
  },
  messageBaloon:{
    maxWidth:200,
    margin:3,
    padding:5,
    borderRadius:5
  },
  messageBaloon0:{
    backgroundColor:"#6886F7",
  },

  messageBaloon1:{
    backgroundColor:"#FFF",
  },
  messageBaloon1Con:{
    paddingRight:5,
    width:'100%',
    flexDirection:"row-reverse",
  },
  timeCon:{
    flexDirection:"row-reverse"
  },
  time:{
    marginRight:3,
    fontSize:10
  }
});
