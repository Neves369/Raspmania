import React, { useState, useContext, useCallback, useEffect } from "react";
import { _base64ToArrayBuffer } from "../../utils/ToArrayBuffer";
import NetInfo from "@react-native-community/netinfo";
import logo from "../../assets/icon.gif";
import { formatNumber } from "../../utils/FormatarDinheiro";
import { Container, Header, LineDivider, Menu, ScreenButtom } from "./style";
import * as Animatable from "react-native-animatable";
import { DataTable, useTheme } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import AuthContext from "../../contexts/auth";
import ICliente from "../../models/ICliente";
import {
  View,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import {
  FontAwesome5,
  AntDesign,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";

const Extrato: React.FC = ({ navigation }: any) => {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [conectado, setConectado] = useState<boolean | null>();
  const { user }: { user: ICliente } = useContext(AuthContext);

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        setIsFocused(true);
      }, 1000);

      return () => setIsFocused(false);
    }, [])
  );

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setConectado(state.isConnected);
    });
    unsubscribe();
    setTimeout(() => {
      setLoading(false);
    }, 2400);
  }, []);

  function renderHeader() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          paddingHorizontal: 24,
          alignItems: "center",
        }}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Animatable.Image
              source={logo}
              style={{
                shadowColor: "#000",
                width: 60,
                height: 60,
              }}
              animation="fadeInUp"
              delay={1200}
            />
            <Text style={{ color: colors.text, fontWeight: "bold" }}>
              Raspadinha
            </Text>
          </View>
        </View>
        <View style={{ flex: 2 }}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                width: "70%",
                color: colors.text,
                textAlign: "left",
                fontWeight: "bold",
                fontSize: 24,
                lineHeight: 32,
              }}
            >
              Meu Extrato
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function renderButtonSection() {
    return (
      <View style={{ flex: 1, justifyContent: "center", padding: 24 }}>
        <View
          style={{
            flexDirection: "row",
            height: 70,
            backgroundColor: colors.tertiary,
            borderRadius: 12,
          }}
        >
          {/* Play */}
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                lineHeight: 22,
                color: colors.text2,
              }}
            >
              Premiação
            </Text>
            <Text
              style={{
                fontSize: 16,
                lineHeight: 22,
                color: colors.text2,
              }}
            >
              {`R$ ${formatNumber(user.premiacao)}`}
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <LineDivider>
            <View
              style={{
                flex: 1,
                borderLeftColor: colors.text2,
                borderLeftWidth: 1,
              }}
            ></View>
          </LineDivider>

          {/* My Card */}
          <TouchableOpacity
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                lineHeight: 22,
                color: colors.text2,
              }}
            >
              Saldo
            </Text>
            <Text
              style={{
                fontSize: 16,
                lineHeight: 22,
                color: colors.text2,
              }}
            >
              {`R$ ${formatNumber(user.saldo)}`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <Container style={{ backgroundColor: colors.background }}>
      {isFocused ? (
        <Container>
          <Header>
            {renderHeader()}
            {renderButtonSection()}
          </Header>

          <ScrollView
            style={{ width: "100%" }}
            contentContainerStyle={{ width: "90%", alignSelf: "center" }}
          >
            {conectado ? (
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Operação</DataTable.Title>
                  <DataTable.Title numeric>Valor</DataTable.Title>
                </DataTable.Header>

                <FlatList
                  data={user.extrato}
                  maxToRenderPerBatch={3}
                  initialNumToRender={3}
                  numColumns={1}
                  renderItem={({ item, index }) => {
                    return (
                      <DataTable.Row>
                        <DataTable.Cell>{item.tipo}</DataTable.Cell>
                        <DataTable.Cell
                          textStyle={{
                            color:
                              item.tipo == "Resgate Prêmio" ? "green" : "red",
                          }}
                          numeric
                        >
                          {`R$ ${formatNumber(item.valor)}`}
                        </DataTable.Cell>
                      </DataTable.Row>
                    );
                  }}
                  extraData={isFocused}
                  contentContainerStyle={{
                    width: "100%",
                    alignSelf: "center",
                    paddingBottom: 100,
                  }}
                />
              </DataTable>
            ) : (
              <View
                style={{
                  marginTop: 50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialIcons
                  name="signal-wifi-off"
                  size={150}
                  color={colors.shadow}
                />
                <Text
                  style={{
                    fontSize: 18,
                    color: colors.shadow,
                  }}
                >
                  Não há conexão com a internet
                </Text>
              </View>
            )}
          </ScrollView>

          <Menu style={{ backgroundColor: colors.tertiary }}>
            <ScreenButtom
              onPress={() => {
                navigation.navigate("Dashboard");
              }}
            >
              <FontAwesome5 name="ticket-alt" size={28} color="#E7E7E7" />
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 22,
                  color: "#E7E7E7",
                }}
              >
                Raspadinha
              </Text>
            </ScreenButtom>

            <ScreenButtom style={{ backgroundColor: colors.primary }}>
              <AntDesign name="creditcard" size={30} color="#E7E7E7" />
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 22,
                  color: "#E7E7E7",
                }}
              >
                Extrato
              </Text>
            </ScreenButtom>

            <ScreenButtom
              onPress={() => {
                navigation.navigate("Menu");
              }}
            >
              <Entypo name="menu" size={28} color="#E7E7E7" />
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 22,
                  color: "#E7E7E7",
                }}
              >
                Menu
              </Text>
            </ScreenButtom>
          </Menu>
        </Container>
      ) : (
        <ActivityIndicator
          size={100}
          color={colors.tertiary}
          style={{ alignSelf: "center", justifyContent: "center", flex: 1 }}
        />
      )}
    </Container>
  );
};

export default Extrato;
