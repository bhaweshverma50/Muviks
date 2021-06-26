import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Scrollbars } from 'react-custom-scrollbars';
import Loader from './loading'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Empty from '../img/empty.svg'

let dict = require('../sugg.json')

function Recommend(props) {
    const [list, setList] = useState([])
    const [suggestion, setSuggestion] = useState([])
    useEffect(() => {
        const loadSugg = async () => {
            // const resu = await axios.get('http://127.0.0.1:5000/suggestion')
            setList(dict.data)
            // console.log(dict.data)
        }
        loadSugg()
    }, [])

    const [selectedValue, setSelectedValue] = useState('movie')
    const [searchQuery, setSearchQuery] = useState('')

    //states for movies
    const [movie, setMovie] = useState({})
    //states for music
    const [music, setMusic] = useState({})
    //state for loading
    const [loading, setLoading] = useState(false)

    const [isDisabled, setIsDisabled] = useState(false)
    const [bDisbaled, setBDisabled] = useState(true)
    const [noData, setNoData] = useState(true)


    const localMovie = localStorage.getItem('movie');
    if (localMovie) {
        // setMovie(localMovie)
        // console.log(localMovie);
    }

    // const localMusic = JSON.parse(localStorage.getItem('music')) ;
    // if(localMusic){
    //     // setMusic(localMusic)
    //     console.log(localMusic);
    // }

    const onChangeSelect = (e) => {
        setSelectedValue(e.target.value)
        setSearchQuery('')


        // console.log(e.target.value);

    }

    const onInputChange = (text) => {
        setSearchQuery(text)
        setBDisabled(isEmpty(text))
        let matches = []
        // console.log(searchQuery)
        // console.log(sugg);
        if (searchQuery.length > 0) {
            matches = list.filter(sug => {
                const regex = new RegExp(`${searchQuery}`, 'gi')
                return sug.match(regex)
            })
            // console.log(matches)
            setSuggestion(matches)
        }
        // console.log(searchQuery);
    }

    const isEmpty = (value) =>
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0);

    const onSubmit = () => {
        onAPIFetch(selectedValue, searchQuery)
    }

    const handleClickOnTitle = (e) => {
        const value = e.target.value
        setSearchQuery(value)
        onAPIFetch(selectedValue, value)
        // console.log(searchQuery);
    }

    const onAPIFetch = (type, name) => {

        if (!isEmpty(type) && !isEmpty(name)) {
            setLoading(true)
            setIsDisabled(true)
            const url = `https://movie-api909.herokuapp.com/${type}?${type === 'movie' ? 'title' : 'track'}=${name}`
            // console.log(url);
            axios.get(url)
                .then(res => {
                    setIsDisabled(false)
                    setLoading(false)

                    if (typeof res.data === 'object' && type === 'movie') {
                        setMovie({ ...movie, [name]: res.data })
                        setNoData(false)
                        toast.success("Success! Check Recommendations")
                        // localStorage.setItem('movie', movie);
                    }
                    if (typeof res.data === 'object' && type === 'music') {
                        setMusic({ ...music, [name]: res.data })
                        setNoData(false)
                        toast.success("Success! Check Recommendations")
                        localStorage.setItem('music', JSON.stringify(music));
                    }
                    if (res.data === 'Movie not in Database') { toast.error(res.data) }
                    if (res.data === 'Sorry! Seems like there is no match!') { toast.error(res.data) }
                    // console.log(res.data)
                })
                .catch(err => {
                    // console.log(err)
                    setIsDisabled(false)
                    setLoading(false)
                    toast.error('Oops! Server Error')
                })
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

                            return (
                                <div className="recommendedContentContainer">
                                    <p>Recommendations based on <span>{qMovies}</span>: </p>
                                    <div className="contentContainer">

                                        {
                                            movie[qMovies].map(items => <button disabled={loading || movieIndex.indexOf(items.Name) >= 0} value={items.Name} onClick={handleClickOnTitle}> {items.Name}  {movieIndex.indexOf(items.Name) < 0 ? <span className="heart-icon"> <AiOutlineHeart style={{ fontSize: '20px', margin: '0 0 2px 12px', padding: '0 0 0px 0', color: '#aa4f4f' }} /> </span> : <span className="heart-icon-fill"> <AiFillHeart style={{ fontSize: '20px', margin: '0 0 2px 12px', padding: '0 0 0px 0', color: '#df1f1f' }} /> </span>} </button>)
                                        }

                                    </div>
                                </div>
                            )
                        })}
                </Scrollbars>
                {noData ? <div className="emptyLogo">
                    <img src={Empty} alt='empty' />
                    <h2>There is no data!</h2>
                </div> : null}
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
                    {musicIndex.reverse().map(qMusic => {
                        return (
                            <div className="recommendedContentContainer">
                                <p>Recommendation based on <span>{qMusic}</span>: </p>
                                <div className="contentContainer">

                                    {
                                        music[qMusic].map(items => <button disabled={loading || musicIndex.indexOf(items.name) >= 0} value={items.name} onClick={handleClickOnTitle}> {items.name}  {musicIndex.indexOf(items.name) < 0 ? <span className="heart-icon"> <AiOutlineHeart style={{ fontSize: '20px', margin: '0 0 2px 12px', padding: '0 0 0px 0', color: '#aa4f4f' }} /> </span> : <span className="heart-icon-fill"> <AiFillHeart style={{ fontSize: '20px', margin: '0 0 2px 12px', padding: '0 0 0px 0', color: '#df1f1f' }} /> </span>} </button>)
                                    }

                                </div>
                            </div>
                        )
                    })}
                </Scrollbars>
                {noData ? <div className="emptyLogo">
                    <img src={Empty} alt='empty' />
                    <h2>There is no data!</h2>
                </div> : null}
            </div>

        )
    }

    const downloadFavorites = () => {
        const isMovieSelected = selectedValue === 'movie'
        let myState = isMovieSelected ? movie : music
        const myStateIndex = Object.keys(myState);
        let strVar = `Your Favourite ${isMovieSelected ? 'movies' : 'musics'} are: \n`
        for (let i = 0; i < myStateIndex.length; i++) {
            strVar += myStateIndex[i]
            if (i < myStateIndex.length - 1) {
                strVar += ", "
                let k = i + 1
                if (k % 5 === 0) {
                    strVar += "\n"
                }
            }
            else {
                strVar += "\n \n"
            }
        }

        myStateIndex.reverse().map(qmyState => {
            strVar += `Recommendation based on ${qmyState} \n`

            for (let i = 0; i < myState[qmyState].length; i++) {
                strVar += isMovieSelected ? myState[qmyState][i].Name : myState[qmyState][i].name

                if (i < myState[qmyState].length - 1) {
                    strVar += " | "
                    let k = i + 1
                    if (k % 5 === 0) {
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
        const file = new Blob([strVar], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = isMovieSelected ? "myFavouriteMovies.txt" : "myFavouriteMusics.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    const suggestHandler = (searchQuery) => {
        // console.log(searchQuery)
        setSearchQuery(searchQuery)
        setSuggestion([])
    }

    return (
        <div className="movie_container">
            <ToastContainer />
            <div className="wrap">
                <div className="search">
                    <select disabled={isDisabled} onChange={onChangeSelect} value={selectedValue}>
                        <option value='movie'>Movies</option>
                        <option value='music'>Songs</option>
                    </select>
                    <input onChange={e => onInputChange(e.target.value)} value={searchQuery} type="text" className="searchTerm" placeholder="What are you looking for?" onBlur={() => {
                        // console.log('blur');
                        setTimeout(() => {
                            setSuggestion([])
                        }, 300)
                    }} />

                    <button disabled={isDisabled || bDisbaled} onClick={onSubmit} className="searchButton">
                        Search
                    </button>
                    {!noData ? <button disabled={isDisabled || bDisbaled} onClick={downloadFavorites} className='save'>
                        Save
                    </button> : null}
                </div>
                {/* <div>
                    <button disabled={isDisabled || bDisbaled} onClick={downloadFavorites} className='save'>
                        Save
                    </button>
                </div> */}
            </div>
            <div className='suggCon'>
                {suggestion && suggestion.slice(0, 5).map((e, i) =>
                    <div className='sugg' onClick={() => suggestHandler(e)}
                        key={i} >{e}</div>
                )}
            </div>
            {loading ? <Loader /> : null}

            {selectedValue === 'movie' ? movieCom() : musicCom()}

        </div>
    )
}

export default Recommend
