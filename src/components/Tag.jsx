import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;

const Tag = () => {
    //handling loader
    const [loadingTag, setLoadingTag] = useState(false);

    //handling input
    const [tag, setTag] = useState("");
    function changeHandler(event) {
        setTag(event.target.value);
    }

    //handling api call and ..updating gif value
    const [gif, setGif] = useState("");
    async function fetchData() {
        console.log("call ke pehle")
        // const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${tag}`;
        // const response = await axios.get(url);
        setLoadingTag(true);
        const response = await axios.get("/v1/gifs/random", {
             params: { api_key: API_KEY, tag: tag }
        });
        setLoadingTag(false);
        const { data } = response;
        const imageSource = data.data.images.downsized_large.url;
        setGif(imageSource);
        console.log("call ke bad");
        console.log(response)
    }

    //api call using use effect in first render
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="w-11/12 max-w-[450px] bg-blue-500 rounded-2xl border border-white shadow-2xl
        flex flex-col items-center gap-y-5 mt-[15px] p-5 mb-[40px] transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_50px_rgba(59,_130,_246,_0.5)]">
            <h1 className="text-2xl uppercase underline font-bold text-white tracking-widest text-center px-2">
                A Random {tag} Gif
            </h1>

            <div className="w-full flex justify-center items-center min-h-[250px] bg-blue-100/20 rounded-xl overflow-hidden shadow-inner">
                {loadingTag ? <div className="spinner"></div> : <img src={gif} alt="Tag gif" className="max-w-full max-h-[350px] object-contain transition-all duration-700 hover:scale-110" />}
            </div>

            <input
                type="text"
                placeholder="Enter a tag"
                name="tag"
                value={tag}
                onChange={changeHandler}
                className="w-10/12 text-lg py-3 rounded-lg px-4 text-center focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 border-none shadow-md"
            />

            <button
                onClick={() => fetchData()}
                className="w-10/12 bg-white text-blue-600 text-xl font-bold py-3 rounded-lg 
                hover:bg-blue-600 hover:text-white transition-all duration-300 transform active:scale-95 shadow-md hover:shadow-lg uppercase tracking-wider"
            >
                Generate
            </button>
        </div>
    );
}

export default Tag;