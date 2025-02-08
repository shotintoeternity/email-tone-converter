import React, { useState } from 'react';

function App() {
  const [emailText, setEmailText] = useState('');
  const [tone, setTone] = useState('Professional');
  const [convertedEmail, setConvertedEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setConvertedEmail('');
    setError(null);
    try {
      // Use absolute URL to ensure the request goes directly to the backend
      const response = await fetch('http://localhost:5000/api/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailText, tone })
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Conversion failed');
      }
      const data = await response.json();
      setConvertedEmail(data.convertedEmail || "");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(convertedEmail)
      .then(() => alert("Email copied to clipboard!"))
      .catch((err) => alert("Failed to copy: " + err));
  };

  return (
    <div className="App">
      <h1>Email Tone Converter</h1>
      <p>
        Paste your email text or idea, select a tone, and click "Convert Email Tone" to see it rewritten.
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={emailText}
          onChange={(e) => setEmailText(e.target.value)}
          placeholder="Enter your email or idea here..."
          rows={10}
          className="email-textarea"
        />
        <div className="tone-options">
          <label>
            <input
              type="radio"
              value="Professional"
              checked={tone === 'Professional'}
              onChange={(e) => setTone(e.target.value)}
            />{' '}
            Professional
          </label>
          <label>
            <input
              type="radio"
              value="Casual"
              checked={tone === 'Casual'}
              onChange={(e) => setTone(e.target.value)}
            />{' '}
            Casual
          </label>
          <label>
            <input
              type="radio"
              value="Friendly"
              checked={tone === 'Friendly'}
              onChange={(e) => setTone(e.target.value)}
            />{' '}
            Friendly
          </label>
        </div>
        <button type="submit" className="convert-button" disabled={loading}>
          {loading ? 'Converting...' : 'Convert Email Tone'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {convertedEmail && (
        <div className="result-card">
          <button 
            type="button" 
            className="copy-button" 
            onClick={copyEmail} 
            title="Copy email">
            📋
          </button>
          <p>{convertedEmail}</p>
        </div>
      )}
    </div>
  );
}

export default App;
