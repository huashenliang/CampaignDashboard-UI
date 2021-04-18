import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import CampaignList from "./Views/CampaignList";
import DashboardLayout from "./Views/Dashboard/";
import { CContainer, CFade } from '@coreui/react';
import './Scss/style.scss';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={CampaignList} />
        <Route exact path="/dashboard" component={DashboardLayout} />
        <Route exact path="/dashboard/:id" component={DashboardLayout} />
      </Switch>
    </BrowserRouter>

  );
}

export default App;
