import styled from "styled-components";

export default styled.tr`
  border: 1px solid #eee;

  font-weight: ${(props) => (props.header ? "bold" : "normal")};
  background-color: ${(props) =>
    props.header ? props.theme.primaryColor : "#fff"};
  color: ${(props) => (props.header ? "#fff" : "#000")};
  td {
    padding: 1.25rem 0.75rem;
  }
`;
