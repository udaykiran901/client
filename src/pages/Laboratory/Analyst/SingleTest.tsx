import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams, useNavigate, Link } from "react-router-dom";

import React from "react";
import { Container, Row, Col, Input, Form } from "reactstrap";
import { ToastContainer } from "react-toastify";
import { createSelector } from "reselect";

import AshContent from "forms/Tests/Admixture/AshContet";
import DryMaterialContent from "forms/Tests/Admixture/DryMaterialContent";
import ChlorideIonContent from "forms/Tests/Admixture/ChlorideIonContent";
import Ph from "forms/Tests/Admixture/Ph";
import RelativeDensity from "forms/Tests/Admixture/RelativeDensity";
import DeterminationOfAlumina from "forms/Tests/Cement-opc-43/DeterminationOfAlumina";
import DeterminationOfCaoAndMgo from "forms/Tests/Cement-opc-43/DeterminationOfCaoAndMgo";
import DeterminationOfChloride from "forms/Tests/Cement-opc-43/DeterminationOfChlorides";
import DeterminationOfFerricOxide from "forms/Tests/Cement-opc-43/DeterminationOfFerricOxide";
import DeterminationOfInsolubleResidue from "forms/Tests/Cement-opc-43/DeterminationOfInsolubleResidue";
import DeterminationOfSilica from "forms/Tests/Cement-opc-43/DeterminationOfSilica";
import DeterminationOfSodiumAndPotassium from "forms/Tests/Cement-opc-43/DeterminationOfSodiumAndPotassium";
import DeterminationOfSulphuricAhydride from "forms/Tests/Cement-opc-43/DeterminationOfSulphuricAnhydride";
import LossOnIgnition from "forms/Tests/Cement-opc-43/LossOnIgnition";
import DeterminationOfLsf from "forms/Tests/Cement-opc-43/Lsf";
import AluminatoIronOxide from "forms/Tests/Cement-opc-43/RatioOfAluminaToIronOxide";
import BitAboluteViscosity from "forms/Tests/Bitumen/BitAboluteViscosity";
import BitBinderContent from "forms/Tests/Bitumen/BitBinderContent";
import BitDuctility from "forms/Tests/Bitumen/BitDuctility";
import BitElasticRecovery from "forms/Tests/Bitumen/BitElasticRecovery";
import BitFlashPoint from "forms/Tests/Bitumen/BitFlashPoint";
import BitKinematicViscosity from "forms/Tests/Bitumen/BitKinematicViscosity";
import BitPenitration from "forms/Tests/Bitumen/BitPenitration";
import BitSofeningPoint from "forms/Tests/Bitumen/BitSofeningPoint";
import BitSpecificGravity from "forms/Tests/Bitumen/BitSpecificGravity";
import DeterminationOfCaoAndMgoFa from "forms/Tests/FlyAsh/DeterminationOfCaoMgoFa";
import DeterminationOfCombinedOxides from "forms/Tests/FlyAsh/DeterminationOfCombinedOxides";
import DeterminationOfSilicaFa from "forms/Tests/FlyAsh/DeterminationOfSilica";
import DeterminationOfSulphuricAhydrideFa from "forms/Tests/FlyAsh/DeterminationOfSulphuricAnhydride";
import LossOnIgnitionFa from "forms/Tests/FlyAsh/LossOnIgnition";
import ResidueTest from "forms/Tests/FlyAsh/FlyAshMechanical";
import CoalAshContent from "forms/Tests/Coal/CoalAshContent";
import CoalFC from "forms/Tests/Coal/CoalFC";
import CoalGCV from "forms/Tests/Coal/CoalGCV";
import CoalMoistureContent from "forms/Tests/Coal/CoalMoistureContent";
import CoalSulphur from "forms/Tests/Coal/CoalSulphur";
import CoalVMC from "forms/Tests/Coal/CoalVMC";
import TetraCalcium from "forms/Tests/Cement (SRC)/TetraCalcium";
import Tricalcium from "forms/Tests/Cement (SRC)/TricalciumAluminate";



import { getSingleJob } from "slices/thunk";
import Spinners from "Components/Common/Spinner";

import { RootState } from "slices";
import { LabInitialState } from "slices/Lab/reducer";

