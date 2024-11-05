import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "index";
import { submitTestDetails, getSingleJob, rejectTestDetails } from "slices/thunk";
import { createSelector } from "reselect";
import { useNavigate, useParams, useLocation } from "react-router-dom";

interface TestType {
    idr: number;
    fdr: number;
    p: number;
}

interface Sample {
    test1: TestType;
    test2: TestType;
    test3: TestType;
}

interface Record {
    temp: number;
    sampleA: Sample;
    sampleB: Sample;
}

const BitPenitration: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { jobId } = useParams();

    const [editBtn, setEditbtn] = useState<boolean>(false);

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
                        console.log(benchRec, 'raw bench penetration');

                        // Ensure penetration exists before setting it
                        if (benchRec[0] && benchRec[0].penetration) {
                            setRecord(benchRec[0].penetration);
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


    const initialRecord: Record = {
        temp: 0,
        sampleA: {
            test1: { idr: 0, fdr: 0, p: 0 },
            test2: { idr: 0, fdr: 0, p: 0 },
            test3: { idr: 0, fdr: 0, p: 0 },
        },
        sampleB: {
            test1: { idr: 0, fdr: 0, p: 0 },
            test2: { idr: 0, fdr: 0, p: 0 },
            test3: { idr: 0, fdr: 0, p: 0 },
        },
    };

    const [record, setRecord] = useState<Record>(initialRecord);
    console.log(record, 'rec')



    const handleNumberChange = (
        sampleType: "sampleA" | "sampleB",
        testKey: string,
        valueType: "idr" | "fdr"
    ) => (val: number) => {
        setRecord((prevRecord) => ({
            ...prevRecord,
            [sampleType]: {
                ...prevRecord[sampleType],
                [testKey]: {
                    ...prevRecord[sampleType][testKey],
                    [valueType]: val,
                    p: prevRecord[sampleType][testKey].fdr - prevRecord[sampleType][testKey].idr,
                },
            },
        }));
    };

    const getAveragePenetration = () => {
        const sampleAavg = Object.values(record.sampleA).reduce(
            (sum, each) => sum + each.p,
            0
        );
        const sampleBavg = Object.values(record.sampleB).reduce(
            (sum, each) => sum + each.p,
            0
        );
        return Math.round((sampleAavg + sampleBavg) / 6);
    };

    const handleOnSubmittingTest = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        const updatedBenchRecord = Array.isArray(benchRecord)
            ? [{ penetration: record }]
            : [{ penetration: record }];

        const updatedReportValues = Array.isArray(reportValues)
            ? [{ penetration: getAveragePenetration() }]
            : [{ penetration: getAveragePenetration() }];


        const data = { updatedBenchRecord, updatedReportValues, jobId };

        try {
            await dispatch(submitTestDetails(data));
            navigate(-1);
        } catch (error) {
            console.error("Error submitting test details:", error);
        }
    };

    const renderTestInputs = (eachTest: TestType, sampleType: "sampleA" | "sampleB", testKey: string, index: any) => (
        <div style={{ display: 'flex', marginBottom: '10px', }} key={testKey}>
            <div style={{ marginRight: 10 }}>
                <label>Test {index + 1} - Initial Reading</label>
                <input
                    type="number" readOnly={editBtn}
                    value={eachTest.idr}
                    onChange={(e) => handleNumberChange(sampleType, testKey, "idr")(parseFloat(e.target.value))}
                    placeholder="Initial Reading"
                    style={{ width: '100%', marginRight: '5px' }}
                /></div>

            <div>
                <label>Test {index + 1} - Final Reading</label>
                <input
                    type="number" readOnly={editBtn}
                    value={eachTest.fdr}
                    onChange={(e) => handleNumberChange(sampleType, testKey, "fdr")(parseFloat(e.target.value))}
                    placeholder="Final Reading"
                    style={{ width: '100%' }}
                /></div>
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
        <form onSubmit={handleOnSubmittingTest} style={{ padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', maxWidth: '600px', margin: '0 auto', marginTop: '50px' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>Determination of Penetration</h3>
            <div style={{ marginBottom: '20px' }}>
                <label>Testing Temp (°C)</label>
                <input
                    type="number"
                    value={record.temp}
                    onChange={(e) => setRecord({ ...record, temp: parseFloat(e.target.value) })}
                    style={{ width: '100%' }}
                />
            </div>
            <div style={{ borderWidth: 1, borderColor: 'black', borderStyle: 'solid', paddingLeft: 15, padding: 15 }}>
                <h1 style={{ textAlign: 'center', fontSize: 20 }}>Sample A</h1>
                {Object.keys(record.sampleA).map((testKey: any, index: number) => renderTestInputs(record.sampleA[testKey], "sampleA", testKey, index))}
            </div>

            <div style={{ borderWidth: 1, borderColor: 'black', borderStyle: 'solid', paddingLeft: 15, padding: 15, borderTopWidth: 0 }}>
                <h1 style={{ textAlign: 'center', fontSize: 20 }}>Sample B</h1>
                {Object.keys(record.sampleB).map((testKey: any, index: number) => renderTestInputs(record.sampleB[testKey], "sampleB", testKey, index))}
            </div>

            <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
                <p>Average Penetration = {getAveragePenetration()}</p>
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

export default BitPenitration;
