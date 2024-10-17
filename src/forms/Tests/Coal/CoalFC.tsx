import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { AppDispatch } from "index";
import { submitTestDetails, getSingleJob, rejectTestDetails } from "slices/thunk"; // Update with your actual imports
import { createSelector } from "reselect";

const CoalFC: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { jobId } = useParams();

    const [benchRecord, setBenchRecord] = useState([]);
    const [reportValues, setReportValues] = useState([]);

    const review = pathname.includes("review");

    const [m, setM] = useState<number>(0);
    const [vm, setVm] = useState<number>(0);
    const [a, setA] = useState<number>(0);

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
                // if (true) {
                try {
                    const benchRec = JSON.parse(job.bench_record);

                    console.log(benchRec, 'vvvvv')
                    const { a, vm, m } = benchRec.Fc.resultObj;
                    setM(m);
                    setVm(vm);
                    setA(a);


                    setEditbtn(true);

                } catch (err) {
                    console.log(err);
                }
            }
            // };
            getRes();

        }
    }, [dispatch, singleJob, review]);

    const handleOnSubmittingTest = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const resultObj = { a, vm, m };
        const Fc = 100 - (m + vm + a); // Calculate % of Fixed Carbon

        const updatedBenchRecord = Array.isArray(benchRecord)
            ? [...benchRecord, { Fc: { resultObj } }]
            : [{ Fc: { resultObj } }];

        const updatedReportValues = Array.isArray(reportValues)
            ? [...reportValues, { Fc: { Fc } }]
            : [{ Fc: { Fc } }];

        const data = { updatedBenchRecord, updatedReportValues, jobId }; // Adjust data structure as necessary

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
                marginTop: 50
            }}
        >
            <h3 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>Coal Analysis</h3>

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="input1">% of Moisture of Content (M)</label>
                <input
                    required
                    readOnly={editBtn}
                    id="input1"
                    type="number"
                    step="0.01"
                    placeholder="Enter M"
                    value={m}
                    onChange={(e) => setM(parseFloat(e.target.value))}
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

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="input2">% of Volatile Matter (V.M)</label>
                <input
                    required
                    readOnly={editBtn}
                    id="input2"
                    type="number"
                    step="0.01"
                    placeholder="Enter VM"
                    value={vm}
                    onChange={(e) => setVm(parseFloat(e.target.value))}
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

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="input3">% of Ash content (A)</label>
                <input
                    required
                    readOnly={editBtn}
                    id="input3"
                    type="number"
                    step="0.01"
                    placeholder="Enter A"
                    value={a}
                    onChange={(e) => setA(parseFloat(e.target.value))}
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

            <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
                <p>% of FC = 100 - (M + VM + A)</p>
                <p>% of FC = 100 - ({m} + {vm} + {a})</p>
                <p>% of FC = {(100 - (m + vm + a)).toFixed(2)}</p>
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
}

export default CoalFC;
