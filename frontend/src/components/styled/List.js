import styled from "styled-components";

export default styled.tr`
  border: 1px solid #eee;
  padding: 15px;
  font-weight: ${(props) => (props.header ? "bold" : "normal")};
  background-color: ${(props) =>
    props.header ? props.theme.primaryColor : "#fff"};
  color: ${(props) => (props.header ? "#fff" : "#000")};
`;
