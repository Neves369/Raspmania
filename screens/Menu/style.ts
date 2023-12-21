import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  padding-top: 30px;
`;

export const Fundo = styled.ImageBackground`
  flex: 1;
  /* justify-content: center; */
  align-items: center;
  background-color: #343941;
`;

export const ImageView = styled.View`
  align-items: center;
  margin-top: 20%;
`;

export const AdicionarFoto = styled.View`
  width: 139px;
  height: 30px;
  left: -45px;
  bottom: 0px;
  position: absolute;
`;

export const BotaoAdicionarFoto = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  bottom: 0;
  align-self: flex-end;
  justify-content: center;
  align-items: center;
  background-color: #90BE6D;
`;

export const Info = styled.View`
  width: 50%;
  margin-top: 25%;
  margin-left: 5px;
  /* background-color: yellow; */
`;

export const TitleUser = styled.Text`
  margin-top: 12px;
  width: 100%;
  font-size: 26px;
  font-weight: bold;
  text-align: center;
  height: 35px;
`;

export const CPFHeader = styled.Text`
  color: white;
  width: 100%;
  height: 20px;
  font-weight: 600;
  font-size: 16px;
  text-align: justify;
  margin-top: 5px;
  margin-left: 15px;
   /* background-color: aqua; */
`;

export const Logout = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  padding: 5px;
  margin-top: 10px;
  margin-left: 50%;
  width: 100px;
  height: 50px;
  /* background-color: rgba(117, 97, 79, 0.5); */
`;

export const Conteudo = styled.View`
  height: 80%;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 100px;
  /* background-color: aqua; */
`;

export const Form = styled.View`
   margin-top: 0px;
  height: 60%;
  width: 100%;
  align-self: center;
  /* background-color: red; */
`;

export const InputBox = styled.View`
    margin-top: 30px;
`;

export const BotaoSalvar = styled.View`
  background-color: aqua;
    margin-top: 80px;
    border-radius: 10px;
    width: 100%;
    height: 80px;
`;

export const DescriptionView = styled.View`
  height: 40%;
  width: 100%;
  background-color: #F5F5F5;
`;


export const DescriptionBox = styled.View`
  align-self: center;
  height: 50%;
  width: 95%;
  margin-top: 20px;
  background-color: #FFFFFF;
  border-radius: 5px;
  justify-content: center;
`;

export const DescriptionText = styled.Text`
  color: #3C3127;
  width: 70%;
  margin-left: 20px;
  text-align: justify;
  font-size: 17px;
  /* background-color: aqua; */
`;

export const BotaoEditar = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* margin-left: 60%; */
  /* margin-bottom: -20px; */
  /* margin-top: 20px; */
  /* margin-top: 80px; */
  width: 120px;
  height: 50px;
  border-radius: 10px;
  background-color: rgba(117, 97, 79, 0.5);
`;

export const ModalContent = styled.View`
  display: flex;
  /* margin: 330px 0px; */
  width: 80%;
  border-radius: 6px;
  align-items: center;
  align-self: center;
  background-color: whitesmoke;
`;

export const ModalContentFoto = styled.View`
  /* margin: 50% 0px; */
  height: 300px;
  width: 80%;
  border-radius: 6px;
  align-items: center;
  align-self: center;
  background-color: whitesmoke;
`;

export const ViewError = styled.View`
  display: flex;
  align-items: center;
  padding: 15px 20px 25px;
  /* background-color: aqua; */
`;

export const ViewOptionFoto = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  padding-left: 25px;
  width: 100%;
  height: 100px;
  flex-direction: row;
  background-color: white;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
`;

export const Line = styled.View`
  width: 100%;
  height: 1px;
  background-color: rgba(100, 100, 100, 0.2);
`;

export const ViewHeader = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  flex-direction: row;
  background-color: #3C3127;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
`;

export const TitleModal = styled.Text`
  align-self: center;
  font-size: 30px;
  color: #415868;
  margin-top: 15px;
  margin-bottom: 8px;
`;

export const TextError = styled.Text`
  align-self: center;
  color: #415868;
  font-size: 15px;
  margin: 0px 25px;
`;

export const BotaoFechar = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f65656;
  height: 40px;
  margin-bottom: 15px;
  border: none;
  width: 100px;
  border-radius: 20px;
`;

export const TextButtonModal = styled.Text`
  color: white;
  /* text-justify: newspaper; */
`;

export const InfoView = styled.View`
  display: flex;
  /* background-color: white; */
  margin-top: 200px;
  width: 100%;
  height: 100px;
  align-self: center;
  align-items: center;
  justify-content: center;
`;

export const InfoText = styled.Text`
  color: white;
  margin-top: 20px;
  font-size: 16px;
  /* background-color: aqua; */
`;

export const Text = styled.Text`
  color: white;
`;

export const HeaderExtrato = styled.View`
  /* background-color: aqua; */
  height: 50px;
  width: 100%;
  flex-direction: row;
`;

export const IconView = styled.View`
  background-color: white;
  height: 40px;
  width: 40px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;

export const InfoExtrato = styled.View`
  /* background-color: aqua; */
  margin-top: -5px;
  height: 50px;
  width: 100%;
  justify-content: center;
  /* flex-direction: row; */
`;

export const ViewConfirmacao = styled.View`
  display: flex;
  align-items: center;
  width: 100%;
  height: 120px;
  background-color: white;
`;

export const ViewButtomModalConfirm = styled.View`
  display: flex;
  background-color: white;
  width: 311px;
  height: 50px;
  /* padding: 0 31.5px; */
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const BotaoModal = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #B4B4B4;
  height: 40px;
  margin-bottom: 15px;
  border: none;
  width: 100px;
  border-radius: 20px;
`;

export const MenuInferior = styled.View`
  position: absolute;
  flex-direction: row;
  display: flex;
  width: 100%;
  padding-left: 8px;
  padding-right: 10px;
  height: 70px;
  bottom: 0%;
  background-color: #243d3d;
`;

export const ScreenButtom = styled.TouchableOpacity`
  flex: 1;
  padding-top: 10px;
  height: 70px;
  align-items: center;
  /* justify-content: center; */
`;