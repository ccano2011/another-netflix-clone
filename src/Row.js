import React, { useState, useEffect } from 'react'
import axios from './axios'
import styled from 'styled-components'
import YouTube from 'react-youtube'

const RowJS = styled.div`
.row__posters{
    display:flex;
    /* Hides the vertical overflow */
    overflow-y:hidden;
    /* lets you scroll through the horizontal overflow */
    overflow-x:scroll;

    padding:20px;
}
/* Just in case you want to hide the scroll bars*/
.row__posters::-webkit-scrollbar{
    display:none;
}

.row_poster{
    object-fit:contain;
    width:100%;
    height: 100px;
    margin-right: 10px;
    transition: transform 450ms;
}
.row_poster:hover {
    transform:scale(1.08);
}

.posterLarge{
    height:250px;
}

.row{
    margin-left:20px;
    color: #FFF;
}
`

const base_url = "https://image.tmdb.org/t/p/original/"

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [youTubeLink, setYouTubeLink] = useState("");

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            // console.log(request.data.results.map(movie => movie.id))
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: '390',
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };
    // console.log(movies)
    const handleClick = (movie) => {
        if (youTubeLink) {
            setYouTubeLink('')
        } else {
            // console.log(movie)
            const Id = movie.id;
            // console.log(Id)
            let mediaType = ""
            if (movie.media_type) {
                mediaType = movie.media_type
            } else if (movie.first_air_date) {
                mediaType = 'tv'
            } else {
                mediaType = 'movie'
            };
            const fetchTrailerId = async () => {
                const movieEndpoint = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${Id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos`)
                setYouTubeLink(`${movieEndpoint.data.videos.results[0]?.key}`)
                // console.log(movieEndpoint.data?.videos.results[0]?.key)
            }
            fetchTrailerId();
        }


        // https://api.themoviedb.org/3/movie/343611?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos


        // if (trailerUrl) {
        //     setTrailerUrl('');
        // } else {
        //     movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
        //         .then((url) => {
        //             const urlParams = new URLSearchParams(new URL(url).search);
        //             setTrailerUrl(urlParams.get("v"));
        //         })
        //         .catch((error) => console.log(error));
        // }
    }



    return (
        <RowJS>
            <div className="row">
                <h2>{title}</h2>
                <div className="row__posters">
                    {/* row++poster */}
                    {movies.map(movie => (
                        <img
                            // the purpose of keys is to assign a value to what I'm mapping so when the 
                            // component refreshes, it only updates what's keyed. this optimizes the load
                            key={movie.id}
                            // console.log(movie.id)
                            onClick={() => handleClick(movie)}
                            className={`row_poster ${isLargeRow && "posterLarge"}`}
                            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                            alt={movie.name}
                        />
                    ))}
                </div>
                {youTubeLink && <YouTube videoId={youTubeLink} opts={opts} />}
            </div>
        </RowJS>
    );
}

export default Row;     