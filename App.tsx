import React from "react";
import Routes from "./routes";
import "./utils/ignoreWarnings";
import { dark, light } from "./core/theme";
import { AuthProvider } from "./contexts/auth";
import { StatusBar, Appearance } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";

const colorScheeme = Appearance.getColorScheme();

const App: React.FC = () => {
  return (
    <NavigationContainer theme={DarkTheme}>
      <StatusBar
        backgroundColor={colorScheeme == "dark" ? "black" : "white"}
        barStyle={"dark-content"}
      />
      <AuthProvider>
        <PaperProvider theme={colorScheeme == "dark" ? dark : light}>
          <SafeAreaProvider>
            <Routes />
          </SafeAreaProvider>
        </PaperProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
