import React, { useState, useContext, useCallback } from "react";
import AuthContext from "../../contexts/auth";
import NetInfo from "@react-native-community/netinfo";
import { useFocusEffect } from "@react-navigation/core";
import { useForm, Controller } from "react-hook-form";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { FloatingLabelInput } from "react-native-floating-label-input";
import avatar from "../../assets/avatar.png";
import {
  Avatar,
  Button,
  Divider,
  List,
  RadioButton,
  useTheme,
} from "react-native-paper";
import { _base64ToArrayBuffer } from "../../utils/ToArrayBuffer";
import app from "../../app.json";
import {
  StatusBar,
  ActivityIndicator,
  Animated,
  View,
  ScrollView,
  Keyboard,
} from "react-native";

import { AntDesign, Feather } from "@expo/vector-icons";

import {
  Container,
  ScreenButtom,
  TitleUser,
  Conteudo,
  InputBox,
  Form,
  ImageView,
  InfoView,
  InfoText,
  Text,
} from "./style";
import { formatCpf } from "../../utils/FormatarCpf";
import { formatTel } from "../../utils/FormatarTelefone";

const Menu: React.FC = ({ route, navigation }: any) => {
  const [show] = useState(false);
  const { colors } = useTheme();
  const { user }: any = useContext(AuthContext);
  const [fotoPerfil, setFotoPerfil] = useState("");
  const [opacity] = useState(new Animated.Value(1));
  const [isFocused, setIsFocused] = useState(false);
  const [screen, setScreen] = useState("informacoes");
  const [conectado, setConectado] = useState<boolean | null>();
  const {
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const Informacoes = () => {
    return (
      <>
        <Form>
          <Controller
            control={control}
            name="Nome"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputBox>
                <FloatingLabelInput
                  label={"Nome"}
                  maxLength={30}
                  hintTextColor={colors.text}
                  containerStyles={{
                    height: 40,
                    marginTop: 10,
                    width: "100%",
                    borderColor: colors.text,
                    borderBottomWidth: 1,
                  }}
                  inputStyles={{
                    width: "100%",
                    fontSize: 20,
                    marginLeft: 10,
                    marginTop: 10,
                  }}
                  labelStyles={{ marginLeft: 5 }}
                  customLabelStyles={{
                    colorFocused: colors.text,
                    colorBlurred: colors.text,
                    fontSizeFocused: 12,
                  }}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              </InputBox>
            )}
          />

          <Controller
            control={control}
            name="CPF"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputBox>
                <FloatingLabelInput
                  label={"Cpf"}
                  keyboardType="numeric"
                  mask={"999.999.999-99"}
                  hint={"000.000.000-00"}
                  hintTextColor={colors.text}
                  containerStyles={{
                    height: 40,
                    marginTop: 10,
                    width: "100%",
                    borderColor: colors.text,
                    borderBottomWidth: 1,
                  }}
                  inputStyles={{
                    width: "100%",
                    fontSize: 20,
                    marginLeft: 10,
                    marginTop: 10,
                  }}
                  labelStyles={{ marginLeft: 5 }}
                  customLabelStyles={{
                    colorFocused: colors.text,
                    colorBlurred: colors.text,
                    fontSizeFocused: 12,
                  }}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              </InputBox>
            )}
          />

          <Controller
            control={control}
            name="Telefone"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputBox>
                <FloatingLabelInput
                  label={"Telefone"}
                  keyboardType="numeric"
                  mask={"(00) 00000-0000"}
                  hintTextColor={colors.text}
                  hint="(00) 00000-0000"
                  containerStyles={{
                    height: 40,
                    marginTop: 10,
                    width: "100%",
                    borderColor: colors.text,
                    borderBottomWidth: 1,
                  }}
                  inputStyles={{
                    width: "100%",
                    fontSize: 20,
                    marginLeft: 10,
                    marginTop: 10,
                  }}
                  labelStyles={{ marginLeft: 5 }}
                  customLabelStyles={{
                    colorFocused: colors.text,
                    colorBlurred: colors.text,
                    fontSizeFocused: 12,
                  }}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              </InputBox>
            )}
          />

          <Controller
            control={control}
            name="Email"
            render={({ field: { onChange, onBlur, value } }) => (
              <InputBox>
                <FloatingLabelInput
                  label={"E-mail"}
                  hintTextColor={colors.text}
                  maxLength={160}
                  containerStyles={{
                    height: 40,
                    marginTop: 10,
                    width: "100%",
                    borderColor: colors.text,
                    borderBottomWidth: 1,
                  }}
                  inputStyles={{
                    width: "100%",
                    fontSize: 20,
                    marginLeft: 10,
                    marginTop: 10,
                  }}
                  labelStyles={{ marginLeft: 5 }}
                  customLabelStyles={{
                    colorFocused: colors.text,
                    colorBlurred: colors.text,
                    fontSizeFocused: 12,
                  }}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              </InputBox>
            )}
          />
          <Button
            style={{ marginTop: 80, height: 60, justifyContent: "center" }}
            icon="check"
            mode="contained"
            onPress={() => console.log("Pressed")}
          >
            Salvar
          </Button>
        </Form>
      </>
    );
  };

  const AlterarSenha = () => {
    return (
      <>
        <Form>
          <InputBox>
            <Controller
              control={control}
              name="SenhaAntiga"
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <FloatingLabelInput
                  label={"Senha antiga"}
                  hintTextColor={colors.text}
                  isPassword
                  togglePassword={show}
                  customShowPasswordComponent={
                    <Feather name="eye-off" size={24} color={colors.text} />
                  }
                  customHidePasswordComponent={
                    <Feather name="eye" size={24} color={colors.text} />
                  }
                  containerStyles={{
                    height: 40,
                    marginTop: 10,
                    width: "100%",
                    borderColor: colors.text,
                    borderBottomWidth: 1,
                  }}
                  inputStyles={{
                    width: "100%",
                    fontSize: 20,
                    marginLeft: 10,
                    marginTop: 10,
                  }}
                  labelStyles={{ marginLeft: 5 }}
                  customLabelStyles={{
                    colorFocused: colors.text,
                    colorBlurred: colors.text,
                    fontSizeFocused: 12,
                  }}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
            />
            {errors.SenhaAntiga && <Text>Informe a senha atual.</Text>}
          </InputBox>

          <InputBox>
            <Controller
              control={control}
              name="NovaSenha"
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <FloatingLabelInput
                  label={"Nova senha"}
                  hintTextColor={"white"}
                  isPassword
                  togglePassword={show}
                  customShowPasswordComponent={
                    <Feather name="eye-off" size={24} color={colors.text} />
                  }
                  customHidePasswordComponent={
                    <Feather name="eye" size={24} color={colors.text} />
                  }
                  containerStyles={{
                    height: 40,
                    marginTop: 10,
                    width: "100%",
                    borderColor: colors.text,
                    borderBottomWidth: 1,
                  }}
                  inputStyles={{
                    width: "100%",
                    fontSize: 20,
                    marginLeft: 10,
                    marginTop: 10,
                  }}
                  labelStyles={{ marginLeft: 5 }}
                  customLabelStyles={{
                    colorFocused: colors.text,
                    colorBlurred: colors.text,
                    fontSizeFocused: 12,
                  }}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
            />
            {errors.NovaSenha && <Text>Informe a nova senha.</Text>}
          </InputBox>

          <InputBox>
            <Controller
              control={control}
              name="ConfirmarNovaSenha"
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <FloatingLabelInput
                  label={"Confirmar Nova senha"}
                  hintTextColor={colors.text}
                  isPassword
                  togglePassword={show}
                  customShowPasswordComponent={
                    <Feather name="eye-off" size={24} color={colors.text} />
                  }
                  customHidePasswordComponent={
                    <Feather name="eye" size={24} color={colors.text} />
                  }
                  containerStyles={{
                    height: 40,
                    marginTop: 10,
                    width: "100%",
                    borderColor: colors.text,
                    borderBottomWidth: 1,
                  }}
                  inputStyles={{
                    width: "100%",
                    fontSize: 20,
                    marginLeft: 10,
                    marginTop: 10,
                  }}
                  labelStyles={{ marginLeft: 5 }}
                  customLabelStyles={{
                    colorFocused: colors.text,
                    colorBlurred: colors.text,
                    fontSizeFocused: 12,
                  }}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
            />
            {errors.ConfirmarNovaSenha && (
              <Text>Confirmação da nova senha necessária.</Text>
            )}
          </InputBox>
          <Button
            style={{ marginTop: 80, height: 60, justifyContent: "center" }}
            icon="check"
            mode="contained"
            onPress={() => console.log("Pressed")}
          >
            Salvar
          </Button>
        </Form>
      </>
    );
  };

  const Configuracoes = () => {
    return (
      <>
        <View
          style={{
            // backgroundColor: "red",
            marginTop: 0,
            height: "100%",
            width: "100%",
            alignSelf: "center",
          }}
        >
          <List.AccordionGroup>
            <List.Accordion
              style={{ height: 100, justifyContent: "center" }}
              title="Foto de perfil"
              id="1"
              left={(props) => <List.Icon {...props} icon="image" />}
            >
              <List.Item
                title="Tirar foto"
                onPress={() => {
                  anexarImagem();
                }}
                left={(props) => <List.Icon {...props} icon="camera" />}
              />
              <Divider />
              <List.Item
                title="Escolher da galeria"
                onPress={() => {
                  getImagemFromLibrary();
                }}
                left={(props) => <List.Icon {...props} icon="image-multiple" />}
              />
              <Divider />
              <List.Item
                title="Remover foto de perfil"
                onPress={() => {
                  removerFotoPerfil();
                }}
                left={(props) => <List.Icon {...props} icon="close-box" />}
              />
            </List.Accordion>

            <List.Accordion
              style={{ height: 100, justifyContent: "center" }}
              title="Notificação"
              id="2"
              left={(props) => <List.Icon {...props} icon="bell" />}
            >
              <List.Item
                title="Receber Notificações"
                onPress={() => {}}
                left={(props) => (
                  <RadioButton value="first" status={"checked"} />
                )}
              />
              <List.Item
                title="Não Receber Notificações"
                onPress={() => {}}
                left={(props) => (
                  <RadioButton value="first" status={"unchecked"} />
                )}
              />
            </List.Accordion>

            <Divider />

            <List.Accordion
              style={{ height: 100, justifyContent: "center" }}
              title="Conta"
              id="3"
              left={(props) => <List.Icon {...props} icon="account-circle" />}
            >
              <List.Item
                title="Sair"
                onPress={() => {}}
                left={(props) => <List.Icon {...props} icon="logout" />}
              />
              <List.Item
                title="Excluir Conta"
                left={(props) => <List.Icon {...props} icon="delete" />}
              />
            </List.Accordion>

            <Divider />

            <List.Accordion
              style={{ height: 100, justifyContent: "center" }}
              title="Sobre"
              id="4"
              left={(props) => (
                <List.Icon {...props} icon="information-outline" />
              )}
            >
              <List.Item
                title="Desenvolvido por Douglas Neves"
                left={(props) => <List.Icon {...props} icon="dev-to" />}
              />
              <Divider />
              <List.Item
                title={`Versão ${app.expo.version}`}
                left={(props) => (
                  <List.Icon {...props} icon="information-outline" />
                )}
              />
            </List.Accordion>
          </List.AccordionGroup>
        </View>
      </>
    );
  };

  //Funções de Foto de Perfil ----------------------------------------
  async function carregarFotoPerfil() {
    try {
      const fotoUri = FileSystem.documentDirectory + "imagens/fotoPerfil.jpg";
      const fotoBase64 = await FileSystem.readAsStringAsync(fotoUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setFotoPerfil(fotoBase64);
    } catch (error) {}
  }

  const anexarImagem = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Acesso negado!");
      return;
    }

    const image64 = await ImagePicker.launchCameraAsync();

    if (!image64.canceled) {
      try {
        await FileSystem.makeDirectoryAsync(
          FileSystem.documentDirectory + "imagens/"
        );
      } catch (e) {
        console.info("ERROR", e);
      }

      await FileSystem.moveAsync({
        from: image64.assets[0].uri,
        to: FileSystem.documentDirectory + "imagens/fotoPerfil.jpg",
      });
      enviarImagem();
      carregarFotoPerfil();
      setIsFocused(false);

      setTimeout(() => {
        setIsFocused(true);
      }, 2500);
    }
  };

  const enviarImagem = async () => {
    const fotoUri = FileSystem.documentDirectory + "imagens/fotoPerfil.jpg";
    const fotoBase64 = await FileSystem.readAsStringAsync(fotoUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const imageBuffer = _base64ToArrayBuffer(fotoBase64);
  };

  const getImagemFromLibrary = async () => {
    // Ask the user for the permission to access the library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Acesso negado!");
      return;
    }

    const image64 = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      allowsEditing: true,
      quality: 1,
    });

    if (!image64.canceled) {
      try {
        await FileSystem.makeDirectoryAsync(
          FileSystem.documentDirectory + "imagens/"
        );
      } catch (e) {
        console.info("ERROR", e);
      }
      await FileSystem.moveAsync({
        from: image64.assets[0].uri,
        to: FileSystem.documentDirectory + "imagens/fotoPerfil.jpg",
      });
      carregarFotoPerfil();
      enviarImagem();
      setIsFocused(false);

      setTimeout(() => {
        setIsFocused(true);
      }, 2500);
    }
  };

  const removerFotoPerfil = async () => {
    try {
      await FileSystem.deleteAsync(FileSystem.documentDirectory + "imagens");
      setFotoPerfil("");
    } catch (error) {}
  };
  //-------------------------------------------------------------------

  function KeyboardDidShow() {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }

  function KeyboardDidHide() {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }

  useFocusEffect(
    useCallback(() => {
      let cpf = formatCpf(user.documento);
      let telefone = formatTel(user.telefone);
      carregarFotoPerfil();
      Keyboard.addListener("keyboardDidShow", KeyboardDidShow);
      Keyboard.addListener("keyboardDidHide", KeyboardDidHide);
      const unsubscribe = NetInfo.addEventListener((state) => {
        setConectado(state.isConnected);
      });
      setValue("Nome", user.nome);
      setValue("Email", user.email);
      setValue("CPF", cpf);
      setValue("Telefone", telefone);
      unsubscribe();
      setIsFocused(true);
    }, [])
  );

  return (
    <Container style={{ backgroundColor: colors.background }}>
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={{ width: "80%", alignSelf: "center" }}
      >
        {/* TopBar */}
        <View
          style={{
            marginTop: "0%",
            height: 200,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ImageView>
            <Avatar.Image
              size={100}
              source={
                fotoPerfil?.length > 10
                  ? { uri: `data:image/gif;base64,${fotoPerfil}` }
                  : avatar
              }
            />
          </ImageView>
          <TitleUser color={colors.text}>
            {`${user?.nome.split(" ")[0]}` +
              " " +
              `${user?.nome.split(" ")[1] ? user?.nome.split(" ")[1] : ""}`}
          </TitleUser>
        </View>

        <Conteudo>
          {isFocused ? (
            conectado ? (
              screen == "informacoes" ? (
                <Informacoes />
              ) : screen == "senha" ? (
                <AlterarSenha />
              ) : screen == "configuracoes" ? (
                <Configuracoes />
              ) : (
                <></>
              )
            ) : (
              <InfoView>
                <Feather name="wifi-off" size={100} color="white" />
                <InfoText>Sem conexão.</InfoText>
              </InfoView>
            )
          ) : (
            <ActivityIndicator
              size={100}
              color="white"
              style={{ alignSelf: "center", marginTop: 150 }}
            />
          )}
        </Conteudo>
      </ScrollView>

      <Animated.View
        style={{
          backgroundColor: colors.tertiary,
          opacity: opacity,
          position: "absolute",
          flexDirection: "row",
          display: "flex",
          width: "100%",
          paddingLeft: 8,
          paddingRight: 10,
          height: 70,
          bottom: "0%",
        }}
      >
        <ScreenButtom onPress={() => navigation.navigate("Dashboard")}>
          <AntDesign name="home" size={30} color="#E7E7E7" />
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{
              fontSize: 16,
              lineHeight: 22,
              color: "#E7E7E7",
            }}
          >
            Home
          </Text>
        </ScreenButtom>

        <ScreenButtom
          onPress={() => setScreen("informacoes")}
          style={{
            backgroundColor:
              screen == "informacoes" ? colors.primary : colors.tertiary,
          }}
        >
          <AntDesign name="user" size={28} color={"#E7E7E7"} />
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{
              fontSize: 16,
              lineHeight: 22,
              color: "#E7E7E7",
            }}
          >
            Perfil
          </Text>
        </ScreenButtom>

        <ScreenButtom
          onPress={() => setScreen("senha")}
          style={{
            backgroundColor:
              screen == "senha" ? colors.primary : colors.tertiary,
          }}
        >
          <Feather name="unlock" size={28} color={"#E7E7E7"} />
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{
              fontSize: 16,
              lineHeight: 22,
              color: "#E7E7E7",
            }}
          >
            Senha
          </Text>
        </ScreenButtom>

        <ScreenButtom
          onPress={() => setScreen("configuracoes")}
          style={{
            backgroundColor:
              screen == "configuracoes" ? colors.primary : colors.tertiary,
          }}
        >
          <AntDesign name="setting" size={28} color={"#E7E7E7"} />
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={{
              fontSize: 16,
              lineHeight: 22,
              color: "#E7E7E7",
            }}
          >
            Configurações
          </Text>
        </ScreenButtom>
      </Animated.View>
    </Container>
  );
};

export default Menu;
