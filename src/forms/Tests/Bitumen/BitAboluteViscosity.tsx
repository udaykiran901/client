import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AppDispatch } from "index";
import { submitTestDetails, getSingleJob, rejectTestDetails } from "slices/thunk";
import { createSelector } from "reselect";

const BitAboluteViscosity: React.FC = () => {
    const [temp, setTemp] = useState<number>(0);
    const [viscosities, setViscosities] = useState<number[]>([0, 0]);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { jobId } = useParams();
    const { pathname } = useLocation();
    const review = pathname.includes("review");

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

                setBenchRecord(benchRec[0] || []);
                setReportValues(job.report_values ? JSON.parse(job.report_values) : []);

                const getRes = async () => {
                    try {
                        console.log(benchRec.absViscosity, 'raw bench absViscosity');

                        // Ensure absViscosity and resultObj exist before destructuring
                        if (benchRec[0].absViscosity && benchRec[0].absViscosity.resultObj) {
                            const { resultObj } = benchRec[0].absViscosity;
                            const { temp, viscosities } = resultObj;

                            setTemp(temp);
                            setViscosities(viscosities);
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
        const avgViscosity = Math.round(getAvgViscosity());
        const resultObj = { temp, viscosities };

        const updatedBenchRecord = Array.isArray(benchRecord)
            ? [{ absViscosity: { resultObj } }]
            : [{ absViscosity: { resultObj } }];

        const updatedReportValues = Array.isArray(reportValues)
            ? [{ absViscosity: { avgViscosity } }]
            : [{ absViscosity: { avgViscosity } }];


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

    const getAvgViscosity = () => {
        const sumOfValues = viscosities.reduce((acc, curr) => acc + curr, 0);
        return sumOfValues / viscosities.length;
    };

    const renderInput = (label: string, index: number) => (
        <div style={{ marginBottom: '15px' }}>
            <label>{label}</label>
            <input
                required readOnly={editBtn}
                type="number"
                step="0.01"
                placeholder={`Enter ${label}`}
                value={viscosities[index]}
                onChange={(e) => {
                    const newViscosities = [...viscosities];
                    newViscosities[index] = parseFloat(e.target.value);
                    setViscosities(newViscosities);
                }}
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
            <h3 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>Determination of Absolute Viscosity</h3>

            <div style={{ marginBottom: '15px' }}>
                <label>Testing Temperature (°C)</label>
                <input
                    required
                    type="number"
                    step="0.01"
                    value={temp}
                    onChange={(e) => setTemp(parseFloat(e.target.value))}
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

            {renderInput("Viscosity Sample 1", 0)}
            {renderInput("Viscosity Sample 2", 1)}

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
                <p>Average Viscosity = {getAvgViscosity().toFixed(2)} Poises</p>
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

export default BitAboluteViscosity;
