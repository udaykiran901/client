import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AppDispatch } from "index";
import { submitTestDetails, getSingleJob, rejectTestDetails } from "slices/thunk";
import { createSelector } from "reselect";

interface Props {
    jobDetails: any; // Update this with your actual job details type
}

const DeterminationOfDissolvedSilica: React.FC<any> = (props: Props) => {
    const [w1x1, setW1x1] = useState<number>(0);
    const [w1x2, setW1x2] = useState<number>(0);
    const [w1x3, setW1x3] = useState<number>(0);

    const [w2x1, setW2x1] = useState<number>(0);
    const [w2x2, setW2x2] = useState<number>(0);
    const [w2x3, setW2x3] = useState<number>(0);

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

                // Ensure benchRec has elements before accessing its properties
                if (benchRec.length > 0) {
                    const getRes = async () => {
                        try {
                            console.log("Job details:", job);
                            const { w1x1, w1x2, w1x3, w2x1, w2x2, w2x3 } = benchRec[0];

                            setW1x1(w1x1);
                            setW1x2(w1x2);
                            setW1x3(w1x3);

                            setW2x1(w2x1);
                            setW2x2(w2x2);
                            setW2x3(w2x3);

                            setEditbtn(true);
                        } catch (err) {
                            console.error("Error in setting benchRec values:", err);
                        }
                    };
                    getRes();
                }
            }
        }
    }, [dispatch, singleJob, review]);




    const handleOnSubmittingTest = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const resultObj = { w1x1, w1x2, w1x3, w2x1, w2x2, w2x3 };

        const os = ((w2x2 - w2x3 - (w1x2 - w1x3)) * 3330).toFixed(2);
        const data = { updatedBenchRecord: [resultObj], updatedReportValues: [{ os }], jobId }; // Adjust according to your needs

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
            <h3 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>Dissolved Silica Calculation</h3>

            <h1 className="span-highlighted-text">Blank w1</h1>
            {renderInput("Weight of empty crucible (x1)", "inputw1x1", w1x1, setW1x1)}
            {renderInput("Weight of crucible + insolubles (x2)", "inputw1x2", w1x2, setW1x2)}
            {renderInput("Weight of crucible + insolubles after HF treatment (x3)", "input1", w1x3, setW1x3)}

            <h1 className="span-highlighted-text">Sample W2</h1>
            {renderInput("Weight of empty crucible (x1)", "inputw2x1", w2x1, setW2x1)}
            {renderInput("Weight of crucible + insolubles (x2)", "inputw2x2", w2x2, setW2x2)}
            {renderInput("Weight of crucible + insolubles after HF treatment (x3)", "input2", w2x3, setW2x3)}

            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {!editBtn && (
                    <button type="submit" style={{ ...buttonStyle, marginRight: 20 }}>
                        {editBtn ? "Update" : "Submit"}
                    </button>
                )}

                {editBtn && (
                    <button type="button" onClick={toggleReviewBtn} style={{ ...buttonStyle, backgroundColor: '#2b3142', marginRight: 20 }}>
                        Edit
                    </button>
                )}
                {editBtn && <button type="button" onClick={rejectFunction} style={{ ...buttonStyle, backgroundColor: '#2b3142', marginRight: 20 }}>Reject</button>}
            </div>

            <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
                <p>
                    W1 : (w1x2 - w1x3) = ({w1x2} - {w1x3}) <br />
                    W2 : (w2x2 - w2x3) = ({w2x2} - {w2x3})
                </p>
                <p>
                    Dissolved Silica : (({w2x2} - {w2x3}) - ({w1x2} - {w1x3})) * 3330
                </p>
                <p>
                    Dissolved Silica : {((w2x2 - w2x3 - (w1x2 - w1x3)) * 3330).toFixed(2)} mille moles per liter
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
    fontSize: '10px',
    transition: 'background-color 0.3s',
    width: '75px',
};

export default DeterminationOfDissolvedSilica;
