import React from "react";

import {
    Text,
    View,
    SafeAreaView,
} from "react-native";

import AddEventButton from "../components/AddEventButton"

export interface Props {

}

const Home: React.FC<Props> = (props) => {

    return (
      <SafeAreaView>
          <Text> Home </Text>
          <AddEventButton></AddEventButton>
      </SafeAreaView>
    );
  };
  
  
  export default Home;