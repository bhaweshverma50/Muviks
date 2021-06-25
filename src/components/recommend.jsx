import React, { useState } from 'react'
import axios from 'axios'
import { Scrollbars } from 'react-custom-scrollbars';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import Loader from './loading'
import Empty from '../img/empty.svg'

function Recommend(props) {


    const [selectedValue, setSelectedValue] = useState('movie')
    const [searchQuery, setSearchQuery] = useState('')

    //states for movies
    const [movie, setMovie] = useState({})
    //states for music
    const [music, setMusic] = useState({})
    //state for loading
    const [loading, setLoading] = useState(false)
    //state for no data
    const [noData, setNoData] = useState(true)


    const onChangeSelect = (e) => {
        setSelectedValue(e.target.value)
        // console.log(e.target.value);

    }

    const onInputChange = (e) => {
        setSearchQuery(e.target.value)
        // console.log(searchQuery);
    }



    const isEmpty = (value) =>
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0);

    const onSubmit = async () => {

        setLoading(true)
        if (!isEmpty(selectedValue) && !isEmpty(searchQuery)) {

            const url = `https://movie-api909.herokuapp.com/${selectedValue}?${selectedValue === 'movie' ? 'title' : 'track'}=${searchQuery}`
            await axios.get(url)
                .then(res => {
                    // console.log(typeof res.data);
                    setLoading(false)

                    if (typeof res.data === 'object' && selectedValue === 'movie') {
                        setMovie({ ...movie, [searchQuery]: res.data })
                        setNoData(false)
                        toast.success("Success! Check Recommendations")
                    }
                    if (typeof res.data === 'object' && selectedValue === 'music') {
                        setMusic({ ...music, [searchQuery]: res.data })
                        setNoData(false)
                        toast.success("Success! Check Recommendations")
                    }
                    if (res.data === 'Movie not in Database') { toast.error(res.data) }
                    if (res.data === 'Sorry! Seems like there is no match') { toast.error(res.data) }
                    console.log(res.data)
                })
                .catch(err => {
                    console.log(err)
                    setLoading(false)
                    toast.error('Oops! Server Error')
                })

            // console.log(movie);
        }

    }

    const handleClickOnMovie = (e) => {
        if (searchQuery !== e.target.value) setSearchQuery(e.target.value)
        setSearchQuery(e.target.value)
        // console.log("clicked on movie", searchQuery);
        // console.log(e.target.value);
        onSubmit()
    }


    const movieCom = () => {
        return (
            <div className="mContainer">
                <Scrollbars
                    autoHeight
                    autoHide
                    autoHeightMin={0}
                    autoHeightMax={482}
                    autoHideTimeout={1000}
                    autoHideDuration={200}>
                    {Object.keys(movie).reverse().map(qMovies => {
                        // console.log("qMovie", qMovies);
                        return (
                            <div className="recommendedContentContainer">
                                <p>Recommendations based on <span>{qMovies}</span>: </p>
                                <div className="contentContainer">

                                    {
                                        movie[qMovies].map(iteams => <button value={iteams.Name} onClick={handleClickOnMovie}> {iteams.Name}<AiOutlineHeart style={{ fontSize: '20px', margin: '0 0 2px 12px', padding: '0 0 0px 0', color: '#aa4f4f' }} /></button>)
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
        return (
            <div className="mContainer">
                <Scrollbars
                    autoHeight
                    autoHide
                    autoHeightMin={0}
                    autoHeightMax={482}
                    autoHideTimeout={1000}
                    autoHideDuration={200}>
                    {Object.keys(music).reverse().map(qMusic => {
                        // console.log("qMovie", qMovies);
                        return (
                            <div className="recommendedContentContainer">
                                <p>Recommendations based on <span>{qMusic}</span>: </p>
                                <div className="contentContainer">

                                    {
                                        music[qMusic].map(iteams => <button value={iteams.name} onClick={handleClickOnMovie}> {iteams.name}<AiOutlineHeart style={{ fontSize: '20px', margin: '0 0 2px 12px', padding: '0 0 0px 0', color: '#aa4f4f' }} /></button>)
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


    return (
        <div className="movie_container">
            <ToastContainer />
            <div className="wrap">
                <div className="search">
                    <select onChange={onChangeSelect} value={selectedValue}>
                        <option value='movie'>Movies</option>
                        <option value='music'>Songs</option>
                    </select>
                    <input onChange={onInputChange} type="text" className="searchTerm" placeholder="What are you looking for?" />
                    <button onClick={onSubmit} className="searchButton">
                        Search
                    </button>
                </div>
            </div>

            {loading ? <Loader /> : null}
            {/* {noData ? <div className="emptyLogo">
                <img src={Empty} alt='empty' />
                <h2>There is no data!</h2>
            </div> : null} */}



            {selectedValue === 'movie' ? movieCom() : musicCom()}




        </div>
    )
}



export default Recommend
