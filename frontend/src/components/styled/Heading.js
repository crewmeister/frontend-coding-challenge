import styled from "styled-components";

export default styled.h3`
  font-size: 2em;
  text-align: ${(props) =>
    props.textCenter ? "center" : props.textRight ? "right" : "left"};
`;
