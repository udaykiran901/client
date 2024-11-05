import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AppDispatch } from "index";
import { submitTestDetails } from "slices/thunk";

interface DataSheetFields {
    sno: number;
    dailGuageReading: number;
    col1: number;
    col2: number;
    col3: number;
    [key: string]: number | string;
}

interface Result {
    Dail_guage_reading: number;
    displacement: number;
    Corrected_area: number;
    Stress_dail_reading: number;
    Shear_stress: number;
    normal_stress: number;
    [key: string]: number | string;
}

const SoilDirectShearTest = () => {
    const initialDataSheet: DataSheetFields[] = Array.from(
        { length: 22 },
        (_, index) => ({
            sno: index + 1,
            dailGuageReading: index < 10 ? (index + 1) * 10 : 100 + (index - 9) * 50,
            col1: 0,
            col2: 0,
            col3: 0,
        })
    );

    const [dataSheet, setDataSheet] = useState<DataSheetFields[]>(initialDataSheet);
    const [cohesion, setCohesion] = useState<number>(0);
    const [friction, setFriction] = useState<number>(0);
    const [editBtn, setEditBtn] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { jobId } = useParams();
    const { pathname } = useLocation();
    const review = pathname.includes("review");

    useEffect(() => {
        const fetchTestDetails = async () => {
            if (review) {
                try {
                    // Replace with actual data fetching logic if needed
                    const benchRec = {}; // Fetched data would be parsed here
                    setEditBtn(true);
                } catch (err) {
                    console.error("Error fetching test details:", err);
                }
            }
        };
        fetchTestDetails();
    }, [dispatch, review]);

    const handleOnSubmittingTest = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const updatedBenchRecord = [{ C4AF_C3A: { cohesion, friction } }];
        const updatedReportValues = [
            { description: "cohesion", value: cohesion },
            { description: "friction", value: friction },
        ];

        const data = { updatedBenchRecord, updatedReportValues, jobId };

        try {
            await dispatch(submitTestDetails(data));
            navigate(-1);
        } catch (error) {
            console.error("Error submitting test details:", error);
        }
    };

    const renderDataSheet = () => {
        const tableHeader = [
            { key: "Sno" },
            { key: "Dail Gauge Reading" },
            { key: "0.5 kg/cm2" },
            { key: "1.0 kg/cm2" },
            { key: "1.5 kg/cm2" },
        ];

        return (
            <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
                    {tableHeader.map((heading, index) => (
                        <span key={index} style={{ width: "20%", textAlign: "center" }}>{heading.key}</span>
                    ))}
                </div>

                {dataSheet.map((eachRecord, ind) => (
                    <div key={ind} style={{ display: "flex", justifyContent: "space-between", margin: "10px 0" }}>
                        {["sno", "dailGuageReading", "col1", "col2", "col3"].map((key) => (
                            <input
                                key={`${ind}-${key}`}
                                type="number"
                                value={eachRecord[key]}
                                onChange={(e) => handleInputChange(ind, key, parseFloat(e.target.value))}
                                // readOnly={editBtn}
                                readOnly={false}
                                style={{ width: "18%", padding: "5px", fontSize: "16px" }}
                            />
                        ))}
                    </div>
                ))}
            </div>
        );
    };

    const handleInputChange = (rowIndex: number, fieldName: string, value: number) => {
        setDataSheet((prevState) =>
            prevState.map((eachLine, index) =>
                index === rowIndex ? { ...eachLine, [fieldName]: value } : eachLine
            )
        );
    };

    return (
        <form
            onSubmit={handleOnSubmittingTest}
            style={{
                maxWidth: "800px",
                margin: "20px auto",
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#fff",
            }}
        >
            <h3 style={{ textAlign: "center", fontWeight: "bold" }}>Soil Direct Shear Test</h3>

            {renderDataSheet()}

            <div style={{ marginTop: "20px" }}>
                <label htmlFor="cohesion">Cohesion Value</label>
                <input
                    required
                    id="cohesion"
                    type="number"
                    readOnly={editBtn}
                    value={cohesion}
                    onChange={(e) => setCohesion(parseFloat(e.target.value))}
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "15px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        fontSize: "16px",
                    }}
                />

                <label htmlFor="friction">Angle of Internal Friction</label>
                <input
                    required
                    id="friction"
                    type="number"
                    readOnly={editBtn}
                    value={friction}
                    onChange={(e) => setFriction(parseFloat(e.target.value))}
                    style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        fontSize: "16px",
                    }}
                />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                {!editBtn && (
                    <button type="submit" style={{ padding: "10px 20px", fontSize: "16px", backgroundColor: "#2b3142", color: "#fff", border: "none", borderRadius: "4px" }}>
                        Submit
                    </button>
                )}
                {editBtn && (
                    <button type="button" onClick={() => setEditBtn(false)} style={{ padding: "10px 20px", fontSize: "16px", backgroundColor: "#2b3142", color: "#fff", border: "none", borderRadius: "4px" }}>
                        Edit
                    </button>
                )}
            </div>
        </form>
    );
};

export default SoilDirectShearTest;
