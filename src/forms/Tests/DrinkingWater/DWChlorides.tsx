import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AppDispatch } from "index";
import { submitTestDetails, getSingleJob, rejectTestDetails } from "slices/thunk";
import { createSelector } from "reselect";

const DWChlorides = () => {
    const [v1, setV1] = useState<number>(0);
    const [b, setB] = useState<number>(0);
    const [f, setF] = useState<number>(0);
    const [i, setI] = useState<number>(0);
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

                const getRes = async () => {
                    try {
                        console.log(benchRec, 'bench record');

                        // Ensure the DWChlorides property exists before destructuring
                        if (benchRec[0].DWChlorides) {
                            const { v1, b, f, i, n } = benchRec[0].DWChlorides;

                            setV1(v1);
                            setB(b);
                            setF(f);
                            setI(i);
                            setN(n);

                            setEditbtn(true);
                        }
                    } catch (err) {
                        console.log(err);
                    }
                };
                getRes();
            }
        }
    }, [dispatch, singleJob, review]);


    const handleOnSubmittingTest = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const s = f - i;
        const os = Math.round(((s - b) * n * 35.45 * 100) / v1);

        const updatedBenchRecord = [{ DWChlorides: { v1, b, f, i, n } }];
        const updatedReportValues = [{ ChloridesAsCl: { os } }];
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
        const requirement = { jobId };
        try {
            await dispatch(rejectTestDetails(requirement));
            navigate(-1);
        } catch (error) {
            console.error("Error rejecting test details:", error);
        }
    };

    const renderInput = (label: string, id: string, value: number, setValue: (val: number) => void) => (
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
            <h3 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>DWChlorides Calculation</h3>

            {renderInput("Normality (N)", "normality", n, setN)}
            {renderInput("Vol. of Sample (v1)", "v1", v1, setV1)}
            {renderInput("Vol. of AgNO3 Consumed for Blank (B)", "b", b, setB)}
            {renderInput("Vol. of AgNO3 Consumed Final", "f", f, setF)}
            {renderInput("Vol. of AgNO3 Consumed Initial", "i", i, setI)}

            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {!editBtn && (
                    <button type="submit" style={{ ...buttonStyle, marginRight: 20 }}>
                        {editBtn ? "Update" : "Submit"}
                    </button>
                )}
                {editBtn && (
                    <>
                        <button type="button" onClick={toggleReviewBtn} style={{ ...buttonStyle, backgroundColor: '#2b3142', marginRight: 20 }}>
                            Edit
                        </button>
                        <button type="button" onClick={rejectFunction} style={{ ...buttonStyle, backgroundColor: '#2b3142', marginRight: 20 }}>
                            Reject
                        </button>
                    </>
                )}
            </div>

            <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
                <p>Chlorides as Cl = (((Final - Initial) - B) * N * 35.45 * 1000) / v1</p>
                <p>
                    Chlorides as Cl = (({f - i} - {b}) * {n} * 35.45 * 1000) / {v1}
                </p>
                <p>Chlorides as Cl = {Math.round(((f - i - b) * n * 35.45 * 1000) / v1)}</p>
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

export default DWChlorides;