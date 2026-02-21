import React from "react";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY;

const Random = () => {

    //handling loader
    const [loading, setLoading] = useState(false);
    const [gif, setGif] = useState("");

    const fetchData = useCallback(async () => {
        console.log("call ke pehle")
        setLoading(true);
        try {
            const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;
            const response = await axios.get(url);
            const { data } = response;
            const imageSource = data.data.images.downsized_large.url;
            setGif(imageSource);
            console.log("call ke bad");
        } catch (error) {
            console.error("Error fetching random gif:", error);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData])

    return (
        <div className="w-11/12 max-w-[450px] bg-green-500 rounded-2xl border border-white shadow-2xl
        flex flex-col items-center gap-y-5 mt-[15px] p-5 transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_50px_rgba(34,_197,_94,_0.5)]">
            <h1 className="text-2xl uppercase underline font-bold text-white tracking-widest text-center">
                A Random Gif
            </h1>

            <div className="w-full flex justify-center items-center min-h-[250px] bg-green-100/20 rounded-xl overflow-hidden shadow-inner">
                {loading ? <div className="spinner"></div> : <img src={gif} alt="random gif" className="max-w-full max-h-[350px] object-contain transition-all duration-700 hover:scale-110" />}
            </div>

            <button
                onClick={() => fetchData()}
                className="w-10/12 bg-white text-green-600 text-xl font-bold py-3 rounded-lg 
                hover:bg-green-600 hover:text-white transition-all duration-300 transform active:scale-95 shadow-md hover:shadow-lg uppercase tracking-wider"
            >
                Generate
            </button>
        </div>
    );
}

export default Random;