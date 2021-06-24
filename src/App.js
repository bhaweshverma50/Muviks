
import './App.css';
import './styles.css'

import 'bootstrap/dist/css/bootstrap.min.css';

import Homepage from './components/homepage';
import Footer from './components/footer'
import Header from './components/header';
import Recommend from './components/recommend'

import {
    BrowserRouter as Router,
    Switch,
    Route,

  } from "react-router-dom";

function App() {


    return (
        <Router>
        <Switch>
        <div>
            <Route path="/" exact>
                <Header logoClass="logoBig" / >
                <Homepage/>
            </Route>
            <Route path="/recommendation" exact>
                <Header logoClass="logoSmall" / >
                <Recommend/>
            </Route>
            <Footer / >
        </div>

        </Switch>
        </Router>
    );

}

export default App;