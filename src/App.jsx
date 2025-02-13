import { useState } from "react";
import "./App.css";
import ChatInput from "./components/ChatInput";
import ChatResponse from "./components/ChatResponse";
import { fetchChatResponse } from "./services/api";

function App() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleQuestionSubmit = async (question) => {
    setLoading(true);
    setResponse(null);

    try {
      const apiResponse = await fetchChatResponse(question);
      setResponse(apiResponse);
    } catch (error) {
      alert("Failed to retrieve response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand bg-info">
        <div className="container">
          <a href="#" className="navbar-brand">
            Nurd-EEE
          </a>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="#" className="nav-link active" aria-current="page">
                General Inquiry
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                Specialists
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link disabled">
                Math (WIP)
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div>
        <header className="bg-primary bg-gradient text-white text-center py-4">
          <h1>Ask the Ai</h1>
        </header>

        <ChatInput onSubmit={handleQuestionSubmit} />
        {loading ? (
          <div className="container my-4">
            <h1>Loading...</h1>
          </div>
        ) : (
          <ChatResponse response={response} />
        )}
      </div>
    </>
  );
}

export default App;
