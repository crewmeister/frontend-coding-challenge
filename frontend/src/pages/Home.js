import React from "react";
import { Row, Col } from "react-bootstrap";

//Styled components
import Heading from "../components/styled/Heading";

//Components
import Filters from "../components/Filters";
import Absences from "../components/Absences";

const Home = () => {
  return (
    <Row>
      <Col lg={12} xs={12}>
        <Heading className="mt-5" textCenter>
          Employee Attendance
        </Heading>
        <Filters />
        <Absences />
      </Col>
    </Row>
  );
};

export default Home;
