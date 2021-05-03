import React, { useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";

//Styled components
import FormControllWrapper from "../styled/FormControllWrapper";
import DatePickerWrapper from "../styled/DatePickerWrapper";

const Filters = ({ total, changeStatus, changeDates }) => {
  const [state, setState] = useState({
    status: "",
    startDate: null,
    endDate: null,
    focusedInput: null,
  });

  const handleChangeStatus = (e) => {
    setState({
      ...state,
      status: e.target.value,
    });
    changeStatus(e.target.value);
  };

  const handleDateChange = (dates) => {
    const startDate = dates ? dates[0] : null;
    const endDate = dates ? dates[1] : null;

    setState({
      ...state,
      startDate,
      endDate,
    });

    changeDates(startDate, endDate);
  };

  return (
    <Row data-testid="filters">
      <Col xs={12} lg={12} className="mb-3 mt-3">
        <Row>
          <Col
            lg={6}
            xs={12}
            className="d-flex flex-row align-items-center"
            data-testid="total"
          >
            <b>Total: </b>
            {total}
          </Col>
          <Col lg={3} xs={12}>
            <Form.Group>
              <FormControllWrapper data-testid="status">
                <Form.Control
                  as="select"
                  onChange={handleChangeStatus}
                  value={state.status}
                >
                  <option value="">Select Status</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="requested">Requested</option>
                  <option value="rejected">Rejected</option>
                </Form.Control>
              </FormControllWrapper>
            </Form.Group>
          </Col>
          <Col lg={3} xs={12}>
            <DatePickerWrapper data-testid="date-picker">
              <DateRangePicker
                onChange={handleDateChange}
                value={[state.startDate, state.endDate]}
              />
            </DatePickerWrapper>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Filters;
