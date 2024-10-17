import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { AppDispatch } from "index";
import { submitTestDetails, getSingleJob, rejectTestDetails } from "slices/thunk"; // Update with your actual imports
import { createSelector } from "reselect";

const DeterminationOfSulphuricAhydrideFa: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { jobId } = useParams();

    const review = pathname.includes("review");

    const [benchRecord, setBenchRecord] = useState([]);
    const [reportValues, setReportValues] = useState([]);

    const [w, setW] = useState<number>(0);
    const [w1, setW1] = useState<number>(0);
    const [w2, setW2] = useState<number>(0);

    const [editBtn, setEditbtn] = useState<boolean>(false);

    useEffect(() => {
        dispatch(getSingleJob(jobId));
    }, [dispatch, jobId]);

    // Selector to get job details
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

            setBenchRecord(JSON.parse(job.bench_record) || []);
            setReportValues(JSON.parse(job.report_values) || []);
            const getRes = async () => {
                try {
                    const benchRec = JSON.parse(job.bench_record);

                    const { w, w1, w2 } = benchRec.so3.resultObj;
                    setW(w);
                    setW1(w1);
                    setW2(w2);

                    setEditbtn(true);
                } catch (err) {
                    console.log(err);
                }
            }
            getRes();
        }
    }, [dispatch, singleJob, review]);

    const renderInput = (label: string, id: string, value: number, setValue: (val: number) => void, readOnly: boolean = false) => (
        <div style={{ marginBottom: '15px' }}>
            <label htmlFor={id}>{label}</label>
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

        const resultObj = { w, w1, w2 };
        const SO3 = (((w2 - w1) / w) * 34.3).toFixed(2);

        const updatedBenchRecord = Array.isArray(benchRecord)
            ? [...benchRecord, { so3: { resultObj } }]
            : [{ so3: { resultObj } }];

        const updatedReportValues = Array.isArray(reportValues)
            ? [...reportValues, { so3: { SO3 } }]
            : [{ so3: { SO3 } }];

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
            navigate(-1);
        } catch (error) {
            console.error("Error rejecting test details:", error);
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
                backgroundColor: '#fff',
                marginTop: 50
            }}
        >
            <h3 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>Determination of Sulphuric Ahydride (SO3)</h3>

            {renderInput("Weight of Sample (w)", "input1", w, setW, review)}
            {renderInput("Weight of empty Crucible (w1)", "input2", w1, setW1, review)}
            {renderInput("Weight of crucible + residue (w2)", "input3", w2, setW2, review)}

            <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
                <p>SO3 % = (((w2 - w1) / w) * (34.3))</p>
                <p>SO3 % = {(((w2 - w1) / w) * 34.3).toFixed(2)}</p>
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

export default DeterminationOfSulphuricAhydrideFa;
