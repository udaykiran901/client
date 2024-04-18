import React from "react";
import { Modal, ModalBody, Row, Col } from "reactstrap";
import classnames from "classnames";

interface props {
  show: boolean;
  onDeleteClick: any;
  onCloseClick: any;
}

const warnings = [
  "This action will remove all records associated with the employee, including personal information, employment history, and any related data stored in the system.",
  "Once the employee is deleted, all data associated with them will be irretrievably erased from the system's database. This includes any historical records, reports, or audit trails related to the employee's activities.",
  " Please take a moment to consider the implications of this action.Once confirmed, the deletion will be immediate and cannot bereversed. Ensure that you have verified the necessity of this action and have obtained any necessary approvals before proceeding.",
];

const DeleteModal = ({ show, onDeleteClick, onCloseClick }: props) => {
  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
      <div className="modal-content">
        <ModalBody className="px-4 py-5">
          <button
            type="button"
            onClick={onDeleteClick}
            className="btn-close position-absolute end-0 top-0 m-3"
          ></button>
          <div className="avatar-sm mb-4 mx-auto">
            <div className="avatar-title bg-primary text-primary bg-opacity-10 font-size-20 rounded-3">
              <i className="mdi mdi-trash-can-outline"></i>
            </div>
          </div>
          <div className="text-center">
            <p className="text-danger font-size-16 ">
              Are you sure you want to proceed?
            </p>
          </div>

          <Row className="mb-3 mt-5">
            <Col lg={12}>
              {warnings.map((item: any, i: number) => (
                <div key={i}>
                  <p className="text-muted">
                    <i
                      className={classnames(
                        "fa fa-caret-right",
                        "font-size-16  text-primary me-2"
                      )}
                    />

                    {item}
                  </p>
                </div>
              ))}
            </Col>
          </Row>

          <div className="hstack gap-2 justify-content-center mb-0">
            <button
              type="button"
              className="btn btn-danger"
              onClick={onDeleteClick}
            >
              Delete Now
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCloseClick}
            >
              Close
            </button>
          </div>
        </ModalBody>
      </div>
    </Modal>
  );
};

export default DeleteModal;
