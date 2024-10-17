import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "index";
import { submitTestDetails, getSingleJob, rejectTestDetails } from "slices/thunk";
import { createSelector } from "reselect";
import { useNavigate, useParams, useLocation } from "react-router-dom";

interface Record {
    sno: number;
    initial: number;
    final: number;
    ductility: number;

    [key: string]: number;
}

const BitDuctility: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { jobId } = useParams();

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
    const [editBtn, setEditbtn] = useState<boolean>(false);



    const [benchRecord, setBenchRecord] = useState([]);
    const [reportValues, setReportValues] = useState([]);


    const initialRecord: Record[] = Array.from({ length: 3 }, (_, index) => ({
        sno: index,
        initial: 0,
        final: 0,
        ductility: 0,
    }));

    const [record, setRecord] = useState<Record[]>(initialRecord);
    console.log(record, 'record')

    useEffect(() => {
        if (singleJob.length > 0 && review) {
            const job = singleJob[0];

            setBenchRecord(JSON.parse(job.bench_record) || []);
            setReportValues(JSON.parse(job.report_values) || []);
            const getRes = async () => {
                // if (true) {
                try {
                    const benchRec = JSON.parse(job.bench_record);

                    const { record } = benchRec.ductility;
                    console.log(benchRec, 'rec112')

                    setRecord(record);
                    setEditbtn(true);

                } catch (err) {
                    console.log(err);
                }
            }
            // };
            getRes();

        }
    }, [dispatch, singleJob,]);

    const handleInputChange = (rowIndex: number, fieldName: string, value: number) => {
        setRecord(prevState =>
            prevState.map((eachLine) => {
                if (eachLine.sno === rowIndex) {
                    return {
                        ...eachLine,
                        [fieldName]: value,
                        ductility: parseFloat((eachLine.final - eachLine.initial).toFixed(3)),
                    };
                }
                return eachLine;
            })
        );
    };

    const handleOnSubmittingTest = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const resultObj = { record };
        // const avgDuctility = getAvgDuctility();
        const avgDuctility = parseFloat((record[0].final - record[0].initial).toFixed(3))

        const updatedBenchRecord = Array.isArray(benchRecord)
            ? [...benchRecord, { ductility: resultObj }]
            : [{ ductility: resultObj }];

        const updatedReportValues = Array.isArray(reportValues)
            ? [...reportValues, { ductility: avgDuctility }]
            : [{ ductility: avgDuctility }];


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

    const getAvgDuctility = () => {
        const sumOfValues = record.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.ductility;
        }, 0);
        return (sumOfValues / record.length).toFixed(2);
    };

    const renderInput = (label: string, rowIndex: number, key: string) => (
        <div style={{ marginBottom: '15px' }}>
            <label>{label}</label>
            <input
                required readOnly={editBtn}
                type="number"
                step="0.01"
                value={record[rowIndex][key]}
                onChange={(e) => handleInputChange(rowIndex, key, parseFloat(e.target.value))}
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

    return (
        <form onSubmit={handleOnSubmittingTest} style={{ padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', maxWidth: '600px', margin: '0 auto', marginTop: '50px' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>Determination of Ductility</h3>
            {renderInput("Initial Reading", 0, "initial")}
            {renderInput("Final Reading", 0, "final")}

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
                {/* <p>Average Ductility = {getAvgDuctility()} cm</p> */}
                <p>Average Ductility = {parseFloat((record[0].final - record[0].initial).toFixed(3))} cm</p>

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

export default BitDuctility;
