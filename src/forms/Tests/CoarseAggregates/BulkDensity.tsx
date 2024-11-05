import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AppDispatch } from "index";
import { submitTestDetails, getSingleJob, rejectTestDetails } from "slices/thunk";
import { createSelector } from "reselect";

interface Trial {
    w1: number;
    v: number;
    w2: number;
    w: number;
    bd: number;
    [key: string]: number;
}

interface Record {
    trial: number;
    a: Trial;
    b: Trial;
    [key: string]: number | Trial;
}

const FABulkDensity = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { jobId } = useParams();
    const { pathname } = useLocation();
    const review = pathname.includes("review");
    const [editBtn, setEditbtn] = useState<boolean>(false);

    const initialRecord: any[] = Array.from({ length: 2 }, (_, idx) => ({
        trial: idx + 1,
        a: {
            w1: 0,
            v: 0,
            w2: 0,
            w: 0,
            bd: 0,
        },
        b: {
            w1: 0,
            v: 0,
            w2: 0,
            w: 0,
            bd: 0,
        },
    }));
    const [record, setRecord] = useState(initialRecord);
    console.log(record, 'record')
    // console.log(record[0], 'rec')
    // console.log(record[1], 'rec1')


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
        if (singleJob && singleJob.length > 0) {
            const job = singleJob[0];
            const benchRec = job.bench_record ? JSON.parse(job.bench_record) : null;

            if (review && benchRec) {
                const getRes = async () => {
                    try {
                        console.log(benchRec, 'got from db');
                        setRecord(benchRec || initialRecord);
                        setEditbtn(true);
                    } catch (err) {
                        console.log("Error parsing bench record:", err);
                        setRecord(initialRecord);  // fallback in case of error
                    }
                };
                getRes();
            }
        }
    }, [dispatch, singleJob, review]);


    const getAvg = (key: string) => {
        const sumofnum = record.reduce(
            (accumulator, obj) => accumulator + (obj[key] as Trial).bd,
            0
        );
        return (sumofnum / record.length).toFixed(2);
    };

    const dataSheetHandleInputChange = (
        rowIndex: number,
        key: string,
        value: number,
        trialKey: string
    ) => {
        setRecord((prevState) =>
            prevState.map((eachRec, index) => {
                if (eachRec.trial === rowIndex) {
                    const { w1, w2, v } = eachRec[trialKey] as Trial;
                    const w = parseFloat((Math.abs(w1 - w2)).toFixed(2));
                    const bd = parseFloat((w / v).toFixed(2));
                    return {
                        ...eachRec,
                        [trialKey]: {
                            ...(eachRec[trialKey] as Trial),
                            [key]: value,
                            w: w,
                            bd: bd,
                        },
                    };
                } else {
                    return eachRec;
                }
            })
        );
    };

    const handleOnSubmittingTest = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const resultObj = {
            record,
        };

        // const r0 = record[0];
        // const r1 = record[1];
        // console.log(r0, r1, 'got from db')

        const valuesObj = [
            {
                description: 'Loose',
                value: getAvg("a"),
            },
            {
                description: 'Rodded',
                value: getAvg("b"),
            },
        ];

        // const updatedBenchRecord = [r0, r1];
        const updatedBenchRecord = record;
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
        const requirement = { jobId };
        try {
            await dispatch(rejectTestDetails(requirement));
            navigate(-1);
        } catch (error) {
            console.error("Error rejecting test details:", error);
        }
    };

    const renderDataSheet = (rec: Record) => (
        <div style={{ marginBottom: '15px' }}>
            <h4>{`Trial ${rec.trial}`}</h4>
            {["w1", "v", "w2", "w", "bd"].map((key) => (
                <div key={key} style={styles.fieldWrapper}>
                    <label style={styles.label2}>{`${key.toUpperCase()}`}</label>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

                        <div style={{ marginRight: '20' }}>
                            <label style={styles.label}>Loose A1</label>
                            <input
                                style={styles.inputField}
                                type="number"
                                value={rec.a[key]}
                                onChange={(e) =>
                                    dataSheetHandleInputChange(rec.trial, key, parseFloat(e.target.value), "a")
                                }
                                readOnly={editBtn || key === "w" || key === "bd"}
                                step="0.01"
                            />
                        </div>


                        <div>
                            <label style={styles.label}>Rodded A2</label>
                            <input
                                style={styles.inputField}
                                type="number"
                                value={rec.b[key]}
                                onChange={(e) =>
                                    dataSheetHandleInputChange(rec.trial, key, parseFloat(e.target.value), "b")
                                }
                                readOnly={editBtn || key === "w" || key === "bd"}
                                step="0.01"
                            />
                        </div>

                    </div>

                </div>
            ))}
        </div>
    );

    return (
        <form onSubmit={handleOnSubmittingTest} style={styles.formBox as React.CSSProperties}>
            <h3 style={styles.title as React.CSSProperties}>Bulk Density Calculation</h3>

            {record.map((eachRec) => renderDataSheet(eachRec))}

            <div style={{ marginTop: '12px', fontSize: 10 }}>
                <h4 style={{ fontSize: 15 }}>Average Loose: {getAvg("a")}</h4>
                <h4 style={{ fontSize: 15 }}>Average Roded: {getAvg("b")}</h4>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                {!editBtn && (
                    <button type="submit" style={buttonStyle as React.CSSProperties}>
                        {editBtn ? "Update" : "Submit"}
                    </button>
                )}
                {editBtn && (
                    <>
                        <button type="button" onClick={toggleReviewBtn} style={buttonStyle as React.CSSProperties}>
                            Edit
                        </button>
                        <button type="button" onClick={rejectFunction} style={buttonStyle as React.CSSProperties}>
                            Reject
                        </button>
                    </>
                )}
            </div>
        </form>
    );
};

export default FABulkDensity;

const buttonStyle: React.CSSProperties = {
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

const styles: { [key: string]: React.CSSProperties } = {
    formBox: {
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
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: '600px',
        margin: '0 auto',
        marginBottom: '20px',
    },
    title: {
        fontWeight: 'bold',
        marginBottom: '5px',
        textAlign: 'center',
    },
    fieldWrapper: {
        marginBottom: '15px',
        width: '88%',
        display: 'flex',
        flexDirection: 'column',
        // marginRight: 10
    },
    label2: {
        marginRight: '0px',
        fontWeight: 'bold',
        // textAlign: 'center'
        marginLeft: 0,
        fontSize: 15
    },
    label: {
        marginRight: '7px',
        // fontWeight: 'bold',
        // textAlign: 'center'
        // marginLeft: 40
    },
    inputField: {
        width: '60%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', marginRight: 15,
    },
};
