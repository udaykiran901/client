import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AppDispatch } from "index";
import { submitTestDetails, getSingleJob, rejectTestDetails } from "slices/thunk";
import { createSelector } from "reselect";

const DeterminationOfSodiumAndPotassium = () => {
    const [w, setW] = useState<number>(0);
    const [na, setNa] = useState<number>(0);
    const [k, setK] = useState<number>(0);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { jobId } = useParams();

    const { pathname } = useLocation();

    const review = pathname.includes("review");

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


    const [editBtn, setEditbtn] = useState<boolean>(false);

    const [benchRecord, setBenchRecord] = useState([]);
    const [reportValues, setReportValues] = useState([]);

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
                    const { w, na, k } = benchRec.alkali.resultObj;

                    setW(w);
                    setNa(na);
                    setK(k);


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
        const alkali = ((na / (w * 100)) + (0.658 * (k / (w * 100)))).toFixed(2);

        const resultObj = { w, na, k };
        const updatedBenchRecord = Array.isArray(benchRecord)
            ? [...benchRecord, { alkali: { resultObj } }]
            : [{ alkali: { resultObj } }];

        const updatedReportValues = Array.isArray(reportValues)
            ? [...reportValues, { alkali: { alkali } }]
            : [{ alkali: { alkali } }];


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

    const renderInput = (label: string, id: string, value: number, setValue: (val: number) => void) => (
        <div style={{ marginBottom: '15px' }}>
            <label htmlFor={id}>{label}</label>
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
            <h3 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>Determination of Sodium and Potassium</h3>

            {renderInput("Weight of the Sample (W)", "input1", w, setW)}
            {renderInput("Conc of Na2O", "input2", na, setNa)}
            {renderInput("Conc of K2O", "input3", k, setK)}

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
                <p>Alkalis = (Na2O + (0.658 * K2O))</p>
                <p>
                    Alkalis = {((na / (w * 100)) + (0.658 * (k / (w * 100)))).toFixed(2)}
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

export default DeterminationOfSodiumAndPotassium;
