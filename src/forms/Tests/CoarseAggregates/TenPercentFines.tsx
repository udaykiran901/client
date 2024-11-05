import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AppDispatch } from "index";
import { submitTestDetails, getSingleJob, rejectTestDetails } from "slices/thunk";
import { createSelector } from "reselect";

const TenPercent: React.FC = () => {
    const [w1t1, setW1T1] = useState<number>(0);
    const [w1t2, setW1T2] = useState<number>(0);
    const [w2t1, setW2T1] = useState<number>(0);
    const [w2t2, setW2T2] = useState<number>(0);
    const [yt1, setYT1] = useState<number>(0);
    const [yt2, setYT2] = useState<number>(0);
    const [avg, setAvg] = useState<any>(0);
    console.log(avg, 'avgggggggg')
    const [load, setLoad] = useState<number>(0);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { jobId } = useParams();
    const { pathname } = useLocation();
    const review = pathname.includes("review");
    const [editBtn, setEditBtn] = useState<boolean>(false);

    // Fetch job details
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

            if (job && job.bench_record) {
                let benchRec;
                try {
                    benchRec = JSON.parse(job.bench_record);
                } catch (err) {
                    console.error("Failed to parse bench_record:", err);
                    return;
                }

                if (benchRec[0] && benchRec[0].TenPercent) {
                    const getRes = async () => {
                        try {
                            const { w1t1, w1t2, w2t1, w2t2, yt1, yt2, avg, load } = benchRec[0].TenPercent;

                            setW1T1(w1t1);
                            setW1T2(w1t2);
                            setW2T1(w2t1);
                            setW2T2(w2t2);
                            setYT1(yt1);
                            setYT2(yt2);
                            setAvg(avg);
                            setLoad(load);
                            setEditBtn(true);
                        } catch (err) {
                            console.log("Error retrieving Ten Percent values:", err);
                        }
                    };
                    getRes();
                }
            }
        }
    }, [singleJob, review]);



    // Update average as soon as yt1 or yt2 change
    useEffect(() => {
        const yOne = parseFloat(((w2t1 / w1t1) * 100).toFixed(2));
        const yTwo = parseFloat(((w2t2 / w1t2) * 100).toFixed(2));


        const newAvg = ((yOne + yTwo) / 2).toFixed(2);
        console.log(w1t1, w1t2, w2t1, w2t2, yOne, yTwo, newAvg, 'all')
        setAvg(parseFloat(newAvg));
        setYT1(yOne);
        setYT2(yTwo);
    }, [w1t1, w1t2, w2t1, w2t2]);

    const handleOnSubmittingTest = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const kn = ((14 * load) / (avg + 4)).toFixed(2);
        const updatedBenchRecord = [{ TenPercent: { w1t1, w1t2, yt1, yt2, w2t1, w2t2, avg, load } }];
        const updatedReportValues = [{ TenPercent: { kn } }];
        const data = { updatedBenchRecord, updatedReportValues, jobId };

        try {
            await dispatch(submitTestDetails(data));
            navigate(-1);
        } catch (error) {
            console.error("Error submitting test details:", error);
        }
    };

    const toggleReviewBtn = () => setEditBtn(!editBtn);

    const rejectFunction = async () => {
        const requirement = { jobId };
        try {
            await dispatch(rejectTestDetails(requirement));
            navigate(-1);
        } catch (error) {
            console.error("Error rejecting test details:", error);
        }
    };

    const renderInput = (label: string, id: string, value: number, setValue: (val: number) => void, readOnly: boolean = false) => (
        <div style={{ marginBottom: '15px' }}>
            <label htmlFor={id}>{label}</label>
            <input
                required
                id={id}
                type="number"
                readOnly={readOnly}
                step="0.01"
                placeholder={`Enter ${label}`}
                value={value}
                {...(!readOnly && { onChange: (e) => setValue(parseFloat(e.target.value)) })}
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
            <h3 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>10% Fines Calculation</h3>

            {renderInput("W1 Trail 1", "w1t1", w1t1, setW1T1, editBtn)}
            {renderInput("W1 Trail 2", "w1t2", w1t2, setW1T2, editBtn)}
            {renderInput("W2 Trail 1", "w2t1", w2t1, setW2T1, editBtn)}
            {renderInput("W2 Trail 2", "w2t2", w2t2, setW2T2, editBtn)}
            {renderInput("Avg of % of Fines", "avg", avg, setAvg, true)}
            {renderInput("Load", "load", load, setLoad, editBtn)}

            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {!editBtn && <button type="submit" style={{ ...buttonStyle, marginRight: 20 }}>Submit</button>}
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
                <p>10% Fines (kN): 14 * X / (Y + 4)</p>
                <p>10% Fines (kN): {((14 * load) / (avg + 4)).toFixed(2)}</p>
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

export default TenPercent;
