import styled from "styled-components";

export default styled.div`
  .active > .page-link {
    background: ${(props) => props.theme.primaryColor};
    border-color: ${(props) => props.theme.primaryColor};
  }
  .page-link {
    color: ${(props) => props.theme.primaryColor};
  }
`;
