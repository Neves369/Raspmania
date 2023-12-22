import { _base64ToArrayBuffer } from "../../utils/ToArrayBuffer";
import { formatNumber } from "../../utils/FormatarDinheiro";
import NetInfo from "@react-native-community/netinfo";
import { Picker } from "@react-native-picker/picker";
import logo from "../../assets/icon.gif";
import raspadinha from "../../raspadinha.json";
import * as Animatable from "react-native-animatable";
import { useFocusEffect } from "@react-navigation/native";
import AuthContext from "../../contexts/auth";
import ICliente from "../../models/ICliente";
import Canvas, { Image as CanvasImage } from "react-native-canvas";
import { Controller, useForm } from "react-hook-form";
import Splash from "../../components/Splash";
import React, {
  useState,
  useContext,
  useCallback,
  useEffect,
  useRef,
} from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  StyleSheet,
  Modal,
  TextInput,
} from "react-native";
import {
  FontAwesome5,
  AntDesign,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  ButtonModal,
  Container,
  DividerModal,
  Header,
  InputView,
  LineDivider,
  Menu,
  ScreenButtom,
} from "./style";
import {
  Card,
  useTheme,
  Modal as ModalPaper,
  Portal,
  Title,
  Paragraph,
  Button,
} from "react-native-paper";

