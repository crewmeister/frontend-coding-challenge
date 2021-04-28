import React, { useEffect, useState, useCallback } from "react";
import { Row, Col, Table } from "react-bootstrap";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";

//Actions
import actions from "../redux/actions";

//Components
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import CustomModal from "./CustomModal";

const Absences = (props) => {
  const { absences = [], loading = false, total = 0 } = props;
  const count = Math.ceil(total / 10);

  const [state, setState] = useState({
    limit: 10,
    page: 1,
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

  const handlePageClick = ({ selected }) => {
    setState({
      ...state,
      page: selected + 1,
    });
  };

  const toggleModal = (showModal) => {
    actions.handleModal(showModal);
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
                  toggleModal={toggleModal}
                />
              ))
            ) : (
              <TableRow
                noData
                text={loading ? "Loading..." : "No Data Found"}
              />
            )}
          </tbody>
        </Table>
        {!!absences.length && (
          <Row>
            <Col xs={12} lg={12}>
              <ReactPaginate
                previousLabel="previous"
                nextLabel={"next"}
                breakLabel={"..."}
                pageCount={count}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
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
            </Col>
          </Row>
        )}
      </Col>
      <CustomModal />
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
    absences: state.absences.absences,
    loading: state.absences.loading,
    total: state.absences.total,
  };
};

export default connect(mapStateToProps)(Absences);
