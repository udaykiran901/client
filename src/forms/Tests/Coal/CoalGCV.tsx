import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { AppDispatch } from "index";
import { submitTestDetails, getSingleJob, rejectTestDetails } from "slices/thunk";
import { createSelector } from "reselect";

const CoalGCV: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { jobId } = useParams();

    const [w, setW] = useState<number>(0);
    const [w1, setW1] = useState<number>(0);
    const [w2, setW2] = useState<number>(0);
    const [t1, setT1] = useState<number>(0);
    const [t2, setT2] = useState<number>(0);
    const [n, setN] = useState<number>(0);
    const [dt2, setDt2] = useState<number>(0);
    const [a, setA] = useState<number>(0);
    const [b, setB] = useState<number>(0);
    const [c, setC] = useState<number>(0);
    const [d, setD] = useState<number>(0);

    const [editBtn, setEditbtn] = useState<boolean>(false);
    const review = pathname.includes("review");

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

            // Check if job and job.bench_record are defined before proceeding
            if (job && job.bench_record) {
                let benchRec;
                try {
                    benchRec = JSON.parse(job.bench_record);
                } catch (err) {
                    console.error("Failed to parse bench_record:", err);
                    return; // Exit if parsing fails
                }

                // setBenchRecord(benchRec || []);
                // setReportValues(job.report_values ? JSON.parse(job.report_values) : []);

                const getRes = async () => {
                    try {
                        console.log(benchRec, 'vvvvv');

                        // Ensure GVC and resultObj exist before destructuring
                        if (benchRec[0].GVC && benchRec[0].GVC.resultObj) {
                            const { w, w1, w2, t1, t2, n, dt2, a, b, c, d } = benchRec[0].GVC.resultObj;

                            setW(w);
                            setW1(w1);
                            setW2(w2);
                            setT1(t1);
                            setT2(t2);
                            setN(n);
                            setDt2(dt2);
                            setA(a);
                            setB(b);
                            setC(c);
                            setD(d);

                            setEditbtn(true);
                        }
                    } catch (err) {
                        console.log(err);
                    }
                };
                getRes();
            }
        }
    }, [dispatch, singleJob, review]);


    const handleOnSubmittingTest = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const resultObj = { w, w1, w2, t1, t2, n, dt2, a, b, c, d };
        const GVC = ((a - (b + c + d)) / w).toFixed(2);

        const updatedBenchRecord = [{ GVC: { resultObj } }];
        const updatedReportValues = [{ GVC: { GVC } }];

        const data = { updatedBenchRecord, updatedReportValues, jobId };

        try {
            await dispatch(submitTestDetails(data));
            navigate(-1);
        } catch (error) {
            console.error("Error submitting test details:", error);
        }
    };

    const toggleReviewBtn = () => setEditbtn(!editBtn);

    const rejectFunction = async () => {
        const requirement = { jobId };
        try {
            await dispatch(rejectTestDetails(requirement));
            navigate(-1);
        } catch (error) {
            console.error("Error rejecting test details:", error);
        }
    };

    const renderInput1 = () => (
        <div>
            <label className="none-textTransorm" htmlFor="input1">
                Wt. of sample (W) g
            </label>
            <input
                required
                readOnly={editBtn} style={inputStyle}
                id="input1"
                type="number"
                name="W"
                step="0.01"
                placeholder="Enter w"
                value={w}
                onChange={(e) => setW(parseFloat(e.target.value))}
                className="input-field-30"
            />
        </div>
    );

    const renderInput2 = () => (
        <div>
            <label className="none-textTransorm" htmlFor="input2">
                Wt. of cotton thread (W1) g
            </label>
            <input
                readOnly={editBtn}
                required style={inputStyle}
                id="input2"
                type="number"
                name="w1"
                step="0.01"
                placeholder="Enter w1"
                value={w1}
                onChange={(e) => setW1(parseFloat(e.target.value))}
                className="input-field-30"
            />
        </div>
    );

    const renderInput3 = () => (
        <div>
            <label className="none-textTransorm" htmlFor="input3">
                Wt. of Nicro Wire (W2) g
            </label>
            <input
                required
                readOnly={editBtn} style={inputStyle}
                id="input3"
                type="number"
                name="w2"
                placeholder="Enter w2"
                value={w2}
                className="input-field-30"
                onChange={(e) => setW2(parseFloat(e.target.value))}
                step="0.01"
            />
        </div>
    );

    const renderInput4 = () => (
        <div>
            <label className="none-textTransorm" htmlFor="input4">
                Initial Temperature (T<sub>1</sub>) <sup>o</sup>C
            </label>
            <input
                required
                readOnly={editBtn} style={inputStyle}
                id="input4"
                type="number"
                name="i4"
                placeholder="Enter T1"
                value={t1}
                className="input-field-30"
                onChange={(e) => setT1(parseFloat(e.target.value))}
                step="0.01"
            />
        </div>
    );

    const renderInput5 = () => (
        <div>
            <label className="none-textTransorm" htmlFor="input5">
                Final Temperature (T<sub>2</sub>) <sup>o</sup>C
            </label>
            <input
                required
                readOnly={editBtn} style={inputStyle}
                id="input5"
                type="number"
                name="i5"
                placeholder="Enter T2"
                value={t2}
                className="input-field-30"
                onChange={(e) => setT2(parseFloat(e.target.value))}
                step="0.01"
            />
        </div>
    );

    const renderInputTRaise = () => (
        <div>
            <label className="none-textTransorm" htmlFor="inputtr">
                Temperature Raise (T<sub>2</sub> - T<sub>1</sub>) <sup>o</sup>C
            </label>
            <input
                readOnly style={inputStyle}
                id="inputtr"
                type="number"
                name="itr"
                value={t2 - t1}
                className="input-field-30"
            />
        </div>
    );

    const renderInput6 = () => (
        <div>
            <label className="none-textTransorm" htmlFor="input6">
                Cheif Period (n)
            </label>
            <input
                required
                readOnly={editBtn} style={inputStyle}
                id="input6"
                type="number"
                name="i6"
                placeholder="Enter n"
                value={n}
                className="input-field-30"
                onChange={(e) => setN(parseFloat(e.target.value))}
                step="0.01"
            />
        </div>
    );
    //pending from here
    const renderInput7 = () => (
        <div>
            <label className="none-textTransorm" htmlFor="input7">
                Av cooling loss ,After Period (dt2)
            </label>
            <input
                required
                readOnly={editBtn} style={inputStyle}
                id="input7"
                type="number"
                name="i7"
                placeholder="Enter dt2"
                value={dt2}
                className="input-field-30"
                onChange={(e) => setDt2(parseFloat(e.target.value))}
                step="0.01"
            />
        </div>
    );

    const renderE = () => (
        <div>
            <label className="none-textTransorm" htmlFor="inputcl">
                Correction for cooling loss (E) = n * dt2
            </label>
            <input
                readOnly
                id="inputcl" style={inputStyle}
                type="number"
                value={dt2 * n}
                className="input-field-30"
                step="0.01"
            />
        </div>
    );

    const renderCorrectedTemp = () => (
        <div>
            <label className="none-textTransorm" htmlFor="inputCT">
                Corrected Temperature (T<sub>2</sub> - T<sub>1</sub> + E)
            </label>
            <input
                readOnly
                id="inputCT" style={inputStyle}
                type="number"
                value={(t2 - t1) * (n * dt2)}
                className="input-field-30"
                step="0.01"
            />
        </div>
    );

    const renderInput8 = () => (
        <div>
            <label className="none-textTransorm" htmlFor="input8">
                Calorific value of Sample (A):
                <br /> ((T2 - T1) + EHC ) / some value goes here (Kcal/Kg)
            </label>
            <input
                required
                readOnly={editBtn} style={inputStyle}
                id="input8"
                type="number"
                name="i8"
                placeholder="Enter A"
                value={a}
                className="input-field-30"
                onChange={(e) => setA(parseFloat(e.target.value))}
                step="0.01"
            />
        </div>
    );

    const renderInput9 = () => (
        <div>
            <label className="none-textTransorm" htmlFor="input9">
                Correction for heat Ignition(B):
                <br />
                (w1 * 4180 + w2 * 335) (Kcal/Kg)
            </label>
            <input
                required
                readOnly={editBtn} style={inputStyle}
                id="input9"
                type="number"
                name="i9"
                placeholder="Enter B"
                value={b}
                className="input-field-30"
                onChange={(e) => setB(parseFloat(e.target.value))}
                step="0.01"
            />
        </div>
    );

    const renderInput10 = () => (
        <div>
            <label className="none-textTransorm" htmlFor="input10">
                Correction for S (C) : 3.60 ((a+b)-20) cals,
                <br />a = ml of 0.1N HCl cal
                <br />b = ml of 0.1N BaOH
            </label>
            <input
                required
                readOnly={editBtn} style={inputStyle}
                id="input10"
                type="number"
                name="i10"
                placeholder="Enter C"
                value={c}
                className="input-field-30"
                onChange={(e) => setC(parseFloat(e.target.value))}
                step="0.01"
            />
        </div>
    );

    const renderInput11 = () => (
        <div>
            <label className="none-textTransorm" htmlFor="input11">
                Correction for N2 (D) : 1.43(x-a) cals ,
                <br />a = ml of 0.1N HCl
                <br />x = Vol of 0.1N Na2 Co3 added
            </label>
            <input
                required style={inputStyle}
                readOnly={editBtn}
                id="input11"
                type="number"
                name="i11"
                placeholder="Enter D"
                value={d}
                className="input-field-30"
                onChange={(e) => setD(parseFloat(e.target.value))}
                step="0.01"
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
            <h3 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>Coal GCV Calculation</h3>

            {/* Input fields */}
            {/* <div style={{ marginBottom: '15px' }}>
                <label htmlFor="input1">Wt. of sample (W) g</label>
                <input
                    required
                    readOnly={editBtn}
                    id="input1"
                    type="number"
                    step="0.01"
                    placeholder="Enter W"
                    value={w}
                    onChange={(e) => setW(parseFloat(e.target.value))}
                    style={inputStyle}
                />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="input2">Wt. of cotton thread (W1) g</label>
                <input
                    required
                    readOnly={editBtn}
                    id="input2"
                    type="number"
                    step="0.01"
                    placeholder="Enter W1"
                    value={w1}
                    onChange={(e) => setW1(parseFloat(e.target.value))}
                    style={inputStyle}
                />
            </div>

            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="input3">Wt. of Nicro Wire (W2) g</label>
                <input
                    required
                    readOnly={editBtn}
                    id="input3"
                    type="number"
                    step="0.01"
                    placeholder="Enter W2"
                    value={w2}
                    onChange={(e) => setW2(parseFloat(e.target.value))}
                    style={inputStyle}
                />
            </div> */}

            {/* Additional fields */}
            {/* ... Render other input fields in similar style as above ... */}
            {renderInput1()}
            <div className="two-fields-container">
                {renderInput2()}
                {renderInput3()}
            </div>
            <div className="two-fields-container">
                {renderInput4()}
                {renderInput5()}
            </div>

            {renderInputTRaise()}
            <div className="two-fields-container">
                {renderInput6()}
                {renderInput7()}
            </div>
            {renderE()}
            {renderCorrectedTemp()}
            <div className="two-fields-container">
                {renderInput8()}
                {renderInput9()}
            </div>
            <div className="two-fields-container">
                {renderInput10()}
                {renderInput11()}
            </div>

            <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
                <p>GCV = (A - (B + C + D)) / W</p>
                <p>GCV = ({a} - ({b} + {c} + {d})) / {w}</p>
                <p>GCV = {((a - (b + c + d)) / w).toFixed(2)}</p>
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

const inputStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
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

export default CoalGCV;
