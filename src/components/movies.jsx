import React, { useState } from 'react'
import axios from 'axios'
import { Scrollbars } from 'react-custom-scrollbars';
import Searching from '../img/searching.gif'
// import { LottiePlayer } from '@lottiefiles/lottie-player';
import "@lottiefiles/lottie-player";


function Movies(props) {


    const [selectedValue, setSelectedValue] = useState('movie')
    const [searchQuery, setSearchQuery] = useState('')

    //states for movies
    const [contents,setContents] = useState({})

    //state for loading
    const [loading, setLoading] = useState(false)

    //movie

    const onChangeSelect = (e) => {
        setSelectedValue(e.target.value)
        console.log(e.target.value);
    }

    const onInputChange = (e) => {
        setSearchQuery(e.target.value)
        console.log(searchQuery);
    }

    const isEmpty = (value) =>
     value === undefined ||
     value === null ||
     (typeof value === 'object' && Object.keys(value).length === 0) ||
     (typeof value === 'string' && value.trim().length === 0);

    const onSubmit = async () => {

        setLoading(true)
        if(!isEmpty(selectedValue) && !isEmpty(searchQuery)){

            const url = `https://movie-api909.herokuapp.com/${selectedValue}?${selectedValue==='movie'?'title':'track'}=${searchQuery}`
            await axios.get(url)
            .then(res => {
                console.log( typeof res.data);
                setLoading(false)
                if(typeof res.data === 'object' ){
                setContents({...contents, [searchQuery]: res.data })}
                // contents[`${searchQuery}`] =  res.data
                console.log(contents);
            })
            .catch(err => console.log(err))

            console.log(contents);
        }

    }

    const handleClickOnMovie = (e) => {
        if(searchQuery !== e.target.value)  setSearchQuery(e.target.value)
        setSearchQuery(e.target.value)
        console.log("clicked on movie",searchQuery);
        console.log(e.target.value);
        onSubmit()
    }



    return (
        <div className="movie_container">
            <div className="wrap">
                <div className="search">
                <select onChange={onChangeSelect} value={selectedValue}>
                        <option value='movie'>Movies</option>
                        <option value='music'>Music</option>
                </select>
                     <input onChange={onInputChange} type="text" className="searchTerm" placeholder="What are you looking for?"/>
                    <button onClick={onSubmit}  className="searchButton">
                        Search
                    </button>
                </div>
            </div>


        {/* this part will be in iteration itself */}

        <div className="mContainer">


            {/* <Scrollbars style={{ width: "100%", height: "100%" }}> */}
            <Scrollbars
        // This will activate auto-height
        autoHeight
        autoHeightMin={0}
        autoHeightMax={425}>
            { loading? <img src={Searching}/> : null }
            {/* <lottie-player src="https://assets1.lottiefiles.com/packages/lf20_9jonoxol.json"  background="transparent"  speed="3"  style="width: 300px; height: 300px;"  loop controls autoplay></lottie-player> */}
        { Object.keys(contents).reverse().map(qMovies => {
            console.log("qMovie",qMovies);
            return(
                <div className="recommendedContentContainer">
                <p>Recommendations based on <span>{qMovies}</span>: </p>
                <div className="contentContainer">

                {
                    contents[qMovies].map(iteams => <button value={iteams.Name} onClick={handleClickOnMovie}> {iteams.Name}</button>)
                }


                </div>
            </div>
            )
            }) }
             </Scrollbars>
        </div>




        </div>
    )
}



export default Movies
