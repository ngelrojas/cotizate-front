import React, {Component} from 'react'
import './pages/css/app.css'
import HeaderContent from './header/HeaderContent'
import {Route, Switch, HashRouter} from 'react-router-dom'
import ExplorerProject from './pages/explore_projects/explorer_projects'
import CreateProject from './pages/create_projects/create_projects'
import CreateProjectForm from './pages/create_projects/components/create_form/create_project'
import UpdateProject from './pages/update_projects/update_projects'
import UpdateProjectForm from './pages/update_projects/components/update_form/update_project'
import PreviewProject from './pages/update_projects/components/preview/preview_project'
import DescriptionProject from './pages/description_project/components/preview/preview_project'
import HomePage from './pages/home/HomePage'
import TermsPage from './pages/terms/TermsComponent'
import ActivationRegister from './pages/activation/activation_register'
import ProfileUser from './pages/profile/profile.js'
import RecoveryPassword from './pages/recoverypwd/recovery-pwd.js'

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="container-fluid-main">
          <HeaderContent />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/explore-project" component={ExplorerProject} />
            <Route exact path="/create-project" component={CreateProject} />
            <Route
              exact
              path="/project/create-project"
              component={CreateProjectForm}
            />
            <Route
              exact
              path="/project/update-projects"
              component={UpdateProject}
            />
            <Route
              exact
              path="/project/update/:campaingId"
              component={UpdateProjectForm}
            />
            <Route
              exact
              path="/project/preview/:campaingId"
              component={PreviewProject}
            />

            <Route
              exact
              path="/proyecto/:slug"
              component={DescriptionProject}
            />

            <Route exact path="/terms-and-contiditions" component={TermsPage} />
            <Route
              exact
              path="/activation-account/:uuid/:token"
              component={ActivationRegister}
            />
            <Route
              exact
              path="/recovery-password/:uuid/:token"
              component={RecoveryPassword}
            />
            <Route exact path="/profile/me" component={ProfileUser} />
          </Switch>
        </div>
      </HashRouter>
    )
  }
}

export default App
