import React from "react";
import { Row, Col } from "react-bootstrap";
import moment from "moment";

import { getUser, getStatus, capitalize, getNumberOfDays } from "../utils";

const AbsenceDetail = ({
  user,
  type,
  startDate,
  endDate,
  status,
  memberNote,
  admitterNote,
}) => {
  const { name } = getUser(user);
  const start = moment(startDate);
  const end = moment(endDate);
  const days = getNumberOfDays(start, end);

  return (
    <Row>
      <Col xs={12} lg={12} className="mt-2">
        <Row>
          <Col xs={12} lg={6}>
            <b>Member name</b>
            <br />
            {name}
          </Col>
          <Col xs={12} lg={6}>
            <b>Type of absence</b>
            <br />
            {capitalize(type)}
          </Col>
        </Row>
      </Col>
      <Col xs={12} lg={12} className="mt-2">
        <Row>
          <Col xs={12} lg={6}>
            <b>Period</b>
            <br />
            {days} {days === 1 ? "day" : "days"}
          </Col>
          <Col xs={12} lg={6}>
            <b>Status</b>
            <br />
            {getStatus(status)}
          </Col>
        </Row>
      </Col>
      <Col xs={12} lg={12} className="mt-2">
        <Row>
          <Col xs={12} lg={6}>
            <b>Member note</b>
            <br />
            {memberNote || "-"}
          </Col>
          <Col xs={12} lg={6}>
            <b>Admitter note</b>
            <br />
            {admitterNote || "-"}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default AbsenceDetail;
