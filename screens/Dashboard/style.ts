import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Header = styled.View`
  height: 220px; 
  /* background-color: red; */
`;

export const LineDivider = styled.View`
  width: 1px; 
  padding: 18px;
`;

export const Menu = styled.View`
  position: absolute;
  flex-direction: row;
  display: flex;
  width: 100%;
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

export const DividerModal = styled.View`
  width: 100%;
  height: 1px;
  background-color: rgba(200, 200, 200, 0.3);
`;

export const ButtonModal = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  min-height: 50px;
  border-radius: 8px;
`;

export const InputView = styled.View`
  height: 50px;
  border-radius: 10px;
  background-color: #f1f3f6;
  margin-top: 10px;
  width: 80%;
  padding-left: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;