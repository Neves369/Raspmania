import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Header = styled.View`
  height: 250px; 
  margin-top: 50px;
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