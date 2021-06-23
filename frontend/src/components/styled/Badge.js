import styled from "styled-components";

export default styled.span`
  background-color: ${(props) =>
    props.primary ? "#e7f7fb" : props.danger ? "#f8a89c" : "#fbf8e1"};
  color: ${(props) =>
    props.primary ? "#3991ad" : props.danger ? "#fff" : "#998a22"};
  padding: 5px 10px;
  border-radius: 20px;
`;
