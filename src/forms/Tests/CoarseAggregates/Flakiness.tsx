import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AppDispatch } from "index";
import { submitTestDetails, getSingleJob, rejectTestDetails } from "slices/thunk";
import { createSelector } from "reselect";

const Flakiness: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const roundTo2Dec = (d: any) => d.toFixed(2);
    const { jobId } = useParams();
    const { pathname } = useLocation();
    const review = pathname.includes("review");
    const [editBtn, setEditbtn] = useState<boolean>(false);

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
        if (singleJob && singleJob.length > 0) {
            const job = singleJob[0];
            const benchRec = job.bench_record ? JSON.parse(job.bench_record) : null;

            if (review && Array.isArray(benchRec) && benchRec.length > 0) {
                const getRes = async () => {
                    try {
                        console.log("Fetched benchRec from DB:", benchRec);
                        const {
                            wr60mm, cwr60mm, wr50mm, cwr50mm, wr40mm, cwr40mm,
                            wr31mm, cwr31mm, wr25mm, cwr25mm, wr20mm, cwr20mm,
                            wr16mm, cwr16mm, wr12mm, cwr12mm, wr10mm, cwr10mm
                        } = benchRec[0];

                        // Set all fields at once with a single state updater
                        setFields({
                            wr60mm, cwr60mm, wr50mm, cwr50mm, wr40mm, cwr40mm,
                            wr31mm, cwr31mm, wr25mm, cwr25mm, wr20mm, cwr20mm,
                            wr16mm, cwr16mm, wr12mm, cwr12mm, wr10mm, cwr10mm
                        });

                        setEditbtn(true);
                    } catch (err) {
                        console.error("Error parsing benchRec data:", err);
                    }
                };
                getRes();
            }
        }
    }, [singleJob, review]);


    const [fields, setFields] = useState({
        wr60mm: 0, cwr60mm: 0, wr50mm: 0, cwr50mm: 0, wr40mm: 0, cwr40mm: 0,
        wr31mm: 0, cwr31mm: 0, wr25mm: 0, cwr25mm: 0, wr20mm: 0, cwr20mm: 0,
        wr16mm: 0, cwr16mm: 0, wr12mm: 0, cwr12mm: 0, wr10mm: 0, cwr10mm: 0,
    });

    const handleChange = (e) => {
        setFields((prev) => ({ ...prev, [e.target.name]: parseFloat(e.target.value) || 0 }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const { wr60mm, cwr60mm, wr50mm, cwr50mm, wr40mm, cwr40mm, wr31mm, cwr31mm, wr25mm, cwr25mm, wr20mm, cwr20mm, wr16mm, cwr16mm, wr12mm, cwr12mm, wr10mm, cwr10mm } = fields;

        const flakiness = roundTo2Dec(
            ((cwr60mm + cwr50mm + cwr40mm + cwr31mm + cwr25mm + cwr20mm + cwr16mm + cwr12mm + cwr10mm) /
                (wr60mm + wr50mm + wr40mm + wr31mm + wr25mm + wr20mm + wr16mm + wr12mm + wr10mm)) * 100
        );

        const valuesObj = [{ description: "flakiness", value: { flakiness } }];
        const updatedBenchRecord = [{ wr60mm, cwr60mm, wr50mm, cwr50mm, wr40mm, cwr40mm, wr31mm, cwr31mm, wr25mm, cwr25mm, wr20mm, cwr20mm, wr16mm, cwr16mm, wr12mm, cwr12mm, wr10mm, cwr10mm }];
        const updatedReportValues = valuesObj;
        const data = { updatedBenchRecord, updatedReportValues, jobId };
        try {
            await dispatch(submitTestDetails(data));
            navigate(-1);
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
                step="0.01"
                placeholder={`Enter ${label}`}
                value={value.toString()} // Convert number to string
                onChange={(e) => setValue(parseFloat(e.target.value))}
                style={{
                    width: '80%',
                    padding: '10px',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    fontSize: '16px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
            />
        </div>
    );

    const renderRow = (field: string) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            {renderInput(field.toUpperCase(), field, fields[field as keyof typeof fields], (val) => handleChange({ target: { name: field, value: val } }))}
            {renderInput(`C${field.toUpperCase()}`, `c${field}`, fields[`c${field}` as keyof typeof fields], (val) => handleChange({ target: { name: `c${field}`, value: val } }))}
        </div>
    );

    const toggleReviewBtn = () => setEditbtn(!editBtn);

    const rejectFunction = async () => {
        try {
            await dispatch(rejectTestDetails({ jobId }));
            navigate(-1);
        } catch (error) {
            console.error("Error rejecting test details:", error);
        }
    };

    const { wr60mm, cwr60mm, wr50mm, cwr50mm, wr40mm, cwr40mm, wr31mm, cwr31mm, wr25mm, cwr25mm, wr20mm, cwr20mm, wr16mm, cwr16mm, wr12mm, cwr12mm, wr10mm, cwr10mm } = fields;

    return (
        <form
            onSubmit={handleSubmit}
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
            <h2 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>Flakiness Index Test</h2>
            {Object.keys(fields).filter(field => !field.startsWith('c')).map((field, index) => (
                <div key={index} className="input-group">
                    {renderRow(field)}
                </div>
            ))}
            <div className="calculations-section">
                <p>
                    Flakiness Index % : ( Wt of sample passing / Total wt retained ) * 100{" "}
                </p>
                <p>
                    Flakiness Index % : ({" "}
                    {cwr60mm +
                        cwr50mm +
                        cwr40mm +
                        cwr31mm +
                        cwr25mm +
                        cwr20mm +
                        cwr16mm +
                        cwr12mm +
                        cwr10mm}{" "}
                    /{" "}
                    {wr60mm +
                        wr50mm +
                        wr40mm +
                        wr31mm +
                        wr25mm +
                        wr20mm +
                        wr16mm +
                        wr12mm +
                        wr10mm}{" "}
                    ) * 100{" "}
                </p>
                Flakiness Index % :{" "}
                {roundTo2Dec(
                    ((cwr60mm +
                        cwr50mm +
                        cwr40mm +
                        cwr31mm +
                        cwr25mm +
                        cwr20mm +
                        cwr16mm +
                        cwr12mm +
                        cwr10mm) /
                        (wr60mm +
                            wr50mm +
                            wr40mm +
                            wr31mm +
                            wr25mm +
                            wr20mm +
                            wr16mm +
                            wr12mm +
                            wr10mm)) *
                    100
                )}
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

export default Flakiness;
