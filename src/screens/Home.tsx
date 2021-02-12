import React from "react";
import {
    SafeAreaView,
    StyleSheet
} from "react-native";
import AddEventButton from "../components/AddEventButton"
import {Event} from "../types";
import { EventController } from "../controllers/EventController"


export interface Props {

}

const Home: React.FC<Props> = (props) => {
	
    return (
      <SafeAreaView style={styles.container}>
          <AddEventButton></AddEventButton>
      </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      backgroundColor: "#ffffff",
    }
})
export default Home;