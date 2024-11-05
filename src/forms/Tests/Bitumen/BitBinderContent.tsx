import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "index";
import { submitTestDetails, getSingleJob, rejectTestDetails } from "slices/thunk";
import { createSelector } from "reselect";
import { useNavigate, useParams, useLocation } from "react-router-dom";


interface Record {
    sno: number;
    w1: number; // weight of the sample in grams
    w2: number; // weight of aggregates after extraction
    w3: number; // increased weight of filter
    w4: number; // increased weight of normal filter
    f1: number; // initial weight of filter paper f1 grams
    f2: number; // initial weight of normal filter paper f2 grams
    f3: number; // weight of filter paper after extraction with fine materials
    f4: number; // weight of normal filter paper after sieving with fine materials grams
    wbc: number; // weight of binder content
    pbc: number; // percentage of binder content

    [key: string]: number;
}

const BitBinderContent: React.FC = () => {
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
                        console.log(benchRec, 'vv');

                        // Ensure binderContent and resultObj exist before destructuring
                        if (benchRec[0].binderContent && benchRec[0].binderContent.resultObj) {
                            const { record } = benchRec[0].binderContent.resultObj;

                            setRecord(record);
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


    const initialRecord: Record[] = [{
        sno: 0,
        w1: 0,
        w2: 0,
        w3: 0,
        w4: 0,
        f1: 0,
        f2: 0,
        f3: 0,
        f4: 0,
        wbc: 0,
        pbc: 0,
    }];

    const [record, setRecord] = useState<Record[]>(initialRecord);



    const handleInputChange = (fieldName: string, value: number) => {
        setRecord(prevState => prevState.map(eachLine => {
            if (eachLine.sno === 0) {
                const { w1, w2, f1, f2, f3, f4 } = eachLine;
                return {
                    ...eachLine,
                    [fieldName]: value,
                    w3: parseFloat((f3 - f1).toFixed(3)),
                    w4: parseFloat((f4 - f2).toFixed(3)),
                    wbc: parseFloat((w1 - (w2 + (f3 - f1) + (f4 - f2))).toFixed(3)),
                    pbc: parseFloat((((w1 - (w2 + (f3 - f1) + (f4 - f2))) / w1) * 100).toFixed(3)),
                };
            }
            return eachLine;
        }));
    };

    const handleOnSubmittingTest = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const resultObj = { record };


        const updatedBenchRecord = Array.isArray(benchRecord)
            ? [{ binderContent: { resultObj } }]
            : [{ binderContent: { resultObj } }];

        const updatedReportValues = Array.isArray(reportValues)
            ? [{ binderContent: { pbc: record[0].pbc.toFixed(2) } }]
            : [{ binderContent: { pbc: record[0].pbc.toFixed(2) } }];


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

    const renderInput = (label: string, key: any) => (
        <div style={{ marginBottom: '15px' }}>
            <label>{label}</label>
            <input
                required readOnly={editBtn}
                type="number"
                step="0.01"
                value={record[0][key]}
                onChange={(e) => handleInputChange(key, parseFloat(e.target.value))}
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
        <form onSubmit={handleOnSubmittingTest} style={{ padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', maxWidth: '600px', margin: '0 auto', marginTop: '50px' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>Determination of Binder Content</h3>
            {renderInput("Weight of the Sample (W₁) grams", "w1")}
            {renderInput("Weight of aggregates after extraction (W₂) grams", "w2")}
            {renderInput("Initial Weight of the filter paper (F₁) grams", "f1")}
            {renderInput("Initial Weight of normal filter paper (F₂) grams", "f2")}
            {renderInput("Weight of filter paper after extraction (F₃) grams", "f3")}
            {renderInput("Weight of normal filter paper after sieving (F₄) grams", "f4")}

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
                <p>Percentage of Binder Content = {record[0].pbc.toFixed(2)}%</p>
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

export default BitBinderContent;
