import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AppDispatch } from "index";
import { submitTestDetails, getSingleJob, rejectTestDetails } from "slices/thunk";
import { createSelector } from "reselect";

const SoilSpecificG: React.FC = () => {
    const [m1, setM1] = useState<number>(0);
    const [m2, setM2] = useState<number>(0);
    const [m3, setM3] = useState<number>(0);
    const [m4, setM4] = useState<number>(0);
    const [editBtn, setEditbtn] = useState<boolean>(false);

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { jobId } = useParams();
    const { pathname } = useLocation();
    const review = pathname.includes("review");
    const roundTo3Dec = (d: number) => d.toFixed(2);

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
                } catch (error) {
                    console.error("Failed to parse bench_record:", error);
                    return; // Exit if parsing fails
                }

                // Ensure benchRec[0] is defined and contains necessary data before destructuring
                if (benchRec[0]) {
                    const { m1, m2, m3, m4 } = benchRec[0];
                    setM1(m1);
                    setM2(m2);
                    setM3(m3);
                    setM4(m4);
                    setEditbtn(true);
                }
            }
        }
    }, [dispatch, singleJob, review]);


    const handleOnSubmittingTest = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const resultObj = { m1, m2, m3, m4 };
        const specificGravity = roundTo3Dec((m2 - m1) / (m4 - m1 - (m3 - m2)));

        const updatedBenchRecord = [{ m1, m2, m3, m4 }];
        const updatedReportValues = [{ description: "Specific Gravity", value: specificGravity }];
        const data = { updatedBenchRecord, updatedReportValues, jobId };

        try {
            await dispatch(submitTestDetails(data));
            navigate(-1);  // Go back after submission
        } catch (error) {
            console.error("Error submitting test details:", error);
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
            <h3 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>Soil Specific Gravity Calculation</h3>

            {renderInput("Mass of density bottle-g (m1)", "input1", m1, setM1)}
            {renderInput("Mass of density bottle and dry soil-g (m2)", "input2", m2, setM2)}
            {renderInput("Mass of density bottle, soil, and water-g (m3)", "input3", m3, setM3)}
            {renderInput("Mass of density bottle and water-g (m4)", "input4", m4, setM4)}

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
                <p>Specific Gravity Calculation:</p>
                <p>(m2 - m1) / (m4 - m1 - (m3 - m2)) = ({m2} - {m1}) / ({m4} - {m1} - ({m3} - {m2}))</p>
                <p>Result: {roundTo3Dec((m2 - m1) / (m4 - m1 - (m3 - m2)))}</p>
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
    fontSize: '14px',
    transition: 'background-color 0.3s',
    width: '75px',
};

export default SoilSpecificG;
