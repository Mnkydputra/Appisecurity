import React from "react";
import Background from "../src/component/Background";
import Logo from "../src/component/Logo";
import Header from "../src/component/Header";
import Button from "../src/component/Button";
import Paragraph from "../src/component/Paragraph";

export default function StartScreen({ navigation,route }) {
  return (
    <Background>
      <Logo />
      <Header>WELCOME</Header>
      <Paragraph>WE CREATE WE LEARN WE EARN</Paragraph>
      <Button mode="contained" onPress={() => navigation.navigate("Login")}>
        Login
      </Button>
    </Background>
  );
}
