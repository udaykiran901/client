import React, { useEffect } from "react";
import "./App.css";
import {
  publicRoutes,
  HRandAdminRoutes,
  BDRoutes,
  LaboratoryRoutes,
  analystRoutes,
  commonRoutes,
} from "./Routes/allRoutes";
import { Route, Routes } from "react-router-dom";
import VerticalLayout from "./Layouts/VerticalLayout";
import HorizontalLayout from "./Layouts/HorizontalLayout/index";
import "./assets/scss/theme.scss";
import NonAuthLayout from "./Layouts/NonLayout";
import AnalystRoutes from "Routes/AnalystRoutes";

import { KDM_ANALYST_TOKEN, KDM_ADMIN_TOKEN } from "common/tokens";

//constants
import { LAYOUT_TYPES } from "./Components/constants/layout";

import { useDispatch } from "react-redux";

import HRroutes from "../src/Routes/HRroutes";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import {
  CurrentUser,
  restoreCurrentUserInfo,
} from "slices/CurrentUser/reducer";

import ProtectedBDroutes from "Routes/ProtectedBDroutes";
import { RootState } from "slices";

const getLayout = (layoutType: any) => {
  let Layout = VerticalLayout;
  switch (layoutType) {
    case LAYOUT_TYPES.VERTICAL:
      Layout = VerticalLayout;
      break;
    case LAYOUT_TYPES.HORIZONTAL:
      Layout = HorizontalLayout;
      break;
    default:
      break;
  }
  return Layout;
};

function App() {
  const selectLeadData = createSelector(
    (state: any) => state.Layout,
    (layout) => ({
      layoutTypes: layout.layoutTypes,
    })
  );

  const currentUserSelector = createSelector(
    (state: RootState) => state.CurrentUserSlice,
    (currentUser: CurrentUser) => currentUser.employee
  );

  const currentUser = useSelector((state: RootState) =>
    currentUserSelector(state)
  );

  const { layoutTypes } = useSelector(selectLeadData);

  const Layout = getLayout(layoutTypes);

  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(restoreCurrentUserInfo());
  }, [dispatch]);

  const { access_key } = currentUser;

  const renderRoutes = () => {
    switch (access_key) {
      case KDM_ADMIN_TOKEN:
        return (
          <React.Fragment>
            {HRandAdminRoutes.map((route, idx) => (
              <Route
                path={route.path}
                key={idx}
                element={
                  <React.Fragment>
                    <HRroutes>
                      <Layout>{route.component}</Layout>
                    </HRroutes>
                  </React.Fragment>
                }
              />
            ))}

            {BDRoutes.map((route, idx) => (
              <Route
                path={route.path}
                key={idx}
                element={
                  <React.Fragment>
                    <ProtectedBDroutes>
                      <Layout>{route.component}</Layout>
                    </ProtectedBDroutes>
                  </React.Fragment>
                }
              />
            ))}

            {LaboratoryRoutes.map((route, idx) => (
              <Route
                path={route.path}
                key={idx}
                element={
                  <React.Fragment>
                    <HRroutes>
                      <Layout>{route.component}</Layout>
                    </HRroutes>
                  </React.Fragment>
                }
              />
            ))}
          </React.Fragment>
        );
      case KDM_ANALYST_TOKEN:
        return (
          <React.Fragment>
            {analystRoutes.map((route, idx) => (
              <Route
                path={route.path}
                key={idx}
                element={
                  <React.Fragment>
                    <HRroutes>
                      <Layout>{route.component}</Layout>
                    </HRroutes>
                  </React.Fragment>
                }
              />
            ))}
          </React.Fragment>
        );

      default:
        return (
          <React.Fragment>
            {commonRoutes.map((route, idx) => (
              <Route
                path={route.path}
                key={idx}
                element={
                  <React.Fragment>
                    <HRroutes>
                      <Layout>{route.component}</Layout>
                    </HRroutes>
                  </React.Fragment>
                }
              />
            ))}
          </React.Fragment>
        );
    }
  };

  return (
    <React.Fragment>
      <Routes>
        {renderRoutes()}
        {publicRoutes.map((route, idx) => (
          <Route
            path={route.path}
            key={idx}
            element={<NonAuthLayout>{route.component}</NonAuthLayout>}
          />
        ))}
      </Routes>
    </React.Fragment>
  );
}

export default App;
