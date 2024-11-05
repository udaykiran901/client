import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AppDispatch } from "index";
import { submitTestDetails, getSingleJob, rejectTestDetails } from "slices/thunk";
import { createSelector } from "reselect";

const CAGGReductionAlkalinity = () => {
    const [v1, setV1] = useState<number>(0);
    const [v2, setV2] = useState<number>(0);
    const [v3, setV3] = useState<number>(0);
    const [n, setN] = useState<number>(0);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { jobId } = useParams();
    const { pathname } = useLocation();
    const review = pathname.includes("review");
    const [editBtn, setEditbtn] = useState<boolean>(false);

    useEffect(() => {
        dispatch(getSingleJob(jobId));
    }, [dispatch, jobId]);

    const selectPropertiesLAB = createSelector(
        (state: any) => state.lab,
        (lab: any) => ({
            singleJob: lab.singleJob,
        })
    );

    const { singleJob } = useSelector(selectPropertiesLAB);

    useEffect(() => {
        if (singleJob.length > 0 && review) {
            const job = singleJob[0];

            // Check if job and job.bench_record are defined before proceeding
            if (job && job.bench_record) {
                let benchRec;
                try {
                    benchRec = JSON.parse(job.bench_record);
                } catch (err) {
                    console.error("Failed to parse bench_record:", err);
                    return; // Exit if parsing fails
                }

                // Ensure benchRec is not empty before accessing its properties
                if (benchRec.length > 0) {
                    const getRes = async () => {
                        try {
                            console.log("Job details:", job);
                            const { v1, v2, v3, n } = benchRec[0];

                            setV1(v1);
                            setV2(v2);
                            setV3(v3);
                            setN(n);
                            setEditbtn(true);
                        } catch (err) {
                            console.error("Error in getRes:", err);
                        }
                    };
                    getRes();
                }
            }
        }
    }, [dispatch, singleJob, review]);





    const handleOnSubmittingTest = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const resultObj = { v1, v2, v3, n };
        const os = ((20 * n * (v3 - v2) * 1000) / v1).toFixed(1);
        const data = { updatedBenchRecord: [resultObj], updatedReportValues: [{ os }], jobId }; // Adjust the data structure as necessary

        try {
            await dispatch(submitTestDetails(data));
            navigate(-1);
        } catch (error) {
            console.error("Error submitting test details:", error);
        }
    };

    const toggleReviewBtn = () => setEditbtn(!editBtn);
    const rejectFunction = async () => {
        const requirement = { jobId };
        try {
            await dispatch(rejectTestDetails(requirement));
            navigate(-1); // Go back to the previous route
        } catch (error) {
            console.error("Error rejecting test details:", error);
        }
    };

    const renderInput = (label: string, value: number, setValue: (val: number) => void, id: string) => (
        <div style={{ marginBottom: '15px' }}>
            <label htmlFor={id}>{label}</label>
            <input
                required
                id={id}
                type="number"
                readOnly={editBtn}
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
                backgroundColor: '#fff',
                marginTop: 50,
            }}
        >
            <h3 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>CAGG Reduction in Alkalinity</h3>

            {renderInput("Normality of HCl", n, setN, "inputNormality")}
            {renderInput("Volume of dil solution used (v1)", v1, setV1, "inputV1")}
            {renderInput("Volume of HCl used in test sample (v2)", v2, setV2, "inputV2")}
            {renderInput("Volume of HCl used in Blank (v3)", v3, setV3, "inputV3")}

            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {!editBtn && <button type="submit" style={buttonStyle}>
                    Submit
                </button>}

                {editBtn && (
                    <button type="button" onClick={toggleReviewBtn} style={{ ...buttonStyle, backgroundColor: '#2b3142', marginRight: 20 }}>
                        Edit
                    </button>
                )}
                {editBtn && <button type="button" onClick={rejectFunction} style={{ ...buttonStyle, backgroundColor: '#2b3142', marginRight: 20 }}>Reject</button>}

            </div>

            <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
                <p>Reduction in Alkalinity = (20 * n * (v3 - v2) * 1000) / v1</p>
                <p>
                    Reduction in Alkalinity = (20 * {n} * ({v3} - {v2}) * 1000) / {v1}
                </p>
                <p>Reduction in Alkalinity = {((20 * n * (v3 - v2) * 1000) / v1).toFixed(1)}</p>
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
    fontSize: '10px',
    transition: 'background-color 0.3s',
    width: '75px',
};

export default CAGGReductionAlkalinity;
