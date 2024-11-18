import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AppDispatch } from "index";
import { submitTestDetails, getSingleJob, rejectTestDetails } from "slices/thunk";
import { createSelector } from "reselect";

export const HeadingTextAreaIP: React.FC<any> = ({
    classname,
    value,
    rows,
    cols,
}) => {
    return (
        <textarea
            readOnly
            value={value}
            className={classname + " heading-fields-textarea"}
            rows={rows}
            cols={cols}
        />
    );
};


const SoilGrainSizeAnaly: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { jobId } = useParams();
    const { pathname } = useLocation();
    const review = pathname.includes("review");

    const [editBtn, setEditbtn] = useState<boolean>(false);
    const [sampleWeight, setSampleWeight] = useState<number>(0);
    const [gravel, setGravel] = useState<number>(0);
    const [sand, setSand] = useState<number>(0);
    const [slit, setSlit] = useState<number>(0);

    const destinations = ["100 mm", "75 mm", "19 mm", "4.75 mm", "2.0 mm", "0.425 mm", "0.075 mm"];
    const initialDataSheet = {
        datasheet: Array.from({ length: 7 }, (_, ind) => ({
            sno: ind,
            ISSieveDesignation: destinations[ind],
            wr: 0,
            cwr: 0,
            pcr: 0,
            pcp: 0,
        })),
        w1: 0,
        w: 0,
    };

    const [record, setRecord] = useState(initialDataSheet);

    // useEffect(() => {
    //     const getRes = async () => {
    //         try {
    //             const job = await dispatch(getSingleJob(jobId)); // fetch job details
    //             const details = job.test_details;
    //             const parsedData = JSON.parse(details);
    //             const { datasheet } = parsedData;
    //             setRecord((prevState) => datasheet || prevState || initialDataSheet);

    //             const reportValues = JSON.parse(job.report_values);
    //             setGravel(reportValues[0].value);
    //             setSand(reportValues[1].value);
    //             setSlit(reportValues[2].value);

    //             setEditbtn(true);
    //         } catch (err) {
    //             console.error("Error fetching test details:", err);
    //         }
    //     };
    //     getRes();
    // }, [dispatch, jobId]);

    const handleOnSubmittingTest = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const resultObj = { record, sampleWeight };
        const valuesObj = [
            { description: "gravel", value: gravel },
            { description: "sand", value: sand },
            { description: "slit", value: slit },
        ];

        const data = {
            updatedBenchRecord: JSON.stringify(resultObj),
            updatedReportValues: JSON.stringify(valuesObj),
            jobId,
        };

        try {
            await dispatch(submitTestDetails(data));
            navigate(-1);
        } catch (error) {
            console.error("Error submitting test details:", error);
        }
    };

    const toggleReviewBtn = () => setEditbtn(!editBtn);

    const dataSheetHandleInputChange = (rowIndex: number, fieldName: string, value: number) => {
        setRecord((prevState) => {
            const updatedDataSheet = [...prevState.datasheet];
            updatedDataSheet[rowIndex] = { ...updatedDataSheet[rowIndex], [fieldName]: value };

            // Recalculate `cwr`, `pcr`, and `pcp` for the entire data sheet after each change
            let cumulativeWeight = 0;
            for (let i = 0; i < updatedDataSheet.length; i++) {
                const row = updatedDataSheet[i];

                // Update cumulative weight retained (cwr) by adding current row's `wr` to the cumulative
                cumulativeWeight += row.wr;
                row.cwr = roundTo3Dec(cumulativeWeight);

                // Calculate percentage cumulative retained
                row.pcr = sampleWeight > 0 ? roundTo3Dec((row.cwr / sampleWeight) * 100) : 0;

                // Calculate percentage cumulative passing
                row.pcp = 100 - row.pcr;
            }

            return { ...prevState, datasheet: updatedDataSheet };
        });
    };


    const renderDataSheet = () => {
        const { datasheet } = record;
        const headings = [
            "IS Sieve Designation",
            "Weight Retained (g)",
            "Cumulative Weight Retained (g) - X",
            "% of Cumulative Retained Y = (X/W) * 100",
            "% of Cummulative Passing (100-Y)",
        ];

        return (
            <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                    {headings.map((heading, idx) => (
                        <div key={idx} style={{ width: "20%", textAlign: "center", fontWeight: "bold" }}>{heading}</div>
                    ))}
                </div>

                {datasheet.map((row, rowIndex) => (
                    <div key={row.sno} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                        <input readOnly value={row.ISSieveDesignation} style={inputStyle} />
                        <input
                            type="number"
                            value={row.wr}
                            onChange={(e) => dataSheetHandleInputChange(rowIndex, "wr", parseFloat(e.target.value))}
                            readOnly={editBtn}
                            style={inputStyle}
                        />
                        <input readOnly value={row.cwr} style={inputStyle} />
                        <input readOnly value={row.pcr} style={inputStyle} />
                        <input readOnly value={row.pcp} style={inputStyle} />
                    </div>
                ))}
            </div>
        );
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
                marginTop: 50,
            }}
        >
            <h3 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>Soil Grain Size Analysis</h3>

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="sampleWeight">Total Weight</label>
                <input
                    required
                    id="sampleWeight"
                    type="number"
                    placeholder="Enter Total Weight"
                    value={sampleWeight}
                    readOnly={editBtn}
                    onChange={(e) => setSampleWeight(parseFloat(e.target.value))}
                    style={inputStyle}
                />
            </div>

            {renderDataSheet()}

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="gravel">Gravel (%)</label>
                <input
                    required
                    id="gravel"
                    type="number"
                    placeholder="Enter Gravel"
                    value={gravel}
                    readOnly={editBtn}
                    onChange={(e) => setGravel(parseFloat(e.target.value))}
                    style={inputStyle}
                />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="sand">Sand (%)</label>
                <input
                    required
                    id="sand"
                    type="number"
                    placeholder="Enter Sand"
                    value={sand}
                    readOnly={editBtn}
                    onChange={(e) => setSand(parseFloat(e.target.value))}
                    style={inputStyle}
                />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="slit">Silt & Clay (%)</label>
                <input
                    required
                    id="slit"
                    type="number"
                    placeholder="Enter Silt & Clay"
                    value={slit}
                    readOnly={editBtn}
                    onChange={(e) => setSlit(parseFloat(e.target.value))}
                    style={inputStyle}
                />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                {!editBtn && (
                    <button type="submit" style={buttonStyle}>
                        Submit
                    </button>
                )}
                {editBtn && (
                    <>
                        <button type="button" onClick={toggleReviewBtn} style={buttonStyle}>
                            Edit
                        </button>
                        <button type="button" onClick={() => console.log("Reject functionality")} style={buttonStyle}>
                            Reject
                        </button>
                    </>
                )}
            </div>
        </form>
    );
};

const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "16px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    marginBottom: '10px'
};

const buttonStyle = {
    padding: '10px 20px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#2b3142',
    color: '#fff',
    fontSize: '16px',
    marginLeft: '10px',
};

function roundTo3Dec(num: number) {
    return Math.round(num * 1000) / 1000;
}

export default SoilGrainSizeAnaly;
