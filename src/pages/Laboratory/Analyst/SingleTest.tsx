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
import SulphurSulphide from "forms/Tests/Cement (PSC)/SulphurSulphide";
import MnO from "forms/Tests/GGBS/MnO";
import DeterminationOfNoName1 from "forms/Tests/GGBS/NoName1";
import DeterminationOfNoName2 from "forms/Tests/GGBS/NoName2";
import LossOnIgnitionMs from "forms/Tests/MicroSilica/LossOnIgnitionMs";
import MoistureContent from "forms/Tests/MicroSilica/MoistureContent";
import SiliconDioxide from "forms/Tests/MicroSilica/SiliconDioxide";
import CombinedWater from "forms/Tests/Gypsum/CombinedWater";
import FreeWater from "forms/Tests/Gypsum/FreeWater";
import DeterminationOfCao from "forms/Tests/Gypsum/MajorOxides";
import DeterminationOfMgo from "forms/Tests/Limestone/Mgo";
import CWPh from "forms/Tests/ConstructionWater/CWPh";
import CWInOrganicSolids from "forms/Tests/ConstructionWater/CWInorganicSolids";
import CWChlorides from "forms/Tests/ConstructionWater/CWChlorides";
import CWH2SO4 from "forms/Tests/ConstructionWater/CWH2SO4";
import CWSulphate from "forms/Tests/ConstructionWater/CWSulphate";
import CWOrganicSolids from "forms/Tests/ConstructionWater/CWOrganicSolids";
import CWNaOH from "forms/Tests/ConstructionWater/CWNaOH";
import CWSS_VS from "forms/Tests/ConstructionWater/CWSS_VS";
import DWSulphate from "forms/Tests/DrinkingWater/DWSulphate";
import DWCalcium from "forms/Tests/DrinkingWater/DWCalcium";
import DWChlorides from "forms/Tests/DrinkingWater/DWChlorides";
import DWTotalDissolvedSolids from "forms/Tests/DrinkingWater/DWTotalDissolvedSolids";
import DWPh from "forms/Tests/DrinkingWater/DWPh";
import DWHardness from "forms/Tests/DrinkingWater/DWHardness";
import DWMagnesium from "forms/Tests/DrinkingWater/DWMagnesium";
import DWTotalAlkalinity from "forms/Tests/DrinkingWater/DWTotalAlkalinity";
import SulphuricAnHydride from "forms/Tests/CoarseAggregates/SulphuricAnHydride";
import CAGGReductionAlkalinity from "forms/Tests/CoarseAggregates/CAGGReductionAlkalinity";
import DeterminationOfDissolvedSilica from "forms/Tests/CoarseAggregates/DeterminationOfDissolvedSilica";
import CAggChlorides from "forms/Tests/CoarseAggregates/CAggChlorides";
import Elongation from "forms/Tests/CoarseAggregates/Elongation";
import ImpactValue from "forms/Tests/CoarseAggregates/ImpactValue";
import SpecificGravity from "forms/Tests/CoarseAggregates/SpecificGravity";
import FABulkDensity from "forms/Tests/CoarseAggregates/BulkDensity";
import CASieveAnalysis from "forms/Tests/CoarseAggregates/SieveAnalysis";
import Flakiness from "forms/Tests/CoarseAggregates/Flakiness";
import WaterAbsorption from "forms/Tests/CoarseAggregates/WaterAbsorption";
import CrushingValue from "forms/Tests/CoarseAggregates/CrushingValue";
import FAsoundness from "forms/Tests/CoarseAggregates/FAsoundness";
import FAMaterialsFinerThan75mic from "forms/Tests/Fine Aggregates/FAMaterialsFinerThan75mic";
import SoilDirectSherTest from "forms/Tests/Soil/SoilDirectSherTest";


import { getSingleJob } from "slices/thunk";
import Spinners from "Components/Common/Spinner";

