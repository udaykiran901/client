import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { AppDispatch } from "index";
import { submitTestDetails, getSingleJob, rejectTestDetails } from "slices/thunk"; // Update with your actual imports
import { createSelector } from "reselect";

interface Props {
    jobDetails: any; // Adjust type as necessary
}

const DeterminationOfAlumina: React.FC<any> = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const review = pathname.includes("review");

    const [editBtn, setEditbtn] = useState<boolean>(false);


    const [w, setw] = useState<number>(0);
    const [m, setm] = useState<number>(0);
    const [v1, setv1] = useState<number>(0);
    const [v2, setv2] = useState<number>(0);
    const [v3, setv3] = useState<number>(0);
    const [e, sete] = useState<number>(0);
    const [v, setv] = useState<number>(0);

    const { jobId } = useParams();

    useEffect(() => {
        dispatch(getSingleJob(jobId));
    }, [dispatch, jobId]);



    const selectPropertiesLAB = createSelector(
        (state: any) => state.lab,
        (lab: any) => ({
            loadingLab: lab.loading,
            singleJob: lab.singleJob,
        })
    );

    const { singleJob } = useSelector(selectPropertiesLAB);

    const [benchRecord, setBenchRecord] = useState([]);
    const [reportValues, setReportValues] = useState([]);

    useEffect(() => {
        if (singleJob.length > 0 && review) {
            const job = singleJob[0];

            setBenchRecord(JSON.parse(job.bench_record) || []);
            setReportValues(JSON.parse(job.report_values) || []);
            const getRes = async () => {
                // if (true) {
                try {
                    const benchRec = JSON.parse(job.bench_record);


                    const { w, m, v1, v2, v3, e, v } = benchRec.Al2O3.resultObj;

                    setw(w)
                    setm(m)
                    setv1(v1)
                    setv2(v2)
                    setv3(v3)
                    sete(e)
                    setv(v)

                    setEditbtn(true);

                } catch (err) {
                    console.log(err);
                }
            }
            // };
            getRes();

        }
    }, [dispatch, singleJob, review]);


    const renderInput = (label: string, id: string, value: number, setValue: (val: number) => void, readOnly: boolean = false) => (
        <div style={{ marginBottom: '15px' }}>
            <label htmlFor={id}>
                {label}
            </label>
            <input
                required
                readOnly={editBtn}
                id={id}
                type="number"
                step="0.01"
                placeholder={`Enter ${label}`}
                value={value}
                onChange={(e) => setValue(parseFloat(e.target.value))}
                style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    fontSize: '16px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
            />
        </div>
    );

    const handleOnSubmittingTest = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const calculatedV = v1 - v2 - v3 * e;
        setv(calculatedV);

        const resultObj = { w, m, v1, v2, v3, e, v: calculatedV };
        const Al2O3 = ((calculatedV * 50.98 * m * 250 * 100) / (w * 1000 * 25)).toFixed(2);


        const updatedBenchRecord = Array.isArray(benchRecord)
            ? [...benchRecord, { Al2O3: { resultObj } }]
            : [{ Al2O3: { resultObj } }];

        const updatedReportValues = Array.isArray(reportValues)
            ? [...reportValues, { Al2O3: { value: Al2O3 } }]
            : [{ Al2O3: { value: Al2O3 } }];


        const data = { updatedBenchRecord, updatedReportValues, jobId };

        try {
            await dispatch(submitTestDetails(data));
            navigate(-1);
        } catch (error) {
            console.error("Error submitting test details:", error);
        }
    };

    const toggleReviewBtn = () => setEditbtn(!editBtn);

    const rejectFunction = async () => {
        const requirement = { jobId }
        try {
            await dispatch(rejectTestDetails(requirement));
            // Navigate back to the previous page
            navigate(-1); // Go back to the previous route
        } catch (error) {
            console.error("Error submitting test details:", error);
        }
    }

    return (
        <form
            onSubmit={handleOnSubmittingTest}
            style={{
                display: 'flex',
                flexDirection: 'column',
                maxWidth: '600px',
                margin: '0 auto',
                padding: '20px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#fff', marginTop: 50
            }}
        >
            <h3 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>Determination of Alumina</h3>

            {renderInput("Wt of the Sample (W)", "input1", w, setw)}
            {renderInput("Molarity (M)", "input2", m, setm)}
            {renderInput("Total Vol of EDTA used in titration (V1)", "input3", v1, setv1)}
            {renderInput("Vol of EDTA used for iron (V2)", "input4", v2, setv2)}
            {renderInput("Total Vol of Bismuth Nitrate Solution (V3)", "input5", v3, setv3)}
            {renderInput("Equivalence of 1ml bismuth nitrate solution (E)", "input6", e, sete)}

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="inputResult">Al2O3 (V)</label>
                <input
                    required
                    readOnly={true}
                    id="inputResult"
                    type="number"
                    value={v1 - v2 - v3 * e}
                    style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        fontSize: '16px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    }}
                />
            </div>

            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {!editBtn && <button type="submit" style={{ ...buttonStyle, marginRight: 20 }}>
                    {editBtn ? "Update" : "Submit"}
                </button>}

                {editBtn && (
                    <button type="button" onClick={toggleReviewBtn} style={{ ...buttonStyle, backgroundColor: '#2b3142', marginRight: 20 }}>
                        Edit
                    </button>
                )}

                {editBtn && (
                    <button type="button" onClick={rejectFunction} style={{ ...buttonStyle, backgroundColor: '#2b3142', marginRight: 20 }}>
                        Reject
                    </button>
                )}

            </div>

            <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
                <p>Al2O3 % = ((V * 50.98 * M * 250 * 100)/(W * 1000 * 25))</p>
                <p>
                    Al2O3 % = {((v1 - v2 - v3 * e) * 50.98 * m * 250 * 100 / (w * 1000 * 25)).toFixed(2)}
                </p>
            </div>
        </form>
    );
};

const buttonStyle = {
    marginTop: '10px',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#2b3142',
    color: '#fff',
    fontSize: '16px',
    transition: 'background-color 0.3s',
    width: '100%',
};

export default DeterminationOfAlumina;
