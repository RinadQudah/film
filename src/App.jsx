import 'bootstrap/dist/css/bootstrap.css'
import Header from './Header'
import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
function App() {
  const main_url = "https://api.themoviedb.org/3/movie/popular?api_key=155d30a4cdf065f8a650d5ca8000c15a"
  const search_url = "https://api.themoviedb.org/3/search/movie?api_key=d7835d06aa9bf95f73ab15509e7dc769&query=Frozen"
  const img_url = "https://image.tmdb.org/t/p/w500/"
  const [movies, setMovies] = useState([])  
  const [buttonClicked, setButtonClicked] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const openDetailsModal = (movie) => {
    setSelectedMovie(movie)
    setButtonClicked(true)
  };

  const closeDetailsModal = () => {
    setSelectedMovie(null)
    setButtonClicked(false)
  };

  const searchMovies = (query) => {
    axios
      .get(search_url, {params:{query}}).then((response) => {
        setSearchResults(response.data.results)})
      .catch((error) => {
      console.error("Error fetching search results:", error);
      })
  }
  useEffect(() => {
    axios.get(main_url).then(response => {
        setMovies(response.data.results)
      })
      .catch(error => {
        console.error("Error fetching data:", error)})
  }, [main_url])
    return (
    <>
    <div className="fixed-background"></div>
      <div className="content-container">
        <Header onSearch={searchMovies} />
        <div className="container">
          <div className="row">
            {(searchResults.length > 0 ? searchResults : movies).map((movie) => (
              <div key={movie.id} className="col-md-3 mb-3">
                <div className="card h-100">
                  <div>
                    {selectedMovie === movie ? null : ( // Conditionally render the image
                      <img src={img_url + movie.poster_path} alt={movie.title} className="card-img-top" />
                    )}
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                    {selectedMovie === movie ? (
                      <p className="card-text">{movie.overview}</p>
                    ) : (
                      <button
                        onClick={() => openDetailsModal(movie)}
                        style={{backgroundColor:"black",color:"whitesmoke"}}
                      >
                        See Details
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {selectedMovie && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeDetailsModal}>
                &times;
              </span>
              <h2>{selectedMovie.title}</h2>
              <p>{selectedMovie.overview}</p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default App
