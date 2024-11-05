import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "index";
import { submitTestDetails, getSingleJob, rejectTestDetails } from "slices/thunk"; // Adjust the import based on your actual thunk function names
import { createSelector } from "reselect";
import { useNavigate, useParams, useLocation } from "react-router-dom";

interface Record {
    sno: number;
    flashPoint: number;
    [key: string]: number;
}

const BitFlashPoint: React.FC = () => {
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
                        console.log(benchRec, 'bbbbbbbbb');

                        // Ensure flashPoint and record exist before destructuring
                        if (benchRec[0].flashPoint && benchRec[0].flashPoint.record) {
                            const { record } = benchRec[0].flashPoint;

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


    const [record, setRecord] = useState<Record[]>(Array.from({ length: 3 }, (_, index) => ({
        sno: index,
        flashPoint: 0,
    })));



    const handleInputChange = (rowIndex: number, fieldName: string, value: number) => {
        setRecord(prevState =>
            prevState.map(eachLine => (eachLine.sno === rowIndex ? { ...eachLine, [fieldName]: value } : eachLine))
        );
    };

    const getAvgFlashPoint = () => {
        const sum = record.reduce((accumulator, obj) => accumulator + obj.flashPoint, 0);
        return (sum / record.length).toFixed(2);
    };

    const handleOnSubmittingTest = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        const updatedBenchRecord = Array.isArray(benchRecord)
            ? [{ flashPoint: { record } }]
            : [{ flashPoint: { record } }];

        const updatedReportValues = Array.isArray(reportValues)
            ? [{ flashPoint: { avgFlashPoint: getAvgFlashPoint() } }]
            : [{ flashPoint: { avgFlashPoint: getAvgFlashPoint() } }];


        const data = { updatedBenchRecord, updatedReportValues, jobId };

        try {
            await dispatch(submitTestDetails(data));
            navigate(-1); // Navigate back after successful submission
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

    const renderDataSheet = () => {
        return (
            <div>
                {record.map((eachRec: Record, index: number) => (
                    <div key={index} style={{ display: 'flex', marginBottom: '10px' }}>
                        {/* <div style={{ marginRight: 10, marginBottom: 5 }}>
                            <label>S.No.</label>
                            <input type="number" value={eachRec.sno + 1} readOnly style={{ width: '100%', marginRight: '5px' }} />
                        </div> */}
                        <div style={{ marginLeft: 10, marginBottom: 5 }}>
                            <label>Flash Point (°C) - {eachRec.sno + 1}</label>
                            <input
                                type="number" readOnly={editBtn}
                                value={eachRec.flashPoint}
                                onChange={(e) => handleInputChange(index, "flashPoint", parseFloat(e.target.value))}
                                placeholder="Flash Point"
                                style={{ width: '100%' }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <form onSubmit={handleOnSubmittingTest} style={{ padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', maxWidth: '600px', margin: '0 auto', marginTop: '50px' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>Determination of Flash Point</h3>
            {renderDataSheet()}
            <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
                <p>Average Flash Point = {getAvgFlashPoint()}°C</p>
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

export default BitFlashPoint;
