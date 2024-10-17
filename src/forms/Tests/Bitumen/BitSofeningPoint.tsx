import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "index";
import { submitTestDetails, getSingleJob, rejectTestDetails } from "slices/thunk";
import { createSelector } from "reselect";

interface Record {
    sno: number;
    sample: number;
    time: number[];
    temp: number[];
    [key: string]: number | number[];
}

const BitSofeningPoint: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const review = pathname.includes("review");
    const [editBtn, setEditbtn] = useState<boolean>(false);

    const { jobId } = useParams();

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

                    const { record } = benchRec.softeningPoint;

                    setRecord(record);
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
        sample: index + 1,
        time: Array.from({ length: 10 }, (_, idx) => idx + 1),
        temp: Array.from({ length: 10 }, (_, idx) => 0),
    }));

    const [record, setRecord] = useState<Record[]>(initialRecord);
    console.log(record, 'record')



    const getAvgTemp = () => {
        const sumofnum = record.reduce((accumulator, obj) => accumulator + obj.temp[9], 0);
        return (sumofnum / record.length).toFixed(2);
    };

    const dataSheetHandleInputChange = (rowIndex: number, i: number, value: number) => {
        setRecord((prevState) => {
            const updatedRecord = [...prevState];
            updatedRecord[rowIndex] = {
                ...updatedRecord[rowIndex],
                temp: updatedRecord[rowIndex].temp.map((tempValue, index) => (index === i ? value : tempValue)),
            };
            return updatedRecord;
        });
    };

    const renderDataSheet = (rec: Record) => {
        const headings = ["Time", "Temperature (deg C)"];
        const { time, temp } = rec;

        return (
            <div style={{ marginBottom: 20 }}>
                <div className="two-fields-container plan-two-field-container" style={{ display: 'flex', flexDirection: 'row' }}>
                    {headings.map((heading) => (
                        <div key={heading} className="input-field-5 plan-input-field" style={{ marginRight: 135 }}>{heading}</div>
                    ))}
                </div>
                {time.map((t, idx) => (
                    <div className="two-fields-container plan-two-field-container" key={idx}>
                        <input type="text" value={t} readOnly className="input-field-5 plan-input-field" />
                        <input
                            type="number" readOnly={editBtn}
                            value={temp[idx]}
                            onChange={(e) => dataSheetHandleInputChange(rec.sno, idx, parseFloat(e.target.value))}
                            className="input-field-5 plan-input-field"
                        />
                    </div>
                ))}
            </div>
        );
    };

    const handleOnSubmittingTest = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        const updatedBenchRecord = Array.isArray(benchRecord)
            ? [...benchRecord, { softeningPoint: { record } }]
            : [{ softeningPoint: { record } }];

        const updatedReportValues = Array.isArray(reportValues)
            ? [...reportValues, { softeningPoint: { avgTemp: getAvgTemp() } }]
            : [{ softeningPoint: { avgTemp: getAvgTemp() } }];


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
            <h3 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>Softening Point Test</h3>

            <div className="two-fields-container">
                {record.map((eachRec) => renderDataSheet(eachRec))}
            </div>

            <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
                <p>Average Temperature at time 10: {getAvgTemp()} °C</p>
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

export default BitSofeningPoint;
