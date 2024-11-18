import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AppDispatch } from "index";
import { submitTestDetails, getSingleJob, rejectTestDetails } from "slices/thunk";
import { createSelector } from "reselect";

const SpecificGravity = () => {
    const [w1, setW1] = useState<number>(0);
    const [w2, setW2] = useState<number>(0);
    const [w3, setW3] = useState<number>(0);
    const [w4, setW4] = useState<number>(0);
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

                // Ensure SpecificGravity exists before destructuring
                if (benchRec[0] && benchRec[0].SpecificGravity) {
                    const getRes = async () => {
                        try {
                            const { w1, w2, w3, w4 } = benchRec[0].SpecificGravity;

                            // Set each specific gravity value
                            setW1(w1);
                            setW2(w2);
                            setW3(w3);
                            setW4(w4);
                            setEditbtn(true);
                        } catch (err) {
                            console.log("Error retrieving specific gravity values:", err);
                        }
                    };
                    getRes();
                }
            }
        }
    }, [dispatch, singleJob, review]);



    const handleOnSubmittingTest = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const sg = (w4 / (w3 - (w2 - w1))).toFixed(2);
        const updatedBenchRecord = [{ SpecificGravity: { w1, w2, w3, w4 } }];
        const updatedReportValues = [{ SpecificGravity: { sg } }];
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
        try {
            await dispatch(rejectTestDetails({ jobId }));
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
            <h3 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>Specific Gravity Calculation</h3>

            {renderInput("Weight of Basket in Water (W1)", "input1", w1, setW1)}
            {renderInput("Weight of saturated aggregates and Basket in Water (W2)", "input2", w2, setW2)}
            {renderInput("Weight of saturated surface dry aggregates in air (W3)", "input3", w3, setW3)}
            {renderInput("Weight of oven dried aggregate in air (W4)", "input4", w4, setW4)}

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
                <p>Specific Gravity = (W4 / (W3 - (W2 - W1)))</p>
                <p>
                    Specific Gravity = ({w4} / ({w3} - ({w2} - {w1})))
                </p>
                <p>Specific Gravity = {(w4 / (w3 - (w2 - w1))).toFixed(2)}</p>
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

export default SpecificGravity;