const SingleTest = () => {
  document.title = "Laboratory | KDM Engineers Group";
  const dispatch = useDispatch<any>();

  const { jobId, testId } = useParams();

  const navigate = useNavigate();

  const [key, setKey] = useState<string>("");


  console.log(testId, jobId, 'ids');

  const selectPropertiesLAB = createSelector(
    (state: RootState) => state.lab,
    (lab: LabInitialState) => ({
      loadingLab: lab.loading,
      singleJob: lab.singleJob
    })
  );

  const { loadingLab, singleJob } = useSelector(selectPropertiesLAB);
  console.log(singleJob, 'singleJob')


  useEffect(() => {
    dispatch(getSingleJob(jobId))
  }, [dispatch, jobId])




  return (
    <React.Fragment>
      <div className="page-content" style={{ width: 1200 }}>
        <Container fluid>

          {/* <Link to={`/analyst/my-jobs/${jobId}`}> */}
          {/* <Link to='/analyst/my-jobs'>
            <button
              style={{
                backgroundColor: '#2b3142',
                color: 'white',
                padding: '8px 12px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'background-color 0.3s, transform 0.2s',
                fontWeight: '600', fontSize: 10
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2b3142'}
            >
              Go to Jobs List
            </button></Link> */}
          <div style={{ width: 1200 }}>

            {/* {Admixture} */}
            {testId === '20240705104200663' && <AshContent />}
            {testId === '20240705104251720' && <DryMaterialContent />}
            {testId === '20240705104543446' && <ChlorideIonContent />}
            {testId === '20240705104613800' && <Ph />}
            {testId === '20240926174128355' && <RelativeDensity />}

            {/* {Cement - OPC 43} */}
            {testId === '20240725181206384' && <DeterminationOfAlumina />}
            {testId === '20240725181303262' && <DeterminationOfCaoAndMgo />}
            {testId === '20240927145015256' && <DeterminationOfChloride />}
            {testId === '20240725181029841' && <DeterminationOfFerricOxide />}
            {testId === '20240927144911788' && <DeterminationOfInsolubleResidue />}
            {testId === '20240725180909229' && <DeterminationOfSilica />}
            {testId === '20240927145111855' && <DeterminationOfSodiumAndPotassium />}
            {testId === '20240927150321797' && <DeterminationOfSulphuricAhydride />}
            {testId === '20240725180823607' && <LossOnIgnition />}
            {testId === '20240927145206953' && <DeterminationOfLsf />}
            {testId === '20240927145320397' && <AluminatoIronOxide />}

            {/* {Cement (SRC)} */}
            {testId === '20241009180129632' && <TetraCalcium />}
            {testId === '20241009180404157' && <Tricalcium />}
            {testId === '20240725181730842' && <LossOnIgnition />}
            {testId === '20240725181849355' && <DeterminationOfSilica />}
            {testId === '20241009175800091' && <DeterminationOfFerricOxide />}
            {testId === '20241009175835726' && <DeterminationOfAlumina />}
            {testId === '20241009175913100' && <DeterminationOfCaoAndMgo />}
            {testId === '20241009175954084' && <DeterminationOfInsolubleResidue />}
            {testId === '20241009180035681' && <DeterminationOfLsf />}
            {testId === '20241009180327851' && <DeterminationOfSulphuricAhydride />}

            {/* {Cement (PPC)} */}
            {testId === '20240725181604958' && <LossOnIgnition />}
            {testId === '20240725181634477' && <DeterminationOfCaoAndMgo />}
            {testId === '20241014181708441' && <DeterminationOfInsolubleResidue />}
            {testId === '20241014181746026' && <DeterminationOfSulphuricAhydride />}

            {/* {Bitumen} */}
            {testId === '20240705121419004' && <BitAboluteViscosity />}
            {testId === '20240705121449950' && <BitBinderContent />}
            {testId === '20240705121352355' && <BitDuctility />}
            {testId === '20240927180644017' && <BitElasticRecovery />}
            {testId === '20240705121119137' && <BitFlashPoint />}
            {testId === '20240927175918335' && <BitKinematicViscosity />}
            {testId === '20240705121256565' && <BitPenitration />}
            {testId === '20240705121215831' && <BitSofeningPoint />}
            {testId === '20240705121039161' && <BitSpecificGravity />}

            {/* {Fly Ash} */}
            {testId === '20240603160650454' && <DeterminationOfCaoAndMgoFa />}
            {testId === '20240603160511216' && <DeterminationOfCombinedOxides />}
            {testId === '20240603160601341' && <DeterminationOfSilicaFa />}
            {testId === '20240603160712286' && <DeterminationOfSulphuricAhydrideFa />}
            {testId === '20240603160741580' && <LossOnIgnitionFa />}
            {testId === '20240702123154678' && <ResidueTest />}

            {/* {Coal} */}
            {testId === '20241009151447667' && <CoalAshContent />}
            {testId === '20241009152248881' && <CoalFC />}
            {testId === '20240603105330874' && <CoalGCV />}
            {testId === '20241009151204921' && <CoalMoistureContent />}
            {testId === '20241009152338931' && <CoalSulphur />}
            {testId === '20241009151400519' && <CoalVMC />}



          </div>


          <ToastContainer />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default SingleTest;
