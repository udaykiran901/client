import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { AppDispatch } from "index";

import { submitTestDetails, getSingleJob, rejectTestDetails } from "slices/thunk";

import { createSelector } from "reselect";



const DryMaterialContent: React.FC<any> = ({ jobDetails }) => {
    const [w1, setW1] = useState<number>(0);
    const [w2, setW2] = useState<number>(0);
    const [w3, setW3] = useState<number>(0);
    const [editBtn, setEditbtn] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const review = pathname.includes("review");

    const { jobId } = useParams();


    const [benchRecord, setBenchRecord] = useState([]);
    const [reportValues, setReportValues] = useState([]);

    useEffect(() => {
        dispatch(getSingleJob(jobId))
    }, [dispatch, jobId])

    const selectPropertiesLAB = createSelector(
        (state: any) => state.lab,
        (lab: any) => ({
            loadingLab: lab.loading,
            singleJob: lab.singleJob
        })
    );

    const { loadingLab, singleJob } = useSelector(selectPropertiesLAB);



    useEffect(() => {
        if (singleJob.length > 0) {
            const job = singleJob[0];

            // Check if job and bench_record are defined
            if (job && job.bench_record) {
                const benchRec = JSON.parse(job.bench_record);

                if (review && benchRec != null) {
                    setBenchRecord(benchRec || []); // Assuming benchRec is already parsed
                    setReportValues(JSON.parse(job.report_values) || []);

                    const getRes = async () => {
                        try {
                            console.log(benchRec[0].dmc, 'raw bench ashContent');
                            const { w1, w2, w3 } = benchRec[0].dmc; // Ensure dmc exists
                            console.log(w1, w2, w3, 'in useEffect');
                            setEditbtn(true);
                            setW1(w1);
                            setW2(w2);
                            setW3(w3);
                        } catch (err) {
                            console.log("Error accessing dmc properties:", err);
                        }
                    };

                    getRes();
                }
            } else {
                console.log("Job or bench_record is undefined");
            }
        } else {
            console.log("singleJob array is empty");
        }
    }, [dispatch, singleJob, review]);


    const renderInput = (label: string, id: string, value: number, setValue: (val: number) => void) => (
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
        const resultObj = { w1, w2, w3 };
        const DMC = (((w3 - w1) / (w2 - w1)) * 100).toFixed(2);
        // await SubmitTest(DMC.toString(), JSON.stringify(resultObj), dispatch, review, history);
        console.log("Result:", resultObj, "DMC:", DMC);

        const updatedBenchRecord = Array.isArray(benchRecord)
            ? [{ dmc: { w1, w2, w3 } }]
            : [{ dmc: { w1, w2, w3 } }];

        const updatedReportValues = Array.isArray(reportValues)
            ? [...reportValues, { dmc: DMC }]
            : [{ dmc: DMC }];


        const data = { updatedBenchRecord, updatedReportValues, jobId };

        console.log("Updated Bench Record:", updatedBenchRecord);
        console.log("Updated Report Values:", updatedReportValues);
        // await dispatch(submitTestDetails(JSON.stringify(data)));
        // await dispatch(submitTestDetails((data)));

        try {
            await dispatch(submitTestDetails(data));
            // Navigate back to the previous page
            navigate(-1); // Go back to the previous route
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
            <h3 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>Dry Material Test</h3>

            {renderInput("Empty crucible + sand (w1)", "input1", w1, setW1)}
            {renderInput("Empty Crucible + sand + Sample (w2)", "input2", w2, setW2)}
            {renderInput("wt. at 105 °C for 17 ±15 mins (w3)", "input3", w3, setW3)}

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
                <p>DMC % = ((w3 - w1) / (w2 - w1)) * 100</p>
                <p>DMC % = {(((w3 - w1) / (w2 - w1)) * 100).toFixed(2)}</p>
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
    // backgroundColor: '#007BFF',
    backgroundColor: '#2b3142',
    color: '#fff',
    fontSize: '10px',
    transition: 'background-color 0.3s',
    width: '75px',
};



export default DryMaterialContent;
