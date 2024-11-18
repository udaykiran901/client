import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AppDispatch } from "index";
import { submitTestDetails, getSingleJob, rejectTestDetails } from "slices/thunk";
import { createSelector } from "reselect";

interface PlasticLimits {
    sno: number;
    canNo: number;
    w1: number;
    w2: number;
    w3: number;
    w4: number;
    w5: number;
    w: number;
    [key: string]: number;
}

interface LiquidLimits {
    sno: number;
    noOfBowls: number;
    canNo: number;
    w1: number;
    w2: number;
    w3: number;
    w4: number;
    w5: number;
    w: number;
    [key: string]: number;
}

interface DataSheet {
    pl: PlasticLimits[];
    ll: LiquidLimits[];
}

const CBNumberInputField: React.FC<any> = ({
    id = undefined,
    label = undefined,
    onChange,
    readOnly,
    value = 0,
    classname = "input-field-10",
}) => {
    return (
        <div>
            {label && <label className="label-text">{label}</label>}
            <input
                required
                readOnly={readOnly}
                id={id}
                type="number"
                name={id}
                step="0.01"
                placeholder={`Enter ${label ? label : "value"}`}
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className={classname}
            />
        </div>
    );
};

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


const Soil_LL_PL: React.FC = () => {
    const [record, setRecord] = useState<DataSheet>({
        ll: Array.from({ length: 4 }, (_, ind) => ({
            sno: ind,
            noOfBowls: 0,
            canNo: 0,
            w1: 0,
            w2: 0,
            w3: 0,
            w4: 0,
            w5: 0,
            w: 0,
        })),
        pl: Array.from({ length: 4 }, (_, ind) => ({
            sno: ind + 1,
            canNo: 0,
            w1: 0,
            w2: 0,
            w3: 0,
            w4: 0,
            w5: 0,
            w: 0,
        })),
    });
    const [liq, setLiq] = useState<number>(0);
    const [pls, setPls] = useState<number>(0);
    const [editBtn, setEditbtn] = useState<boolean>(false);

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const review = pathname.includes("review");
    const roundTo3Dec = (d: any) => d.toFixed(2);


    useEffect(() => {
        if (review) {
            setEditbtn(true);
        }
    }, [review]);

    const renderLiquidLimits = () => {
        const headings = [
            "No. of Bowls",
            "Can No.",
            "wt. of wet soil + can in g (w1)",
            "wt. of drysoil + can in g (w2)",
            "Wt. of can in g  (w3)",
            "Wt. of water in g (w4) = (w1 - w2)",
            "Wt of Dry soil in g (w5) = (w2 - w3)",
            "Water content (%) w = (w4/w5 * 100)",
        ];

        const columns = [
            {
                key: "noOfBowls",
            },
            {
                key: "canNo",
            },
            {
                key: "w1",
            },
            {
                key: "w2",
            },
            {
                key: "w3",
            },
            {
                key: "w4",
                readonly: true,
            },
            {
                key: "w5",
                readonly: true,
            },
            {
                key: "w",
                readonly: true,
            },
        ];

        const { ll } = record;

        return (
            <>
                <div className="two-fields-container plan-two-field-container table-margin-top">
                    {headings.map((eachHeading) => (
                        <HeadingTextAreaIP
                            // classname={classname}
                            value={eachHeading}
                            rows={3}
                        />
                    ))}
                </div>

                {ll.map((eachRec: LiquidLimits, idx: number) => (
                    <div className="two-fields-container plan-two-field-container">
                        {columns.map(({ key, readonly }) => (
                            <CBNumberInputField
                                label={undefined}
                                value={eachRec[key]}
                                onChange={(value: number) =>
                                    dataSheetHandleInputChange(idx, key, value, "ll")
                                }
                                readOnly={readonly ? true : editBtn}
                                // classname={classname}
                                key={idx + key}
                            />
                        ))}
                    </div>
                ))}
            </>
        );
    };

    const renderPlasticLimits = () => {
        const headings = [
            "S No.",
            "Can No.",
            "wt. of wet soil + can in g (w1)",
            "wt. of drysoil + can in g (w2)",
            "Wt. of can in g  (w3)",
            "Wt. of water in g (w4) = (w1 - w2)",
            "Wt of Dry soil in g (w5) = (w2 - w3)",
            "Water content (%) w = (w4/w5 * 100)",
        ];

        const columns = [
            { key: "sno", readonly: true },
            {
                key: "canNo",
            },
            {
                key: "w1",
            },
            {
                key: "w2",
            },
            {
                key: "w3",
            },
            {
                key: "w4",
                readonly: true,
            },
            {
                key: "w5",
                readonly: true,
            },
            {
                key: "w",
                readonly: true,
            },
        ];

        const { pl } = record;

        return (
            <>
                <div className="two-fields-container plan-two-field-container table-margin-top">
                    {headings.map((eachHeading) => (
                        <HeadingTextAreaIP
                            // classname={classname}
                            value={eachHeading}
                            rows={3}
                        />
                    ))}
                </div>

                {pl.map((eachRec: PlasticLimits, idx: number) => (
                    <div className="two-fields-container plan-two-field-container">
                        {columns.map(({ key, readonly }) => (
                            <CBNumberInputField
                                label={undefined}
                                value={eachRec[key]}
                                onChange={(value: number) =>
                                    dataSheetHandleInputChange(idx, key, value, "pl")
                                }
                                readOnly={readonly ? true : editBtn}
                                // classname={classname}
                                key={idx + key}
                            />
                        ))}
                    </div>
                ))}
            </>
        );
    };

    const handleOnSubmittingTest = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const resultObj = { record };
        const valuesObj = [
            { description: "liq", value: liq },
            { description: "pls", value: pls },
        ];


    };

    const toggleReviewBtn = () => setEditbtn(!editBtn);

    const dataSheetHandleInputChange = (
        rowIndex: number,
        fieldName: string,
        value: number,
        key: string
    ) => {
        const updatedRecord: DataSheet = { ...record };
        if (key === "ll") {
            updatedRecord.ll[rowIndex] = {
                ...updatedRecord.ll[rowIndex],
                [fieldName]: value,
                w4: roundTo3Dec(Math.abs(updatedRecord.ll[rowIndex].w1 - updatedRecord.ll[rowIndex].w2)),
                w5: roundTo3Dec(Math.abs(updatedRecord.ll[rowIndex].w2 - updatedRecord.ll[rowIndex].w3)),
                w: roundTo3Dec((updatedRecord.ll[rowIndex].w4 / updatedRecord.ll[rowIndex].w5) * 100),
            };
        } else {
            updatedRecord.pl[rowIndex] = {
                ...updatedRecord.pl[rowIndex],
                [fieldName]: value,
                w4: roundTo3Dec(Math.abs(updatedRecord.pl[rowIndex].w1 - updatedRecord.pl[rowIndex].w2)),
                w5: roundTo3Dec(Math.abs(updatedRecord.pl[rowIndex].w2 - updatedRecord.pl[rowIndex].w3)),
                w: roundTo3Dec((updatedRecord.pl[rowIndex].w4 / updatedRecord.pl[rowIndex].w5) * 100),
            };
        }
        setRecord(updatedRecord);
    };

    const renderInput = (label: string, value: number, setValue: (val: number) => void) => (
        <div style={{ marginBottom: '15px' }}>
            <label>{label}</label>
            <input
                required
                type="number"
                readOnly={editBtn}
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
            <h3 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>Soil Test Calculation</h3>

            <div>{renderLiquidLimits()}</div>
            {renderInput("Liquid Limit", liq, setLiq)}
            <div>{renderPlasticLimits()}</div>
            {renderInput("Plastic Limit", pls, setPls)}

            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {!editBtn && (
                    <button type="submit" style={{ ...buttonStyle, marginRight: 20 }}>
                        Submit
                    </button>
                )}
                {editBtn && (
                    <button type="button" onClick={toggleReviewBtn} style={{ ...buttonStyle, backgroundColor: '#2b3142', marginRight: 20 }}>
                        Edit
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

export default Soil_LL_PL;
