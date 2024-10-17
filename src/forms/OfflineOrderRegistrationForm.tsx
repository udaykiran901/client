import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import withRouter from "Components/Common/withRouter";
import Flatpickr from "react-flatpickr";
import moment from "moment";
import Select from "react-select";
import classnames from "classnames";
import {
  getProducts as onGetProducts,
  onGetAllParams,
} from "../slices/e-commerence/thunk";

import { CHEMICAL, PHYSICAL } from "common/tokens";
import { greenBadge, infoBadge, redBadge } from "pages/BD/OrdersList";
import {
  Col,
  CardBody,
  Collapse,
  Form,
  Input,
  Label,
  Row,
  FormFeedback,
  Card,
  Spinner,
  Table,
  Container,
  Button,
} from "reactstrap";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useDispatch } from "react-redux";
import {
  Branch,
  Customer,
  EcoActionBD,
  OrderSampleParams,
  OrderSamples,
  Samples,
} from "pages/BD/types";

import {
  getBranches,
  getCompleteOrderDetails,
  getCustomersList,
  offlineOrderRegistration,
} from "slices/thunk";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import {
  EcoAction,
  TestParams,
  BackendParams,
  ProductPartialInfo,
} from "pages/Ecommerce/type";

import {
  NextedState,
  extractSelectedTests,
  getClassifiedParams,
} from "./MaterialTestingQuoteForm";
import { generateUniqueID } from "./AddParam";
import { RootState } from "slices";
import { BDInitialState } from "slices/BD/reducer";

export const formatSelectOptions = (options: any) => {
  return [
    {
      label: "Select From Below",
      options: (options || []).map((eachOption: any) => ({
        label: eachOption.label,
        value: eachOption.id,
      })),
    },
  ];
};

const markingSelectedUnmarkingLeftParamArray = (
  disciplineParamArray: BackendParams[],
  selectedParamArray: OrderSampleParams[]
): BackendParams[] => {
  const res = (disciplineParamArray || []).map((eachParam: BackendParams) => {
    if (
      (selectedParamArray || []).some(
        (eachSelectedSample: OrderSampleParams) =>
          eachSelectedSample.param_id.toString() ===
          eachParam.paramId.toString()
      )
    )
      return { ...eachParam, selected: true };

    return { ...eachParam, selected: false };
  });

  return res;
};

export interface SampleFields {
  sample_id: string;
  source: string;
  quantity: string;
  grade: string;
  brandName: string;
  week_no: string;
  ref_code: string;
  sample_id_optional_field: string;
  site_name: string;
  product_id?: string;
}

export const initialSampleReportFields: SampleFields = {
  sample_id: "",
  source: "",
  quantity: "",
  grade: "",
  brandName: "",
  week_no: "",
  ref_code: "",
  sample_id_optional_field: "",
  site_name: "",
  product_id: "",
};

export const initialSampleDetails: NextedState = {
  row_id: "",
  sampleId: "",
  sampleName: "",
  chemicalParams: [],
  physicalParams: [],
  isOffer: false,
  prefix: "",
  offer: 0,
};

export const renderParameterDetails = (eachSample: any, index: number) => {
  return (
    <div>
      <small
        className={`mb-5 text-${eachSample.chemicalParams.length === 0 ? "danger" : "warning"
          }`}
      >
        {eachSample.chemicalParams.length !== 0 && "CHEMICAL PARAMETERS"}
      </small>
      {eachSample.chemicalParams.map((eachParam: BackendParams) =>
        JSON.parse(eachParam.params as string).map((eachSelectedParam) => (
          <p>
            <i
              className={`mdi mdi-circle-medium align-middle text-${index % 2 !== 0 ? "success" : "warning"
                } me-1`}
            />
            {eachSelectedParam.testName}
          </p>
        ))
      )}

      <small
        className={`mb-5 text-${eachSample.physicalParams.length === 0 ? "danger" : "warning"
          }`}
      >
        {eachSample.physicalParams.length !== 0 && "PHYSICAL PARAMETERS"}
      </small>

      {eachSample.physicalParams.map((eachParam: BackendParams) =>
        JSON.parse(eachParam.params as string).map((eachSelectedParam) => (
          <p>
            <i
              className={`mdi mdi-circle-medium align-middle text-${index % 2 !== 0 ? "success" : "warning"
                } me-1`}
            />
            {eachSelectedParam.testName}
          </p>
        ))
      )}
    </div>
  );
};

