import React, { useEffect, useState } from "react";
import feature1 from "../../src/assets/images/crypto/features-img/img-1.png";

import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  Label,
  Input,
  Table,
  Modal,
  ModalHeader,
} from "reactstrap";

import { useFormik } from "formik";
import * as Yup from "yup";
import { createSelector } from "reselect";
import { BackendParams, EcoAction, TestParams } from "pages/Ecommerce/type";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getProducts as onGetProducts,
  onGetAllParams,
} from "../slices/e-commerence/thunk";
import { generateUniqueID } from "./AddParam";
import Spinners from "Components/Common/Spinner";
import { CHEMICAL, PHYSICAL } from "common/data/ecommerce";
import { greenBadge, infoBadge, redBadge } from "pages/BD/OrdersList";
import { generateMaterialTestingServiceQuote } from "../slices/e-commerence/thunk";
import { resetPopup } from "slices/e-commerence/reducer";

export const extractSelectedTests = (rows1: NextedState[]) =>
  (rows1 || [])
    .filter((eachTest: NextedState) => eachTest.sampleId !== "")
    .map((eachTest: NextedState) => ({
      ...eachTest,
      chemicalParams: (eachTest.chemicalParams || []).filter(
        (param: BackendParams) => param.selected
      ),
      physicalParams: (eachTest.physicalParams || []).filter(
        (param: BackendParams) => param.selected
      ),
    }));

export interface NextedState {
  row_id: string;
  sampleId: string;
  sampleName: string;
  chemicalParams: BackendParams[];
  physicalParams: BackendParams[];
  isOffer: boolean;
  offer: number;
  sample_image?: string;
}

export const getClassifiedParams = (
  params: BackendParams[],
  DISCIPLINE: string
) => {
  const classified: BackendParams[] = params.filter(
    (eachParam: BackendParams) => {
      if (eachParam.discipline === DISCIPLINE) {
        return { ...eachParam, selected: false };
      }
    }
  );
  return classified;
};

