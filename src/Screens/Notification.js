import React from "react";  
import { View, Text } from "react-native";
import { SystemBars } from "react-native-edge-to-edge";

export default function Notification() {
  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <SystemBars  style="light"/>
      <Text>Notification Screen</Text>
    </View>
  );
}  