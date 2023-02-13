import {Route, Switch} from 'react-router-dom'

import './App.css'

import Jobs from './components/Jobs'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <Route component={NotFound} />
  </Switch>
)

export default App
