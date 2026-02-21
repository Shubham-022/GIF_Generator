import Random from "./components/Random";
import Tag from "./components/Tag";

export default function App() {
  // const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;
  return <div>

            <div>
              RANDOM GIFS
            </div>

          <Random/>
           <Tag/>
  </div>;
}
