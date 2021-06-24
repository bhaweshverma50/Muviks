import React from 'react'
import { Link } from 'react-router-dom'
// import Header from './header'


export default function Homepage() {


    return (
        <div className="container">
            <div className="heroTXT">
                <p className="heroHeader">
                    Welcome to <b style={{ color: '#F028F8' }}>Muviks</b>! The all in one <span style={{ color: '#3EC0CC' }}>music and movie recommender</span>.
                </p>
                <p className="heroDecription">
                    Click on the button below to start searching for your favourite movies or music. <br />
                    Click on ‘Save’ to download the recommendation as text file.
                </p>
            </div>

            <div className="get_started_btn_div">
                <Link to='/recommendation' id="get_started_btn">Get Started!</Link>
            </div>
        </div>
    )
}
