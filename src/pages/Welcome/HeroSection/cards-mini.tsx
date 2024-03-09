import React from "react";
import { Container, Row } from "reactstrap";

//Import Components
import CardBox from "./card-box";

const CardsMini = () => {
  const coins = [
    {
      title: "KDM Engineers India Pvt Ltd",
      color: "warning",
      icon: "bx bx-map",
      value:
        "Regd. Office and Corporate Office D. No. 8-12-96/S/401.Sri Ramana ColonKarmanghat, Saroornagar (M)Hyderabad",
    },
    {
      title: "KDM Engineers & Consultants PVT LTD",
      color: "primary",
      icon: "bx bx-map",
      value:
        "3rd Floor, H.No. 6-3-663/G, Innovative House, Suite # 302, Punjagutta Officers Colony, Plot No.5, Survey NO.177, Punjagutta, Hyderabad – 500082.",
    },
  ];

  return (
    <React.Fragment>
      <section className="section bg-white p-0">
        <Container>
          <div className="currency-price">
            <Row>
              {/* reder card boxes */}
              <CardBox coins={coins} />
            </Row>
          </div>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default CardsMini;