export const calculateDiscountedPrice = (
  originalPrice: number,
  discountPercentage: number
) => {
  const discountAmount = (originalPrice * discountPercentage) / 100;
  const discountedPrice = originalPrice - discountAmount;
  return discountedPrice;
};

const OfflineOrderRegistrationForm = (props) => {
  const dispatch: any = useDispatch();
  const { orderId } = props.router.params;
  const [col1, setcol1] = useState(true);
  const [col2, setcol2] = useState(false);
  const [rows1, setrows1] = useState<NextedState[]>([]);

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
    const id = generateUniqueID();
    const newSampleRow: NextedState = {
      ...initialSampleDetails,
      row_id: id,
    };

    const sampleReportFields: SampleFields = {
      ...initialSampleReportFields,
      sample_id: id,
    };

    setrows1([...rows1, newSampleRow]);
    validation.setFieldValue("samples", [
      ...validation.values.samples,
      sampleReportFields,
    ]);
  };

  const handleRemoveRow = (id: string) => {
    const updatedRows: NextedState[] = rows1.filter(
      (row: NextedState) => row.row_id !== id
    );
    setrows1(updatedRows);

    const updatedSamples: SampleFields[] = validation.values.samples.filter(
      (sample: SampleFields) => sample.sample_id !== id
    );
    validation.setFieldValue("samples", updatedSamples);
  };

  const handleInputChangeNested = (row_id: string, productId: number) => {
    const sample = productPartialInfo.filter(
      (eachSample) => eachSample.id === productId
    );

    const filteredParams = (allParams || []).filter(
      (eachParam: BackendParams) => {
        if (eachParam.subgroup === productId) {
          return { ...eachParam, selected: true };
        }
      }
    );

    const chemicalParams: BackendParams[] = getClassifiedParams(
      filteredParams,
      CHEMICAL
    );

    const physicalParams: BackendParams[] = getClassifiedParams(
      filteredParams,
      PHYSICAL
    );

    const updatedRows: NextedState[] = rows1.map((row: NextedState) => {
      if (row.row_id === row_id) {
        return {
          ...row,
          sampleId: productId.toString(),
          sampleName: sample[0].name,
          sample_image: sample[0].image,
          chemicalParams: chemicalParams,
          physicalParams: physicalParams,
          // isOffer: sample[0].isOffer,
          offer: sample[0].offer,
          prefix: sample[0].prefix,
        };
      }
      return row;
    });
    setrows1(updatedRows);
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //from bd state
  const selectedPropertiesFromBD = createSelector(
    (state: EcoActionBD) => state.bd,
    (bd) => ({
      customers: bd.customers,
      loadingBdState: bd.loading,
    })
  );

  const { customers, loadingBdState } = useSelector(selectedPropertiesFromBD);

  useEffect(() => {
    dispatch(getCustomersList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getBranches());
  }, [dispatch]);

  //ecommerce state
  const selectedPropertiesFromEcommerce = createSelector(
    (state: EcoAction) => state.ecommerce,
    (ecommerce) => ({
      loadingEcommerceState: ecommerce.loading,
      productPartialInfo: ecommerce.productPartialInfo,
      allParams: ecommerce.allParams,
    })
  );

  const { productPartialInfo, allParams, loadingEcommerceState } = useSelector(
    selectedPropertiesFromEcommerce
  );

  useEffect(() => {
    dispatch(onGetProducts());
  }, [dispatch]);
  useEffect(() => {
    dispatch(onGetAllParams());
  }, [dispatch]);

  //hr state
  const selectedPropertiesFromHR = createSelector(
    (state: any) => state.hrAndAdmin,
    (hrAndAdmin) => ({
      branches: hrAndAdmin.branches,
      loadingHRstate: hrAndAdmin.loading,
    })
  );
  const { branches, loadingHRstate } = useSelector(selectedPropertiesFromHR);

  //end of getting states

  const [parentRef, setParentRef] = useState<boolean>(false);
  const [nhaiBool, setNhaiBool] = useState<boolean>(false);

  //select customer variable
  const [selectedGroup, setselectedGroup] = useState(null) as any[];
  const [selectedGroup2, setselectedGroup2] = useState(null) as any[];

  const handleSelectGroup = (setselectedGroup: any, selectedOption: any) => {
    setselectedGroup(selectedOption);
    validation.setFieldValue("customer_id", selectedOption.value);
  };

  const handleSelectGroup2 = (setselectedGroup2: any, selectedOption: any) => {
    setselectedGroup2(selectedOption);
    validation.setFieldValue("lab", selectedOption.value);
  };

  //end of this fucking variables

  //order edit case

  const selectedProperties = createSelector(
    (state: RootState) => state.bd,
    (bd: BDInitialState) => ({
      orderInfo: bd.orderInfo,
      loading: bd.loading,
      step2loader: bd.step2loader,
      customers: bd.customers,
    })
  );

  const { orderInfo } = useSelector(selectedProperties);

  useEffect(() => {
    if (orderId) {
      dispatch(getCompleteOrderDetails(orderId));
    }
  }, [dispatch]);

  const validation: any = useFormik({
    enableReinitialize: true,
    initialValues: {
      order_id: orderId ? orderInfo.order_id : "",
      project_name: orderId ? orderInfo.project_name : "",
      subject: orderId ? orderInfo.subject : "",
      parent_ref: orderId ? orderInfo.parent_ref : "",
      nhai_hq_letter: orderId ? orderInfo.nhai_hq_letter : "",
      additional_info: orderId ? orderInfo.additional_info : "",
      letter: null,
      due_date: "",
      discount: orderId ? orderInfo.discount : 0,
      transportation_fee: 0,
      // samples info
      samples: [],
      samples_address: orderId ? orderInfo.samples_collection_address : "",

      //customers info
      customer_id: "",

      //lab details
      lab: "",

      ref: orderId ? orderInfo.ref : "",
    },

    validationSchema: Yup.object({
      project_name: Yup.string().required("Please Enter Project Name"),
      subject: Yup.string().required("Please Enter Subject"),
      letter: Yup.mixed().required("Letter is required"),
      due_date: Yup.date().required("Expected Delivery Date is required"),
      ref: Yup.string().required("Ref is required"),

      // samples data
      samples: Yup.array().of(
        Yup.object().shape({
          source: Yup.string().required("Please provide sample source"),
          quantity: Yup.string().required("Please provide sample quantity"),
          brandName: Yup.string(),
          grade: Yup.string(),
          week_no: Yup.string(),
          ref_code: Yup.string(),
          sample_id_optional_field: Yup.string(),
          site_name: Yup.string(), //this value might not saved in db
        })
      ),

      samples_address: Yup.string().required("This Field is required"),
      //customer_Info
      customer_id: Yup.string().required("Customer is required"),

      //branch Info
      lab: Yup.string().required("Please assign the lab"),
    }),

    onSubmit: (values: any) => {
      const prices = rows1.map((eachRow: NextedState) => {
        const physicalSum = eachRow.physicalParams.reduce(
          (accum: number, eachParam: BackendParams) => {
            return (
              accum +
              (eachRow.isOffer
                ? calculateDiscountedPrice(
                  eachParam.price || 0,
                  eachRow.offer as number
                )
                : eachParam.price || 0)
            );
          },
          0
        );

        const chemicalSum = eachRow.chemicalParams.reduce(
          (accum: number, eachParam: BackendParams) => {
            return (
              accum +
              (eachRow.isOffer
                ? calculateDiscountedPrice(
                  eachParam.price || 0,
                  eachRow.offer as number
                )
                : eachParam.price || 0)
            );
          },
          0
        );
        return physicalSum + chemicalSum;
      });

      const amount = prices.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      const data = {
        amount,
        ...values,
        nhai_bool: nhaiBool,
        parent_ref_bool: parentRef,
        selectedSamples: extractSelectedTests(rows1).map(
          (eachSample: NextedState) => {
            const sampleReportDetails = values.samples.find(
              (eachSampleDetails: SampleFields) =>
                eachSampleDetails.sample_id === eachSample.row_id
            );
            return {
              ...eachSample,
              reportFields: sampleReportDetails,
            };
          }
        ),
      };

      dispatch(offlineOrderRegistration(data));
    },
  });

  const renderInputField = (key: any, placeholder: any, index: any) => (
    <tr>
      <td className="p-1" style={{ width: "200px" }}>
        <small>{placeholder}</small>
      </td>
      <td className="p-1">
        <Input
          name={`samples[${index}].${key}`}
          type="text"
          onChange={validation.handleChange}
          onBlur={validation.handleBlur}
          value={validation.values.samples[index]?.[key] || ""}
          placeholder={placeholder}
          className="border-0 m-0 p-0"
          invalid={
            validation.touched.samples?.[index]?.[key] &&
              validation.errors.samples?.[index]?.[key]
              ? true
              : false
          }
        />
        {validation.touched.samples?.[index]?.[key] &&
          validation.errors.samples?.[index]?.[key] && (
            <FormFeedback type="invalid">
              {validation.errors.samples[index][key]}
            </FormFeedback>
          )}
      </td>
    </tr>
  );

  const formattedCustomersRecords = (customers || []).map(
    (eachCustomer: Customer) => ({
      label: `${eachCustomer.name} - ${eachCustomer.contact} - ${eachCustomer.pan_number}`,
      id: eachCustomer.customer_id,
    })
  );

  const formattedLabs = (branches || []).map((eachBranch: Branch) => ({
    label: eachBranch.branch,
    id: eachBranch.branch_id,
  }));

  const optionsList = formatSelectOptions(formattedCustomersRecords);
  const labOptions = formatSelectOptions(formattedLabs);

  const renderSamplesData = () => {
    const onClickNextStep = () => {
      t_col2();
    };

    return (
      <div>
        {(rows1 || []).map((formRow, key) => (
          <Row key={formRow.row_id} className="mt-3">
            <p className="text-primary">Sample - {key + 1}</p>
            <Row>
              <Col lg={6}>
                <div className="mb-3">
                  <Input
                    type="select"
                    id="select_sample"
                    className="form-control-lg"
                    onChange={(e) =>
                      handleInputChangeNested(
                        formRow.row_id,
                        parseInt(e.target.value)
                      )
                    }
                  >
                    <option value="">Select From below</option>
                    {(productPartialInfo || []).map((each) => (
                      <option
                        value={each.id}
                        key={each.id}
                        selected={
                          orderId && formRow.sampleId === each.id.toString()
                        }
                      >
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
                    <i className="mdi mdi-delete " /> Remove
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
                    {formRow.chemicalParams.map((eachTest: BackendParams) =>
                      selectTestBox(
                        eachTest,
                        formRow.row_id,
                        formRow.isOffer as boolean,
                        formRow.offer as number
                      )
                    )}

                    {formRow.physicalParams.map((eachTest: BackendParams) =>
                      selectTestBox(
                        eachTest,
                        formRow.row_id,
                        formRow.isOffer as boolean,
                        formRow.offer as number
                      )
                    )}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        ))}
        <button
          type="button"
          className="btn btn-success mt-3 mr-4"
          onClick={() => {
            handleAddRowNested();
          }}
        >
          Add Sample
        </button>

        {extractSelectedTests(rows1).length === 0 ? null : (
          <button
            type="button"
            className="btn btn-success mt-3 mr-4"
            onClick={() => {
              onClickNextStep();
            }}
          >
            Next Step
          </button>
        )}
      </div>
    );
  };

  const renderSampleDataRelatedFieldsForm = () => {
    return (
      <Row>
        {extractSelectedTests(rows1).map(
          (eachSample: NextedState, index: number) => (
            <div key={eachSample.row_id}>
              <div className="d-flex">
                <div className="flex-shrink-0 me-3">
                  <img
                    src={eachSample.sample_image}
                    alt={eachSample.sample_image}
                    className="rounded avatar-md"
                  />
                </div>

                <div className="flex-grow-1">
                  <p className="mb-lg-0">
                    <code>Sample - {index + 1 + "   "}</code>
                  </p>
                  <h6 className="mt-2">{eachSample.sampleName}</h6>
                  {renderParameterDetails(eachSample, index)}

                  {(eachSample.physicalParams.length >= 1 ||
                    eachSample.chemicalParams.length >= 1) && (
                      <div className="table-responsive">
                        <p className="text-success m-0">
                          * Please fill the table
                        </p>
                        <Table
                          className="table table-bordered"
                          style={{ borderColor: "#eff2f7" }}
                        >
                          <tbody>
                            {renderInputField(`source`, "Enter Source *", index)}
                            {renderInputField(`quantity`, "Enter Qty", index)}
                            {renderInputField(
                              `brandName`,
                              "Brand Name (Optional)",
                              index
                            )}
                            {renderInputField(
                              `grade`,
                              "Grade Name (Optional)",
                              index
                            )}
                            {renderInputField(
                              `week_no`,
                              "Week Number (Optional)",
                              index
                            )}
                            {renderInputField(
                              `ref_code`,
                              "Reference Code (Optional)",
                              index
                            )}
                            {renderInputField(
                              `sample_id_optional_field`,
                              "Sample ID (Optional)",
                              index
                            )}
                            {renderInputField(
                              `site_name`,
                              "Site Name (Optional)",
                              index
                            )}
                          </tbody>
                        </Table>
                      </div>
                    )}
                </div>
              </div>
            </div>
          )
        )}

        <Col xl={12}>
          <div className="mb-3">
            <Label>Sample Collection Address</Label>
            <Input
              name="samples_address"
              type="textarea"
              rows="3"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.samples_address || ""}
              placeholder="Any additional Info"
              invalid={
                validation.touched.samples_address &&
                  validation.errors.samples_address
                  ? true
                  : false
              }
            />
            {validation.touched.samples_address &&
              validation.errors.samples_address ? (
              <FormFeedback type="invalid">
                {validation.errors.samples_address}
              </FormFeedback>
            ) : null}
          </div>
        </Col>
        <div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              t_col1();
            }}
          >
            Previous Step
          </button>
        </div>
      </Row>
    );
  };

  const t_col1 = () => {
    setcol1(!col1);
    setcol2(false);
  };

  const t_col2 = () => {
    setcol2(!col2);
    setcol1(false);
  };

  //editing
  useEffect(() => {
    if (orderId) {
      const availableSamples: NextedState[] = (orderInfo.samplesList || []).map(
        (eachSample: OrderSamples) => {
          const filteredParams = (allParams || []).filter(
            (eachParam: BackendParams) =>
              eachParam.subgroup === eachSample.product_id
          );

          const chemicalParams: BackendParams[] = getClassifiedParams(
            filteredParams,
            CHEMICAL
          );
          const physicalParams: BackendParams[] = getClassifiedParams(
            filteredParams,
            PHYSICAL
          );

          const selectingUnselectingChemicalParams: BackendParams[] =
            markingSelectedUnmarkingLeftParamArray(
              chemicalParams,
              eachSample.chemicalParams
            );

          const selectingUnselectingPhysicalParams: BackendParams[] =
            markingSelectedUnmarkingLeftParamArray(
              physicalParams,
              eachSample.physicalParams
            );

          return {
            row_id: eachSample.sample_id,
            sampleId: eachSample.product_id.toString(),
            sampleName: (productPartialInfo || []).find(
              (eachProduct: ProductPartialInfo) =>
                eachProduct.id === eachSample.product_id
            )?.name as string,
            chemicalParams: selectingUnselectingChemicalParams,
            physicalParams: selectingUnselectingPhysicalParams,
            offer: 0,
            isOffer: false,
            prefix: "",
            sample_image: eachSample.image,
          };
        }
      );

      const formattedSampleInfos = (orderInfo.samplesList || []).map(
        (eachSample: OrderSamples) => {
          return {
            sample_id: eachSample.sample_id,
            source: eachSample.source,
            quantity: eachSample.quantity,
            grade: eachSample.grade || "",
            brandName: eachSample.brandName || "",
            week_no: eachSample.brandName || "",
            ref_code: eachSample.ref_code || "",
            sample_id_optional_field: eachSample.sample_id_optional_field || "",
            site_name: eachSample.site_name || "",
            product_id: eachSample.product_id || "",
          };
        }
      );

      setrows1(availableSamples);
      validation.setFieldValue("samples", formattedSampleInfos);
    }
  }, [orderId, orderInfo, allParams]);

  return (
    <Container fluid>
      <Row>
        <Col>
          <Form
            onSubmit={(e: any) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
          >
            {(loadingEcommerceState || loadingBdState || loadingHRstate) && (
              <div className="text-center">
                <Spinner />
              </div>
            )}
            <Card className="p-3">
              <h5 className="text-primary mb-4">
                Offline Order Registration Form
              </h5>
              <Row>
                <Col xl={6}>
                  <div className="mb-3">
                    <Label>Project Name</Label>
                    <Input
                      name="project_name"
                      readOnly={false}
                      type="textarea"
                      rows="3"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.project_name || ""}
                      placeholder="Enter Project Name"
                      invalid={
                        validation.touched.project_name &&
                          validation.errors.project_name
                          ? true
                          : false
                      }
                    />
                    {validation.touched.project_name &&
                      validation.errors.project_name ? (
                      <FormFeedback type="invalid">
                        {validation.errors.project_name}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>

                <Col xl={6}>
                  <div className="mb-3">
                    <Label>Subject</Label>
                    <Input
                      readOnly={false}
                      name="subject"
                      type="textarea"
                      rows={3}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.subject || ""}
                      placeholder="Enter Subject"
                      invalid={
                        validation.touched.subject && validation.errors.subject
                          ? true
                          : false
                      }
                    />
                    {validation.touched.subject && validation.errors.subject ? (
                      <FormFeedback type="invalid">
                        {validation.errors.subject}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>

                <Col lg={6}>
                  <div className="mb-3">
                    <Label>Assign Lab </Label>
                    <Select
                      onBlur={() => validation.setFieldTouched("lab", true)}
                      value={selectedGroup2}
                      onChange={(selectedOption) => {
                        handleSelectGroup2(setselectedGroup2, selectedOption);
                      }}
                      options={labOptions}
                      className="select2-selection"
                    />
                    {validation.touched.lab && validation.errors.lab && (
                      <span className="text-danger">
                        {validation.errors.lab}
                      </span>
                    )}
                  </div>
                </Col>

                <Col lg={6}>
                  <div className="mb-3">
                    <Label for="basicpill-ref-input1">Ref</Label>
                    <Input
                      type="text"
                      name="ref"
                      className="form-control"
                      id="basicpill-ref-input1"
                      placeholder="Enter Reference"
                      value={validation.values.ref}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                    />
                    {validation.errors.ref && validation.touched.ref ? (
                      <span className="text-danger">
                        {validation.errors.ref}
                      </span>
                    ) : null}
                  </div>
                </Col>

                <Col xl={6}>
                  <div className="form-check ml-3">
                    <input
                      readOnly={false}
                      id="perentRef"
                      type="checkbox"
                      checked={parentRef}
                      className="form-check-input"
                      onChange={() => setParentRef(!parentRef)}
                    />
                    <Label htmlFor="perentRef">Note Parent Ref</Label>
                  </div>
                </Col>

                <Col xl={6}>
                  <div className="form-check ml-3">
                    <input
                      readOnly={false}
                      id="nhai_Letter"
                      type="checkbox"
                      checked={nhaiBool}
                      className="form-check-input"
                      onChange={() => setNhaiBool(!nhaiBool)}
                    />
                    <Label htmlFor="nhai_Letter">Note NHAI HQ</Label>
                  </div>
                </Col>

                {parentRef && (
                  <Col xl={6}>
                    <div className="mb-3">
                      <Label>Parent Reference</Label>
                      <Input
                        readOnly={false}
                        name="parent_ref"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.parent_ref || ""}
                        placeholder="Enter Parent Reference"
                      />
                    </div>
                  </Col>
                )}

                {nhaiBool && (
                  <Col xl={6}>
                    <div className="mb-3">
                      <Label>NHAI HQ Letter</Label>
                      <Input
                        readOnly={false}
                        name="nhai_hq_letter"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.nhai_hq_letter || ""}
                        placeholder="Enter NHAI HQ"
                      />
                    </div>
                  </Col>
                )}

                <Col xl={6}>
                  <div className="mb-3">
                    <Label>Expected Delivery Date</Label>

                    <Flatpickr
                      type="date"
                      name="due_date"
                      className="form-control d-block"
                      placeholder="Select Expected Delivery Date"
                      options={{
                        mode: "single",
                        dateFormat: "d M, Y",
                      }}
                      value={validation.values.due_date}
                      onChange={(date) => {
                        validation.setFieldValue(
                          "due_date",
                          date[0] ? moment(date[0]).format("YYYY-MM-DD") : "" // Format the date if selected, otherwise set to empty string
                        );
                        if (!date[0]) {
                          validation.setFieldTouched("due_date", true); // Mark the field as touched only if date is not selected
                        }
                      }}
                    />
                    {validation.touched.due_date &&
                      !validation.values.due_date && ( // Display error message only if the field is touched and no date is selected
                        <span className="text-danger">
                          {validation.errors.due_date}
                        </span>
                      )}
                  </div>
                </Col>

                {!false && (
                  <Col lg={6}>
                    <div className="mb-3">
                      <Label htmlFor="image">Letter</Label>
                      <Input
                        readOnly={false}
                        type="file"
                        id="letter"
                        name="letter"
                        onChange={(event) => {
                          const file =
                            event.currentTarget.files &&
                            event.currentTarget.files[0];
                          if (file) {
                            validation.setFieldValue("letter", file);
                          }
                        }}
                        onBlur={validation.handleBlur}
                      />
                      {validation.errors.letter && validation.touched.letter ? (
                        <span className="text-danger">
                          {validation.errors.letter}
                        </span>
                      ) : null}
                    </div>
                  </Col>
                )}

                <Col xl={12}>
                  <div className="mb-3">
                    <Label>Additional Information</Label>
                    <Input
                      readOnly={false}
                      name="additional_info"
                      type="textarea"
                      rows="3"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.additional_info || ""}
                      placeholder="Any additional Info"
                    />
                  </div>
                </Col>
              </Row>
            </Card>

            <Card>
              <CardBody>
                <h5 className="text-primary mb-3">
                  Samples and it's related fields
                </h5>
                <Row>
                  <Col xl={12}>
                    <div className="accordion" id="accordion">
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                          <button
                            className={classnames(
                              "accordion-button",
                              "fw-medium",
                              { collapsed: !col1 }
                            )}
                            type="button"
                            onClick={t_col1}
                            style={{ cursor: "pointer" }}
                          >
                            Step-1 : Pick Samples
                          </button>
                        </h2>

                        <Collapse isOpen={col1} className="accordion-collapse">
                          <div className="accordion-body">
                            {renderSamplesData()}
                          </div>
                        </Collapse>
                      </div>

                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingTwo">
                          <button
                            className={classnames(
                              "accordion-button",
                              "fw-medium",
                              { collapsed: !col2 }
                            )}
                            type="button"
                            // onClick={t_col2}
                            style={{ cursor: "pointer" }}
                          >
                            Step-2 : Filling Sample Details
                          </button>
                        </h2>

                        <Collapse isOpen={col2} className="accordion-collapse">
                          <div className="accordion-body">
                            {renderSampleDataRelatedFieldsForm()}
                          </div>
                        </Collapse>
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>

            <Card className="p-3 shadow-lg">
              <h5 className="text-primary mb-3">Customer's Data</h5>

              {!false && (
                <Row>
                  <Col lg={10}>
                    <div className="mb-3">
                      <Label>Select Customer</Label>
                      <Select
                        onBlur={() =>
                          validation.setFieldTouched("customer_id", true)
                        }
                        value={selectedGroup}
                        onChange={(selectedOption) => {
                          handleSelectGroup(setselectedGroup, selectedOption);
                        }}
                        options={optionsList}
                        className="select2-selection"
                      />
                      {validation.touched.customer_id &&
                        validation.errors.customer_id && (
                          <span className="text-danger">
                            {validation.errors.customer_id}
                          </span>
                        )}
                    </div>
                  </Col>
                  <Col lg={5}>
                    <div className="mb-3">
                      <Label htmlFor="discount">Discount :</Label>
                      <Input
                        type="number"
                        name="discount"
                        id="discount"
                        placeholder="Enter discount 1%-10%"
                        className="form-control"
                        value={validation.values.discount}
                        min={0}
                        max={10}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        invalid={
                          validation.touched.discount &&
                          validation.errors.discount
                        }
                      />
                      {validation.errors.discount &&
                        validation.touched.discount ? (
                        <FormFeedback type="invalid">
                          {validation.errors.discount}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                  <Col lg={5}>
                    <div className="mb-3">
                      <Label htmlFor="transportation_fee">
                        transportation_fee:
                      </Label>
                      <Input
                        type="number"
                        name="transportation_fee"
                        id="transportation_fee"
                        placeholder="Enter Transportation Charges"
                        className="form-control"
                        value={validation.values.transportation_fee}
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        invalid={
                          validation.touched.transportation_fee &&
                          validation.errors.transportation_fee
                        }
                      />
                      {validation.errors.transportation_fee &&
                        validation.touched.transportation_fee ? (
                        <FormFeedback type="invalid">
                          {validation.errors.transportation_fee}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                </Row>
              )}
            </Card>

            <Button
              type="submit"
              color="success"
              className="save-customer"
            // disabled={!validation.isValid || validation.isSubmitting}
            >
              {!loadingBdState ? (
                " Register Order"
              ) : (
                <>
                  Please Wait <i className="bx bx-loader bx-spin "></i>
                </>
              )}
            </Button>
          </Form>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default withRouter(OfflineOrderRegistrationForm);
