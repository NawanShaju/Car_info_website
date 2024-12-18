import { useEffect, useState } from 'react';
import CarCard from '../components/CarCard';
import "../css/home.css";
import { filterFind, searchCars, getAllCars, addData } from '../services/api'; 
import "../css/carPage.css";
import AddCar from './AddCar';

const CarPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [cars, setCarsData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [filterType, setFilterType] = useState("name"); 

    const [addActive, setAddActive] = useState(false);
    const [plusActive, setPlusActive] = useState(false);

    const toggleMenu = () => {
        setAddActive(!addActive);
    }

    const toggleMenu2 = () => {
        setPlusActive(!plusActive);
    }

    
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim() || loading) return;

        const formattedQuery = searchQuery.toLowerCase(); 

        setLoading(true);

        try {
            let result;
            if (filterType !== "name") {
                result = await filterFind(filterType, formattedQuery); 
            } else {
                result = await searchCars(searchQuery); 
            }

            setCarsData(result);
            setError(null);
        } catch (err) {
            console.error(err);
            setCarsData([]);
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
            setSearchQuery(""); 
        }
    };

    
    const fetchAllCars = async () => {
        setLoading(true);
        try {
            const allCars = await getAllCars();
            setCarsData(allCars);
            setError(null);
        } catch (err) {
            console.error(err);
            setError(err.message || "Failed to fetch all cars");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllCars();
    }, []);


    return (
        <div className="carPage" id="root">
            <div className="search-container">
                <form className="search-form" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search for car..."
                        className={`search-box-cars ${addActive ? "active" : ""}`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    <button
                        type="submit"
                        className={`search-btn-cars ${addActive ? "active" : ""}`}
                        disabled={loading}>
                        {loading ? "Searching..." : "Find"}
                    </button>

                    <select
                        className={`filter-box ${addActive ? "active" : ""}`}
                        onChange={(e) => setFilterType(e.target.value)}>
                        <option value="name">Name</option>
                        <option value="make">Make</option>
                        <option value="modelYear">Model Year</option>
                        <option value="type">Type</option>
                    </select>
                </form>
                <button 
                    className={`search-logo-btn ${addActive ? "active" : ""}`} 
                    onClick={toggleMenu}>
                    <img 
                        className={`logo-btn ${addActive ? "active" : ""}`}
                        src={addActive ? 'searchActive.png' : 'search.png'} 
                        alt="Search"
                    />
                </button>
                <button 
                    className={`plus-logo-btn ${plusActive ? "active" : ""}`} 
                    onClick={toggleMenu2}>
                    <div 
                        className={`plus-btn ${plusActive ? "active" : ""}`}
                    > + </div>
                </button>
                <div className={`carAdd-container ${plusActive ? "visible" : ""}`}>
                    <button  className={`plus-logo-btn ${plusActive ? "active" : ""}`} 
                    onClick={() => {
                        toggleMenu2();
                        fetchAllCars();
                      }}>
                        <div 
                            className={`cross-btn ${plusActive ? "active" : ""}`}
                        > x </div>
                    </button>
                    <h2>Add Car Details</h2>
                    <AddCar />
                </div>
            </div>


            {loading && <p className="loading">Loading...</p>}

            {!loading && !error && cars.length > 0 ? (
                <div className="car-grid">
                    {cars.map((car) => (
                        <CarCard carData={car} key={car.id} />
                    ))}
                </div>
            ) : (
                <div className="error-container">
                    <img src="error4.png" className="error-number" alt="Error 404" />
                    <img src="errorImg.png" className="error-img" alt="Error" />
                    <img src="errorImg.png" className="error-img" alt="Error" />
                    <h2 className="error">Error: the car does not exist</h2>
                    <a className="error__links" id="services-page" onClick={toggleMenu2}>
                        Add Car Data
                    </a>
                </div>
            )}
        </div>
    );
};

export default CarPage;
