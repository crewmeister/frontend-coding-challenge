import styled from "styled-components";

export default styled.button`
  background: ${(props) =>
    props.primary ? props.theme.primaryColor : "white"};
  color: ${(props) => (props.primary ? "white" : props.theme.primaryColor)};
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid ${(props) => props.theme.primaryColor};
  border-radius: 3px;
`;
