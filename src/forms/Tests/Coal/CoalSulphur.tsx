import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { AppDispatch } from "index"; // Update with your actual imports
import { submitTestDetails, getSingleJob, rejectTestDetails } from "slices/thunk"; // Adjust with your actual imports
import { createSelector } from "reselect";

const CoalSulphur: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { jobId } = useParams();

    const [w, setW] = useState<number>(0);
    const [w1, setW1] = useState<number>(0);
    const [w2, setW2] = useState<number>(0);
    const [editBtn, setEditbtn] = useState<boolean>(false);

    const { pathname } = useLocation();
    const review = pathname.includes("review");

    // Selector to get job details
    const selectPropertiesLAB = createSelector(
        (state: any) => state.lab,
        (lab: any) => ({
            singleJob: lab.singleJob,
        })
    );

    const { singleJob } = useSelector(selectPropertiesLAB);

    useEffect(() => {
        dispatch(getSingleJob(jobId));
    }, [dispatch, jobId]);

    useEffect(() => {
        if (singleJob.length > 0 && review) {
            const job = singleJob[0];


            const getRes = async () => {
                try {
                    const benchRec = JSON.parse(job.bench_record);

                    console.log(benchRec, 'vvv')
                    const { w, w1, w2 } = benchRec.Sulphur.resultObj;
                    setW(w);
                    setW1(w1);
                    setW2(w2);
                    setEditbtn(true);
                } catch (err) {
                    console.log(err);
                }
            };
            getRes();
        }
    }, [singleJob, review]);

    const handleOnSubmittingTest = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const resultObj = { w, w1, w2 };
        const value = (((w2 - w1 - 0) * 13.74) / w).toFixed(2);

        const data = { updatedBenchRecord: [{ Sulphur: { resultObj } }], updatedReportValues: [{ SulphurContent: value }], jobId };

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
                marginTop: 50
            }}
        >
            <h3 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>Sulphur Content Analysis</h3>

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="input1">Wt of the sample (w)</label>
                <input
                    required
                    readOnly={editBtn}
                    id="input1"
                    type="number"
                    step="0.01"
                    placeholder="Enter W"
                    value={w}
                    onChange={(e) => setW(parseFloat(e.target.value))}
                    style={inputStyle}
                />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="input2">Empty (w1)</label>
                <input
                    required
                    readOnly={editBtn}
                    id="input2"
                    type="number"
                    step="0.01"
                    placeholder="Enter W1"
                    value={w1}
                    onChange={(e) => setW1(parseFloat(e.target.value))}
                    style={inputStyle}
                />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="input3">BaSO<sub>4</sub> after Igniting (w2)</label>
                <input
                    required
                    readOnly={editBtn}
                    id="input3"
                    type="number"
                    step="0.01"
                    placeholder="Enter W2"
                    value={w2}
                    onChange={(e) => setW2(parseFloat(e.target.value))}
                    style={inputStyle}
                />
            </div>

            <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
                <p>Sample: (w2 - w1) g = {w2 - w1}</p>
                <p>Sulphur content % by mass: ((w2 - w1) - B) * 13.74 / w</p>
                <p>Sulphur content % by mass: (({w2} - {w1} - {0}) * 13.74) / {w}</p>
                <p>Sulphur content % by mass: {(((w2 - w1 - 0) * 13.74) / w).toFixed(2)}</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
                {!editBtn && (
                    <button type="submit" style={buttonStyle}>
                        Submit
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
        </form>
    );
};

const inputStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
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

export default CoalSulphur;