import { RootState } from "slices";
import { LabInitialState } from "slices/Lab/reducer";
import TenPercent from "forms/Tests/CoarseAggregates/TenPercentFines";

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

            {/* {GGBS} */}
            {testId === '20241017153345369' && < MnO />}
            {testId === '20241017153410099' && <DeterminationOfNoName1 />}
            {testId === '20241017153452301' && <DeterminationOfNoName2 />}
            {testId === '20241017163745024' && <DeterminationOfSilica />}
            {testId === '20241017152511925' && <DeterminationOfFerricOxide />}
            {testId === '20241017152629895' && <DeterminationOfAlumina />}
            {testId === '20241017152702360' && <DeterminationOfCaoAndMgo />}
            {testId === '20241017152855360' && <DeterminationOfInsolubleResidue />}
            {testId === '20241017152930628' && <SulphurSulphide />}

            {/* {Gypsum} */}
            {testId === '20241017180248284' && <DeterminationOfSulphuricAhydride />}
            {testId === '20241017180539523' && <CombinedWater />}
            {testId === '20241017180508199' && <FreeWater />}
            {testId === '20241017180436602' && <LossOnIgnition />}
            {testId === '20241017180607951' && <DeterminationOfCao />}

            {/* {Limestone} */}
            {testId === '20240603163359530' && <LossOnIgnition />}
            {testId === '20240603164124850' && <DeterminationOfMgo />}
            {testId === '20240603164538716' && <DeterminationOfSilicaFa />}
            {testId === '20240603163333486' && <DeterminationOfCao />}
            {testId === '20240603163101240' && <DeterminationOfAlumina />}
            {testId === '20241018111812991' && <DeterminationOfFerricOxide />}

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

            {/* {Cement - OPC 53} */}
            {testId === '20241017125328910' && <AluminatoIronOxide />}
            {testId === '20241017123947963' && <LossOnIgnition />}
            {testId === '20241017124113262' && <DeterminationOfSilica />}
            {testId === '20241017124204974' && <DeterminationOfFerricOxide />}
            {testId === '20241017124328505' && <DeterminationOfAlumina />}
            {testId === '20241017124358066' && <DeterminationOfCaoAndMgo />}
            {testId === '20241017124422637' && <DeterminationOfInsolubleResidue />}
            {testId === '20241017124505253' && <DeterminationOfSulphuricAhydride />}
            {testId === '20241017124550927' && <DeterminationOfChloride />}
            {testId === '20241017124852882' && <DeterminationOfSodiumAndPotassium />}
            {testId === '20241017125020781' && <DeterminationOfLsf />}

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

            {/* {Cement (PSC)} */}
            {testId === '20241017112243076' && <SulphurSulphide />}
            {testId === '20241017111857036' && <LossOnIgnition />}
            {testId === '20241017112209542' && <DeterminationOfSilica />}
            {testId === '20241017112322914' && <DeterminationOfCaoAndMgo />}
            {testId === '20241017112414911' && <DeterminationOfSulphuricAhydride />}
            {testId === '20241017113538472' && <DeterminationOfInsolubleResidue />}

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

            {/* {Micro Silica} */}
            {testId === '20241017171203469' && <LossOnIgnitionMs />}
            {testId === '20241017171108159' && <MoistureContent />}
            {testId === '20241017171241377' && <SiliconDioxide />}

            {/* {Construction Water} */}
            {testId === '20241018155721231' && <CWPh />}
            {testId === '20241018160112589' && <CWInOrganicSolids />}
            {testId === '20241018160325886' && <CWChlorides />}
            {testId === '20241018155925692' && <CWH2SO4 />}
            {testId === '20241018160420486' && <CWSulphate />}
            {testId === '20241018160028082' && <CWOrganicSolids />}
            {testId === '20241018155833559' && <CWNaOH />}
            {testId === '20241018160202556' && <CWSS_VS />}

            {/* {Drinking Water} */}
            {testId === '20241018161303536' && <DWSulphate />}
            {testId === '20241018160948257' && <DWCalcium />}
            {testId === '20241018161219085' && <DWChlorides />}
            {testId === '20241018160731637' && <DWTotalDissolvedSolids />}
            {testId === '20241018160638603' && <DWPh />}
            {testId === '20241018160916131' && <DWHardness />}
            {testId === '20241018161102975' && <DWMagnesium />}
            {testId === '20241018161137225' && <DWTotalAlkalinity />}

            {/* {Coarse Aggregate} */} {/* {CHEMICAL} */}
            {testId === "20240603152632189" && <SulphuricAnHydride />}
            {testId === '20240603152558837' && <CAGGReductionAlkalinity />}
            {testId === '20240603152719784' && <DeterminationOfDissolvedSilica />}
            {testId === '20241021144524426' && <CAggChlorides />}
            {/* {PHYSICAL} */}
            {testId === '20240603114056308' && <Elongation />}
            {testId === '20240603113357288' && <ImpactValue />}
            {testId === '20240603110746458' && <SpecificGravity />}
            {testId === '20241025150540629' && <FABulkDensity />}
            {testId === '20240603110650703' && <CASieveAnalysis />}
            {testId === '20240603114310620' && <TenPercent />}
            {testId === '20240603110925231' && <Flakiness />}
            {testId === '20240603113240675' && <WaterAbsorption />}
            {testId === '20240603113616648' && <CrushingValue />}
            {testId === '20240603114000964' && <FAsoundness />}

            {/* {Fine Aggregate} */} {/* {PHYSICAL} */}
            {testId === '20240603154625743' && <FABulkDensity />}
            {testId === '20240603154745807' && <CASieveAnalysis />}
            {testId === '20240603154835861'}
            {testId === '20240603154907770' && <SpecificGravity />}
            {testId === '20240603154948905' && <WaterAbsorption />}
            {testId === '20240603155915967' && <FAMaterialsFinerThan75mic />}

            {/* {Soil} */}
            {testId === '20241030160212755' && <SoilDirectSherTest />}

          </div>


          <ToastContainer />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default SingleTest;