const Dashboard: React.FC = ({ navigation }: any) => {
  const { colors } = useTheme();
  const [compra, setCompra] = useState();
  const [loading, setLoading] = useState(true);
  const [comprou, setComprou] = useState(false);
  const [screen, setScreen] = useState("jogar");
  const [raspada, setRaspada] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [conectado, setConectado] = useState<boolean | null>();
  const [resgatarVisible, setResgatarVisible] = useState(false);
  const [comprarVisible, setComprarVisible] = useState(false);
  const { user, signIn }: { user: ICliente } | any = useContext(AuthContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let teste = false;
  let alphaCount = 0;

  let tipos = [
    {
      id: 1,
      label: "Raspadinha de Natal R$ 5,00",
      preco: 5.0,
    },
    {
      id: 2,
      label: "Chances em Dobro R$ 8,00",
      preco: 8.0,
    },
    {
      id: 3,
      label: "Raspadinha Especial R$ 10,00",
      preco: 10.0,
    },
  ];

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

  const Canva = () => {
    let canvasRef = useRef(null);

    useEffect(() => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const image = new CanvasImage(canvas);
        canvas.height = 300;
        canvas.width = 300;
        const context = canvas.getContext("2d");

        image.crossOrigin = "Anonymous";
        image.src = `data:image/gif;base64,${raspadinha.capa}`;
        image.addEventListener("load", () => {
          context.drawImage(image, 0, 0, 300, 300);
        });
      }
    }, [canvasRef]);

    async function isTransparent(ctx) {
      const imagem = await ctx.getImageData(0, 0, 300, 300);
      let values: Array<any> = Object.values(imagem.data);

      for (let i = 0; i < values.length; i += 4) {
        if (values[i + 3] === 0) {
          alphaCount = alphaCount + 1;
        }
      }

      if (alphaCount >= 2000 && teste == false) {
        teste = true;
        consumirRaspadinha();
      }
    }

    return (
      <View
        onStartShouldSetResponder={() => true}
        onTouchEnd={() => {
          if (canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");
            isTransparent(context);
          }
        }}
        onResponderMove={(event) => {
          if (canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");

            context.globalCompositeOperation = "destination-out";
            var radius = 30;
            context.beginPath();
            context.arc(
              event.nativeEvent.locationX,
              event.nativeEvent.locationY,
              radius,
              0,
              2 * Math.PI,
              false
            );
            context.fillStyle = "white";
            context.fill();
            context.closePath();
          }
        }}
        style={{ width: 300, height: 300 }}
      >
        <Animatable.Image
          animation={"fadeIn"}
          delay={1000}
          source={
            user.raspadinhas[0].valorPremio == 0
              ? require("../../assets/raspadinha_0.png")
              : user.raspadinhas[0].valorPremio == 2
              ? require("../../assets/raspadinha_2.png")
              : user.raspadinhas[0].valorPremio == 5
              ? require("../../assets/raspadinha_5.png")
              : user.raspadinhas[0].valorPremio == 10
              ? require("../../assets/raspadinha_10.png")
              : ""
          }
          style={{ width: 300, height: 300 }}
        />
        {raspada == false ? (
          <Canvas style={{ flex: 1, position: "absolute" }} ref={canvasRef} />
        ) : (
          <></>
        )}
      </View>
    );
  };

  const renderDirList = () => {
    return tipos.map((tipo, index) => {
      return <Picker.Item key={index} label={tipo.label} value={tipo.label} />;
    });
  };

  const handleComprar = (data: any) => {
    let tipo = tipos.filter((tipo) => tipo.label == data.Tipo);

    let compra = {
      quantidade: data.Quantidade,
      valor: tipo[0].preco,
      tipo: tipo[0].label,
    };
    setCompra(compra);
    setComprarVisible(true);
  };

  const confirmarCompra = () => {
    let raspadinhasTemp = [];
    for (let index = 0; index < compra.quantidade; index++) {
      let sort = Math.random() * (100 - 0) + 0;

      if (sort <= 25) {
        raspadinhasTemp.push({
          tipo: compra.tipo,
          valorVenda: compra.valor,
          valorPremio: 0.0,
          ganhou: false,
        });
      }
      if (sort > 25 && sort <= 50) {
        raspadinhasTemp.push({
          tipo: compra.tipo,
          valorVenda: compra.valor,
          valorPremio: 2.0,
          ganhou: true,
        });
      }
      if (sort > 50 && sort <= 75) {
        raspadinhasTemp.push({
          tipo: compra.tipo,
          valorVenda: compra.valor,
          valorPremio: 5.0,
          ganhou: true,
        });
      }
      if (sort > 75 && sort <= 100) {
        raspadinhasTemp.push({
          tipo: compra.tipo,
          valorVenda: compra.valor,
          valorPremio: 10.0,
          ganhou: true,
        });
      }
    }

    setComprou(true);
    user.extrato.unshift({
      tipo: "Compra Raspadinha",
      valor: compra?.quantidade * compra?.valor,
    });
    user.raspadinhas = user.raspadinhas.concat(raspadinhasTemp);
    user.saldo = user.saldo - compra?.quantidade * compra?.valor;
    signIn(user);
    setTimeout(() => {
      setComprarVisible(false);
    }, 1500);
  };

  const consumirRaspadinha = () => {
    setRaspada(true);
    setResgatarVisible(true);
    user.premiacao = user.premiacao + user.raspadinhas[0]?.valorPremio;
    if (user.raspadinhas[0]?.valorPremio != 0) {
      user.extrato.unshift({
        tipo: "Resgate Prêmio",
        valor: user.raspadinhas[0]?.valorPremio,
      });
    }
  };

  function renderHeader(user: ICliente) {
    return (
      <View
        style={{
          flex: 2,
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
              RaspMania
            </Text>
          </View>
        </View>
        <View style={{ flex: 2 }}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 20,
            }}
          >
            <Text
              style={{
                width: "70%",
                color: colors.text,
                textAlign: "left",
                fontSize: 16,
                lineHeight: 32,
                fontWeight: "bold",
              }}
            >
              BEM VINDO
            </Text>
            <Text
              style={{
                width: "80%",
                textAlign: "right",
                color: colors.text,
                fontWeight: "bold",
                fontSize: 24,
              }}
            >
              {` ${user.nome} `}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function renderButtonSection() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          padding: 24,
        }}
      >
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
              paddingTop: 10,
              backgroundColor:
                screen == "jogar" ? colors.primary : colors.tertiary,
              borderRadius: 12,
            }}
            onPress={() => setScreen("jogar")}
          >
            <Entypo name="game-controller" size={24} color={colors.text2} />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 22,
                  color: colors.text2,
                }}
              >
                Jogar
              </Text>
            </View>
          </TouchableOpacity>

          {/* Divider */}
          <LineDivider>
            <View
              style={{
                flex: 1,
                borderLeftColor: "white",
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
              paddingTop: 10,
              backgroundColor:
                screen == "comprar" ? colors.primary : colors.tertiary,
              borderRadius: 12,
            }}
            onPress={() => setScreen("comprar")}
          >
            <AntDesign name="shoppingcart" size={28} color={colors.text2} />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 22,
                  color: colors.text2,
                }}
              >
                Comprar
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderRaspadinha() {
    if (user.raspadinhas.length == 0) {
      return (
        <Animatable.View
          animation="fadeInUp"
          delay={2000}
          style={{
            width: "90%",
            minHeight: 500,
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Entypo name="emoji-sad" size={130} color={colors.shadow} />
          <Text style={{ fontSize: 20, color: colors.shadow }}>
            Você não possui raspadinhas
          </Text>
          <Text style={{ fontSize: 20, color: colors.shadow }}>
            Efetue a compra antes de jogar
          </Text>
        </Animatable.View>
      );
    }

    return (
      <Animatable.View
        animation="fadeInUp"
        delay={2000}
        style={{
          width: "90%",
          minHeight: 500,
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card style={styles.iosCard}>
          <Card.Content>
            <Canva />
          </Card.Content>
        </Card>
        <Text
          style={{
            width: "90%",
            fontSize: 16,
            color: colors.text,
            alignSelf: "center",
            marginTop: 20,
          }}
        >
          Quantidade:{" "}
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 22,
              color: user.raspadinhas.length < 3 ? "red" : "green",
            }}
          >
            {user.raspadinhas.length}
          </Text>
        </Text>
      </Animatable.View>
    );
  }

  function renderComprarRaspadinha() {
    return (
      <Animatable.View
        animation="fadeInUp"
        delay={1200}
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Controller
          control={control}
          name="Tipo"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Picker
              selectedValue={value}
              style={{
                width: "80%",
                color: colors.text,
              }}
              onBlur={onBlur}
              onValueChange={(itemValue, itemIndex) => onChange(itemValue)}
            >
              <Picker.Item
                label={"Selecionar Tipo..."}
                value={""}
                enabled={false}
              />
              {renderDirList()}
            </Picker>
          )}
        />
        {errors.Tipo && (
          <Text style={{ color: colors.shadow }}>Tipo é obrigatório.</Text>
        )}

        <Controller
          control={control}
          name="Quantidade"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputView>
              <TextInput
                keyboardType="numeric"
                placeholder="Quantidade"
                maxLength={3}
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={(value: any) => onChange(value)}
                value={value}
              />
            </InputView>
          )}
        />
        {errors.Quantidade && (
          <Text style={{ color: colors.error }}>Quantidade é obrigatória.</Text>
        )}

        <Button
          style={{
            marginTop: 30,
            width: "80%",
            height: 50,
            justifyContent: "center",
            backgroundColor: colors.tertiary,
          }}
          icon="check"
          mode="contained"
          onPress={handleSubmit(handleComprar)}
        >
          COMPRAR
        </Button>
      </Animatable.View>
    );
  }

  return (
    <Container style={{ backgroundColor: colors.background }}>
      {isFocused ? (
        <ScrollView style={{ flex: 1 }}>
          <Header>
            {renderHeader(user)}
            {renderButtonSection()}
          </Header>

          <View>
            {conectado ? (
              screen == "jogar" ? (
                renderRaspadinha()
              ) : screen == "comprar" ? (
                renderComprarRaspadinha()
              ) : (
                <></>
              )
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
          </View>
        </ScrollView>
      ) : (
        <ActivityIndicator
          size={100}
          color={colors.tertiary}
          style={{ alignSelf: "center", justifyContent: "center", flex: 1 }}
        />
      )}

      <Menu
        style={{
          backgroundColor: colors.tertiary,
        }}
      >
        <ScreenButtom style={{ backgroundColor: colors.primary }}>
          <FontAwesome5 name="ticket-alt" size={28} color="#E7E7E7" />
          <Text
            style={{
              fontSize: 16,
              lineHeight: 22,
              color: "#E7E7E7",
            }}
          >
            RaspMania
          </Text>
        </ScreenButtom>

        <ScreenButtom
          onPress={() => {
            navigation.navigate("Extrato");
          }}
        >
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

      {/* modal resgate*/}
      <Portal>
        <ModalPaper
          visible={resgatarVisible}
          contentContainerStyle={{ padding: 20 }}
        >
          <Card style={[styles.iosCard, { backgroundColor: colors.surface }]}>
            <Card.Content>
              <Title style={styles.titleCard}>
                {user.raspadinhas[0]?.ganhou
                  ? "Parabéns!!!"
                  : "Não foi dessa vez"}
              </Title>
              <Paragraph style={[styles.textCard, { paddingHorizontal: 50 }]}>
                {user.raspadinhas[0]?.ganhou
                  ? `Você ganhou R$ ${formatNumber(
                      user.raspadinhas[0]?.valorPremio
                    )}.`
                  : "Mais sorte da próxima vez"}
              </Paragraph>
              <Paragraph
                style={[
                  styles.textCard,
                  { paddingHorizontal: 50, marginTop: -30 },
                ]}
              >
                {user.raspadinhas[0]?.ganhou
                  ? "Clique no botão abaixo para resgatar seu prêmio."
                  : "Clique no botão abaixo para tentar novamente."}
              </Paragraph>
            </Card.Content>
            <DividerModal />
            <Card.Actions>
              <ButtonModal
                onPress={() => {
                  setResgatarVisible(false), setRaspada(false);
                  let raspadinhasTemp = user.raspadinhas;
                  raspadinhasTemp.shift();

                  user.raspadinhas = raspadinhasTemp;
                  teste = false;
                  alphaCount = 0;
                  signIn(user);
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 16,
                    color: colors.error,
                  }}
                >
                  Confirmar
                </Text>
              </ButtonModal>
            </Card.Actions>
          </Card>
        </ModalPaper>
      </Portal>

      {/* modal comprar*/}
      <Portal>
        <ModalPaper
          visible={comprarVisible}
          contentContainerStyle={{ padding: 20 }}
        >
          <Card style={[styles.iosCard, { backgroundColor: colors.surface }]}>
            <Card.Content>
              <Title style={styles.titleCard}>Comprar Raspadinha</Title>
              <Paragraph style={[styles.textCard, { paddingHorizontal: 50 }]}>
                {!comprou
                  ? `Valor Total: R$ ${formatNumber(
                      compra?.quantidade * compra?.valor
                    )}`
                  : "Compra realizada com sucesso!"}
              </Paragraph>
            </Card.Content>
            <DividerModal />
            {!comprou ? (
              <Card.Actions>
                <ButtonModal
                  onPress={() => {
                    setComprarVisible(false), setCompra(null);
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 16,
                      color: colors.error,
                    }}
                  >
                    Cancelar
                  </Text>
                </ButtonModal>

                <ButtonModal
                  onPress={() => {
                    confirmarCompra();
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 16,
                      color: "#36974c",
                    }}
                  >
                    Confirmar
                  </Text>
                </ButtonModal>
              </Card.Actions>
            ) : (
              <></>
            )}
          </Card>
        </ModalPaper>
      </Portal>

      {/* tela de splash */}
      <Portal>
        <Modal visible={loading}>
          <ImageBackground
            source={[]}
            style={{
              flex: 1,
            }}
          >
            <Splash />
          </ImageBackground>
        </Modal>
      </Portal>
    </Container>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  iosCard: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    elevation: 0,
    borderRadius: 15,
  },
  titleCard: {
    textAlign: "center",
  },
  textCard: {
    minHeight: 50,
    textAlign: "center",
  },
});
