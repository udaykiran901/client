import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AppDispatch } from "index";
import { submitTestDetails, getSingleJob, rejectTestDetails } from "slices/thunk";
import { createSelector } from "reselect";


const CASieveAnalysis: React.FC = () => {



    // State for 80mm
    const [wr80mm, setWr80mm] = useState<number>(0);
    const [cwr80mm, setCwr80mm] = useState<number>(0);

    // State for 63mm
    const [wr63mm, setWr63mm] = useState<number>(0);
    const [cwr63mm, setCwr63mm] = useState<number>(0);

    // State for 16mm
    const [wr16mm, setWr16mm] = useState<number>(0);
    const [cwr16mm, setCwr16mm] = useState<number>(0);

    // State for 40mm
    const [wr40mm, setWr40mm] = useState<number>(0);
    const [cwr40mm, setCwr40mm] = useState<number>(0);

    // State for 20mm
    const [wr20mm, setWr20mm] = useState<number>(0);
    const [cwr20mm, setCwr20mm] = useState<number>(0);

    // State for 12mm
    const [wr12mm, setWr12mm] = useState<number>(0);
    const [cwr12mm, setCwr12mm] = useState<number>(0);

    // State for 10mm
    const [wr10mm, setWr10mm] = useState<number>(0);
    const [cwr10mm, setCwr10mm] = useState<number>(0);

    // State for 4mm
    const [wr4mm, setWr4mm] = useState<number>(0);
    const [cwr4mm, setCwr4mm] = useState<number>(0);

    // State for 2mm
    const [wr2mm, setWr2mm] = useState<number>(0);
    const [cwr2mm, setCwr2mm] = useState<number>(0);

    const [gradingZone, setGradingZone] = useState(0)

    const [qty, setQty] = useState<number>(0);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { jobId } = useParams();
    const { pathname } = useLocation();
    const review = pathname.includes("review");
    const [editBtn, setEditbtn] = useState<boolean>(false);
    const roundTo2Dec = (d: number) => d.toFixed(2);
    console.log(editBtn, 'eeeeeee')




    const renderWr80mm = () => (
        <div style={styles.fieldWrapper}>
            <label className="none-textTransform" htmlFor="wr1000mm" style={styles.label2}>
                Weight Retained (g) - 80mm
            </label>
            <input
                required
                readOnly={editBtn}
                id="wr1000mm"
                type="number"
                name="wr1000mm"
                step="0.01"
                placeholder="Enter 80mm"
                value={wr80mm}
                onChange={(e) => setWr80mm(parseFloat(e.target.value))}
                style={styles.inputField}
            />
        </div>
    );

    const renderCwr80mm = () => (
        <div style={styles.fieldWrapper}>
            <label className="none-textTransform" htmlFor="cwr1000mm" style={styles.label2}>
                Cumulative Weight Retained - (g) - 80mm
            </label>
            <input
                readOnly={editBtn}
                required
                id="cwr1000mm"
                type="number"
                name="cwr1000mm"
                step="0.01"
                placeholder="Enter 80mm"
                value={cwr80mm}
                onChange={(e) => setCwr80mm(parseFloat(e.target.value))}
                style={styles.inputField}
            />
        </div>
    );

    const renderWr63mm = () => (
        <div style={styles.fieldWrapper}>
            <label className="none-textTransform" htmlFor="wr63mm" style={styles.label2}>
                Weight Retained (g) - 63mm
            </label>
            <input
                required
                readOnly={editBtn}
                id="wr63mm"
                type="number"
                name="wr63mm"
                step="0.01"
                placeholder="Enter 63mm"
                value={wr63mm}
                onChange={(e) => setWr63mm(parseFloat(e.target.value))}
                style={styles.inputField}
            />
        </div>
    );

    const renderCwr63mm = () => (
        <div style={styles.fieldWrapper}>
            <label className="none-textTransform" htmlFor="cwr63mm" style={styles.label2}>
                Cumulative Weight Retained - (g) - 63mm
            </label>
            <input
                readOnly={editBtn}
                required
                id="cwr63mm"
                type="number"
                name="cwr63mm"
                step="0.01"
                placeholder="Enter 63mm"
                value={cwr63mm}
                onChange={(e) => setCwr63mm(parseFloat(e.target.value))}
                style={styles.inputField}
            />
        </div>
    );

    const renderWr16mm = () => (
        <div style={styles.fieldWrapper}>
            <label className="none-textTransform" htmlFor="wr16mm" style={styles.label2}>
                Weight Retained (g) - 16mm
            </label>
            <input
                required
                readOnly={editBtn}
                id="wr16mm"
                type="number"
                name="wr16mm"
                step="0.01"
                placeholder="Enter 16mm"
                value={wr16mm}
                onChange={(e) => setWr16mm(parseFloat(e.target.value))}
                style={styles.inputField}
            />
        </div>
    );

    const renderCwr16mm = () => (
        <div style={styles.fieldWrapper}>
            <label className="none-textTransform" htmlFor="cwr16mm" style={styles.label2}>
                Cumulative Weight Retained - (g) - 16mm
            </label>
            <input
                readOnly={editBtn}
                required
                id="cwr16mm"
                type="number"
                name="cwr16mm"
                step="0.01"
                placeholder="Enter 16mm"
                value={cwr16mm}
                onChange={(e) => setCwr16mm(parseFloat(e.target.value))}
                style={styles.inputField}
            />
        </div>
    );

    const renderWr40mm = () => (
        <div style={styles.fieldWrapper}>
            <label className="none-textTransform" htmlFor="wr40mm" style={styles.label2}>
                Weight Retained (g) - 40mm
            </label>
            <input
                required
                readOnly={editBtn}
                id="wr40mm"
                type="number"
                name="wr40mm"
                step="0.01"
                placeholder="Enter 40mm"
                value={wr40mm}
                onChange={(e) => setWr40mm(parseFloat(e.target.value))}
                style={styles.inputField}
            />
        </div>
    );

    const renderCwr40mm = () => (
        <div style={styles.fieldWrapper}>
            <label className="none-textTransform" htmlFor="cwr40mm" style={styles.label2}>
                Cumulative Weight Retained - (g) - 40mm
            </label>
            <input
                readOnly={editBtn}
                required
                id="cwr40mm"
                type="number"
                name="cwr40mm"
                step="0.01"
                placeholder="Enter 40mm"
                value={cwr40mm}
                onChange={(e) => setCwr40mm(parseFloat(e.target.value))}
                style={styles.inputField}
            />
        </div>
    );

    const renderWr20mm = () => (
        <div style={styles.fieldWrapper}>
            <label className="none-textTransform" htmlFor="wr20mm" style={styles.label2}>
                Weight Retained (g) - 20mm
            </label>
            <input
                required
                readOnly={editBtn}
                id="wr20mm"
                type="number"
                name="wr20mm"
                step="0.01"
                placeholder="Enter 20mm"
                value={wr20mm}
                onChange={(e) => setWr20mm(parseFloat(e.target.value))}
                style={styles.inputField}
            />
        </div>
    );

    const renderCwr20mm = () => (
        <div style={styles.fieldWrapper}>
            <label className="none-textTransform" htmlFor="cwr20mm" style={styles.label2}>
                Cumulative Weight Retained - (g) - 20mm
            </label>
            <input
                readOnly={editBtn}
                required
                id="cwr20mm"
                type="number"
                name="cwr20mm"
                step="0.01"
                placeholder="Enter 20mm"
                value={cwr20mm}
                onChange={(e) => setCwr20mm(parseFloat(e.target.value))}
                style={styles.inputField}
            />
        </div>
    );

    const renderWr12mm = () => (
        <div style={styles.fieldWrapper}>
            <label className="none-textTransform" htmlFor="wr12mm" style={styles.label2}>
                Weight Retained (g) - 12mm
            </label>
            <input
                required
                readOnly={editBtn}
                id="wr12mm"
                type="number"
                name="wr12mm"
                step="0.01"
                placeholder="Enter 12mm"
                value={wr12mm}
                onChange={(e) => setWr12mm(parseFloat(e.target.value))}
                style={styles.inputField}
            />
        </div>
    );

    const renderCwr12mm = () => (
        <div style={styles.fieldWrapper}>
            <label className="none-textTransform" htmlFor="cwr12mm" style={styles.label2}>
                Cumulative Weight Retained - (g) - 12mm
            </label>
            <input
                readOnly={editBtn}
                required
                id="cwr12mm"
                type="number"
                name="cwr12mm"
                step="0.01"
                placeholder="Enter 12mm"
                value={cwr12mm}
                onChange={(e) => setCwr12mm(parseFloat(e.target.value))}
                style={styles.inputField}
            />
        </div>
    );

    const renderWr10mm = () => (
        <div style={styles.fieldWrapper}>
            <label className="none-textTransform" htmlFor="wr10mm" style={styles.label2}>
                Weight Retained (g) - 10mm
            </label>
            <input
                required
                readOnly={editBtn}
                id="wr10mm"
                type="number"
                name="wr10mm"
                step="0.01"
                placeholder="Enter 10mm"
                value={wr10mm}
                onChange={(e) => setWr10mm(parseFloat(e.target.value))}
                style={styles.inputField}
            />
        </div>
    );

    const renderCwr10mm = () => (
        <div style={styles.fieldWrapper}>
            <label className="none-textTransform" htmlFor="cwr10mm" style={styles.label2}>
                Cumulative Weight Retained - (g) - 10mm
            </label>
            <input
                readOnly={editBtn}
                required
                id="cwr10mm"
                type="number"
                name="cwr10mm"
                step="0.01"
                placeholder="Enter 10mm"
                value={cwr10mm}
                onChange={(e) => setCwr10mm(parseFloat(e.target.value))}
                style={styles.inputField}
            />
        </div>
    );

    const renderWr4mm = () => (
        <div style={styles.fieldWrapper}>
            <label className="none-textTransform" htmlFor="wr4mm" style={styles.label2}>
                Weight Retained (g) - 4mm
            </label>
            <input
                required
                readOnly={editBtn}
                id="wr4mm"
                type="number"
                name="wr4mm"
                step="0.01"
                placeholder="Enter 4mm"
                value={wr4mm}
                onChange={(e) => setWr4mm(parseFloat(e.target.value))}
                style={styles.inputField}
            />
        </div>
    );

    const renderCwr4mm = () => (
        <div style={styles.fieldWrapper}>
            <label className="none-textTransform" htmlFor="cwr4mm" style={styles.label2}>
                Cumulative Weight Retained - (g) - 4mm
            </label>
            <input
                readOnly={editBtn}
                required
                id="cwr4mm"
                type="number"
                name="cwr4mm"
                step="0.01"
                placeholder="Enter 4mm"
                value={cwr4mm}
                onChange={(e) => setCwr4mm(parseFloat(e.target.value))}
                style={styles.inputField}
            />
        </div>
    );

    const renderWr2mm = () => (
        <div style={styles.fieldWrapper}>
            <label className="none-textTransform" htmlFor="wr2mm" style={styles.label2}>
                Weight Retained (g) - 2mm
            </label>
            <input
                required
                readOnly={editBtn}
                id="wr2mm"
                type="number"
                name="wr2mm"
                step="0.01"
                placeholder="Enter 2mm"
                value={wr2mm}
                onChange={(e) => setWr2mm(parseFloat(e.target.value))}
                style={styles.inputField}
            />
        </div>
    );

    const renderCwr2mm = () => (
        <div style={styles.fieldWrapper}>
            <label className="none-textTransform" htmlFor="cwr2mm" style={styles.label2}>
                Cumulative Weight Retained - (g) - 2mm
            </label>
            <input
                readOnly={editBtn}
                required
                id="cwr2mm"
                type="number"
                name="cwr2mm"
                step="0.01"
                placeholder="Enter 2mm"
                value={cwr2mm}
                onChange={(e) => setCwr2mm(parseFloat(e.target.value))}
                style={styles.inputField}
            />
        </div>
    );

    const toggleReviewBtn = () => setEditbtn(!editBtn);

    const rejectFunction = async () => {
        try {
            await dispatch(rejectTestDetails({ jobId }));
            navigate(-1);
        } catch (error) {
            console.error("Error rejecting test details:", error);
        }
    };

    useEffect(() => {
        dispatch(getSingleJob(jobId));
    }, [dispatch, jobId]);

    const selectPropertiesLAB = createSelector(
        (state: any) => state.lab,
        (lab: any) => ({
            singleJob: lab.singleJob,
        })
    );

    const { singleJob } = useSelector(selectPropertiesLAB);

    useEffect(() => {
        if (singleJob.length > 0 && review) {
            const job = singleJob[0];
            const benchRec = job.bench_record ? JSON.parse(job.bench_record) : null;

            if (benchRec != null) {
                const getRes = async () => {
                    try {
                        console.log(benchRec, 'got from db');
                        const {
                            wr80mm, cwr80mm, wr63mm, cwr63mm, wr40mm, cwr40mm,
                            wr20mm, cwr20mm, wr16mm, cwr16mm, wr12mm, cwr12mm,
                            wr10mm, cwr10mm, wr4mm, cwr4mm, wr2mm, cwr2mm,
                            gradingZone, qty,
                        } = benchRec[0];

                        setGradingZone(gradingZone);
                        setWr80mm(wr80mm);
                        setCwr80mm(cwr80mm);
                        setWr63mm(wr63mm);
                        setCwr63mm(cwr63mm);
                        setWr40mm(wr40mm);
                        setCwr40mm(cwr40mm);
                        setWr20mm(wr20mm);
                        setCwr20mm(cwr20mm);
                        setWr16mm(wr16mm);
                        setCwr16mm(cwr16mm);
                        setWr12mm(wr12mm);
                        setCwr12mm(cwr12mm);
                        setWr10mm(wr10mm);
                        setCwr10mm(cwr10mm);
                        setWr4mm(wr4mm);
                        setCwr4mm(cwr4mm);
                        setWr2mm(wr2mm);
                        setCwr2mm(cwr2mm);
                        setQty(qty);

                        setEditbtn(true);
                    } catch (err) {
                        console.log(err);
                    }
                };
                getRes();
            }
        }
    }, [singleJob, review]);


    const handleOnSubmittingTest = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const resultObj = {
            wr80mm,
            cwr80mm,
            wr63mm,
            cwr63mm,
            wr40mm,
            cwr40mm,
            wr20mm,
            cwr20mm,
            wr16mm,
            cwr16mm,
            wr12mm,
            cwr12mm,
            wr10mm,
            cwr10mm,
            wr4mm,
            cwr4mm,
            wr2mm,
            cwr2mm,
            gradingZone,
            qty,
        };

        const valuesObj = [
            {
                description: "80.00mm",
                value: {
                    Retained: roundTo2Dec((cwr80mm / qty) * 100),
                    Passing: roundTo2Dec(100 - (cwr80mm / qty) * 100),
                },
            },
            {
                description: "63.00mm",
                value: {
                    Retained: roundTo2Dec((cwr63mm / qty) * 100),
                    Passing: roundTo2Dec(100 - (cwr63mm / qty) * 100),
                },
            },
            {
                description: "40.00mm",
                value: {
                    Retained: roundTo2Dec((cwr40mm / qty) * 100),
                    Passing: roundTo2Dec(100 - (cwr40mm / qty) * 100),
                },
            },
            {
                description: "20.00mm",
                value: {
                    Retained: roundTo2Dec((cwr20mm / qty) * 100),
                    Passing: roundTo2Dec(100 - (cwr20mm / qty) * 100),
                },
            },
            {
                description: "16.00mm",
                value: {
                    Retained: roundTo2Dec((cwr16mm / qty) * 100),
                    Passing: roundTo2Dec(100 - (cwr16mm / qty) * 100),
                },
            },
            {
                description: "12.5mm",
                value: {
                    Retained: roundTo2Dec((cwr12mm / qty) * 100),
                    Passing: roundTo2Dec(100 - (cwr12mm / qty) * 100),
                },
            },
            {
                description: "10.00mm",
                value: {
                    Retained: roundTo2Dec((cwr10mm / qty) * 100),
                    Passing: roundTo2Dec(100 - (cwr10mm / qty) * 100),
                },
            },
            {
                description: "4.75mm",
                value: {
                    Retained: roundTo2Dec((cwr4mm / qty) * 100),
                    Passing: roundTo2Dec(100 - (cwr4mm / qty) * 100),
                },
            },
            {
                description: "2.36mm",
                value: {
                    Retained: roundTo2Dec((cwr2mm / qty) * 100),
                    Passing: roundTo2Dec(100 - (cwr2mm / qty) * 100),
                },
            },
        ];
        const updatedBenchRecord = [resultObj];
        const updatedReportValues = valuesObj;
        const data = { updatedBenchRecord, updatedReportValues, jobId };

        try {
            await dispatch(submitTestDetails(data));
            navigate(-1);
        } catch (error) {
            console.error("Error submitting test details:", error);
        }
    };

    return (
        <form style={styles.formBox} onSubmit={handleOnSubmittingTest}>
            <p style={styles.title}>Sieve Analysis</p>
            <div style={styles.twoFieldsContainer}>
                <div style={styles.fieldWrapper}>
                    <label style={styles.label2}>Grading Zone</label>
                    <input
                        type="number"
                        value={gradingZone}
                        onChange={(e) => setGradingZone(parseFloat(e.target.value))}
                        style={styles.inputField}
                    />
                </div>

                <div style={styles.fieldWrapper}>
                    <label style={styles.label2}>Quantity</label>
                    <input
                        type="number"
                        value={qty}
                        onChange={(e) => setQty(parseFloat(e.target.value))}
                        style={styles.inputField}
                    />
                </div>


                <div style={{ width: '100%' }}>
                    <p>IS sieve Designation : (80.00mm)</p>
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: 0 }}>
                        {renderWr80mm()}
                        {renderCwr80mm()}
                    </div>

                    <div style={styles.textContainer}>
                        <p style={styles.para2}>
                            Retained (y): (x/w) * 100 = ({cwr80mm}/{qty}) * {100} ={" "}
                            {roundTo2Dec((cwr80mm / qty) * 100)}
                        </p>
                        <p style={styles.para}>
                            Passing (100 - y) = 100 - {(cwr80mm / qty) * 100} ={" "}
                            {roundTo2Dec(100 - (cwr80mm / qty) * 100)}
                        </p>
                    </div>
                </div>

                <div style={{ width: '100%' }}>
                    <p>IS sieve Designation : (63.00mm)</p>
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: 0 }}>
                        {renderWr63mm()}
                        {renderCwr63mm()}
                    </div>

                    <div style={styles.textContainer}>
                        <p style={styles.para}>
                            Retained (y): (x/w) * 100 = ({cwr63mm}/{qty}) * {100} ={" "}
                            {roundTo2Dec((cwr63mm / qty) * 100)}
                        </p>
                        <p style={styles.para}>
                            Passing (100 - y) = 100 - {(cwr63mm / qty) * 100} ={" "}
                            {roundTo2Dec(100 - (cwr63mm / qty) * 100)}
                        </p>
                    </div>
                </div>

                <div style={{ width: '100%' }}>
                    <p>IS sieve Designation : (40.00mm)</p>
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: 0 }}>
                        {renderWr40mm()}
                        {renderCwr40mm()}
                    </div>

                    <div style={styles.textContainer}>
                        <p style={styles.para}>
                            Retained (y): (x/w) * 100 = ({cwr40mm}/{qty}) * {100} ={" "}
                            {roundTo2Dec((cwr40mm / qty) * 100)}
                        </p>
                        <p style={styles.para}>
                            Passing (100 - y) = 100 - {(cwr40mm / qty) * 100} ={" "}
                            {roundTo2Dec(100 - (cwr40mm / qty) * 100)}
                        </p>
                    </div>
                </div>

                <div style={{ width: '100%' }}>
                    <p>IS sieve Designation : (20.00mm)</p>
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: 0 }}>
                        {renderWr20mm()}
                        {renderCwr20mm()}
                    </div>

                    <div style={styles.textContainer}>
                        <p style={styles.para}>
                            Retained (y): (x/w) * 100 = ({cwr20mm}/{qty}) * {100} ={" "}
                            {roundTo2Dec((cwr20mm / qty) * 100)}
                        </p>
                        <p style={styles.para}>
                            Passing (100 - y) = 100 - {(cwr20mm / qty) * 100} ={" "}
                            {roundTo2Dec(100 - (cwr20mm / qty) * 100)}
                        </p>
                    </div>
                </div>

                <div style={{ width: '100%' }}>
                    <p>IS sieve Designation : (16.00mm)</p>
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: 0 }}>
                        {renderWr16mm()}
                        {renderCwr16mm()}
                    </div>

                    <div style={styles.textContainer}>
                        <p style={styles.para}>
                            Retained (y): (x/w) * 100 = ({cwr16mm}/{qty}) * {100} ={" "}
                            {roundTo2Dec((cwr16mm / qty) * 100)}
                        </p>
                        <p style={styles.para}>
                            Passing (100 - y) = 100 - {(cwr16mm / qty) * 100} ={" "}
                            {roundTo2Dec(100 - (cwr16mm / qty) * 100)}
                        </p>
                    </div>
                </div>

                <div style={{ width: '100%' }}>
                    <p>IS sieve Designation : (12.00mm)</p>
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: 0 }}>
                        {renderWr12mm()}
                        {renderCwr12mm()}
                    </div>

                    <div style={styles.textContainer}>
                        <p style={styles.para}>
                            Retained (y): (x/w) * 100 = ({cwr12mm}/{qty}) * {100} ={" "}
                            {roundTo2Dec((cwr12mm / qty) * 100)}
                        </p>
                        <p style={styles.para}>
                            Passing (100 - y) = 100 - {(cwr12mm / qty) * 100} ={" "}
                            {roundTo2Dec(100 - (cwr12mm / qty) * 100)}
                        </p>
                    </div>
                </div>

                <div style={{ width: '100%' }}>
                    <p>IS sieve Designation : (10.00mm)</p>
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: 0 }}>
                        {renderWr10mm()}
                        {renderCwr10mm()}
                    </div>

                    <div style={styles.textContainer}>
                        <p style={styles.para}>
                            Retained (y): (x/w) * 100 = ({cwr10mm}/{qty}) * {100} ={" "}
                            {roundTo2Dec((cwr10mm / qty) * 100)}
                        </p>
                        <p style={styles.para}>
                            Passing (100 - y) = 100 - {(cwr10mm / qty) * 100} ={" "}
                            {roundTo2Dec(100 - (cwr10mm / qty) * 100)}
                        </p>
                    </div>
                </div>

                <div style={{ width: '100%' }}>
                    <p>IS sieve Designation : (4.00mm)</p>
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: 0 }}>
                        {renderWr4mm()}
                        {renderCwr4mm()}
                    </div>

                    <div style={styles.textContainer}>
                        <p style={styles.para}>
                            Retained (y): (x/w) * 100 = ({cwr4mm}/{qty}) * {100} ={" "}
                            {roundTo2Dec((cwr4mm / qty) * 100)}
                        </p>
                        <p style={styles.para}>
                            Passing (100 - y) = 100 - {(cwr4mm / qty) * 100} ={" "}
                            {roundTo2Dec(100 - (cwr4mm / qty) * 100)}
                        </p>
                    </div>
                </div>

                <div style={{ width: '100%' }}>
                    <p>IS sieve Designation : (2.00mm)</p>
                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', marginTop: 0 }}>
                        {renderWr2mm()}
                        {renderCwr2mm()}
                    </div>

                    <div style={styles.textContainer}>
                        <p style={styles.para}>
                            Retained (y): (x/w) * 100 = ({cwr2mm}/{qty}) * {100} ={" "}
                            {roundTo2Dec((cwr2mm / qty) * 100)}
                        </p>
                        <p style={styles.para}>
                            Passing (100 - y) = 100 - {(cwr2mm / qty) * 100} ={" "}
                            {roundTo2Dec(100 - (cwr2mm / qty) * 100)}
                        </p>
                    </div>
                </div>


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

export default CASieveAnalysis;

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

const styles: { [key: string]: React.CSSProperties } = {
    formBox: {
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
    },
    fieldWrapper: {
        marginBottom: '12px',
        width: '48%',
        display: 'flex',
        flexDirection: 'column',
        marginRight: 10
    },
    label2: {
        fontWeight: 'bold',
        fontSize: 11,
    },
    inputField: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '12px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        height: 30
    },
    title: {
        fontWeight: 'bold',
        marginBottom: '15px',
        textAlign: 'center',
        fontSize: 20
    },
    twoFieldsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    calculationBox: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '15px',
        fontWeight: 'bold',
    }, para: {
        fontSize: 10, fontWeight: 'bold', marginRight: 55, marginLeft: 0
    }, para2: {
        fontSize: 10, fontWeight: 'bold', marginRight: 45, marginLeft: 0
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'row',
    }
};
