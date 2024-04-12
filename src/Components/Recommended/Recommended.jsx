import React, { useEffect, useState } from "react";
import "./Recommended.css";

import axios from "axios";
import { API_KEY, value_converter } from "../../data";
import { Link } from "react-router-dom";

const Recommended = ({ categoryId }) => {
  const [apiData, setApiData] = useState([]);
  const fetchData = () => {
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`
      )
      .then((response) => {
        setApiData(response.data.items);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  console.log(apiData);
  return (
    <div className="recommended">
      {apiData.map((item, index) => (
        <Link
          to={`/video/${item?.snippet?.categoryId}/${item?.id}`}
          key={index}
          className="side-video-list"
        >
          <img src={item.snippet.thumbnails.medium.url} alt="" />
          <div className="vid-info">
            <h4>{item.snippet.title}</h4>
            <p>{item.snippet.channelTitle}</p>
            <p>{value_converter(item.statistics.viewCount)}Views</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Recommended;
