import React, { Component } from 'react'
import { AiFillHeart } from 'react-icons/ai'

export default class Footer extends Component {
    render() {
        return (
            <div className="footer">

                <p>
                    Made with <AiFillHeart style={{ color: 'red' }} /> by Bhawesh | Abhishek
                </p>
            </div>
        )
    }
}
