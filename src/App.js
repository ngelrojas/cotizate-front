import React, { Component } from 'react';
import './pages/css/app.css';
import HeaderContent from './header/HeaderContent';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import ExplorerProject from './pages/explore_projects/explorer_projects';
import CreateProject from './pages/create_projects/create_projects';
import CreateProjectStepOne from './pages/create_projects/components/create_form/step_one';
import CreateProjectStepTwo from './pages/create_projects/components/create_form/step_two';
import CreateProjectStepThree from './pages/create_projects/components/create_form/step_three';
import PreviewProject from './pages/create_projects/components/preview/preview_project';
import DescriptionProject from './pages/create_projects/components/preview/preview_project';
import HomePage from './pages/home/HomePage';
import TermsPage from './pages/terms/TermsComponent';
import ActivationRegister from './pages/activation/activation_register'
import ProfileUser from './pages/profile/profile.js'
import RecoveryPassword from './pages/recoverypwd/recovery-pwd.js'


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container-fluid-main">
          
            <HeaderContent />
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route path='/explore-project' component={ExplorerProject} />
              <Route path='/create-project' component={CreateProject} />
              <Route path='/project/step-one' component={CreateProjectStepOne} />
              <Route path='/project/step-two' component={CreateProjectStepTwo} />
              <Route path='/project/step-three' component={CreateProjectStepThree} />
              <Route path='/project/preview' component={PreviewProject} />
              <Route path='/description' component={DescriptionProject} />
              <Route path='/terms-and-contiditions' component={TermsPage} />
              <Route path='/activation-account/:uuid/:token' component={ActivationRegister} />
              <Route path='/recovery-password/:uuid/:token' component={RecoveryPassword} />
              <Route path='/profile/me' component={ProfileUser} />
            </Switch>
          
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
