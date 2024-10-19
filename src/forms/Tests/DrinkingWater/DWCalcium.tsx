import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AppDispatch } from "index";
import { submitTestDetails, getSingleJob, rejectTestDetails } from "slices/thunk";
import { createSelector } from "reselect";

const DWCalcium = () => {
    const [v1, setV1] = useState<number>(0);
    const [f, setF] = useState<number>(0);
    const [i, setI] = useState<number>(0);
    const [m, setM] = useState<number>(0);
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

            const getRes = async () => {
                try {
                    const benchRec = JSON.parse(job.bench_record);
                    const { v1, f, i, m } = benchRec;

                    setV1(v1);
                    setF(f);
                    setI(i);
                    setM(m);

                    setEditbtn(true);
                } catch (err) {
                    console.log(err);
                }
            };
            getRes();
        }
    }, [dispatch, singleJob, review]);

    const handleOnSubmittingTest = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const s = f - i;
        const os = Math.round((s * m * 40.08 * 1000) / v1);

        const updatedBenchRecord = [{ v1, f, i, m }];
        const updatedReportValues = [{ os }];

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
            navigate(-1); // Go back to the previous route
        } catch (error) {
            console.error("Error submitting test details:", error);
        }
    };

    const renderInput = (label: string, id: string, value: number, setValue: (val: number) => void) => (
        <div style={{ marginBottom: "15px" }}>
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
                    width: "100%",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    fontSize: "16px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
            />
        </div>
    );

    return (
        <form
            onSubmit={handleOnSubmittingTest}
            style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "600px",
                margin: "0 auto",
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#fff",
                marginTop: 50,
            }}
        >
            <h3 style={{ textAlign: "center", marginBottom: "20px", fontWeight: "bold" }}>
                DW Calcium Calculation
            </h3>

            {renderInput("vol. of Sample (v) ml", "input1", v1, setV1)}
            {renderInput("Vol of EDTA Consumed final ml", "input3", f, setF)}
            {renderInput("Vol of EDTA Consumed initial ml", "input2", i, setI)}
            {renderInput("Morality", "inputm", m, setM)}

            <div style={{ display: "flex", flexDirection: "row" }}>
                {!editBtn && <button type="submit" style={{ ...buttonStyle, marginRight: 20 }}>
                    {editBtn ? "Update" : "Submit"}
                </button>}

                {editBtn && (
                    <button type="button" onClick={toggleReviewBtn} style={{ ...buttonStyle, backgroundColor: "#2b3142", marginRight: 20 }}>
                        Edit
                    </button>
                )}

                {editBtn && (
                    <button type="button" onClick={rejectFunction} style={{ ...buttonStyle, backgroundColor: "#2b3142", marginRight: 20 }}>
                        Reject
                    </button>
                )}
            </div>

            <div style={{ marginTop: "20px", fontWeight: "bold" }}>
                <p>Calcium = ((Final - Initial) * M * 100 * 1000) / v</p>
                <p>
                    Calcium = (({f} - {i}) * {m} * 40.08 * 1000) / {v1}
                </p>
                <p>Calcium = {Math.round(((f - i) * m * 40.08 * 1000) / v1)}</p>
            </div>
        </form>
    );
};

const buttonStyle = {
    marginTop: "10px",
    padding: "10px 15px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    backgroundColor: "#2b3142",
    color: "#fff",
    fontSize: "10px",
    transition: "background-color 0.3s",
    width: "75px",
};

export default DWCalcium;
