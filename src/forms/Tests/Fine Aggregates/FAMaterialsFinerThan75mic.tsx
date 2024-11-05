import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AppDispatch } from "index";
import { submitTestDetails, getSingleJob, rejectTestDetails } from "slices/thunk";
import { createSelector } from "reselect";

interface Record {
    sno: number;
    sample: number;
    w1: number;
    w2: number;
    res: number;
    [key: string]: number;
}

const CBNumberInputField: React.FC<any> = ({
    id,
    label,
    onChange,
    readOnly,
    value,
    classname = "input-field-10",
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(e.target.value);
        onChange(newValue);
    };

    return (
        <div style={{ marginBottom: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {label && <label style={{ marginBottom: '5px' }}>{label}</label>}
            <input
                required
                readOnly={readOnly}
                id={id}
                type="number"
                name={id}
                step="0.01"
                placeholder={`Enter ${label}`}
                value={value} // Directly use value prop
                onChange={handleChange}
                style={{
                    width: '80%',
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    fontSize: '14px',
                    textAlign: 'center',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
            />
        </div>
    );
};


const FAMaterialsFinerThan75mic: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { jobId } = useParams();
    const { pathname } = useLocation();
    const review = pathname.includes("review");
    const [editBtn, setEditbtn] = useState<boolean>(false);
    const initialRecord: Record[] = Array.from({ length: 2 }, (_, idx) => ({
        sno: idx,
        sample: idx + 1,
        w1: 0,
        w2: 0,
        res: 0,
    }));
    const [record, setRecord] = useState<any[]>(initialRecord);
    console.log(record, 'rrrrrrrrrrrrrr')

    const roundTo3Dec = (d: any) => d.toFixed(2);

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
        if (singleJob.length > 0) {
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

                // Ensure record exists in benchRec before proceeding
                if (benchRec[0] && benchRec[0].record) {
                    const jobRecords = benchRec[0].record || initialRecord;
                    console.log(jobRecords, 'benchreccc');

                    // Set record values and enable edit button
                    setRecord(jobRecords);
                    setEditbtn(true);
                }
            }
        }
    }, [singleJob]);


    // useEffect(() => {
    //     const job = singleJob[0];
    //     console.log(job, 'job');
    //     const benchRec = JSON.parse(job.bench_record);
    //     if (singleJob.length > 0 && review && benchRec != null) {

    //         const getRes = async () => {
    //             // if (true) {
    //             try {
    //                 const jobRecords = benchRec[0].record || initialRecord;
    //                 console.log(jobRecords, 'benchreccc')
    //                 setRecord(jobRecords);
    //                 setEditbtn(true);

    //             } catch (err) {
    //                 console.log(err);
    //             }
    //         }
    //         getRes();

    //     }
    // }, [dispatch, singleJob, review]);

    const onChangeInput = (index: number, key: keyof Record, value: number) => {
        setRecord((prevRecord) =>
            prevRecord.map((eachRec) => {
                if (eachRec.sno === index) {
                    const updatedRec = { ...eachRec, [key]: value };
                    const { w1, w2 } = updatedRec;
                    const res = ((w1 - w2) * 100) / w1;
                    return { ...updatedRec, res };
                }
                return eachRec;
            })
        );
    };

    const handleOnSubmittingTest = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        const resultObj = { record };
        const valuesObj = [
            {
                description: "Materials Finer Than 75 Microns",
                value: roundTo3Dec(parseInt(getAvgSG("res"))),
            },
        ];

        const updatedBenchRecord = [resultObj];
        const updatedReportValues = valuesObj;

        const data = { updatedBenchRecord, updatedReportValues, jobId };

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

    const getAvgSG = (key: string) => {
        const sum = record.reduce((accum, eachLine) => accum + eachLine[key], 0);
        return roundTo3Dec(sum / record.length);
    };

    const buttonStyle = {
        marginTop: '10px',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        backgroundColor: '#2b3142',
        color: '#fff',
        fontSize: '12px',
        transition: 'background-color 0.3s',
        width: '100px',
    };

    return (
        <form
            onSubmit={handleOnSubmittingTest}
            style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "600px",
                margin: "0 auto",
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#fff",
                marginTop: 50,
            }}
        >
            <h3 style={{ textAlign: "center", marginBottom: "20px", fontWeight: "bold" }}>
                Materials Finer Than 75 Microns Calculation
            </h3>

            {[1, 2].map((trial) => (
                <div key={trial} style={{ marginBottom: '20px' }}>
                    <h4 style={{ marginBottom: '10px', fontWeight: 'bold' }}>Trial {trial}</h4>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
                        <CBNumberInputField
                            label="Original Dry Weight of Sample (W1) grams"
                            id={`w1-${trial}`}
                            value={record[trial - 1].w1}
                            onChange={(value) => onChangeInput(trial - 1, "w1", value)}
                            readOnly={editBtn}
                        />
                        <CBNumberInputField
                            label="Dry Weight After Washing (W2) grams"
                            id={`w2-${trial}`}
                            value={record[trial - 1].w2}
                            onChange={(value) => onChangeInput(trial - 1, "w2", value)}
                            readOnly={editBtn}
                        />
                        <CBNumberInputField
                            label="Material Finer Than 75 Microns %"
                            id={`res-${trial}`}
                            value={record[trial - 1].res}
                            onChange={() => { }}
                            readOnly
                        />
                    </div>
                </div>
            ))}

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

            <div style={{ marginTop: "20px", fontWeight: "bold" }}>
                <p>Average: {roundTo3Dec(parseInt(getAvgSG("res")))}</p>
            </div>
        </form>
    );
};

export default FAMaterialsFinerThan75mic;
