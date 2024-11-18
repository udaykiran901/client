import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AppDispatch } from "index";
import { submitTestDetails, getSingleJob, rejectTestDetails } from "slices/thunk"; // Adjusted to match your current action imports
import { createSelector } from "reselect";

const SoilHeavyWeightCompaction: React.FC = () => {
    const [record, setRecord] = useState<any[]>(Array.from({ length: 6 }, (_, index) => ({
        sno: index,
        assumedWaterContent: 0,
        w1: 0,
        w2: 0,
        v: 0,
        can_no: 0,
        w4: 0,
        w5: 0,
        w6: 0,
        w: 0,
    })));

    const [omc, setOmc] = useState<number>(0);
    const [mdd, setMdd] = useState<number>(0);
    const [editBtn, setEditbtn] = useState<boolean>(false);
    const { jobId } = useParams();
    const { pathname } = useLocation();
    const review = pathname.includes("review");
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const selectPropertiesLAB = createSelector(
        (state: any) => state.lab,
        (lab: any) => ({
            singleJob: lab.singleJob,
        })
    );

    const { singleJob } = useSelector(selectPropertiesLAB);

    useEffect(() => {
        if (review) {
            dispatch(getSingleJob(jobId));
        }
    }, [dispatch, jobId, review]);

    useEffect(() => {
        if (singleJob.length > 0 && review) {
            const job = singleJob[0];
            console.log(job, 'job')

            if (job && job.bench_record) {
                let benchRec;
                let repoVal;
                try {
                    benchRec = JSON.parse(job.bench_record);
                    repoVal = JSON.parse(job.report_values);
                } catch (err) {
                    console.error("Failed to parse bench_record:", err);
                    return;
                }

                const getRes = async () => {
                    try {
                        if (benchRec) {
                            // const { c4a, c3a } = benchRec[0].C4AF_C3A;
                            console.log(repoVal)

                            setOmc(repoVal[0][0].value);
                            setMdd(repoVal[0][1].value);
                            setRecord(benchRec)

                            setEditbtn(true);
                        }
                    } catch (err) {
                        console.log(err);
                    }
                };
                getRes();
            }
        }
    }, [singleJob, review]);

    const handleOnInputChange = (rowIndex: number, fieldName: string, value: number | string) => {
        setRecord((prevState) =>
            prevState.map((eachLine) =>
                eachLine.sno === rowIndex ? { ...eachLine, [fieldName]: value } : eachLine
            )
        );
    };

    const getValue = (obj: any) => {
        const { w1, w2, v, w4, w5, w6 } = obj;
        const yb = Math.abs(w1 - w2) / v;
        const w7 = w4 - w5;
        const w8 = w5 - w6;
        const w = (w7 / w8) * 100;
        return (yb / ((1 + w) / 100));
    };

    const handleOnSubmittingTest = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const valuesObj = [
            { description: "omc", value: omc },
            { description: "mdd", value: mdd },
        ];

        const updatedBenchRecord = record;
        const updatedReportValues = [valuesObj];

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



    const renderDataSheet = () => {
        const headings = [
            "Assumed water content",
            "Weight of wet soil + mould(g) - W1",
            "Empty weight of mould (g) - W2",
            "Weight of wet soil W3 = W1- W2",
            "Volume of mould(cc) V",
            "Wet density (g/cc) Yb  = W3/V",
            "Can No.",
            "Weight of wet soil + can(g) - W4",
            "Weight of dry soil + can (g) - W5",
            "Weight of Can(g) - W6",
            "Weight of water (g) - (W7 = W4 - W5)",
            "Weight of dry soil (g) - (W8 = W5 - W6)",
            "Water content (%) W = (W7 / W8) * 100",
            "Dry density Yd = (Yb / (1 + w / 100)) (g/cc)"
        ];

        return (
            <div style={{ marginBottom: '20px', width: 800 }}>
                <table>
                    <thead>
                        <tr>
                            {headings.map((heading, idx) => (
                                <th key={idx} style={{ fontSize: 9 }}>{heading}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {record.map((each, index) => (
                            <tr key={index}>
                                <td><input type="number" style={inputStyle} value={each.assumedWaterContent} onChange={(e) => handleOnInputChange(index, "assumedWaterContent", e.target.value)} readOnly={editBtn} /></td>
                                <td><input type="number" style={inputStyle} value={each.w1} onChange={(e) => handleOnInputChange(index, "w1", e.target.value)} readOnly={editBtn} /></td>
                                <td><input type="number" style={inputStyle} value={each.w2} onChange={(e) => handleOnInputChange(index, "w2", e.target.value)} readOnly={editBtn} /></td>
                                <td><input type="number" style={inputStyle} value={Math.abs(each.w1 - each.w2)} readOnly /></td>
                                <td><input type="number" style={inputStyle} value={each.v} onChange={(e) => handleOnInputChange(index, "v", e.target.value)} readOnly={editBtn} /></td>
                                <td><input type="number" style={inputStyle} value={(Math.abs(each.w1 - each.w2) / each.v).toFixed(2)} readOnly /></td>
                                <td><input type="number" style={inputStyle} value={each.can_no} onChange={(e) => handleOnInputChange(index, "can_no", e.target.value)} readOnly={editBtn} /></td>
                                <td><input type="number" style={inputStyle} value={each.w4} onChange={(e) => handleOnInputChange(index, "w4", e.target.value)} readOnly={editBtn} /></td>
                                <td><input type="number" style={inputStyle} value={each.w5} onChange={(e) => handleOnInputChange(index, "w5", e.target.value)} readOnly={editBtn} /></td>
                                <td><input type="number" style={inputStyle} value={each.w6} onChange={(e) => handleOnInputChange(index, "w6", e.target.value)} readOnly={editBtn} /></td>
                                <td><input type="number" style={inputStyle} value={(each.w4 - each.w5).toFixed(2)} readOnly /></td>
                                <td><input type="number" style={inputStyle} value={(each.w5 - each.w6).toFixed(2)} readOnly /></td>
                                <td><input type="number" style={inputStyle} value={(((each.w4 - each.w5) / (each.w5 - each.w6)) * 100).toFixed(2)} readOnly /></td>
                                <td><input type="number" style={inputStyle} value={getValue(each)} readOnly /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div style={{ marginTop: '20px' }}>
                    <label style={{ marginRight: 20 }}>Optimum Moisture Content</label>
                    <input type="number" style={inputStyle} value={omc} onChange={(e) => setOmc(parseFloat(e.target.value))} readOnly={editBtn} />
                </div>
                <div style={{ marginTop: 20, }}>
                    <label style={{ marginRight: 20 }}> Maximum Dry Density</label>
                    <input type="number" style={inputStyle} value={mdd} onChange={(e) => setMdd(parseFloat(e.target.value))} readOnly={editBtn} />
                </div>
            </div >
        );
    };

    return (
        <form onSubmit={handleOnSubmittingTest} style={formStyle}>
            <h3>TetraCalcium Calculation</h3>

            {renderDataSheet()}

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

const inputStyle: React.CSSProperties = {
    width: '60px',
    padding: '5px',
    textAlign: 'center',
};



const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    marginTop: 50, width: 1300

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

export default SoilHeavyWeightCompaction;
