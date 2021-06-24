import React from 'react'
import { Link } from 'react-router-dom'
// import Header from './header'


export default function Homepage() {


    return (
            <div className="container">
            <div className="heroTXT">
                <p className="heroHeader">
                     Welcome to MUVIKS! The all in one music and movie recommender.
                </p>
                <p className="heroDecription">
                    Click on the button below to start searching for your favourite movies or music. <br/>
                    Click on ‘Save’ to download the recommendation as text file.
                </p>
            </div>

            <div className="get_started_btn_div">
            <Link to='/movies' id="get_started_btn">Get Started!</Link>
            </div>
            </div>
    )
}
