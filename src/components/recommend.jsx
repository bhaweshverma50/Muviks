import React, { useState } from 'react'
import axios from 'axios'
import { Scrollbars } from 'react-custom-scrollbars';
import Loader from './loading'
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai'
import {BsHeart} from 'react-icons/bs'
import {GrDocumentDownload} from 'react-icons/gr'

function Recommend(props) {

    const [selectedValue, setSelectedValue] = useState('movie')
    const [searchQuery, setSearchQuery] = useState('')

    //states for movies
    const [movie, setMovie] = useState({})
    //states for music
    const [music, setMusic] = useState({})

    //state for errors
    const [error, setError] = useState(false)

    //state for loading
    const [loading, setLoading] = useState(false)

    const [isDownloadDisabled, setIsDownloadDisabled] = useState(false)



    const [isDisabled, setIsDisabled] = useState(false)
    const [bDisbaled, setBDisabled] = useState(true)

    const onChangeSelect = (e) => {
        setSelectedValue(e.target.value)
        setSearchQuery('')
        setError(false)


        // console.log(e.target.value);

    }

    const onInputChange = (e) => {
        setSearchQuery(e.target.value)
        setError(false)
        setBDisabled(isEmpty(e.target.value))

        // console.log(searchQuery);
    }

    const isEmpty = (value) =>
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0);

    const onSubmit = () => {
        setError(false)
        onAPIFetch(selectedValue, searchQuery)
    }

    const handleClickOnTitle = (e) => {
        setError(false)
        const value = e.target.value
        setSearchQuery(value)
        onAPIFetch(selectedValue, value)
        console.log(searchQuery);
    }

    const onAPIFetch = (type, name) => {

        if (!isEmpty(type) && !isEmpty(name)) {
            setLoading(true)
            setIsDisabled(true)
            const url = `https://movie-api909.herokuapp.com/${type}?${type === 'movie' ? 'title' : 'track'}=${name}`
            console.log(url);
             axios.get(url)
                .then(res => {
                    // console.log(typeof res.data);
                    setIsDisabled(false)
                    setLoading(false)

                    if (typeof res.data === 'object' && type === 'movie') {
                        setMovie({ ...movie, [name]: res.data })
                    }
                    if (typeof res.data === 'object' && type === 'music') {
                        setMusic({ ...music, [name]: res.data })
                    }

                    if(typeof res.data !== 'object') {

                        setError(true)
                    }
                    console.log(music);

                })
                .catch(err => {
                    console.log(err)
                    setIsDisabled(false)
                    setLoading(false)
                    setError(true)
                })

            // console.log(movie);
        }

    }

    const movieCom = () => {
        const movieIndex = Object.keys(movie);

        return (
            <div className="mContainer">
                <Scrollbars
                    autoHeight
                    autoHide
                    autoHeightMin={0}
                    autoHeightMax={482}
                    autoHideTimeout={1000}
                    autoHideDuration={200}>
                    {
                    movieIndex.reverse().map(qMovies => {

                        // console.log("qMovie", qMovies);
                        return (
                            <div className="recommendedContentContainer">
                                <p>Recommendations based on <span>{qMovies}</span>: </p>
                                <div className="contentContainer">

                                    {
                                        movie[qMovies].map(items => <button disabled = {loading} value={items.Name} onClick={handleClickOnTitle}> {items.Name}  { movieIndex.indexOf(items.Name) < 0 ?  <span className="heart-icon"> <BsHeart/> </span>  :  <span className="heart-icon-fill"> <AiFillHeart/> </span>  } </button>)
                                    }

                                </div>
                            </div>
                        )
                    })}
                </Scrollbars>
            </div>

        )
    }


    const musicCom = () => {
        const musicIndex = Object.keys(music)
        return (
            <div className="mContainer">
                <Scrollbars
                    autoHeight
                    autoHide
                    autoHeightMin={0}
                    autoHeightMax={482}
                    autoHideTimeout={1000}
                    autoHideDuration={200}>
                    { musicIndex.reverse().map(qMusic => {
                        // console.log("qMovie", qMovies);
                        return (
                            <div className="recommendedContentContainer">
                                <p>Recommendation based on <span>{qMusic}</span>: </p>
                                <div className="contentContainer">

                                    {
                                        music[qMusic].map(items => <button disabled = {loading || musicIndex.indexOf(items.name) >= 0} value={items.name} onClick={handleClickOnTitle}> {items.name}  { musicIndex.indexOf(items.name) < 0 ?  <span className="heart-icon"> <BsHeart/> </span>  :  <span className="heart-icon-fill"> <AiFillHeart/> </span>  } </button>)
                                    }

                                </div>
                            </div>
                        )
                    })}
                </Scrollbars>
            </div>

        )
    }

    const downloadFavorites = () =>{
        const isMovieSelected =  selectedValue === 'movie'
        let myState = isMovieSelected ? movie : music
        const myStateIndex = Object.keys(myState);
        let strVar = `Your Favourite ${ isMovieSelected ? 'movies': 'musics' } are: \n`
        for(let i=0;i<myStateIndex.length;i++){
            strVar += myStateIndex[i]
            if(i<myStateIndex.length - 1){
                strVar += ", "
                let k = i+1
                if(k%5===0){
                    strVar += "\n"
                }
            }
            else {
                strVar += "\n \n"
            }
        }

        myStateIndex.reverse().map(qmyState => {
            strVar += `Recommendation based on ${qmyState} \n`

            for(let i=0;i<myState[qmyState].length;i++){
                strVar += isMovieSelected ?  myState[qmyState][i].Name : myState[qmyState][i].name

                if(i<myState[qmyState].length - 1){
                    strVar += " | "
                    let k = i+1
                    if(k%5===0){
                        strVar += "\n"
                    }
                }
                else {
                    strVar += "\n \n"
                }
            }
            return null

        })



        const element = document.createElement("a");
        const file = new Blob([strVar], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = isMovieSelected?  "myFavouriteMovies.txt" : "myFavouriteMusics.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    return (
        <div className="movie_container">
            <div className="wrap">
                <div className="search">
                    <select disabled={isDisabled} onChange={onChangeSelect} value={selectedValue}>
                        <option value='movie'>Movies</option>
                        <option value='music'>Songs</option>
                    </select>
                    <input  onChange={onInputChange} value={searchQuery} type="text" className="searchTerm" placeholder="What are you looking for?" />
                    <button disabled={isDisabled || bDisbaled} onClick={onSubmit} className="searchButton">
                        Search
                    </button>

                    <button disabled={isDownloadDisabled} onClick={downloadFavorites}> <GrDocumentDownload/></button>
                </div>
            </div>
            {loading ? <Loader /> : null}

            { error ? <div className="error">Something went wrong or {searchQuery} is not in our {selectedValue} database </div>: null}
            {selectedValue === 'movie' ? movieCom() : musicCom()}

        </div>
    )
}

export default Recommend
