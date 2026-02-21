import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const API_KEY=process.env.REACT_APP_GIPHY_API_KEY;

const Random=()=>{

     const [gif,setGif]=useState("");
    async function fetchData(){
        console.log("call ke pehle")
        const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;
        const response=await axios.get(url);
        const {data}=response;
        const imageSource=data.data.images.downsized_large.url;
        setGif(imageSource);
        console.log("call ke bad");
        console.log(response)
    }

    useEffect(()=>{
        fetchData();
    },[])

    return(
        <div>
            <div>A RANDOM GIF</div>
            <div>
                <img src={gif} alt="random gif" />
            </div>
            <button onClick={()=>fetchData()}>Generate</button>
        </div>
    )
}

export default Random;