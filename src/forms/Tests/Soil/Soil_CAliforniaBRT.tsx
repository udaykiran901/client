import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AppDispatch } from "index";
import { submitTestDetails, getSingleJob, rejectTestDetails } from "slices/thunk";
import { createSelector } from "reselect";

interface Conditions {
    w1: number;
    w2: number;
    yb: number;
    containerNumber: number;
    w5: number;
    w6: number;
    w7: number;
}

interface MoistureContentType {
    sno: number;
    moduleNumber: number;
    noOfLayers: number;
    noOfBowlsPerLayer: number;
    beforeSoaking: Conditions;
    afterSoaking: Conditions;
}

interface PenitrationSubFields {
    penitration: number[];
    provingRingReadings: number[];
    correctedLoad: number[];
}

interface LoadPenetrationType {
    sno: number;
    moduleNo: number;
    subFields: PenitrationSubFields;
}

interface Soaking {
    w1: number;
    w2: number;
    w3: number;
    yb: number;
    containerNum: number;
    w5: number;
    w6: number;
    w7: number;
    w8: number;
    w: number;
    yd: number;
}

interface MoistureRecord {
    sno: number;
    moduleNumber: number;
    beforeSoaking: Soaking;
    afterSoaking: Soaking;
}

export const CBNumberInputField: React.FC<any> = ({
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

const Soil_CAliforniaBRT: React.FC = () => {
    const { pathname } = useLocation();
    // const history = useHistory();
    const pathString: string = pathname as string;

    // const { status } = useSelector((state: any) => state.jobDetails);
    const review = pathString.includes("review");

    const roundTo3Dec = (d: any) => d.toFixed(2);


    const initialRecord: MoistureContentType[] = Array.from(
        { length: 3 },
        (_, index) => ({
            sno: index,
            moduleNumber: 0,
            noOfLayers: 0,
            noOfBowlsPerLayer: 0,
            beforeSoaking: {
                w1: 0,
                w2: 0,
                yb: 0,
                containerNumber: 0,
                w5: 0,
                w6: 0,
                w7: 0,
            },
            afterSoaking: {
                w1: 0,
                w2: 0,
                yb: 0,
                containerNumber: 0,
                w5: 0,
                w6: 0,
                w7: 0,
            },
        })
    );

    const [record, setRecord] = useState<MoistureContentType[]>(initialRecord);

    // const initialDataSheet: Record = {
    //   moistureRecord: Array.from({ length: 3 }, (_, ind) => ({
    //     sno: 0,
    //     moduleNumber: 0,
    //     beforeSoaking: {
    //       w1: 0,
    //       w2: 0,
    //       w3: 0,
    //       yb: 0,
    //       containerNum: 0,
    //       w5: 0,
    //       w6: 0,
    //       w7: 0,
    //       w8: 0,
    //       w: 0,
    //       yd: 0,
    //     },
    //     afterSoaking: {
    //       w1: 0,
    //       w2: 0,
    //       w3: 0,
    //       yb: 0,
    //       containerNum: 0,
    //       w5: 0,
    //       w6: 0,
    //       w7: 0,
    //       w8: 0,
    //       w: 0,
    //       yd: 0,
    //     },
    //   })),
    // };

    // const [dataSheet, setDataSheet] = useState<Record>(initialDataSheet);
    const [reportValue, setReportValue] = useState<number>(0);

    const volume = 2250;

    const initialLoadPenitration: LoadPenetrationType[] = Array.from(
        { length: 3 },
        (_, index) => ({
            sno: index,
            moduleNo: 0,
            subFields: {
                penitration: [0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 4.0, 5.0, 7.5, 10.0, 12.5],
                provingRingReadings: Array.from({ length: 11 }, () => 0),
                correctedLoad: Array.from({ length: 11 }, () => 0),
            },
        })
    );

    const [loadPenitrationRecord, setLoadPenitrationRecord] = useState<
        LoadPenetrationType[]
    >(initialLoadPenitration);

    const [editBtn, setEditbtn] = useState<boolean>(false);
    const dispatch = useDispatch();



    const handleInputChange = (
        rowIndex: number,
        fieldName: string,
        value: number
    ) => {
        setRecord((prevState) =>
            prevState.map((eachLine) => {
                if (eachLine.sno === rowIndex) {
                    return { ...eachLine, [fieldName]: value };
                }
                return eachLine;
            })
        );
    };

    const handleBeforeSoaking = (
        rowIndex: number,
        fieldName: string,
        value: number
    ) => {
        setRecord((prevState) =>
            prevState.map((eachLine) =>
                eachLine.sno === rowIndex
                    ? {
                        ...eachLine,
                        beforeSoaking: { ...eachLine.beforeSoaking, [fieldName]: value },
                    }
                    : eachLine
            )
        );
    };

    const handleAfterSoaking = (
        rowIndex: number,
        fieldName: string,
        value: number
    ) => {
        setRecord((prevState) =>
            prevState.map((eachLine) => {
                if (eachLine.sno === rowIndex) {
                    return {
                        ...eachLine,
                        afterSoaking: { ...eachLine.afterSoaking, [fieldName]: value },
                    };
                }
                return eachLine;
            })
        );
    };

    const penitrationOnChange = (
        rowIndex: number,
        fieldName: string,
        value: number
    ) => {
        setLoadPenitrationRecord((prevState) =>
            prevState.map((eachLine) => {
                if (eachLine.sno === rowIndex) {
                    return { ...eachLine, [fieldName]: value };
                }
                return eachLine;
            })
        );
    };

    const penitrationValueOnChange = (
        rowIndex: number,
        subFieldIndex: number,
        fieldName: string,
        value: number,
        arr: number[],
        constArr: number[]
    ) => {
        arr[subFieldIndex] = value;
        constArr[subFieldIndex] = roundTo3Dec(value * 6.616);

        setLoadPenitrationRecord((prevState) =>
            prevState.map((eachRec) => {
                if (eachRec.sno === rowIndex) {
                    return {
                        ...eachRec,
                        subFields: {
                            ...eachRec.subFields,
                            [fieldName]: arr,
                            ["correctedLoad"]: constArr,
                        },
                    };
                }
                return eachRec;
            })
        );
    };

    const renderSoaked = (arr: Conditions) => {
        const { w1, w2, containerNumber, w5, w6, w7 } = arr;
        const w3 = w2 - w1;
        const yb = roundTo3Dec(w3 / volume);

        const w8 = roundTo3Dec(w6 - w7);
        const w9 = roundTo3Dec(w7 - w5);

        const w = roundTo3Dec((w8 / w9) * 100);
        const yd = roundTo3Dec((yb / 1 + w) / 100);

        return (
            <div>
                <div className="info-item">
                    <p className="strong">Wt. of mould (w1)</p>
                    <span>{w1}</span>
                </div>

                <div className="info-item">
                    <p className="strong">Wt. of wet soil + mould (w2)</p>
                    <span>{w2}</span>
                </div>

                <div className="info-item">
                    <p className="strong">
                        weight of wet soil
                        <br /> w3 = (w2 - w1)
                    </p>
                    <span>{w3}</span>
                </div>

                <div className="info-item">
                    <p className="strong">
                        wet density Y<sub>b</sub> = w3 / V
                    </p>
                    {/* have to conform the value of v */}
                    <span>{yb}</span>
                </div>

                <div className="info-item">
                    <p className="strong">Container No</p>
                    <span>{containerNumber}</span>
                </div>

                <div className="info-item">
                    <p className="strong">Wt of container (w5)</p>
                    <span>{w5}</span>
                </div>

                <div className="info-item">
                    <p className="strong">Wt. of soil + container(w6)</p>
                    <span>{w6}</span>
                </div>

                <div className="info-item">
                    <p className="strong">Wt. of dry soil + container (w7)</p>
                    <span>{w7}</span>
                </div>

                <div className="info-item">
                    <p className="strong">Wt. of water w8 = w6 - w7</p>
                    <span>{w8}</span>
                </div>

                <div className="info-item">
                    <p className="strong">Wt of dry soil w9 = w7 - w8</p>
                    <span>{w9}</span>
                </div>

                <div className="info-item">
                    <p className="strong">
                        Moisture content <br /> W = w8/w9 * 100
                    </p>
                    <span>{w}</span>
                </div>

                <div className="info-item">
                    <p className="strong">
                        Dry density <br /> Y<sub>d</sub> = Y<sub>b</sub> 1 + w / 100(g/cc)
                    </p>
                    <span>{yd}</span>
                </div>
            </div>
        );
    };

    const renderResult = (obj: MoistureContentType) => {
        const {
            beforeSoaking,
            afterSoaking,
            moduleNumber,
            noOfBowlsPerLayer,
            noOfLayers,
        } = obj;

        return (
            <div>
                <div className="info-item">
                    <p className="strong">Module Numebr</p>
                    <span>{moduleNumber}</span>
                </div>

                <div className="info-item">
                    <p className="strong">No. of layers</p>
                    <span>{noOfLayers}</span>
                </div>

                <div className="info-item">
                    <p className="strong">No. of bowls per layer</p>
                    <span>{noOfBowlsPerLayer}</span>
                </div>

                <div className="before-after-soacked-container">
                    {renderSoaked(beforeSoaking)}
                    {renderSoaked(afterSoaking)}
                </div>
            </div>
        );
    };

    const renderDataSheet = (obj: MoistureContentType, ind: number) => {
        return (
            <div className="one-mould">
                <div>
                    <CBNumberInputField
                        id={obj.sno.toString()}
                        label="mould number"
                        value={obj.moduleNumber}
                        onChange={(value: number) =>
                            handleInputChange(ind, "moduleNumber", value)
                        }
                        readOnly={editBtn}
                        classname="input-field-30"
                    />

                    <div className="two-fields-container">
                        <CBNumberInputField
                            id={"no_of_layers" + obj.sno}
                            label="no of layers"
                            value={obj.noOfLayers}
                            onChange={(value: number) =>
                                handleInputChange(ind, "noOfLayers", value)
                            }
                            readOnly={editBtn}
                            classname={classname}
                        />

                        <CBNumberInputField
                            id={"no_of_bowls_per_layer" + obj.sno}
                            label="no of blows per layer"
                            value={obj.noOfBowlsPerLayer}
                            onChange={(value: number) =>
                                handleInputChange(ind, "noOfBowlsPerLayer", value)
                            }
                            readOnly={editBtn}
                            classname={classname}
                        />
                    </div>

                    <div className="two-fields-container">
                        <HeadingTextAreaIP
                            classname={classname}
                            value="Before Soaking"
                            rows={2}
                        />
                        <HeadingTextAreaIP
                            classname={classname}
                            value="After Soaking"
                            rows={2}
                        />
                    </div>
                    <label className="fields-title">Wt. of mould (W1)</label>
                    <div className="two-fields-container">
                        <CBNumberInputField
                            value={obj.beforeSoaking.w1}
                            onChange={(value: number) =>
                                handleBeforeSoaking(ind, "w1", value)
                            }
                            readOnly={editBtn}
                            classname={classname}
                        />
                        <CBNumberInputField
                            value={obj.afterSoaking.w1}
                            onChange={(value: number) => handleAfterSoaking(ind, "w1", value)}
                            readOnly={editBtn}
                            classname={classname}
                        />
                    </div>

                    <label className="fields-title">Wt of wet soil + mould (w2)</label>
                    <div className="two-fields-container">
                        <CBNumberInputField
                            value={obj.beforeSoaking.w2}
                            onChange={(value: number) =>
                                handleBeforeSoaking(ind, "w2", value)
                            }
                            readOnly={editBtn}
                            classname={classname}
                        />
                        <CBNumberInputField
                            value={obj.afterSoaking.w2}
                            onChange={(value: number) => handleAfterSoaking(ind, "w2", value)}
                            readOnly={editBtn}
                            classname={classname}
                        />
                    </div>

                    <label className="fields-title">Container number</label>
                    <div className="two-fields-container">
                        <CBNumberInputField
                            value={obj.beforeSoaking.containerNumber}
                            onChange={(value: number) =>
                                handleBeforeSoaking(ind, "containerNumber", value)
                            }
                            readOnly={editBtn}
                            classname={classname}
                        />
                        <CBNumberInputField
                            value={obj.afterSoaking.containerNumber}
                            onChange={(value: number) =>
                                handleAfterSoaking(ind, "containerNumber", value)
                            }
                            readOnly={editBtn}
                            classname={classname}
                        />
                    </div>

                    <label className="fields-title">Wt. of container (w5)</label>
                    <div className="two-fields-container">
                        <CBNumberInputField
                            value={obj.beforeSoaking.w5}
                            onChange={(value: number) =>
                                handleBeforeSoaking(ind, "w5", value)
                            }
                            readOnly={editBtn}
                            classname={classname}
                        />
                        <CBNumberInputField
                            value={obj.afterSoaking.w5}
                            onChange={(value: number) => handleAfterSoaking(ind, "w5", value)}
                            readOnly={editBtn}
                            classname={classname}
                        />
                    </div>

                    <label className="fields-title">
                        Wt. of wet sample + container (w6)
                    </label>
                    <div className="two-fields-container">
                        <CBNumberInputField
                            value={obj.beforeSoaking.w6}
                            onChange={(value: number) =>
                                handleBeforeSoaking(ind, "w6", value)
                            }
                            readOnly={editBtn}
                            classname={classname}
                        />
                        <CBNumberInputField
                            value={obj.afterSoaking.w6}
                            onChange={(value: number) => handleAfterSoaking(ind, "w6", value)}
                            readOnly={editBtn}
                            classname={classname}
                        />
                    </div>

                    <label className="fields-title">
                        Wt. of dry sample + container (w7)
                    </label>
                    <div className="two-fields-container">
                        <CBNumberInputField
                            value={obj.beforeSoaking.w7}
                            onChange={(value: number) =>
                                handleBeforeSoaking(ind, "w7", value)
                            }
                            readOnly={editBtn}
                            classname={classname}
                        />
                        <CBNumberInputField
                            value={obj.afterSoaking.w7}
                            onChange={(value: number) => handleAfterSoaking(ind, "w7", value)}
                            readOnly={editBtn}
                            classname={classname}
                        />
                    </div>
                </div>
                <div>{renderResult(obj)}</div>
            </div>
        );
    };

    const classname = "input-field-5 plan-input-field";

    const renderLoadPenitrationRecord = (
        obj: LoadPenetrationType,
        ind: number
    ) => {
        const { penitration, correctedLoad, provingRingReadings } = obj.subFields;
        const indexArr = Array.from({ length: 11 }, (_, ind) => ind);

        const graphValues = Array.from({ length: 11 }, (_, ind) => ({
            name: penitration[ind],
            "Corrected Load": correctedLoad[ind],
        }));

        return (
            <div className="one-mould" key={ind}>
                <div className={"row" + ind}>
                    <CBNumberInputField
                        id={obj.sno.toString()}
                        label="mould number"
                        value={obj.moduleNo}
                        onChange={(value: number) =>
                            penitrationOnChange(ind, "moduleNo", value)
                        }
                        readOnly={editBtn}
                        classname={classname}
                    />

                    <div className="two-fields-container plan-two-field-container">
                        {[
                            "Penitration (mm)",
                            "Proving Ring reading",
                            "Corrected Load (Kg)",
                        ].map((eachHeading) => (
                            <HeadingTextAreaIP
                                classname={classname}
                                value={eachHeading}
                                rows={2}
                            />
                        ))}
                    </div>

                    {indexArr.map((index) => (
                        <div
                            className="two-fields-container plan-two-field-container"
                            key={index}
                        >
                            <CBNumberInputField
                                value={penitration[index]}
                                onChange={(value: number) => value}
                                readOnly={true}
                                classname={classname}
                            />
                            <CBNumberInputField
                                value={provingRingReadings[index]}
                                onChange={(value: number) =>
                                    penitrationValueOnChange(
                                        ind,
                                        index,
                                        "provingRingReadings",
                                        value,
                                        provingRingReadings,
                                        correctedLoad
                                    )
                                }
                                readOnly={editBtn}
                                classname={classname}
                            />
                            <CBNumberInputField
                                value={correctedLoad[index]}
                                onChange={(value: number) => value}
                                readOnly={true}
                                classname={classname}
                            />
                        </div>
                    ))}
                </div>

                <div>
                    {/* <SingleGraph data={graphValues} /> */}
                </div>
            </div>
        );
    };

    const HandleOnSubmittingTest = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        const resultObj = {
            record,
            loadPenitrationRecord,
        };

        const valuesObj = [
            {
                description: "cbr",
                value: reportValue,
            },
        ];

        // await submitPhysicalTest(
        //     JSON.stringify(resultObj),
        //     JSON.stringify(valuesObj),
        //     dispatch,
        //     review,
        //     history
        // );
    };

    const toggleReviewBtn = () => setEditbtn(!editBtn);

    const [openRecord1, setOpenRecord1] = useState<boolean>(true);
    const [openRecord2, setOpenRecord2] = useState<boolean>(true);

    const test1 = "Moisture content and weight of test samples";
    const test2 = "Load Penitration test";

    return (
        <form onSubmit={HandleOnSubmittingTest} className="test-submission-fom">
            <button
                className="button"
                type="button"
                onClick={() => setOpenRecord1(!openRecord1)}
            >
                {openRecord1 ? `Close ${test1}` : `Open ${test1}`}
            </button>

            <div className="special-test">
                {/* <TestFormTitle status={status || ""} /> */}
                {openRecord1 &&
                    record.map((eachObj) => renderDataSheet(eachObj, eachObj.sno))}

                <h4>{test2}</h4>

                {openRecord2 &&
                    loadPenitrationRecord.map((eachObj) =>
                        renderLoadPenitrationRecord(eachObj, eachObj.sno)
                    )}

                <div className="constants-container">
                    <input
                        required
                        readOnly={editBtn}
                        type="number"
                        step="0.01"
                        placeholder={`Enter CBR value`}
                        value={reportValue}
                        onChange={(e) => setReportValue(parseFloat(e.target.value))}
                        className={classname}
                    />
                </div>


            </div>
        </form>
    );
};

export default Soil_CAliforniaBRT;