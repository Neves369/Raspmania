import React from "react";
import Menu from "../screens/Menu";
import Extrato from "../screens/Extrato";
import Dashboard from "../screens/Dashboard";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const AppStack = createNativeStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Dashboard" component={Dashboard} />
      <AppStack.Screen name="Extrato" component={Extrato} />
      <AppStack.Screen name="Menu" component={Menu} />
    </AppStack.Navigator>
  );
};

export default AppRoutes;
