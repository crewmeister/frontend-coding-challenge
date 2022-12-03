import styled from 'styled-components';
import { Layout } from 'antd';
const { Header } = Layout;

export default styled(Header)`
  /* padding: 0.25em 1em; */
  display: flex;
  align-items: center;
  color: white;
  background-color: rgb(255, 148, 25) !important;
  position: sticky;
  top: 0;

  & h3.ant-typography {
    margin-bottom: revert;
    margin-right: 3rem;
  };

  & span.ant-avatar {
    margin-left: auto;
    margin-right: 1rem;
  };

  & span.ant-typography {
    color: white;
  };

  & ul.ant-menu {
    background-color: rgb(255, 148, 25);
  };

  & ul.ant-menu li {
    color: white;
    font-weight: bold;
  };
`;