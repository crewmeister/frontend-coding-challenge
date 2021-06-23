import styled from "styled-components";

export default styled.div`
  .active > .page-link {
    background: ${(props) => props.theme.primaryColor};
    border-color: ${(props) => props.theme.primaryColor};
  }
  .page-link {
    color: ${(props) => props.theme.primaryColor};
    &:focus {
      box-shadow: none;
    }
  }
  .page-item:first-child > .page-link {
    border-radius: 0px;
  }
  .page-item:last-child > .page-link {
    border-radius: 0px;
  }
`;
