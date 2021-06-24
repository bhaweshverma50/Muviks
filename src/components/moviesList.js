import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars';
export default function MoviesList(props) {
    return (
        <div className="recommendedContentContainer">
        <p>Recommendations based on props.query: </p>
        <div className="contentContainer">
        <Scrollbars style={{ width: "100%", height: 80 }}>
            {props.name.map(mName =>  <button>mName</button>)}
        </Scrollbars>
        </div>
    </div>
    )
}
