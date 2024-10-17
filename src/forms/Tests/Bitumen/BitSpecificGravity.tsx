import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "index";
import { submitTestDetails, getSingleJob, rejectTestDetails } from "slices/thunk";
import { createSelector } from "reselect";
import { useNavigate, useParams, useLocation } from "react-router-dom";

interface Record {
    sno: number;
    a: number; // Mass of specific bottle in gms
    b: number; // Mass of specific gravity bottle and water in gms
    c: number; // Mass of specific gravity bottle half filled with material in gms
    d: number; // Mass of specific gravity bottle half filled with material and distilled water in gms
    sg: number; // Specific Gravity
    [key: string]: number;
}

const BitSpecificGravity: React.FC = () => {
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

            setBenchRecord(JSON.parse(job.bench_record) || []);
            setReportValues(JSON.parse(job.report_values) || []);
            const getRes = async () => {
                // if (true) {
                try {
                    const benchRec = JSON.parse(job.bench_record);

                    console.log(benchRec, 'bbbbbbb')

                    const { specificGravity } = benchRec;

                    setRecord(specificGravity);
                    setEditbtn(true);

                } catch (err) {
                    console.log(err);
                }
            }
            // };
            getRes();

        }
    }, [dispatch, singleJob, review]);

    const initialRecord: Record[] = Array.from({ length: 2 }, (_, index) => ({
        sno: index,
        a: 0,
        b: 0,
        c: 0,
        d: 0,
        sg: 0,
    }));

    const [record, setRecord] = useState<Record[]>(initialRecord);
    console.log(record, 'record')


    const calculateSG = (rec: Record): number => {
        const result = (rec.c - rec.a) / (rec.b - rec.a - (rec.d - rec.c));

        return parseFloat(result.toFixed(3)); // Ensure it returns a number
    };

    const handleInputChange = (rowIndex: number, fieldName: string, value: number) => {
        setRecord(prevState =>
            prevState.map((eachLine) => {
                if (eachLine.sno === rowIndex) {
                    return {
                        ...eachLine,
                        [fieldName]: value,
                        sg: calculateSG({ ...eachLine, [fieldName]: value }), // recalculate specific gravity
                    };
                }
                return eachLine;
            })
        );
    };

    const getMeanSpecificGravity = () => {
        const sum = record.reduce((accumulator, obj) => accumulator + obj.sg, 0);
        return (sum / record.length).toFixed(2);
    };

    const handleOnSubmittingTest = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const updatedBenchRecord = Array.isArray(benchRecord)
            ? [...benchRecord, { specificGravity: record }]
            : [{ specificGravity: record }];

        const updatedReportValues = Array.isArray(reportValues)
            ? [...reportValues, { specificGravity: getMeanSpecificGravity() }]
            : [{ specificGravity: getMeanSpecificGravity() }];


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

    const renderDataSheet = () => {
        return (
            <div style={{ marginBottom: 20 }}>

                {record.map((eachRec: Record, index: number) => (
                    <div style={{ marginBottom: '30px' }}>
                        <h1 style={{ fontSize: 20 }}>Test {index + 1}</h1>
                        <div key={index} style={{ display: 'flex', }}>

                            <div style={{ marginRight: 10, marginBottom: 5 }}>
                                <label>Mass of Specific Gravity Bottle (g) A</label>
                                <input
                                    type="number" readOnly={editBtn}
                                    value={eachRec.a}
                                    onChange={(e) => handleInputChange(index, "a", parseFloat(e.target.value))}
                                    placeholder="Mass A"
                                    style={{ width: '100%', marginRight: '5px' }}
                                />
                            </div>

                            <div style={{ marginRight: 10, marginBottom: 5 }}>
                                <label>Mass of Bottle + Water (g) B</label>
                                <input
                                    type="number" readOnly={editBtn}
                                    value={eachRec.b}
                                    onChange={(e) => handleInputChange(index, "b", parseFloat(e.target.value))}
                                    placeholder="Mass B"
                                    style={{ width: '100%', marginRight: '5px' }}
                                />
                            </div>

                            <div style={{ marginRight: 10, marginBottom: 5 }}>
                                <label>Mass of Bottle + Material (g) C</label>
                                <input
                                    type="number" readOnly={editBtn}
                                    value={eachRec.c}
                                    onChange={(e) => handleInputChange(index, "c", parseFloat(e.target.value))}
                                    placeholder="Mass C"
                                    style={{ width: '100%', marginRight: '5px' }}
                                />
                            </div>

                            <div style={{ marginRight: 10, marginBottom: 5 }}>
                                <label>Mass of Bottle + Material + Water (g) D</label>
                                <input
                                    type="number" readOnly={editBtn}
                                    value={eachRec.d}
                                    onChange={(e) => handleInputChange(index, "d", parseFloat(e.target.value))}
                                    placeholder="Mass D"
                                    style={{ width: '100%', marginRight: '5px' }}
                                />
                            </div>

                            <div style={{ marginBottom: 5 }}>
                                <label>Specific Gravity</label>
                                <input
                                    type="number"
                                    value={eachRec.sg}
                                    readOnly
                                    style={{ width: '100%' }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <form onSubmit={handleOnSubmittingTest} style={{ padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', maxWidth: '1600px', margin: '0 auto', marginTop: '50px' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>Determination of Specific Gravity</h3>
            {renderDataSheet()}
            <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
                <p>Mean Specific Gravity = {getMeanSpecificGravity()}</p>
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

export default BitSpecificGravity;
