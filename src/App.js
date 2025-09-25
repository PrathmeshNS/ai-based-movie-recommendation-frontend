import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [recommendations, setRecommendations] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [source, setSource] = useState(null);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  const getRecommendations = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      setError(null);
      const response = await axios.post(`${API_URL}/recommend`, { query: query.trim() });
      setRecommendations(response.data.recommendations || []);
      setSource(response.data.source || null);
    } catch (error) {
      console.error('Error getting recommendations:', error);
      setError(error?.response?.data || error.message || 'Unknown error');
      setRecommendations([]);
      setSource(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getRecommendations();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎬 AI Movie Recommendation Engine</h1>
        <p>Discover your next favorite movie with AI-powered suggestions</p>
      </header>
      <main>
        <section className="hero">
          <h2>Get Personalized Movie Recommendations</h2>
          <form onSubmit={handleSubmit} className="recommendation-controls">
            <label htmlFor="query">Enter your movie preference (e.g., "horror", "romance", "action"):</label>
            <input
              id="query"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., horror, sci-fi, comedy"
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Getting AI Recommendations...' : 'Get AI Suggestions'}
            </button>
          </form>
        </section>

        {recommendations.length > 0 && (
          <section className="recommendations">
            <h2>🎯 AI-Recommended Movies for You</h2>
            {source && <div className="source-badge">Source: {source}</div>}
            <p>Based on your query "{query}", our AI suggests these movies:</p>
            <div className="movie-grid">
              {recommendations.map(movie => (
                <div key={movie.id} className="movie-card">
                    <div className="movie-poster">
                      <img
                        src={movie.poster || `https://via.placeholder.com/200x300?text=${encodeURIComponent(movie.title)}`}
                        alt={movie.title}
                        onError={(e) => { e.target.onerror = null; e.target.src = `https://via.placeholder.com/200x300?text=${encodeURIComponent(movie.title)}` }}
                      />
                    </div>
                  <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <p>Genre: {movie.genre} • Year: {movie.year}</p>
                    <p>Rating: {movie.rating}/10</p>
                    <p>{movie.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        {error && (
          <section className="error-banner">
            <strong>API Error:</strong> {typeof error === 'string' ? error : JSON.stringify(error)}
          </section>
        )}
      </main>
      <footer>
        <p>Powered by AI • Built with React & Python</p>
      </footer>
    </div>
  );
}

export default App;