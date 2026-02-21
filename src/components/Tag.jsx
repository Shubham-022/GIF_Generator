import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const API_KEY=process.env.REACT_APP_GIPHY_API_KEY;

const Tag=()=>{
    
    //handling input
    const [tag,setTag]=useState("");
    function changeHandler(event){
        setTag(event.target.value);
    }

    //handling api call and ..updating gif value
    const [gif,setGif]=useState("");
    async function fetchData(){
        console.log("call ke pehle")
        const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${tag}`;
        const response=await axios.get(url);
        const {data}=response;
        const imageSource=data.data.images.downsized_large.url;
        setGif(imageSource);
        console.log("call ke bad");
        console.log(response)
    }

    //api call using use effect in first render
    useEffect(()=>{
        fetchData();
    },[])

    return(
        <div>
            <div>A RANDOM GIF</div>
            <div>
                <img src={gif} alt="Tag gif" />
            </div>

            <input
             type="text" 
             placeholder="Enter a tag"
             name="tag"
             value={tag}
             onChange={changeHandler}
            />
            <button onClick={()=>fetchData()}>Generate</button>
        </div>
    )
}

export default Tag;