import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, Button, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function NicknameScreen({navigation}) {
  const [nn, setNn]=useState('');
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput 
      placeholder="Nickname" 
      style={styles.nicknametextInput}
      onChangeText={setNn}
      value={nn}
      />
      <Button title="Join Chat" onPress={()=>navigation.navigate('Chat',{nickname:nn})}/>
    </View>
  );
}

function MessageBaloon({nick, message, time, gOra}){

  return(
    <View style={gOra?styles.messageBaloon0Con:styles.messageBaloon1Con}>
       <View style={[styles.messageBaloon,gOra?styles.messageBaloon0:styles.messageBaloon1,{color:"#"}]}>
      <Text>{nick}</Text>
      <Text>{message}</Text>
      <View style={styles.timeCon}><Text style={styles.time}>{time}</Text></View>
    </View>
    </View>
  )
}

function ChatScreen({route, navigation}) {
  const { nickname } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ScrollView style={{width:"100%", height:"100%",paddingVertical:15,marginBottom:40}}>
        <MessageBaloon nick="System" message={`Hello ${nickname}`} time="17.25" gOra={true}/> 
        <MessageBaloon nick="Ali" message="Bu bir deneme mesajıdır" time="17.25" gOra={true}/> 
        <MessageBaloon nick="Veli" message="Bu bir deneme mesajıdır 1" time="17.25"gOra={false}/>
        <MessageBaloon nick="Ali" message="Bu bir deneme mesajıdır 2" time="17.26"gOra={true}/>
        <MessageBaloon nick="Veli" message="Bu bir deneme mesajıdır 3 Bu bir deneme mesajıdır 3 Bu bir deneme mesajıdır 3 " time="17.26"gOra={false}/>
        <MessageBaloon nick="Ali" message="Bu bir deneme mesajıdır" time="17.25" gOra={true}/> 
        <MessageBaloon nick="Veli" message="Bu bir deneme mesajıdır 1" time="17.25"gOra={false}/>
        <MessageBaloon nick="Ali" message="Bu bir deneme mesajıdır 2" time="17.26"gOra={true}/>
        <MessageBaloon nick="Veli" message="Bu bir deneme mesajıdır 3 Bu bir deneme mesajıdır 3 Bu bir deneme mesajıdır 3 " time="17.26"gOra={false}/>
        <MessageBaloon nick="Ali" message="Bu bir deneme mesajıdır" time="17.25" gOra={true}/> 
        <MessageBaloon nick="Veli" message="Bu bir deneme mesajıdır 1" time="17.25"gOra={false}/>
        <MessageBaloon nick="Ali" message="Bu bir deneme mesajıdır 2" time="17.26"gOra={true}/>
        <MessageBaloon nick="Veli" message="Bu bir deneme mesajıdır 3 Bu bir deneme mesajıdır 3 Bu bir deneme mesajıdır 3 " time="17.26"gOra={false}/>
      </ScrollView>
      <View style={styles.messageArea}>
        <TextInput 
          placeholder="send a message"
          style={styles.message}
        />
        <Image source={require('./img/send.png')} style={styles.sendImg}/>
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
