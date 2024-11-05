import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "index";
import { submitTestDetails, getSingleJob, rejectTestDetails } from "slices/thunk";
import { createSelector } from "reselect";

const DeterminationOfCaoAndMgo: React.FC<any> = () => {
    const [w, setw] = useState<number>(0);
    const [m, setm] = useState<number>(0);
    const [cav, setCav] = useState<number>(0);
    const [mgv, setMgv] = useState<number>(0);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { jobId } = useParams();

    const [editBtn, setEditbtn] = useState<boolean>(false);

    const { pathname } = useLocation();

    const review = pathname.includes("review");


    // Selector to get job details
    const selectPropertiesLAB = createSelector(
        (state: any) => state.lab,
        (lab: any) => ({
            loadingLab: lab.loading,
            singleJob: lab.singleJob,
        })
    );

    const { singleJob } = useSelector(selectPropertiesLAB);

    useEffect(() => {
        dispatch(getSingleJob(jobId));
    }, [dispatch, jobId]);

    const [benchRecord, setBenchRecord] = useState([]);
    const [reportValues, setReportValues] = useState([]);

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

                setBenchRecord(benchRec || []);
                setReportValues(job.report_values ? JSON.parse(job.report_values) : []);

                const getRes = async () => {
                    try {
                        // Ensure that caMg.resultObj exists before destructuring
                        if (benchRec[0].caMg?.resultObj) {
                            const { w, m, cav, mgv } = benchRec[0].caMg.resultObj;

                            setw(w);
                            setm(m);
                            setCav(cav);
                            setMgv(mgv);

                            setEditbtn(true);
                        }
                    } catch (err) {
                        console.error("Error accessing caMg resultObj:", err);
                    }
                };
                getRes();
            }
        }
    }, [dispatch, singleJob, review]);


    const renderInput = (label: string, id: string, value: number, setValue: (val: number) => void) => (
        <div style={{ marginBottom: '15px' }}>
            <label htmlFor={id}>
                {label}
            </label>
            <input
                required
                id={id}
                type="number" readOnly={editBtn}
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

        const resultObj = { w, m, cav, mgv };
        const ca = ((cav * m * 56.08 * 25) / (w * 10)).toFixed(2);
        const mg = ((mgv * m * 40.32 * 25) / (w * 10)).toFixed(2);


        const updatedBenchRecord = Array.isArray(benchRecord)
            ? [{ caMg: { resultObj } }]
            : [{ caMg: { resultObj } }];

        const updatedReportValues = Array.isArray(reportValues)
            ? [{ caMg: { ca, mg } }]
            : [{ caMg: { ca, mg } }];


        const data = { updatedBenchRecord, updatedReportValues, jobId };

        try {
            await dispatch(submitTestDetails(data));
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
                backgroundColor: '#fff',
                marginTop: 50,
            }}
        >
            <h3 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>Determination of CaO and MgO</h3>

            {renderInput("Weight of the Sample (W)", "input1", w, setw)}
            {renderInput("Molarity of EDTA (M)", "input2", m, setm)}
            {renderInput("Ca (V)", "input3", cav, setCav)}
            {renderInput("Mg (V)", "input4", mgv, setMgv)}

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
                <p>CaO % = ((V * M * 56.08 * 25)/ (W * 10))</p>
                <p>CaO % = {((cav * m * 56.08 * 25) / (w * 10)).toFixed(2)}</p>
            </div>
            <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
                <p>MgO % = ((V * M * 40.32 * 25)/ (W * 10))</p>
                <p>MgO % = {((mgv * m * 40.32 * 25) / (w * 10)).toFixed(2)}</p>
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

export default DeterminationOfCaoAndMgo;