const MaterialTestingQuoteForm = () => {
  const [offerApplied, setOfferApplied] = useState<boolean>(false);
  const [rows1, setrows1] = useState<NextedState[]>([
    {
      row_id: generateUniqueID(),
      sampleId: "",
      sampleName: "",
      chemicalParams: [],
      physicalParams: [],
      isOffer: false,
      offer: 0,
    },
  ]);

  const toggleSelectTestBox = (row_id: string, paramId: string) => {
    const updated: NextedState[] = (rows1 || []).map((eachRow: NextedState) => {
      if (eachRow.row_id === row_id) {
        return {
          ...eachRow,
          chemicalParams: (eachRow.chemicalParams || []).map(
            (eachParam: BackendParams) => {
              if (eachParam.paramId === paramId) {
                return { ...eachParam, selected: !eachParam.selected };
              }
              return eachParam;
            }
          ),

          physicalParams: (eachRow.physicalParams || []).map(
            (eachParam: BackendParams) => {
              if (eachParam.paramId === paramId) {
                return { ...eachParam, selected: !eachParam.selected };
              }
              return eachParam;
            }
          ),
        };
      }
      return eachRow;
    });
    setrows1(updated);
  };

  const selectTestBox = (
    eachTest: BackendParams,
    row_id: string,
    isOffer: boolean,
    offer: number
  ) => {
    const parsedTests: TestParams[] = JSON.parse(eachTest.params || "");

    return (
      <tr
        key={eachTest.paramId}
        onClick={() => toggleSelectTestBox(row_id, eachTest.paramId)}
        style={{ backgroundColor: `${eachTest.selected ? "#f5f2f2" : ""}` }}
      >
        <th style={{ width: "50px" }}>
          <div className="form-check ml-3">
            <input
              type="checkbox"
              checked={eachTest.selected}
              className="form-check-input"
              onChange={() => toggleSelectTestBox(row_id, eachTest.paramId)}
            />
          </div>
        </th>
        <td>
          {(parsedTests || []).map((eachTest: TestParams) => (
            <div className="d-flex">
              <i
                className={`mdi mdi-circle-medium align-middle text-success me-1`}
              />
              <small key={eachTest.test_id}>{eachTest.testName}</small>
            </div>
          ))}
        </td>
        <td style={{ width: "150px" }}>
          {" "}
          {isOffer ? (
            <div>
              <span className="text-muted me-2">
                <small>
                  <del className="text-danger"> Rs. {eachTest.price}</del> (
                  {offer} % Off)
                </small>
              </span>{" "}
              <br />
              <small className="text-success">
                Rs.{" "}
                {(eachTest.price as number) -
                  (((eachTest.price as number) * offer) as number) / 100}
                /-
              </small>
            </div>
          ) : (
            <small className="text-success">Rs. {eachTest.price} /-</small>
          )}
        </td>
        <td style={{ width: "150px" }}>
          {eachTest.discipline === CHEMICAL
            ? greenBadge(eachTest.discipline || "")
            : infoBadge(eachTest.discipline || "")}
        </td>
        <td style={{ width: "120px" }}>
          {eachTest.isNabl ? greenBadge("NABL") : redBadge("Non NABL")}
        </td>
      </tr>
    );
  };

  const handleAddRowNested = () => {
    const newRow: NextedState = {
      row_id: generateUniqueID(),
      sampleId: "",
      sampleName: "",
      chemicalParams: [],
      physicalParams: [],
      isOffer: false,
      offer: 0,
    };
    setrows1([...rows1, newRow]);
  };

  const handleRemoveRow = (id: string) => {
    const updatedRows = rows1.filter((row: any) => row.row_id !== id);
    setrows1(updatedRows);
  };

  const handleInputChangeNested = (row_id: string, productId: number) => {
    const sample = productPartialInfo.filter(
      (eachSample) => eachSample.id === productId
    );

    const filteredParams = (allParams || []).filter(
      (eachParam: BackendParams) => eachParam.subgroup === productId
    );

    const chemicalParams: BackendParams[] = getClassifiedParams(
      filteredParams,
      CHEMICAL
    );
    const physicalParams: BackendParams[] = getClassifiedParams(
      filteredParams,
      PHYSICAL
    );

    const updatedRows: NextedState[] = rows1.map((row: any) => {
      if (row.row_id === row_id) {
        return {
          ...row,
          sampleId: productId,
          sampleName: sample[0].name,
          chemicalParams: chemicalParams,
          physicalParams: physicalParams,
          isOffer: sample[0].isOffer,
          offer: sample[0].offer,
        };
      }
      return row;
    });
    setrows1(updatedRows);
  };

  function tog_center() {
    dispatch(resetPopup());
  }

  const nestedformik: any = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("This Field is Required"),
      email: Yup.string(),
      mobile: Yup.string()
        .matches(/^[0-9]{10}$/)
        .required("Please Enter Your Phone No"),
    }),

    onSubmit: (value: any) => {
      // const extractSelectedTests: NextedState[] = (rows1 || [])
      //   .filter((eachTest: NextedState) => eachTest.sampleId !== "")
      //   .map((eachTest: NextedState) => ({
      //     ...eachTest,
      //     chemicalParams: (eachTest.chemicalParams || []).filter(
      //       (param: BackendParams) => param.selected
      //     ),
      //     physicalParams: (eachTest.physicalParams || []).filter(
      //       (param: BackendParams) => param.selected
      //     ),
      //   }));

      const res = extractSelectedTests(rows1);

      const formattedData = {
        ...value,
        samples: res,
      };

      const extratingRequiredData = formattedData.samples.map((eachSample) => ({
        sampleName: eachSample.sampleName,
        offer: eachSample.offer,
        parameters: [
          ...eachSample.chemicalParams.map((eachParam: BackendParams) => ({
            price: eachParam.price,
            discipline: eachParam.discipline,
            group: [
              ...JSON.parse(eachParam.params || "").map(
                (eachTest) => eachTest.testName
              ),
            ],
          })),

          ...eachSample.physicalParams.map((eachParam: BackendParams) => ({
            price: eachParam.price,
            discipline: eachParam.discipline,
            group: [
              ...JSON.parse(eachParam.params || "").map(
                (eachTest) => eachTest.testName
              ),
            ],
          })),
        ],
      }));

      const data = {
        contactInfo: {
          ...value,
        },
        samples: extratingRequiredData,
      };

      dispatch(generateMaterialTestingServiceQuote(data));
    },
  });

  const selectProperties = createSelector(
    (state: EcoAction) => state.ecommerce,
    (ecommerce) => ({
      loading: ecommerce.loading,
      productPartialInfo: ecommerce.productPartialInfo,
      allParams: ecommerce.allParams,
      materialTestingQuotation: ecommerce.materialTestingQuotation,
    })
  );

  const { productPartialInfo, loading, allParams, materialTestingQuotation } =
    useSelector(selectProperties);

  const { mtqLoading, error, link, quotation_generated } =
    materialTestingQuotation;

  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(onGetProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(onGetAllParams());
  }, [dispatch]);

  const handleDownloadQuotation = (link) => {
    const linkElement = document.createElement("a");
    linkElement.target = "_blank";
    linkElement.href = link;
    linkElement.download = "";
    document.body.appendChild(linkElement);
    linkElement.click();
    document.body.removeChild(linkElement);
  };

  const quotationLinkPopUp = () => {
    return (
      <Modal
        isOpen={quotation_generated}
        toggle={() => {
          tog_center();
        }}
        centered
      >
        <ModalHeader
          toggle={() => {
            tog_center();
          }}
        ></ModalHeader>
        <Col>
          <div className="p-4">
            <div className="text-center">
              <div className="avatar-md mx-auto">
                <div className="avatar-title rounded-circle bg-light">
                  <i className="bx bxs-envelope h1 mb-0 text-primary"></i>
                </div>
              </div>
              <div className="p-2 mt-4">
                <h4>Your Quotation is ready !</h4>
                <p>
                  We have sent you a copy through email{" "}
                  <span className="fw-semibold">
                    {nestedformik.values.email}
                  </span>
                  , Please check it
                </p>
                <code>This Quotation is valid upto 05.08.2024</code>

                {/* <div>
                  <img
                    src={feature1}
                    alt=""
                    className="img-fluid mx-auto d-block"
                  />
                </div> */}

                <div className="mt-4">
                  <button
                    className="btn btn-primary w-md"
                    onClick={() => handleDownloadQuotation(link)}
                  >
                    Download Quotation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Modal>
    );
  };

  return (
    <Card>
      <CardBody>
        <h6 className="mb-4 card-title">
          Get an Instant Quote for Material Testing Services
        </h6>
        <code>Effortless Pricing, Instant Results</code>{" "}
        <p className="mt-3">
          Curious about the cost of material testing services? Look no further!
          With our innovative instant quote feature, you can obtain accurate
          pricing for your testing needs in just seconds. Gone are the days of
          waiting for quotes – now, you can make informed decisions swiftly and
          confidently.
        </p>
        <p className="text-primary">Please Follow this steps</p>
        <div className="table-responsive">
          <Table
            className="table table-bordered "
            style={{ borderColor: "#eff2f7" }}
          >
            <tbody>
              <tr>
                <th style={{ width: "90px" }}>Step - 1</th>
                <td>
                  Fill out the form with your personal details to receive the
                  instant quote
                </td>
              </tr>
              <tr>
                <th>Step - 2</th>
                <td>
                  Select the material type from the dropdown menu, then choose
                  the parameters relevant to your testing needs.
                </td>
              </tr>
              <tr>
                <th>Step - 3</th>
                <td>
                  Depending on the material chosen, display the relevant
                  parameters for selection (e.g., for soil testing: moisture
                  content, particle size analysis, pH level, etc.)
                </td>
              </tr>
              <tr>
                <th>Step - 4</th>
                <td>
                  Click Add Sample Button and from repeat Step-2{" "}
                  <small>
                    (If you want to get quote for morethan 1 sample)
                  </small>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        {loading && <Spinners />}
        {quotation_generated && quotationLinkPopUp()}
        {!quotation_generated && (
          <React.Fragment>
            <Form
              className="outer-repeater mt-3"
              onSubmit={nestedformik.handleSubmit}
            >
              <div data-repeater-list="outer-group" className="outer">
                <div data-repeater-item className="outer">
                  <h6 className="text-primary mb-3">Personnel Info</h6>

                  <Row>
                    <Col md="5" sm="10">
                      <div className="mr-5">
                        <img
                          src={feature1}
                          alt=""
                          className="img-fluid mx-auto d-block"
                        />
                      </div>
                    </Col>
                    <Col sm={12} md={7}>
                      <div>
                        <div className="form-check form-switch mb-3">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customSwitch1"
                            onChange={() => setOfferApplied(!offerApplied)}
                            checked={offerApplied}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customSwitch1"
                          >
                            I have placed morethan 5 Orders before
                          </label>
                          <br />
                          {offerApplied ? (
                            <small className="text-success">
                              <i>
                                <b>
                                  You may eligible for discount, Please Contact
                                  9988998899 to avail discount
                                </b>
                              </i>
                            </small>
                          ) : (
                            <p></p>
                          )}
                        </div>
                      </div>
                      <div className="mb-3">
                        <Label for="name">Enter your name</Label>
                        <Input
                          type="text"
                          name="name"
                          className="form-control"
                          id="name"
                          placeholder="Enter Your name"
                          value={nestedformik.values.name}
                          onChange={nestedformik.handleChange}
                          onBlur={nestedformik.handleBlur}
                        />
                        {nestedformik.errors.name &&
                        nestedformik.touched.name ? (
                          <span className="text-danger">
                            {nestedformik.errors.name}
                          </span>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label for="mobile">Enter your contact</Label>
                        <Input
                          type="number"
                          name="mobile"
                          className="form-control"
                          id="mobile"
                          placeholder="Enter Your Contact number"
                          value={nestedformik.values.mobile}
                          onChange={nestedformik.handleChange}
                          onBlur={nestedformik.handleBlur}
                        />
                        {nestedformik.errors.mobile &&
                        nestedformik.touched.mobile ? (
                          <span className="text-danger">
                            {nestedformik.errors.mobile}
                          </span>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label for="email">Enter your Email (Optional)</Label>
                        <Input
                          type="text"
                          name="email"
                          className="form-control"
                          id="email"
                          placeholder="Enter Your email"
                          value={nestedformik.values.email}
                          onChange={nestedformik.handleChange}
                          onBlur={nestedformik.handleBlur}
                        />
                        {nestedformik.errors.email &&
                        nestedformik.touched.email ? (
                          <span className="text-danger">
                            {nestedformik.errors.email}
                          </span>
                        ) : null}
                      </div>
                    </Col>
                  </Row>

                  <h6 className="text-primary mb-3">Samples Info</h6>
                  {(rows1 || []).map((formRow, key) => (
                    <Row key={formRow.row_id} className="mt-3">
                      <Card>
                        <Row>
                          <Col lg={6}>
                            <div className="mb-3">
                              <Input
                                type="select"
                                id="select_sample"
                                className="form-control-lg"
                                // value={formRow.sampleName}
                                onChange={(e) =>
                                  handleInputChangeNested(
                                    formRow.row_id,
                                    parseInt(e.target.value)
                                  )
                                }
                              >
                                <option value="" selected>
                                  Select From below
                                </option>
                                {(productPartialInfo || []).map((each) => (
                                  <option value={each.id} key={each.id}>
                                    {each.name}
                                  </option>
                                ))}
                              </Input>
                            </div>
                          </Col>
                          <Col lg={2}>
                            <div className="mb-3">
                              <button
                                className="btn btn-danger"
                                id="unknown-btn"
                                onClick={() => handleRemoveRow(formRow.row_id)}
                              >
                                <i className="mdi mdi-delete " /> Delete
                              </button>
                            </div>
                          </Col>
                        </Row>

                        <Col lg={12}>
                          <div className="table-responsive">
                            <Table
                              className="table table-bordered "
                              style={{ borderColor: "#eff2f7" }}
                            >
                              <tbody>
                                {formRow.chemicalParams.map(
                                  (eachTest: BackendParams) =>
                                    selectTestBox(
                                      eachTest,
                                      formRow.row_id,
                                      formRow.isOffer,
                                      formRow.offer
                                    )
                                )}

                                {formRow.physicalParams.map(
                                  (eachTest: BackendParams) =>
                                    selectTestBox(
                                      eachTest,
                                      formRow.row_id,
                                      formRow.isOffer,
                                      formRow.offer
                                    )
                                )}
                              </tbody>
                            </Table>
                          </div>
                        </Col>
                      </Card>
                    </Row>
                  ))}

                  <div className="d-flex">
                    <button
                      disabled={mtqLoading || loading}
                      type="button"
                      className="btn btn-success mt-3 mr-4"
                      onClick={() => {
                        handleAddRowNested();
                      }}
                    >
                      Add Sample
                    </button>
                    <button
                      disabled={mtqLoading || loading}
                      type="submit"
                      className="btn btn-warning mt-3"
                    >
                      {!mtqLoading ? (
                        "Get Quote"
                      ) : (
                        <>
                          {" "}
                          <i className="bx bx-loader bx-spin "></i> Preparing
                          Quotation
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          </React.Fragment>
        )}
      </CardBody>
    </Card>
  );
};

export default MaterialTestingQuoteForm;
