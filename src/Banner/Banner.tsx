import axios from "axios";
import React, { useEffect, useState } from "react";
import requests from "../requests";
import { MovieType } from "../Row/Row";
import { baseURL, imgUrl } from "../constant";

import './Banner.css';

const Banner = () => {
  const [movie, setMovie] = useState<MovieType>();

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(baseURL + requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  const trancatDescription = (str: string, num: number): string => {
    return str?.length > num ? str.slice(0, num) + "..." : str;
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${imgUrl}${movie?.backdrop_path})`,

        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>
        <div>
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">{trancatDescription(movie?.overview!,150)}</h1>
      </div> 
     <div className="banner--fadeBottom" />

    </header>
  );
};

export default Banner;
