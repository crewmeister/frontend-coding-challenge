import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Layout, Menu, Avatar, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { fetchAbsences } from "./state/actions/absences";
import Header from "./components/Header";
import Absences from "./views/Absences";
import "./App.css";

const { Content, Footer } = Layout;
const { Title, Text } = Typography;


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAbsences());
  }, [dispatch]);

  const absences = useSelector(state => state.absences.data);

  return (
    <Layout className="layout">
      <Header>
        <Title level={3} style={{ color: "white" }} >Shanika's Crew</Title>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={[{ key: 2, label: "Absence Manager" }, { key: 3, label: "Time Sheet" }]}
        />
        <Avatar icon={<UserOutlined />} style={{float:'right'}}/>
        <Text strong>Shanika Ediriweera</Text>
      </Header>
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <Absences absences={absences} />
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        ©2022 Created by Shanika Ediriweera
      </Footer>
    </Layout>
  );
}

export default App;
