import MaterialTestingQuoteForm from "forms/MaterialTestingQuoteForm";
import React from "react";
import { Container } from "reactstrap";
import Navbar from "pages/Welcome/Navbar/Navbar";
import { ToastContainer } from "react-toastify";

const MaterialTesting = () => {
  document.title =
    "Instant Quotation for material testing | KDM Engineers Group";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container>
          <Navbar />
          <MaterialTestingQuoteForm />
          <ToastContainer />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default MaterialTesting;
