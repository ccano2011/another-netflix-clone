import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from './axios';
import requests from './requests';

const BannerJS = styled.div`
.banner{
    color:white;
    object-fit:contain;
    height:448px;
}
.banner_contents{
    /* margin-left:30px; */
    padding-top: 140px;
    height: 190px
}
.banner_title{
    margin-left:30px;
    font-size:3rem;
    font-weight:800;
    padding-bottom:0.3rem;
}
.banner_description{
    width:45rem;
    line-height: 1.3;
    padding-top: 1rem;
    font-size:0.8rem;
    max-width:360px;
    height:80px;
    margin-left:30px;
}
.banner_button {
    cursor: pointer;
    color: #fff;
    outline:none;
    border:none;
    font-weight: 700;
    border-radius: 0.2vw;
    padding-left:2rem;
    padding-right:2rem;
    margin-right:1rem;
    padding-top:0.5rem;
    background-color: rgba(51,51,51, 0.5);
    padding-bottom:0.5rem;
    margin-left:30px;

}
.banner_button:hover {
color:#000;
background-color: #fff;
transition: all 0.2s;
}
.fade_bottom{
    height: 7.5rem;
    background-image: linear-gradient(
        180deg,
        transparent,
        rgba(37,37,37,0.61),
        #111
    );
}
`


function Banner(props) {
    const [movie, setMovie] = useState([])
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)])
            return request
        }
        fetchData();
    }, [])

    // console.log(movie)

    // The following function is completely copied/pasted from stack overflow
    function truncate(str, n) {
        // this function takes a string and a number, and once the characters 
        // in a string passes the given number, cuts off the rest of the description replacing it with ... 
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <BannerJS>
            <header className="banner" style={{
                // had to do the initial styling here and not 
                //in styled components, as 'movie' was out of scope there
                backgroundSize: "cover",
                backgroundImage: `url(
                    "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                backgroundPosition: "center center"
            }}>
                <div className="banner_contents">
                    {/* title */}
                    <h1 className="banner_title">
                        {movie?.title || movie?.name || movie?.original_name}
                    </h1>
                    {/* div> 2 buttons */}
                    <div className="banner_buttons">
                        <button className="banner_button">Play</button>
                        <button className="banner_button">My List</button>
                    </div>
                    {/* description */}
                    <h1 className="banner_description">
                        {/* we passed the movie.overview as the string, and cut it off after 150 charcters */}
                        {truncate(movie?.overview, 250)}
                    </h1>
                    <div className="fade_bottom"></div>
                </div>
            </header>
        </BannerJS>
    );
}

export default Banner;