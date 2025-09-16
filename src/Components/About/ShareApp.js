import React from "react";
import { View, Text, TouchableOpacity, Platform,Share } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import { SystemBars } from "react-native-edge-to-edge";

export default function ShareApp({ navigation }) {
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: "Check out Risaa Bookstore App",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#7e2803ff",
      }}
    >
      <SystemBars style="light" />
      <View
        style={{
          width: "100%",
          maxWidth: 380,
          alignItems: "center",
          backgroundColor: "#d26334ff",
          padding: 24,
          borderRadius: 20,
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 3 },
          elevation: 4,
        }}
      >
        <LottieView
          source={require("../../../assets/animations/share.json")}
          autoPlay
          loop
          style={{ width: 100, height: 100, marginBottom: 16 }}
        />

        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            marginBottom: 6,
            color: "white",
          }}
        >
          Share Our App
        </Text>

        <Text
          style={{
            fontSize: 14,
            textAlign: "center",
            color: "white",
            marginBottom: 20,
            lineHeight: 20,
          }}
        >
          Love using this app? Spread the word with your friends and let them
          enjoy it too!
        </Text>

        <TouchableOpacity
          onPress={handleShare}
          activeOpacity={0.8}
          style={{
            backgroundColor: "#e67e22",
            paddingVertical: 14,
            paddingHorizontal: 28,
            borderRadius: 12,
            width: "100%",
            alignItems: "center",
            ...(Platform.OS === "android"
              ? { elevation: 2 }
              : { shadowOpacity: 0.15, shadowRadius: 4 }),
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>
            Share Now 🚀
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
