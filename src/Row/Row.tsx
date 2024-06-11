import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL, imgUrl } from "../constant";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer"

import "./Row.css";

interface RowProps {
  title: string;
  fetchUrl: string;
  isLargeRow: boolean;
}

export interface MovieType {
  name: string;
  backdrop_path: string;
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  title: string;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  original_name: string;
}

const Row = ({ title, fetchUrl, isLargeRow }: RowProps) => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [trailerUrl, setTrailerUrl] = useState<string>("");
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(baseURL + fetchUrl);

      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick=(movie)=>{
    if(trailerUrl){
      setTrailerUrl('')
    }else{
      movieTrailer(movie?.name ||"")
      .then((url:string)=>{
        const urlParams=new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v") as string); 
      })
      .catch((error:string)=>console.log(error))
    }
  }
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies?.map((movie) => (
          <img
            className={`row__poster ${isLargeRow && "row__postersLarge"}`}
           onClick={()=>handleClick(movie)}
            key={movie.id}
            src={`${imgUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
     {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
