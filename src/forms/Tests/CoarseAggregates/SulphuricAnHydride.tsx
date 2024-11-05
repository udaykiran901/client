import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "index";
import { submitTestDetails, getSingleJob, rejectTestDetails } from "slices/thunk";
import { createSelector } from "reselect";

interface Props {
    jobDetails: any; // Adjust according to your actual type definition
}

const SulphuricAnHydride: React.FC<any> = (props: Props) => {
    const [w1, setW1] = useState<number>(0);
    const [w2, setW2] = useState<number>(0);
    const [w, setW] = useState<number>(0);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { jobId } = useParams();
    const { pathname } = useLocation();
    const review = pathname.includes("review");
    const [editBtn, setEditbtn] = useState<boolean>(false);

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

            // Check if job and job.bench_record are defined before proceeding
            if (job && job.bench_record) {
                let benchRec;
                try {
                    benchRec = JSON.parse(job.bench_record);
                } catch (err) {
                    console.error("Failed to parse bench_record:", err);
                    return; // Exit if parsing fails
                }

                // Check if SulphuricAnHydride exists before proceeding
                if (benchRec[0].SulphuricAnHydride) {
                    const getRes = async () => {
                        try {
                            const { w1, w2, w } = benchRec[0].SulphuricAnHydride;

                            setW1(w1);
                            setW2(w2);
                            setW(w);
                            setEditbtn(true);
                        } catch (err) {
                            console.log("Error retrieving Sulphuric An Hydride values:", err);
                        }
                    };
                    getRes();
                }
            }
        }
    }, [dispatch, singleJob, review]);


    const handleOnSubmittingTest = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const resultObj = { w, w1, w2 };
        const os = (((w2 - w1) * 34.3) / w).toFixed(2);

        const data = { updatedBenchRecord: [{ SulphuricAnHydride: resultObj }], updatedReportValues: [{ SulphuricAnHydride: os.toString() }], jobId };

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
            <h3 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>Sulphuric Anhydride Calculation</h3>

            {renderInput("Weight of the empty crucible (w1)", "input1", w1, setW1)}
            {renderInput("Weight of the crucible + BaSO4 (w2)", "input2", w2, setW2)}
            {renderInput("Weight of the sample (w)", "input3", w, setW)}

            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
                {!editBtn && <button type="submit" style={buttonStyle}>Submit</button>}
                {editBtn && <button type="button" onClick={toggleReviewBtn} style={{ ...buttonStyle, backgroundColor: '#2b3142', marginRight: 20 }}>Edit</button>}
                {editBtn && <button type="button" onClick={rejectFunction} style={{ ...buttonStyle, backgroundColor: '#2b3142', marginRight: 20 }}>Reject</button>}
            </div>

            <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
                <p>Sulphuric Anhydride as SO<sub>3</sub> = ((w2 - w1) * 34.3) / w</p>
                <p>Sulphuric Anhydride as SO<sub>3</sub> = (({w2} - {w1}) * 34.3) / {w}</p>
                <p>Sulphuric Anhydride as SO<sub>3</sub> = {(((w2 - w1) * 34.3) / w).toFixed(2)}</p>
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

export default SulphuricAnHydride;
