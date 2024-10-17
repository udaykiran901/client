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
    elasticRecovery: number;
    [key: string]: number;
}

const BitElasticRecovery: React.FC = () => {
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

    useEffect(() => {
        if (singleJob.length > 0 && review) {
            const job = singleJob[0];

            setBenchRecord(JSON.parse(job.bench_record) || []);
            setReportValues(JSON.parse(job.report_values) || []);
            const getRes = async () => {
                // if (true) {
                try {
                    const benchRec = JSON.parse(job.bench_record);

                    const { elasticRec } = benchRec;
                    console.log(elasticRec, 'rec112')

                    setRecord(elasticRec);
                    setEditbtn(true);

                } catch (err) {
                    console.log(err);
                }
            }
            // };
            getRes();

        }
    }, [dispatch, singleJob,]);

    const initialRecord: Record[] = Array.from({ length: 1 }, (_, index) => ({
        sno: index,
        initial: 0,
        final: 0,
        elasticRecovery: 0,
    }));

    const [record, setRecord] = useState<Record[]>(initialRecord);
    console.log(record, 'rec')



    const handleInputChange = (rowIndex: number, fieldName: string, value: number) => {
        setRecord(prevState =>
            prevState.map((eachLine) => {
                if (eachLine.sno === rowIndex) {
                    return {
                        ...eachLine,
                        [fieldName]: value,
                        // elasticRecovery: ((10 - eachLine.final) / 10) * 100,
                        elasticRecovery: (((eachLine.final - eachLine.initial) / eachLine.final) * 100)
                    };
                }
                console.log(eachLine, 'el')
                return eachLine;
            })
        );
    };

    const avgElasticRecovery = () => {
        const sum = record.reduce((accumulator, obj) => accumulator + obj.elasticRecovery, 0);
        return (sum / record.length).toFixed(2);
    };

    const handleOnSubmittingTest = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();



        const updatedBenchRecord = Array.isArray(benchRecord)
            ? [...benchRecord, { elasticRec: record }]
            : [{ elasticRec: record }];

        const updatedReportValues = Array.isArray(reportValues)
            ? [...reportValues, { elasticRec: avgElasticRecovery() }]
            : [{ elasticRec: avgElasticRecovery() }];


        const data = { updatedBenchRecord, updatedReportValues, jobId };

        try {
            await dispatch(submitTestDetails(data));
            navigate(-1); // Go back to the previous route
        } catch (error) {
            console.error("Error submitting test details:", error);
        }
    };

    const renderDataSheet = () => {
        return (
            <div>
                {record.map((eachRec: Record, index: number) => (
                    <div key={index} style={{ display: 'flex', marginBottom: '10px' }}>
                        <div style={{ marginRight: 10, marginBottom: 5 }}>
                            <label>Initial Reading</label>
                            <input
                                type="number" readOnly={editBtn}
                                value={eachRec.initial}
                                onChange={(e) => handleInputChange(index, "initial", parseFloat(e.target.value))}
                                placeholder="Initial Reading"
                                style={{ width: '100%', marginRight: '5px' }}
                            />
                        </div>

                        <div style={{ marginLeft: 10, marginBottom: 5 }}>
                            <label>Final Reading</label>
                            <input
                                type="number" readOnly={editBtn}
                                value={eachRec.final}
                                onChange={(e) => handleInputChange(index, "final", parseFloat(e.target.value))}
                                placeholder="Final Reading"
                                style={{ width: '100%' }}
                            /></div>
                    </div>
                ))}
            </div>
        );
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
        <form onSubmit={handleOnSubmittingTest} style={{ padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', maxWidth: '600px', margin: '0 auto', marginTop: '50px' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>Determination of Elastic Recovery</h3>
            {renderDataSheet()}
            <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
                <p>Average Elastic Recovery = {avgElasticRecovery()}%</p>
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


export default BitElasticRecovery;
