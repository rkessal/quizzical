import "./App.css"
import React, { useState, useEffect } from "react"
import Starter from "./components/Starter"
import Question from "./components/Question"
import { nanoid } from "nanoid"

function App() {

  const [start, setStart] = useState(false)
  const apiURL = "https://opentdb.com/api.php?amount=5&type=multiple"
  const [apiResult, setApiResult] = useState("")
  const [answers, setAnswers] = useState([])
  const [check, setCheck] = useState(false)
  const [score, setScore] = useState(0)


  useEffect(() => {
      fetchQuestions()
  }, [])

  function fetchQuestions() {
    console.log("hi")
    const headers = {"Content-Type": "application/json"}
    fetch(apiURL, headers)
          .then(res => res.json())
          .then(data => setApiResult(data.results))
    
    console.log(apiResult[0])
  }

  function startQuiz() {
    setStart(true)
  }

  function checkAnswers() {
    setCheck(!check)
    setScore(0)
    if (check) {
      fetchQuestions()
    }
  }

  function getResults(correctAnswer, chosenAnswer) {
    if (check) {
      if (correctAnswer === chosenAnswer) {
        setScore(score => score + 1)
      }
    }  
  }


  return (
    <div className="App">
      {
        start ?
        <>
            <div className="app--questions">
            <Question
              
              data={apiResult[0]} 
              key={0} 
              check={check} 
              answer={answers[0]}
              getResults={getResults} 
            /> 
            <Question 
              data={apiResult[1]} 
              key={1} 
              check={check} 
              answer={answers[1]}
              getResults={getResults}
            /> 
            <Question 
              data={apiResult[2]} 
              key={2} 
              check={check} 
              answer={answers[2]}
              getResults={getResults}
            /> 
            <Question 
              data={apiResult[3]} 
              key={3} 
              check={check} 
              answer={answers[3]}
              getResults={getResults}
            /> 
            <Question 
              data={apiResult[4]} 
              key={4} 
              check={check} 
              answer={answers[4]}
              getResults={getResults}
            /> 
          </div>
          <div className="app--footer">
            {check && <div className="results">
              {`You scored ${score} /5 correct answers`}
            </div>}
            <button 
              className="check-answers"
              onClick={checkAnswers}
            >
              { check ? "Play again" : "Check answers"}
            </button>
          </div>
        </>
          :
          <Starter start={startQuiz}/>
        }
    </div>
  );
}

export default App;
