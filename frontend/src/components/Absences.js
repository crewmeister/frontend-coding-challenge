import React, { useEffect, useState, useCallback } from "react";
import { Row, Col, Table } from "react-bootstrap";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";

//Actions
import actions from "../redux/actions";

//Styled Components
import PaginationWrapper from "./styled/PaginationWrapper";

//Components
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import CustomModal from "./CustomModal";
import AbsenceDetail from "./AbsenceDetail";
import Filters from "./Filters";

import { handleMessage } from "../utils";

const Absences = (props) => {
  const { absences = [], loading = false, total = 0, error = false } = props;
  const count = Math.ceil(total / 10);

  const [state, setState] = useState({
    limit: 10,
    page: 1,
    status: "",
    showModal: false,
    selectedAbsence: null,
  });

  const getAbsences = useCallback(() => {
    return actions.getAbsences({
      limit: state.limit,
      page: state.page,
    });
  }, [state]);

  useEffect(() => {
    getAbsences();
  }, [state.page, getAbsences]);

  const handlePaginationClick = ({ selected }) => {
    setState({
      ...state,
      page: selected + 1,
    });
  };

  const toggleModal = (showModal, selectedAbsence) => {
    setState({
      ...state,
      showModal,
      selectedAbsence,
    });
  };

  const changeStatus = (status) => {
    setState({
      ...state,
      status,
    });
  };

  const tableHeaders = [
    "Sr. No.",
    "Member name",
    "Type of absence",
    "Period",
    "Member Note",
    "Status",
    "Admitter Note",
    "Actions",
  ];

  return (
    <Row>
      <Col xs={12} lg={12}>
        <Filters total={total} changeStatus={changeStatus} />
        <Row>
          <Col xs={12} lg={12} className="table-responsive">
            <Table>
              <thead>
                <TableHeader data={tableHeaders} />
              </thead>
              <tbody>
                {absences.length ? (
                  absences.map((absence, key) => (
                    <TableRow
                      key={absence.id}
                      index={(state.page - 1) * state.limit + (key + 1)}
                      {...absence}
                      toggleModal={() => toggleModal(true, absence)}
                    />
                  ))
                ) : (
                  <TableRow
                    noData
                    text={handleMessage(loading, error, !absences.length)}
                  />
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
        {!!absences.length && (
          <Row>
            <Col xs={12} lg={12}>
              <PaginationWrapper>
                <ReactPaginate
                  previousLabel="Previous"
                  nextLabel={"Next"}
                  breakLabel={"..."}
                  pageCount={count}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePaginationClick}
                  containerClassName="pagination float-right"
                  pageLinkClassName="page-link"
                  pageClassName="page-item"
                  activeClassName="active"
                  previousClassName="page-item"
                  nextClassName="page-item"
                  breakClassName="page-link"
                  nextLinkClassName="page-link"
                  previousLinkClassName="page-link"
                  disabledClassName="disabled"
                />
              </PaginationWrapper>
            </Col>
          </Row>
        )}
      </Col>
      <CustomModal
        showModal={state.showModal}
        toggleModal={toggleModal}
        title="Details of absence"
      >
        <AbsenceDetail {...state.selectedAbsence} />
      </CustomModal>
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
    absences: state.absences.absences,
    loading: state.absences.loading,
    total: state.absences.total,
    error: state.absences.error,
  };
};

export default connect(mapStateToProps)(Absences);
