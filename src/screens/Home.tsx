import React from "react";
import {
    SafeAreaView,
    StyleSheet
} from "react-native";
import { openRealm } from "../db/connection"
import AddEventButton from "../components/AddEventButton"

export interface Props {

}

const Home: React.FC<Props> = (props) => {

	const realm = openRealm();
	console.log(realm);

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