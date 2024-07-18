import { CHEMICAL, PHYSICAL } from "common/tokens";
import { AssignModalType } from "../LabHome";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Col } from "reactstrap";
import { Employee } from "pages/HRandAdmin/types";

interface AssignProps {
  assignModal: AssignModalType;
}

export const Assign: React.FC<AssignProps> = ({ assignModal }) => {
  const [chemist, setChemist] = useState<string | null>();
  const [physist, setPhysisist] = useState<string | null>(null);

  const { labStaff, parameters } = assignModal;

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
      console.log("This are the analyst");
      console.log(values);
    },
  });

  return (
    <React.Fragment>
      <form onSubmit={formik.handleSubmit}>
        {chemicalParamCount.length > 0 && (
          <Col lg={12}>
            <div className="mb-3">
              <label> Select SubGroup</label>
              <div>
                <select
                  className="form-control"
                  name="chemist"
                  id="basicpill-chemist-input1"
                  value={formik.values.chemist}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="" disabled>
                    Select chemist
                  </option>

                  {labStaff?.map((eachStaff: Employee) => (
                    <option value={eachStaff.emp_id} key={eachStaff.emp_id}>
                      {eachStaff.last_name}
                    </option>
                  ))}
                </select>
                {formik.errors.chemist && formik.touched.chemist ? (
                  <span className="text-danger">{formik.errors.chemist}</span>
                ) : null}
              </div>
            </div>
          </Col>
        )}

        {physicalParamCount.length > 0 && (
          <Col lg={12}>
            <div className="mb-3">
              <label> Select Technician</label>
              <div>
                <select
                  className="form-control"
                  name="physicist"
                  id="basicpill-physicist-input1"
                  value={formik.values.physicist}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="" disabled>
                    Select Analyst
                  </option>

                  {labStaff?.map((eachStaff: Employee) => (
                    <option value={eachStaff.emp_id} key={eachStaff.emp_id}>
                      {eachStaff.last_name}
                    </option>
                  ))}
                </select>
                {formik.errors.physicist && formik.touched.physicist ? (
                  <span className="text-danger">{formik.errors.physicist}</span>
                ) : null}
              </div>
            </div>
          </Col>
        )}

        <button className="btn btn-primary w-100" type="submit">
          Submit
        </button>
      </form>
    </React.Fragment>
  );
};
