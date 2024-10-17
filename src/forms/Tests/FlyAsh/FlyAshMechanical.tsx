import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "index";
import { submitTestDetails, getSingleJob } from "slices/thunk"; // Update with your actual imports
import { createSelector } from "reselect";

// Define the initial state for your record
const initialRecord = {
    test1: {
        temperature: 0,
        humidity: 0,
        after45MicronsSieveRetention: 0,
        weightOfSample: 0,
        final: 0,
    },
};

const ResidueTest: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { jobId } = useParams();

    const [record, setRecord] = useState<any>(initialRecord);

    // Selector to get job details
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
            const benchRecord = JSON.parse(job.bench_record) || {};
            // Initialize your record state with data from the job
            setRecord((prevState) => ({
                ...prevState,
                test1: {
                    ...prevState.test1,
                    weightOfSample: benchRecord.weightOfSample || 0,
                },
            }));
        }
    }, [singleJob]);

    const renderResidueTest1Table = () => {
        const columns = [
            { key: "temperature", label: "Temperature" },
            { key: "humidity", label: "Humidity" },
            {
                key: "after45MicronsSieveRetention",
                label: "After 45 Micron Sieve Retaining Wt (Rt)",
            },
            {
                key: "weightOfSample",
                label: "Weight Of the Sample (Ws)",
                readonly: true,
            },
            {
                key: "final",
                label: "Residue on 45 % ((Rt/Ws)*100)",
                readonly: true,
            },
        ];

        return (
            <div className="separate-test-container mt-5">
                <p className="test-name-text">Residue on 45 Microns Sieve:</p>
                {columns.map(({ key, label, readonly }) => (
                    <div
                        className="two-fields-container plan-two-field-container"
                        key={key + label}
                    >
                        <label>{label}</label>
                        <input
                            type="text"
                            value={record.test1[key]}
                            readOnly={readonly}
                            className="input-field-100 plan-input-field"
                        />
                        {!readonly && (
                            <input
                                type="number"
                                value={record.test1[key]}
                                onChange={(e) => onChangeResidueInput(key, parseFloat(e.target.value))}
                                className="input-field-100 plan-input-field"
                            />
                        )}
                    </div>
                ))}
            </div>
        );
    };

    const onChangeResidueInput = (fieldName: string, value: number) => {
        const { weightOfSample, after45MicronsSieveRetention } = record.test1;
        const final = weightOfSample ? ((after45MicronsSieveRetention / weightOfSample) * 100).toFixed(3).toString() : "0";

        setRecord((prevState: any) => ({
            ...prevState,
            test1: {
                ...prevState.test1,
                [fieldName]: value,
                final: parseFloat(final),
            },
        }));
    };

    const handleOnSubmittingTest = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { after45MicronsSieveRetention, weightOfSample } = record.test1;
        const final = ((after45MicronsSieveRetention / weightOfSample) * 100).toFixed(2);

        const data = {
            updatedBenchRecord: [], // Populate as needed
            updatedReportValues: [{ residue: final }],
            jobId
        };

        try {
            await dispatch(submitTestDetails(data));
            navigate(-1);
        } catch (error) {
            console.error("Error submitting test details:", error);
        }
    };

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
                marginTop: 50
            }}
        >
            <h3 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>Residue Test</h3>
            {renderResidueTest1Table()}
            <button type="submit" style={buttonStyle}>Submit</button>
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

export default ResidueTest;
