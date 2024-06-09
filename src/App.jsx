import { useState, useRef, useEffect } from 'react';
import Fuse from 'fuse.js';
import Coin from "./Coin.jsx";

function App() {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState('');
    const [coins, setCoins] = useState([]);
    const [isSearchedCoin, setIsSearchedCoin] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [showFavorites, setShowFavorites] = useState(false);
    const dropdownRef = useRef(null);
    const displayCoins = showFavorites ? favorites : isSearchedCoin;

    useEffect(() => {
        getCoins();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    useEffect(() => {
        const fuse = new Fuse(coins, {
            keys: [''],
            threshold: 0.3
        });

        if (content.trim() !== '') {
            const result = fuse.search(content);
            setIsSearchedCoin(result.map(({ item }) => item));
        }
        else {
            setIsSearchedCoin(coins);
        }
    }, [content, coins]);

    const getCoins = async () => {
        const response = await fetch(
            "https://api-eu.okotoki.com/coins"
        ).then((response) => response.json());
        setCoins(response);
        setIsSearchedCoin(response);
    };

    const makeFavorites = (coin, isFavorite) => {
        setFavorites((prevFavorites) => {
            if (isFavorite) {
                return [...prevFavorites, coin];
            } else {
                return prevFavorites.filter((favCoin) => favCoin !== coin);
            }
        });
    };

    const openDropdown = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div id= "container" ref={dropdownRef}>
            <button id = "searchButton" onClick={openDropdown}>SEARCH</button>

            {isOpen && (
                <div id = "dropdown">
                    <div id = "searchContainer">
                        <input
                            type="text"
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                            placeholder="Search..."
                            id="searchArea"
                        />
                        <div onClick={() => setContent('')} id="clear">
                            <img
                                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMTYgMTYiPjxwYXRoIGZpbGw9IiMwMjg0YzciIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0ibTcuMTE2IDhsLTQuNTU4IDQuNTU4bC44ODQuODg0TDggOC44ODRsNC41NTggNC41NThsLjg4NC0uODg0TDguODg0IDhsNC41NTgtNC41NThsLS44ODQtLjg4NEw4IDcuMTE2TDMuNDQyIDIuNTU4bC0uODg0Ljg4NHoiIGNsaXAtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg=="
                            />
                        </div>
                    </div>
                    <div id = "filters">
                        <div id = "favorites" onClick={() => setShowFavorites(true)}>FAVORITES</div>
                        <div id = "allCoins" onClick={() => setShowFavorites(false)}>ALL COINS</div>
                    </div>
                    <div id = "coins">
                        {displayCoins.sort().map((coin) => {
                            if (coin.trim() !== '') {
                                return <Coin key={coin} coin={coin} showFavorites={makeFavorites}/>;
                            }
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

export default App;