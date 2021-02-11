import React from "react";

import {
    Text,
    View,
    SafeAreaView,
} from "react-native";

export interface Props {

}

const Home: React.FC<Props> = (props) => {

    return (
      <SafeAreaView>
          <Text> Home </Text>
      </SafeAreaView>
    );
  };
  
  
  export default Home;