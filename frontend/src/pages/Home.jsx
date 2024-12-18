import { useState } from "react";
import "../css/home.css"
import { searchCars } from '../services/api';
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [cars, setCarsData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!searchQuery.trim()) return
        if (loading) return

        setLoading(true);

        try {
            const searchresult = await searchCars(searchQuery);
            setCarsData(searchresult);
            navigate("/carPage", { state: { carsData: searchresult } });
            setError(null);
        } catch (err) {
            console.log(err);
            navigate("/carPage", { state: { carsData: err } });
        } finally {
            setLoading(false);
        }

        
        setSearchQuery("");
    }

  return (
    <div className='main-page'>
        <iframe 
            src="https://www.youtube.com/embed/6NBJHM4RTrQ?autoplay=1&mute=1&loop=1&playlist=6NBJHM4RTrQ" 
            frameBorder="0" 
            allow="autoplay; encrypted-media" 
            allowFullScreen 
            className="background-video">
        </iframe>
        <form onSubmit={handleSearch}>
            <input 
                type="text" 
                placeholder='Search for car name...' 
                className='search-box'
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
            />
            <button type='submit' className='search-btn'>Find</button>
        </form>
        <script src='../css/app.js'></script>
    </div>
  )
}

export default Home