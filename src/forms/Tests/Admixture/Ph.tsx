import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "index";
import { submitTestDetails, getSingleJob, rejectTestDetails } from "slices/thunk"; // Adjust imports as needed
import { createSelector } from "reselect";

const Ph: React.FC<any> = ({ jobDetails }) => {
    const [ph, setPh] = useState<number>(0);
    const [editBtn, setEditbtn] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { pathname } = useLocation();
    const review = pathname.includes("review");

    const [benchRecord, setBenchRecord] = useState([]);
    const [reportValues, setReportValues] = useState([]);

    const { jobId } = useParams();

    useEffect(() => {
        dispatch(getSingleJob(jobId));
    }, [dispatch, jobId]);

    const selectPropertiesLAB = createSelector(
        (state: any) => state.lab,
        (lab: any) => ({
            loadingLab: lab.loading,
            singleJob: lab.singleJob
        })
    );

    const { singleJob } = useSelector(selectPropertiesLAB);

    // useEffect(() => {
    //     if (singleJob.length > 0) {
    //         const job = singleJob[0];
    //         const details = job.test_details;
    //         const parsedData = JSON.parse(details);
    //         setPh(parsedData.ph || 0);
    //         setEditbtn(true);
    //     }
    // }, [singleJob]);

    useEffect(() => {
        if (singleJob.length > 0 && review) {
            const job = singleJob[0];

            // Check if job and job.bench_record are defined before proceeding
            if (job && job.bench_record) {
                const benchRec = JSON.parse(job.bench_record);

                setBenchRecord(benchRec || []);
                setReportValues(job.report_values ? JSON.parse(job.report_values) : []);

                const getRes = async () => {
                    try {
                        console.log(benchRec[0].ph?.ph, 'raw bench ph content');

                        // Ensure benchRec.ph and benchRec.ph.ph exist before setting state
                        if (benchRec[0].ph) {
                            setEditbtn(true);
                            setPh(benchRec[0].ph);
                        }
                    } catch (err) {
                        console.log(err);
                    }
                };
                getRes();
            }
        }
    }, [dispatch, singleJob, review]);


    const renderInput1 = () => (
        <div>
            <label className="label-text" htmlFor="input1">
                pH value
            </label>
            <input
                readOnly={editBtn}
                required
                id="input1"
                type="number"
                name="ph"
                placeholder="Enter pH value"
                value={ph}
                step="0.01"
                onChange={(e) => setPh(parseFloat(e.target.value))}
                className="input-field-30"
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

        const updatedBenchRecord = Array.isArray(benchRecord)
            ? [{ ph: ph }]
            : [{ ph: ph }];

        const updatedReportValues = Array.isArray(reportValues)
            ? [...reportValues, { ph: { ph } }]
            : [{ ph: { ph } }];


        const data = { updatedBenchRecord, updatedReportValues, jobId };

        console.log("Updated Bench Record:", updatedBenchRecord);
        console.log("Updated Report Values:", updatedReportValues);

        try {
            await dispatch(submitTestDetails(data));
            navigate(-1); // Go back to the previous route
        } catch (err) {
            console.error("Error submitting test details:", err);
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
            className="two-cols-form test-submission-form"
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
            <h3 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>pH Test</h3>
            {renderInput1()}

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



export default Ph;
