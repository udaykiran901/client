import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "index";
import { submitTestDetails, getSingleJob, rejectTestDetails } from "slices/thunk"; // Adjust imports as needed
import { createSelector } from "reselect";


interface Props {
    jobDetails: any; // Adjust the type according to your job details structure
}

const ChlorideIonContent: React.FC<any> = () => {
    const [v1, setV1] = useState<number>(0);
    const [v2, setV2] = useState<number>(0);
    const [v3, setV3] = useState<number>(0);
    const [editBtn, setEditbtn] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const review = pathname.includes("review");
    const { jobId } = useParams();



    const [benchRecord, setBenchRecord] = useState([]);
    const [reportValues, setReportValues] = useState([]);

    useEffect(() => {
        dispatch(getSingleJob(jobId))
    }, [dispatch, jobId])

    const selectPropertiesLAB = createSelector(
        (state: any) => state.lab,
        (lab: any) => ({
            loadingLab: lab.loading,
            singleJob: lab.singleJob
        })
    );

    const { loadingLab, singleJob } = useSelector(selectPropertiesLAB);

    useEffect(() => {
        if (singleJob.length > 0 && review) {
            const job = singleJob[0];
            setBenchRecord(JSON.parse(job.bench_record) || []);
            setReportValues(JSON.parse(job.report_values) || []);
            const getRes = async () => {
                // if (true) {
                try {
                    const benchRec = JSON.parse(job.bench_record);
                    // const ashCont = benchRec[0]
                    console.log(benchRec, 'raw bench ashContent')
                    const { v1, v2, v3 } = benchRec.clContent;
                    console.log(v1, v2, v3, 'in useEffec')
                    setEditbtn(true);
                    setV1(v1);
                    setV2(v2);
                    setV3(v3);
                } catch (err) {
                    console.log(err);
                }
            }
            // };
            getRes();
        }
    }, [singleJob]);

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

    // useEffect(() => {
    //     const getRes = async () => {
    //         const job = await fetchSubmittedTest(dispatch); // Adjust fetch logic as needed
    //         const details = job.test_details;
    //         const parsedData = JSON.parse(details);
    //         setV1(parsedData.v1);
    //         setV2(parsedData.v2);
    //         setV3(parsedData.v3);
    //         setEditbtn(true);
    //     };
    //     getRes();
    // }, [dispatch]);

    const renderInput = (label: string, id: string, value: number, setValue: (val: number) => void) => (
        <div style={{ marginBottom: '15px' }}>
            <label htmlFor={id}>{label}</label>
            <input
                required
                readOnly={editBtn}
                id={id}
                type="number"
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

    const handleOnSubmittingTest = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const resultObj = { v1, v2, v3 };
        const value = ((v3 * v2 * 35.45 * 100) / (v1 * 1000)).toFixed(2);

        const updatedBenchRecord = Array.isArray(benchRecord)
            ? [...benchRecord, { clContent: resultObj }]
            : [{ clContent: resultObj }];

        const updatedReportValues = Array.isArray(reportValues)
            ? [...reportValues, { clContent: value }]
            : [{ clContent: value }];

        const data = { updatedBenchRecord, updatedReportValues, jobId };

        console.log("Updated Bench Record:", updatedBenchRecord);
        console.log("Updated Report Values:", updatedReportValues);

        await dispatch(submitTestDetails(data));
        navigate(-1); // Go back to the previous route
    };

    const toggleReviewBtn = () => setEditbtn(!editBtn);

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
                backgroundColor: '#fff', marginTop: 50
            }}
        >
            <h3 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>Chloride Ion Test</h3>

            {renderInput("Weight of the sample (Ws)", "input1", v1, setV1)}
            {renderInput("Concentration of AgNO₃ (N)", "input2", v2, setV2)}
            {renderInput("N AgNO₃ consumed for the sample (V)", "input3", v3, setV3)}

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
                <p>Formula = (V * N(AgNO₃) * 35.45 * 100) / (Ws * 1000)</p>
                <p>
                    Chloride as Cl (%) = ({v3} * {v2} * 35.45 * 100) / ({v1} * 1000)
                </p>
                Chloride as Cl (%) = {((v3 * v2 * 35.45 * 100) / (v1 * 1000)).toFixed(2)}
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
    // backgroundColor: '#007BFF',
    backgroundColor: '#2b3142',
    color: '#fff',
    fontSize: '10px',
    transition: 'background-color 0.3s',
    width: '75px',
};



export default ChlorideIonContent;

