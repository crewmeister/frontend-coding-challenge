import styled from "styled-components";

export default styled.div`
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  font-size: 1em;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 999;
  display: ${(props) => (props.visible ? "flex" : "none")};
  justify-content: center;
  align-items: center;
`;
