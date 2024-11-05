import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitTestDetails, getSingleJob, rejectTestDetails } from "slices/thunk";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AppDispatch } from "index";
import { createSelector } from "reselect";



const Elongation: React.FC = () => {
    const [wr60mm, setWr60mm] = useState<number>(0);
    const [cwr60mm, setCwr60mm] = useState<number>(0);

    const [wr50mm, setWr50mm] = useState<number>(0);
    const [cwr50mm, setCwr50mm] = useState<number>(0);

    const [wr40mm, setWr40mm] = useState<number>(0);
    const [cwr40mm, setCwr40mm] = useState<number>(0);

    const [wr31mm, setWr31mm] = useState<number>(0);
    const [cwr31mm, setCwr31mm] = useState<number>(0);

    const [wr25mm, setWr25mm] = useState<number>(0);
    const [cwr25mm, setCwr25mm] = useState<number>(0);

    const [wr20mm, setWr20mm] = useState<number>(0);
    const [cwr20mm, setCwr20mm] = useState<number>(0);

    const [wr16mm, setWr16mm] = useState<number>(0);
    const [cwr16mm, setCwr16mm] = useState<number>(0);

    const [wr12mm, setWr12mm] = useState<number>(0);
    const [cwr12mm, setCwr12mm] = useState<number>(0);

    const [wr10mm, setWr10mm] = useState<number>(0);
    const [cwr10mm, setCwr10mm] = useState<number>(0);

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { jobId } = useParams();

    const [editBtn, setEditbtn] = useState<boolean>(false);
    const { pathname } = useLocation();

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

                // Ensure benchRec has elements before destructuring
                if (benchRec.length > 0) {
                    const getRes = async () => {
                        try {
                            const {
                                wr60mm, cwr60mm, wr50mm, cwr50mm, wr40mm, cwr40mm,
                                wr31mm, cwr31mm, wr25mm, cwr25mm, wr20mm, cwr20mm,
                                wr16mm, cwr16mm, wr12mm, cwr12mm, wr10mm, cwr10mm
                            } = benchRec[0];

                            // Setting all values one by one as they are separate state variables
                            setWr60mm(wr60mm);
                            setCwr60mm(cwr60mm);
                            setWr50mm(wr50mm);
                            setCwr50mm(cwr50mm);
                            setWr40mm(wr40mm);
                            setCwr40mm(cwr40mm);
                            setWr31mm(wr31mm);
                            setCwr31mm(cwr31mm);
                            setWr25mm(wr25mm);
                            setCwr25mm(cwr25mm);
                            setWr20mm(wr20mm);
                            setCwr20mm(cwr20mm);
                            setWr16mm(wr16mm);
                            setCwr16mm(cwr16mm);
                            setWr12mm(wr12mm);
                            setCwr12mm(cwr12mm);
                            setWr10mm(wr10mm);
                            setCwr10mm(cwr10mm);

                            setEditbtn(true);
                        } catch (err) {
                            console.error("Error parsing bench record:", err);
                        }
                    };
                    getRes();
                }
            }
        }
    }, [dispatch, singleJob, review]);





    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const resultObj = {
            wr60mm,
            cwr60mm,
            wr50mm,
            cwr50mm,
            wr40mm,
            cwr40mm,
            wr31mm,
            cwr31mm,
            wr25mm,
            cwr25mm,
            wr20mm,
            cwr20mm,
            wr16mm,
            cwr16mm,
            wr12mm,
            cwr12mm,
            wr10mm,
            cwr10mm,
        };

        const elongationValue = (
            ((cwr60mm +
                cwr50mm +
                cwr40mm +
                cwr31mm +
                cwr25mm +
                cwr20mm +
                cwr16mm +
                cwr12mm +
                cwr10mm) /
                (wr60mm +
                    wr50mm +
                    wr40mm +
                    wr31mm +
                    wr25mm +
                    wr20mm +
                    wr16mm +
                    wr12mm +
                    wr10mm)) *
            100
        ).toFixed(2);


        const data = { updatedBenchRecord: [resultObj], updatedReportValues: [{ elongation: elongationValue }], jobId };

        try {
            await dispatch(submitTestDetails(data));
            navigate(-1);
        } catch (error) {
            console.error("Error submitting test details:", error);
        }
    };

    const renderwr60mm = () => (
        <div style={styles.fieldWrapper}>
            <label className="none-textTransform" htmlFor="wr1000mm" style={styles.label}>
                Weight Retained on Sieve (g):
            </label>
            <input
                required
                readOnly={editBtn}
                id="wr1000mm"
                type="number"
                name="wr1000mm"
                step="0.01"
                placeholder="Enter wr60mm"
                value={wr60mm}
                onChange={(e) => setWr60mm(parseFloat(e.target.value))}
                style={styles.inputField}
            />
        </div>
    );

    const renderpassing60mm = () => (
        <div style={styles.fieldWrapper}>
            <label className="none-textTransorm" htmlFor="cwr1000mm" style={styles.label}>
                Weight of sample retained:
            </label>
            <input
                style={styles.inputField}
                readOnly={editBtn}
                required
                id="cwr1000mm"
                type="number"
                name="cwr1000mm"
                step="0.01"
                placeholder="Enter passing60mm"
                value={cwr60mm}
                onChange={(e) => {
                    setCwr60mm(parseFloat(e.target.value));
                    // setTotalWp(totalWp+parseFloat(e.target.value))
                }}
                className="input-field-30"
            />
        </div>
    );

    const renderwr50mm = () => (
        <div style={styles.fieldWrapper}>
            <label className="none-textTransorm" htmlFor="wr0475mm" style={styles.label}>
                Weight Retained on Sieve (g)
            </label>
            <input
                style={styles.inputField}
                required
                readOnly={editBtn}
                id="wr0475mm"
                type="number"
                name="wr0475mm"
                step="0.01"
                placeholder="Enter wr50mm"
                value={wr50mm}
                onChange={(e) => {
                    setWr50mm(parseFloat(e.target.value));
                    // setTotalWr(totalWr + parseFloat(e.target.value) );
                }}
                className="input-field-30"
            />
        </div>
    );

    const renderpassing50mm = () => (
        <div style={styles.fieldWrapper}>
            <label style={styles.label} className="none-textTransorm" htmlFor="cwr0475">
                Weight of sample retained
            </label>
            <input
                style={styles.inputField}
                readOnly={editBtn}
                required
                id="cwr0475"
                type="number"
                name="cwr0475"
                step="0.01"
                placeholder="Enter passing50mm"
                value={cwr50mm}
                onChange={(e) => {
                    setCwr50mm(parseFloat(e.target.value));
                    // setTotalWp(totalWp+parseFloat(e.target.value))
                }}
                className="input-field-30"
            />
        </div>
    );

    const renderwr40mm = () => (
        <div style={styles.fieldWrapper}>
            <label style={styles.label} className="none-textTransorm" htmlFor="wr02365mm">
                Weight Retained on Sieve (g)
            </label>
            <input
                style={styles.inputField}
                required
                readOnly={editBtn}
                id="wr02365mm"
                type="number"
                name="wr02365mm"
                step="0.01"
                placeholder="Enter wr40mm"
                value={wr40mm}
                onChange={(e) => {
                    setWr40mm(parseFloat(e.target.value));
                    // setTotalWr(totalWr + parseFloat(e.target.value) );
                }}
                className="input-field-30"
            />
        </div>
    );

    const renderpassing40mm = () => (
        <div style={styles.fieldWrapper}>
            <label style={styles.label} className="none-textTransorm" htmlFor="cwr0236">
                Weight of sample retained
            </label>
            <input
                style={styles.inputField}
                readOnly={editBtn}
                required
                id="cwr0236"
                type="number"
                name="cwr0236"
                step="0.01"
                placeholder="Enter passing40mm"
                value={cwr40mm}
                onChange={(e) => {
                    setCwr40mm(parseFloat(e.target.value));
                    // setTotalWp(totalWp+parseFloat(e.target.value))
                }}
                className="input-field-30"
            />
        </div>
    );

    const renderwr31mm = () => (
        <div style={styles.fieldWrapper}>
            <label style={styles.label} className="none-textTransorm" htmlFor="wr0118mm">
                Weight Retained on Sieve (g)
            </label>
            <input
                style={styles.inputField}
                required
                readOnly={editBtn}
                id="wr0118mm"
                type="number"
                name="wr0118mm"
                step="0.01"
                placeholder="Enter wr31mm"
                value={wr31mm}
                onChange={(e) => {
                    setWr31mm(parseFloat(e.target.value));
                    //  setTotalWr(totalWr + parseFloat(e.target.value) );
                }}
                className="input-field-30"
            />
        </div>
    );

    const renderpassing31mm = () => (
        <div style={styles.fieldWrapper}>
            <label style={styles.label} className="none-textTransorm" htmlFor="cwr0118">
                Weight of sample retained
            </label>
            <input
                style={styles.inputField}
                readOnly={editBtn}
                required
                id="cwr0118"
                type="number"
                name="cwr0118"
                step="0.01"
                placeholder="Enter passing31mm"
                value={cwr31mm}
                onChange={(e) => {
                    setCwr31mm(parseFloat(e.target.value));
                    // setTotalWp(totalWp+parseFloat(e.target.value))
                }}
                className="input-field-30"
            />
        </div>
    );

    const renderwr25mm = () => (
        <div style={styles.fieldWrapper}>
            <label style={styles.label} className="none-textTransorm" htmlFor="wr600mic">
                Weight Retained on Sieve (g)
            </label>
            <input
                style={styles.inputField}
                required
                readOnly={editBtn}
                id="wr600mic"
                type="number"
                name="wr600mic"
                step="0.01"
                placeholder="Enter wr25mm"
                value={wr25mm}
                onChange={(e) => {
                    setWr25mm(parseFloat(e.target.value));
                    //  setTotalWr(totalWr + parseFloat(e.target.value) );
                }}
                className="input-field-30"
            />
        </div>
    );

    const renderpassing25mm = () => (
        <div style={styles.fieldWrapper}>
            <label style={styles.label} className="none-textTransorm" htmlFor="cwr600mic">
                Weight of sample retained
            </label>
            <input
                style={styles.inputField}
                readOnly={editBtn}
                required
                id="cwr600mic"
                type="number"
                name="cwr600mic"
                step="0.01"
                placeholder="Enter passing25mm"
                value={cwr25mm}
                onChange={(e) => {
                    setCwr25mm(parseFloat(e.target.value));
                    // setTotalWp(totalWp+parseFloat(e.target.value))
                }}
                className="input-field-30"
            />
        </div>
    );

    const renderwr20mm = () => (
        <div style={styles.fieldWrapper}>
            <label style={styles.label} className="none-textTransorm" htmlFor="wr300mic">
                Weight Retained on Sieve (g)
            </label>
            <input
                style={styles.inputField}
                required
                readOnly={editBtn}
                id="wr300mic"
                type="number"
                name="wr300mic"
                step="0.01"
                placeholder="Enter wr20mm"
                value={wr20mm}
                onChange={(e) => {
                    setWr20mm(parseFloat(e.target.value));
                    //  setTotalWr(totalWr + parseFloat(e.target.value) );
                }}
                className="input-field-30"
            />
        </div>
    );

    const renderpassing20mm = () => (
        <div style={styles.fieldWrapper}>
            <label style={styles.label} className="none-textTransorm" htmlFor="cwr300mic">
                Weight of sample retained
            </label>
            <input
                style={styles.inputField}
                readOnly={editBtn}
                required
                id="cwr300mic"
                type="number"
                name="cwr300mic"
                step="0.01"
                placeholder="Enter passing20mm"
                value={cwr20mm}
                onChange={(e) => {
                    setCwr20mm(parseFloat(e.target.value));
                    // setTotalWp(totalWp+parseFloat(e.target.value))
                }}
                className="input-field-30"
            />
        </div>
    );

    const renderwr16mm = () => (
        <div style={styles.fieldWrapper}>
            <label style={styles.label} className="none-textTransorm" htmlFor="wr150mic">
                Weight Retained on Sieve (g)
            </label>
            <input
                style={styles.inputField}
                required
                readOnly={editBtn}
                id="wr150mic"
                type="number"
                name="wr150mic"
                step="0.01"
                placeholder="Enter wr16mm"
                value={wr16mm}
                onChange={(e) => {
                    setWr16mm(parseFloat(e.target.value));
                    //  setTotalWr(totalWr + parseFloat(e.target.value) );
                }}
                className="input-field-30"
            />
        </div>
    );

    const renderpassing16mm = () => (
        <div style={styles.fieldWrapper}>
            <label style={styles.label} className="none-textTransorm" htmlFor="cwr150mic">
                Weight of sample retained
            </label>
            <input
                style={styles.inputField}
                readOnly={editBtn}
                required
                id="cwr150mic"
                type="number"
                name="cwr150mic"
                step="0.01"
                placeholder="Enter passing16mm"
                value={cwr16mm}
                onChange={(e) => {
                    setCwr16mm(parseFloat(e.target.value));
                    // setTotalWp(totalWp+parseFloat(e.target.value))
                }}
                className="input-field-30"
            />
        </div>
    );

    const renderwr12mm = () => (
        <div style={styles.fieldWrapper}>
            <label style={styles.label} className="none-textTransorm" htmlFor="wr150mic">
                Weight Retained on Sieve (g)
            </label>
            <input
                style={styles.inputField}
                required
                readOnly={editBtn}
                id="wr150mic"
                type="number"
                name="wr150mic"
                step="0.01"
                placeholder="Enter wr12mm"
                value={wr12mm}
                onChange={(e) => {
                    setWr12mm(parseFloat(e.target.value));
                    //  setTotalWr(totalWr + parseFloat(e.target.value) );
                }}
                className="input-field-30"
            />
        </div>
    );

    const renderpassing12mm = () => (
        <div style={styles.fieldWrapper}>
            <label style={styles.label} className="none-textTransorm" htmlFor="cwr150mic">
                Weight of sample retained
            </label>
            <input
                style={styles.inputField}
                readOnly={editBtn}
                required
                id="cwr150mic"
                type="number"
                name="cwr150mic"
                step="0.01"
                placeholder="Enter passing12mm"
                value={cwr12mm}
                onChange={(e) => {
                    setCwr12mm(parseFloat(e.target.value));
                    // setTotalWp(totalWp+parseFloat(e.target.value))
                }}
                className="input-field-30"
            />
        </div>
    );

    const renderwr10mm = () => (
        <div style={styles.fieldWrapper}>
            <label style={styles.label} className="none-textTransorm" htmlFor="wr150mic">
                Weight Retained on Sieve (g)
            </label>
            <input
                style={styles.inputField}
                required
                readOnly={editBtn}
                id="wr150mic"
                type="number"
                name="wr150mic"
                step="0.01"
                placeholder="Enter wr10mm"
                value={wr10mm}
                onChange={(e) => {
                    setWr10mm(parseFloat(e.target.value));
                    //  setTotalWr(totalWr + parseFloat(e.target.value) );
                }}
                className="input-field-30"
            />
        </div>
    );

    const renderpassing10mm = () => (
        <div style={styles.fieldWrapper}>
            <label style={styles.label} className="none-textTransorm" htmlFor="cwr150mic">
                Weight of sample retained
            </label>
            <input
                style={styles.inputField}
                readOnly={editBtn}
                required
                id="cwr150mic"
                type="number"
                name="cwr150mic"
                step="0.01"
                placeholder="Enter passing10mm"
                value={cwr10mm}
                onChange={(e) => {
                    setCwr10mm(parseFloat(e.target.value));
                    // setTotalWp(totalWp+parseFloat(e.target.value))
                }}
                className="input-field-30"
            />
        </div>
    );

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

    return (
        <form onSubmit={handleSubmit} className="your-css-class" style={{
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
        }}>


            <h3 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>Elongation Test</h3>


            <div>
                <p className="fields-title" style={{
                    fontWeight: 'bold',
                    marginBottom: '5px',
                    textAlign: 'center',
                }}>
                    IS sieve Designation: (63-50mm)
                </p>
                <div className="two-fields-container" style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '600px', margin: '0 auto', marginBottom: '20px' }}>
                    {renderwr60mm()}
                    {renderpassing60mm()}
                </div>
            </div>

            <div>
                <p className="fields-title" style={{
                    fontWeight: 'bold',
                    marginBottom: '5px',
                    textAlign: 'center',
                }}>IS sieve Designation : (50-40mm)</p>
                <div className="two-fields-container" style={styles.container}>
                    {renderwr50mm()}
                    {renderpassing50mm()}
                </div>
            </div>

            <div>
                <p className="fields-title" style={{
                    fontWeight: 'bold',
                    marginBottom: '5px',
                    textAlign: 'center',
                }}>IS sieve Designation : (40-31.5mm)</p>
                <div className="two-fields-container" style={styles.container}>
                    {renderwr40mm()}
                    {renderpassing40mm()}
                </div>
            </div>

            <div>
                <p className="fields-title" style={{
                    fontWeight: 'bold',
                    marginBottom: '5px',
                    textAlign: 'center',
                }}>IS sieve Designation : (31.5-25mm)</p>
                <div className="two-fields-container" style={styles.container}>
                    {renderwr31mm()}
                    {renderpassing31mm()}
                </div>
            </div>

            <div>
                <p className="fields-title" style={{
                    fontWeight: 'bold',
                    marginBottom: '5px',
                    textAlign: 'center',
                }}>IS sieve Designation : (25-20mm)</p>
                <div className="two-fields-container" style={styles.container}>
                    {renderwr25mm()}
                    {renderpassing25mm()}
                </div>
            </div>

            <div>
                <p className="fields-title" style={{
                    fontWeight: 'bold',
                    marginBottom: '5px',
                    textAlign: 'center',
                }}>IS sieve Designation : (20-16mm)</p>
                <div className="two-fields-container" style={styles.container}>
                    {renderwr20mm()}
                    {renderpassing20mm()}
                </div>
            </div>

            <div>
                <p className="fields-title" style={{
                    fontWeight: 'bold',
                    marginBottom: '5px',
                    textAlign: 'center',
                }}>IS sieve Designation : (16-12.5mm)</p>
                <div className="two-fields-container" style={styles.container}>
                    {renderwr16mm()}
                    {renderpassing16mm()}
                </div>
            </div>

            <div>
                <p className="fields-title" style={{
                    fontWeight: 'bold',
                    marginBottom: '5px',
                    textAlign: 'center',
                }}>IS sieve Designation : (12.5-10mm)</p>
                <div className="two-fields-container" style={styles.container}>
                    {renderwr12mm()}
                    {renderpassing12mm()}
                </div>
            </div>

            <div>
                <p className="fields-title" style={{
                    fontWeight: 'bold',
                    marginBottom: '5px',
                    textAlign: 'center',
                }}>IS sieve Designation : (10-6.3mm)</p>
                <div className="two-fields-container" style={styles.container}>
                    {renderwr10mm()}
                    {renderpassing10mm()}
                </div>
            </div>

            <div className="calculations-section">
                <p>
                    Elongation % : ( Wt of sample retained / Total wt retained ) * 100{" "}
                </p>
                <p>
                    Elongation % : ({" "}
                    {cwr60mm +
                        cwr50mm +
                        cwr40mm +
                        cwr31mm +
                        cwr25mm +
                        cwr20mm +
                        cwr16mm +
                        cwr12mm +
                        cwr10mm}{" "}
                    /{" "}
                    {wr60mm +
                        wr50mm +
                        wr40mm +
                        wr31mm +
                        wr25mm +
                        wr20mm +
                        wr16mm +
                        wr12mm +
                        wr10mm}{" "}
                    ) * 100{" "}
                </p>
                Elongation % :{" "}
                {(
                    ((cwr60mm +
                        cwr50mm +
                        cwr40mm +
                        cwr31mm +
                        cwr25mm +
                        cwr20mm +
                        cwr16mm +
                        cwr12mm +
                        cwr10mm) /
                        (wr60mm +
                            wr50mm +
                            wr40mm +
                            wr31mm +
                            wr25mm +
                            wr20mm +
                            wr16mm +
                            wr12mm +
                            wr10mm)) *
                    100
                ).toFixed(2)}
            </div>

            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {!editBtn && <button type="submit" style={{ ...buttonStyle, marginRight: 20 }}>
                    {editBtn ? "Update" : "Submit"}
                </button>}

                {editBtn && (
                    <>
                        <button type="button" onClick={toggleReviewBtn} style={{ ...buttonStyle, backgroundColor: '#2b3142', marginRight: 20 }}>
                            Edit
                        </button>
                        <button type="button" onClick={rejectFunction} style={{ ...buttonStyle, backgroundColor: '#2b3142', marginRight: 20 }}>
                            Reject
                        </button>
                    </>
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

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: '600px',
        margin: '0 auto',
        marginBottom: '20px',
    },
    title: {
        fontWeight: 'bold',
        marginBottom: '5px',
        textAlign: 'center',
    },
    fieldWrapper: {
        marginBottom: '15px',
        width: '48%',
    },
    label: {
        marginRight: '7px',
        fontWeight: 'bold',
    },
    inputField: {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '16px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    }, formBox: {
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

};


export default Elongation;
