import React from "react";
import { Card, CardBody, Col } from "reactstrap";

const CardBox = (props: any) => {
  return (
    <React.Fragment>
      {props.coins.map((coin: any, key: any) => (
        <Col lg="6" key={key}>
          <Card>
            <CardBody className="shadow-lg">
              <div className="d-flex ">
                <div className="avatar-xs me-3">
                  <span
                    className={
                      "avatar-title rounded-circle bg-soft bg-" +
                      coin.color +
                      " text-" +
                      coin.color +
                      " font-size-18"
                    }
                  >
                    <i className={coin.icon} />
                  </span>
                </div>
                <div className="flex-grow-1">
                  <h5> {coin.title}</h5>
                  <p className="text-muted">{coin.value}</p>

                  {/* <p className="text-muted text-truncate mb-0">
                    {coin.isIncrease ? "+ " : "- "} {coin.rate}{" "}
                    <i
                      className={
                        coin.isIncrease
                          ? "mdi mdi-arrow-up ms-1 text-success"
                          : "mdi mdi-arrow-down ms-1 text-danger"
                      }
                    />
                  </p> */}
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </React.Fragment>
  );
};

export default CardBox;
