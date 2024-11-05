import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AppDispatch } from "index";
import { submitTestDetails, getSingleJob, rejectTestDetails } from "slices/thunk";
import { createSelector } from "reselect";
import './index.css'

interface Record {
    sno: number;
    sample: number;

    passing: string;
    retainedOn: string;

    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    [key: string]: number | string;
}



const FAsoundness: React.FC = () => {
    const TestFormTitle = ({ status }: { status: string }) => (
        <>
            {(
                <p className="paragraph-highlight">
                    Click on edit to modify the result values
                </p>
            )}

            {(
                <p className="paragraph-highlight">Test is reviewed and finalised</p>
            )}

            {(
                <p className="paragraph-highlight">
                    Fill the form and hit submit button to submit the test
                </p>
            )}

            {(
                <p className="paragraph-highlight">
                    Re Perform the test and submit the results
                </p>
            )}
        </>
    );

    const HeadingTextAreaIP: React.FC<any> = ({
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

    const CBTextInputField: React.FC<any> = ({
        id = undefined,
        label = undefined,
        onChange,
        readOnly,
        value = "",
        classname = "input-field-10",
    }) => {
        return (
            <div>
                {label && <label className="label-text">{label}</label>}
                <input
                    required
                    readOnly={readOnly}
                    id={id}
                    type="text"
                    name={id}
                    step="0.01"
                    placeholder={`Enter ${label ? label : "value"}`}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={classname}
                />
            </div>
        );
    };

    const { pathname } = useLocation();
    const pathString: string = pathname as string;

    const review = pathString.includes("review");

    const [editBtn, setEditbtn] = useState<boolean>(false);
    const dispatch = useDispatch();

    const passing: string[] = [
        "63 mm",
        "40 mm",
        "20 mm",
        "10mm ",

    ];
    const retainedOn: string[] = [
        "40 mm",
        "20 mm",
        "10mm ",
        "4.75mm",
    ];

    const initialRecord: Record[] = Array.from(
        { length: passing.length },
        (_, idx) => ({
            sno: idx,
            sample: idx + 1,
            passing: passing[idx],
            retainedOn: retainedOn[idx],
            a: 0,
            b: 0,
            c: 0,
            d: 0,
            e: 0,
        })
    );

    const [record, setRecord] = useState<Record[]>(initialRecord);
    const roundTo3Dec = (d: any) => d.toFixed(2);

    const dataSheetHandleInputChange = (
        rowIndex: number,
        fieldName: string,
        value: number
    ) => {
        console.log(value, 'vvvvvvv');
        setRecord((prevRecord) =>
            prevRecord.map((eachRec) => {
                if (eachRec.sno === rowIndex) {
                    const { a, b, c } = eachRec;
                    const d = roundTo3Dec((c * b) / 100);
                    const e = roundTo3Dec((((c * b) / 100) * a) / 100);
                    return {
                        ...eachRec,
                        [fieldName]: value,
                        d: d,
                        e: e,
                    };
                } else {
                    return eachRec;
                }
            })
        );
    };

    const HandleOnSubmittingTest = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const resultObj = {
            record,
        };

        const valuesObj = [
            {
                description: "soundness",
                value: {
                    soundness: roundTo3Dec(getAvgSG("e"))
                }
            }
        ];


    };

    const toggleReviewBtn = () => setEditbtn(!editBtn);
    const STRING = 'STRING'
    const columns = [
        {
            key: "passing",
            label: "Passing",
            readonly: true,
            type: STRING,
        },
        { key: "retainedOn", label: "Retained On", readonly: true, type: STRING },
        { key: "a", label: "Grading of original sample percent (%) A" },
        {
            key: "b",
            label: "Weight of test fraction before test (g) B",
        },
        {
            key: "c",
            label:
                "Weight of passing Finer Seive after test (Actual Weight loss) (C)",
        },
        {
            key: "d",
            label:
                "Percentage of passing Finer seive after test (Actual Percentage Loss) D=(C/B)*100",
            readonly: true,
        },
        {
            key: "e",
            label: "Weighted Average (Corrected Percentage Loss) E=(D*A)/100",
            readonly: true,
        },
    ];

    const classname = "input-field-5 plan-input-field";

    const renderDataSheet1 = () => {
        return (
            <div>
                <div className="two-fields-container plan-two-field-container table-margin-top" >
                    {columns.map((eachColumn) => (
                        <HeadingTextAreaIP
                            classname={classname}
                            value={eachColumn.label}
                            rows={4}
                        />
                    ))}
                </div>
                {record.map((eachRec: Record, index: number) => (
                    <div className="two-fields-container plan-two-field-container">
                        {columns.map(({ key, readonly, type }) =>
                            type === STRING ? (
                                <CBTextInputField
                                    label={undefined}
                                    value={eachRec[key]}
                                    onChange={(value: any) => value}
                                    readOnly={true}
                                    classname={classname}
                                    key={index + key}
                                />
                            ) : (
                                <CBNumberInputField
                                    label={undefined}
                                    value={eachRec[key]}
                                    onChange={(value: any) =>
                                        dataSheetHandleInputChange(index, key, value)
                                    }
                                    readOnly={readonly ? true : editBtn}
                                    classname={classname}
                                    key={index + key}
                                />
                            )
                        )}
                    </div>
                ))}
            </div>
        );
    };

    const getAvgSG = (key: string) => {
        const sum = record.reduce((accum, eachLine) => {
            const value = eachLine[key] as number;
            return value > 0 ? accum + value : accum;
        }, 0);

        const filteredRecord = record.filter(eachLine => (eachLine[key] as number) > 0);
        return roundTo3Dec(sum / filteredRecord.length);
    };

    return (
        <form onSubmit={HandleOnSubmittingTest} className="test-submission-fom">
            <div className="special-test">
                {renderDataSheet1()}

                <div className="constants-container">
                    <CBTextInputField
                        label={"Average E"}
                        value={getAvgSG("e")}
                        onChange={(value: string) => value}
                        readOnly={true}
                    />
                </div>
            </div>
        </form>
    );
};

export default FAsoundness;