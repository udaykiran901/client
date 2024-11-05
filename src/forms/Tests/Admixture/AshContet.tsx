import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleJob, submitTestDetails, rejectTestDetails } from "slices/thunk";
import { createSelector } from "reselect";
import { AppDispatch } from "index";


const AshContent: React.FC<any> = (props: any) => {
    const { pathname } = useLocation();
    const review = pathname.includes("review");

    const [w1, setW1] = useState<number>(0);
    const [w2, setW2] = useState<number>(0);
    const [w3, setW3] = useState<number>(0);
    const [editBtn, setEditbtn] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [benchRecord, setBenchRecord] = useState([]);
    const [reportValues, setReportValues] = useState([]);

    console.log(benchRecord, 'bench');
    console.log(w1, w2, w3, 'analyst values')


    const { jobId } = useParams();

    useEffect(() => {
        dispatch(getSingleJob(jobId))
    }, [dispatch, jobId])
    // console.log(jobId, 'jjjjjj')

    const selectPropertiesLAB = createSelector(
        (state: any) => state.lab,
        (lab: any) => ({
            loadingLab: lab.loading,
            singleJob: lab.singleJob
        })
    );

    const { loadingLab, singleJob } = useSelector(selectPropertiesLAB);

    // console.log(singleJob, 'singleJob');

    useEffect(() => {
        if (singleJob.length === 0 || !review) return; // Early return if conditions are not met

        const job = singleJob[0];
        let benchRec;
        try {
            benchRec = JSON.parse(job.bench_record);
        } catch (err) {
            console.error("Failed to parse bench_record:", err);
            return; // Exit if parsing fails
        }

        if (benchRec) {
            setBenchRecord(benchRec || []); // Set bench record
            setReportValues(JSON.parse(job.report_values) || []); // Handle report values

            const getRes = async () => {
                try {
                    const { w1, w2, w3 } = benchRec[0].ashContent;
                    console.log("Ash content values:", w1, w2, w3);
                    setEditbtn(true);
                    setW1(w1);
                    setW2(w2);
                    setW3(w3);
                } catch (err) {
                    console.error("Error accessing ashContent:", err);
                }
            };
            getRes();
        }
    }, [dispatch, singleJob, review]);


    // useEffect(() => {
    //     const getRes = async () => {
    //         if (review) {
    //             try {
    //                 // const job = await fetchSubmittedTest(dispatch);
    //                 const job = { test_details: '{"w1": 1.0, "w2": 2.0, "w3": 3.0}' };
    //                 const details = job.test_details;
    //                 const parsedData = JSON.parse(details);
    //                 setW1(parsedData.w1);
    //                 setW2(parsedData.w2);
    //                 setW3(parsedData.w3);
    //                 setEditbtn(true);
    //             } catch (err) {
    //                 console.log(err);
    //             }
    //         }
    //     };
    //     getRes();
    // }, [dispatch, review]);

    const renderInput = (label: string, id: string, value: number, setValue: (val: number) => void) => (
        <div style={{ marginBottom: '15px' }}>
            <label htmlFor={id} style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>
                {label}
            </label>
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
        const resultObj = { w1, w2, w3 };
        const DMC = (((w3 - w1) / (w2 - w1)) * 100).toFixed(2);
        // await SubmitTest(DMC.toString(), JSON.stringify(resultObj), dispatch, review, history);
        console.log("Result:", resultObj, "DMC:", DMC);

        const updatedBenchRecord = Array.isArray(benchRecord)
            ? [{ ashContent: { w1, w2, w3 } }]
            : [{ ashContent: { w1, w2, w3 } }];


        const updatedReportValues = Array.isArray(reportValues)
            ? [{ ashContent: DMC }]
            : [{ ashContent: DMC }];

        const data = { updatedBenchRecord, updatedReportValues, jobId };

        console.log("Updated Bench Record:", updatedBenchRecord);
        console.log("Updated Report Values:", updatedReportValues);
        // await dispatch(submitTestDetails(JSON.stringify(data)));
        // await dispatch(submitTestDetails((data)));

        try {
            await dispatch(submitTestDetails(data));
            console.log("Successfully submitted. Navigating back...");
            // Navigate back to the previous page
            navigate(-1); // Go back to the previous route
            console.log("Successfully submitted. Navigating back... Part 2");
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
                backgroundColor: '#fff', marginTop: 50
            }}
        >
            <h3 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>Ash Content Test</h3>

            {renderInput("Empty crucible (w1)", "input1", w1, setW1)}
            {renderInput("Crucible + Sample (w2)", "input2", w2, setW2)}
            {renderInput("After ignition (w3)", "input3", w3, setW3)}


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
                <p>Ash % = ((w3 - w1) / (w2 - w1)) * 100</p>
                <p>Ash % = {(((w3 - w1) / (w2 - w1)) * 100).toFixed(2)}</p>
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

export default AshContent;
