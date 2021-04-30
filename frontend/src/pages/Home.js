import React from "react";
import { Row, Col } from "react-bootstrap";

//Styled components
import Heading from "../components/styled/Heading";

//Components
import Absences from "../components/Absences";

const Home = () => {
  return (
    <Row>
      <Col lg={12} xs={12}>
        <Heading className="mt-2 mb-2" textCenter>
          Employee Attendance
        </Heading>
        <Absences />
      </Col>
    </Row>
  );
};

export default Home;
