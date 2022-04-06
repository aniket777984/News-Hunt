import axios from "axios";
import React, { useEffect, useState } from "react";
import "./News.css";


const News = () => {
  const [value, setValue] = useState([]);
  const [search,setSearch ] = useState("");

  const getNews = async () => {
    const date = new Date();
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
     

    const initial = "Apple";

    
    axios
      .get(
        `https://newsapi.org/v2/everything?q=${search?(search):initial}&from=${y}-${m}-${d}&sortBy=popularity&apiKey=${process.env.REACT_APP_API_KEY}`
      )
      .then(({ data }) => {
       setValue(data.articles);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getNews();
    // eslint-disable-next-line
  }, [search]);

  return (
    <>
    <div className="title">
      <h3 className="live">LIVE</h3>
      <h1 className="sub-title">NEWS HUNT</h1>
    </div>
    <hr className="divider" />

    <div className="form">
      <input type="text" name="search" className="search" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search Here" />
      
    </div>

  <div className="row">
    {value.map((a,index)=> (
      <div className="card col" key={index} >
      <img src={a.urlToImage?(a.urlToImage):"./Photo.jpg"} className="card-img-top" alt="Network Issue" / >
      <div className="card-body">
        <h5 className="card-title">{a.title}</h5>
        <p className="card-text">{a.content}</p>
        <a href={a.url} className="btn btn-primary">Go somewhere</a>
      </div>
    </div>
    ))}
  </div>
  </>
  );
};

export default News;
