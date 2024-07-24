import { CHEMICAL, PHYSICAL } from "common/tokens";
import { AssignModalType } from "../LabHome";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Col } from "reactstrap";
import { Employee } from "pages/HRandAdmin/types";
import undefinedImage from "../../../assets/images/undefined-profile.svg";
import {
  LABORATORY_CHEMICAL,
  LABORATORY_MECHANICAL,
} from "common/data/departments";
import { Param } from "pages/BD/types";
import { useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { LabAction } from "../type";
import { useSelector } from "react-redux";
import { assigningParamsToAnlysts } from "slices/thunk";

interface AssignProps {
  assignModal: AssignModalType;
}

export const textProfile = (text: string) => (
  <div className="avatar-sm me-3 mx-lg-auto mb-3 mt-1 float-start float-lg-none rounded avatar-sm">
    <span
      className={
        "avatar-title rounded-circle primary" +
        "-subtle text-" +
        text +
        " font-size-16"
      }
    >
      {text}
    </span>
  </div>
);

export const toTestTheFollowingParams = (
  discipline: string,
  parameters: Param[]
) => {
  return (
    <div className="mt-2">
      <p className={`text-primary`}>To test the following Params</p>
      {parameters
        .filter((eachParam: Param) => eachParam.param.discipline === discipline)
        .map((eachFilteredParam: Param, index) => (
          <div className="d-flex" key={index}>
            <i
              className={`mdi mdi-circle-medium align-middle text-${
                discipline === CHEMICAL ? "success" : "warning"
              } me-1`}
            />
            <p>
              {eachFilteredParam.params_info
                .map((eachTest, ind) => eachTest.testName)
                .join(", \n")}
            </p>
          </div>
        ))}
    </div>
  );
};

export const Assign: React.FC<AssignProps> = ({ assignModal }) => {
  const { labStaff, parameters, sampleId } = assignModal;

  const dispatch: any = useDispatch();
  const selectPropertiesLAB = createSelector(
    (state: LabAction) => state.lab,
    (lab) => ({
      loadingLab: lab.loading,
    })
  );

  const { loadingLab } = useSelector(selectPropertiesLAB);

  const [selectedChemist, setSelectedChemist] = useState<
    Employee | undefined
  >();
  const [selectedPhysicist, setSelectedPhysicist] = useState<
    Employee | undefined
  >();

  const chemicalParamCount = parameters.filter(
    (eachParam) => eachParam.param.discipline === CHEMICAL
  );

  const physicalParamCount = parameters.filter(
    (eachParam) => eachParam.param.discipline === PHYSICAL
  );

  const formik = useFormik({
    initialValues: {
      chemist: "",
      physicist: "",
    },
    validationSchema: Yup.object({
      chemist:
        chemicalParamCount.length > 0
          ? Yup.string().required("Chemist is required")
          : Yup.string(),
      physicist:
        physicalParamCount.length > 0
          ? Yup.string().required("Physicist is required")
          : Yup.string(),
    }),
    onSubmit: (values) => {
      console.log(values);
      dispatch(assigningParamsToAnlysts({ ...values, sampleId }));
    },
  });

  useEffect(() => {
    const selectedChemist = (labStaff || []).find(
      (eachStaff) => eachStaff.emp_id === formik.values.chemist
    );
    setSelectedChemist(selectedChemist);
  }, [formik.values.chemist, labStaff]);

  useEffect(() => {
    const selectedPhysicist = (labStaff || []).find(
      (eachStaff) => eachStaff.emp_id === formik.values.physicist
    );
    setSelectedPhysicist(selectedPhysicist);
  }, [formik.values.physicist, labStaff]);

  const chemicalStaff = (labStaff || []).filter(
    (eachStaff) => eachStaff.department === LABORATORY_CHEMICAL
  );

  const mechanicalStaff = (labStaff || []).filter(
    (eachStaff) => eachStaff.department === LABORATORY_MECHANICAL
  );

  const handleChemistChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const empId = event.target.value;
    formik.setFieldValue("chemist", empId);
    const selectedChemist = (labStaff || []).find(
      (eachStaff) => eachStaff.emp_id === empId
    );

    setSelectedChemist(selectedChemist);
  };

  const handlePhysicistChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const empId = event.target.value;
    formik.setFieldValue("physicist", empId);
    const selectedPhysicist = (labStaff || []).find(
      (eachStaff) => eachStaff.emp_id === empId
    );
    setSelectedPhysicist(selectedPhysicist);
  };

  const renderTechnicianImageChemist = () => {
    if (selectedChemist) {
      return selectedChemist.profile_photo ? (
        <img
          className="rounded avatar-sm"
          src={selectedChemist.profile_photo}
          alt="Generic placeholder img"
        />
      ) : (
        textProfile(
          selectedChemist.last_name[0] + selectedChemist.first_name[0]
        )
      );
    } else {
      return (
        <img
          className="rounded avatar-sm"
          src={undefinedImage}
          alt="Generic placeholder img"
        />
      );
    }
  };

  const renderTechnicianImagePhysicist = () => {
    if (selectedPhysicist) {
      return selectedPhysicist.profile_photo ? (
        <img
          className="rounded avatar-sm"
          src={selectedPhysicist.profile_photo}
          alt="Generic placeholder img"
        />
      ) : (
        textProfile(
          selectedPhysicist.last_name[0] + selectedPhysicist.first_name[0]
        )
      );
    } else {
      return (
        <img
          className="rounded avatar-sm"
          src={undefinedImage}
          alt="Generic placeholder img"
        />
      );
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      {chemicalParamCount.length > 0 && (
        <Col lg={12}>
          <div className="d-flex">
            <div className="flex-shrink-0 me-3">
              {renderTechnicianImageChemist()}
            </div>
            <div className="flex-grow-1">
              <div className="mb-3">
                <label htmlFor="basicpill-chemist-input1">
                  <span className="text-warning"> Select Chemist</span> <br />
                  {toTestTheFollowingParams(CHEMICAL, parameters)}
                </label>
                <div>
                  <select
                    className="form-control"
                    name="chemist"
                    id="basicpill-chemist-input1"
                    value={formik.values.chemist}
                    onChange={handleChemistChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="" disabled>
                      Select chemist
                    </option>
                    {chemicalStaff.map((eachChemist: Employee) => (
                      <option
                        value={eachChemist.emp_id}
                        key={eachChemist.emp_id}
                      >
                        {eachChemist.last_name + "  " + eachChemist.first_name}
                      </option>
                    ))}
                  </select>
                  {formik.errors.chemist && formik.touched.chemist ? (
                    <span className="text-danger">{formik.errors.chemist}</span>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </Col>
      )}

      {physicalParamCount.length > 0 && (
        <Col lg={12}>
          <div className="d-flex">
            <div className="flex-shrink-0 me-3">
              {renderTechnicianImagePhysicist()}
            </div>
            <div className="flex-grow-1">
              <div className="mb-3">
                <label htmlFor="basicpill-physicist-input1">
                  <span className="text-warning"> Select Physicist</span> <br />
                  {toTestTheFollowingParams(PHYSICAL, parameters)}
                </label>

                <div>
                  <select
                    className="form-control"
                    name="physicist"
                    id="basicpill-physicist-input1"
                    value={formik.values.physicist}
                    onChange={handlePhysicistChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="" disabled>
                      Select Physicist
                    </option>
                    {mechanicalStaff.map((eachStaff: Employee) => (
                      <option value={eachStaff.emp_id} key={eachStaff.emp_id}>
                        {eachStaff.last_name + "  " + eachStaff.first_name}
                      </option>
                    ))}
                  </select>
                  {formik.errors.physicist && formik.touched.physicist ? (
                    <span className="text-danger">
                      {formik.errors.physicist}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </Col>
      )}

      <button
        disabled={loadingLab}
        className="btn btn-primary w-100"
        type="submit"
      >
        {loadingLab ? (
          <>
            Please wait <i className="bx bx-loader bx-spin "></i>
          </>
        ) : (
          "Assign"
        )}
      </button>
    </form>
  );
};
