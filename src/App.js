
import './App.css';
import './styles.css'

import 'bootstrap/dist/css/bootstrap.min.css';

import Homepage from './components/homepage';
import Footer from './components/footer'
import Header from './components/header';
import Movies from './components/movies'

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
            <Route path="/movies" exact>
                <Header logoClass="logoSmall" / >
                <Movies/>
            </Route>
            <Footer / >
        </div>

        </Switch>
        </Router>
    );

}

export default App;