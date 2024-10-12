import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [ques, setQues] = useState("");
  const [ans, setAns] = useState("")

  async function generateAnswer() {
    setAns("loading...");
    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDLc4ntNrOnZ4fKIqPJ9kHjBaBs9EVYMvU",
        method: "post",
        data: { "contents": [{ "parts": [{ "text": ques }] }] } 
      });
      const generatedText = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
      setAns(generatedText);
    } catch (error) {
      setAns("Error generating response");
      console.error(error);
    }
  }

  return (
    <>
      <h1>AI Chat Bot</h1>
      <textarea 
        value={ques}
        onChange={(e) => setQues(e.target.value)} 
        cols="30"
        rows="10"
        placeholder="Ask a question..."
      ></textarea>
      <button onClick={generateAnswer}>Generate Answer</button>
      <p>{ans}</p>
    </>
  )
}

export default App;
