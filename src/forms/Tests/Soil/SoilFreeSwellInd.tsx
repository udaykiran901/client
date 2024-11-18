import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AppDispatch } from "index";
import { submitTestDetails, getSingleJob, rejectTestDetails } from "slices/thunk"; // Adjusted to match your current action imports
import { createSelector } from "reselect";

const SoilFreeSwellInd: React.FC = () => {
    const [vm, setVm] = useState<number>(0);
    const [vk, setVk] = useState<number>(0);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { jobId } = useParams();
    const { pathname } = useLocation();
    const review = pathname.includes("review");
    const roundTo3Dec = (d: number) => d.toFixed(2);
    const [editBtn, setEditBtn] = useState<boolean>(false);
    console.log(editBtn, 'dddddd')


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
                            vm, vk
                        } = benchRec[0];

                        setVk(vk);
                        setVm(vm);

                        setEditBtn(true);
                    } catch (err) {
                        console.log(err);
                    }
                };
                getRes();
            }
        }
    }, [singleJob, review]);

    const handleOnSubmittingTest = async (event: React.FormEvent) => {
        event.preventDefault();
        const resultObj = { vm, vk };
        const freeSwellIndex = roundTo3Dec(((vm - vk) * 100) / vk);

        const updatedBenchRecord = [{ vm, vk }];
        const updatedReportValues = [{ FreeSwellIndex: freeSwellIndex }];
        const data = { updatedBenchRecord, updatedReportValues, jobId };

        try {
            await dispatch(submitTestDetails(data));
            navigate(-1);
        } catch (error) {
            console.error("Error submitting test details:", error);
        }
    };

    const toggleReviewBtn = () => setEditBtn(!editBtn);

    const rejectFunction = async () => {
        try {
            await dispatch(rejectTestDetails({ jobId }));
            navigate(-1);
        } catch (error) {
            console.error("Error rejecting test details:", error);
        }
    };

    const renderInput = (label: string, id: string, value: number, setValue: (val: number) => void) => (
        <div className="form-field">
            <label htmlFor={id}>{label}</label>
            <input
                required
                id={id}
                type="number"
                step="0.01"
                value={value}
                onChange={(e) => setValue(parseFloat(e.target.value))}
                readOnly={editBtn}
                placeholder={`Enter ${label}`}
                className="input-field"
            />
        </div>
    );

    return (
        <form onSubmit={handleOnSubmittingTest} className="form-container">
            <h3 className="form-title">Soil Free Swell Index Calculation</h3>
            {renderInput("Volume of Soil Specimen in Water (Vm)", "vm", vm, setVm)}
            {renderInput("Volume of Soil Specimen in Kerosene (Vk)", "vk", vk, setVk)}

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

            <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
                <p>Free Swell Index (%) = ((Vm - Vk) * 100) / Vk</p>
                <p>Free Swell Index (%) = (({vm} - {vk}) * 100) / {vk} = {((vm - vk) * 100 / vk).toFixed(2)}%</p>
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

export default SoilFreeSwellInd;