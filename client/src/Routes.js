import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { LogInPage } from './pages/LogInPage';
import { SignUpPage } from './pages/SignUpPage';
import { NoMatch } from './pages/NoMatch';
import { CreateTicket } from './pages/CreateTicket';
import { PrivateRoute } from './auth/PrivateRoute';


export const Routes = () => {
    return (
        <Router> 
            <Switch>
                 
                <PrivateRoute path="/" exact>
                    <Dashboard />
                </PrivateRoute>

                <PrivateRoute path="/ticket" exact>
                    <CreateTicket />
                </PrivateRoute>
                
                <Route path='/login'>
                    <LogInPage />
                </Route>
                <Route path='/signup'>
                    <SignUpPage />
                </Route>
                <Route component={NoMatch} />
            </Switch>
        </Router>
    );
}