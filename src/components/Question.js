import React, { useEffect, useState } from "react"
import { nanoid } from "nanoid"
import Answer from "./Answer"

const Question = (props) => {

    const [question, setQuestion] = useState({
        id: nanoid(),
        question: "",
        answers: [],
        correctAnswer: "",
        clicked: ""
    })

    const [chosenAnswer, setChosenAnswer] = useState("")
    const [check, setCheck] = useState(false)    

    useEffect(() => {
        setQuestion(prevQuestion => {
            if (prevQuestion.question !== null) {

                let answers = [
                    props.data.correct_answer,
                    ...props.data.incorrect_answers
                ]
        
                let shuffledAnswers = answers
                .map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value)

                return {
                    id: nanoid(),
                    question: props.data.question,
                    answers: shuffledAnswers,
                    correctAnswer: props.data.correct_answer
                }
            }

        })
    }, [props.data.question])

    useEffect(() => {
        setCheck(props.check)
        props.getResults(question.correctAnswer, question.clicked)
    }, [props.check])

    function setClicked(answer) {        
        setQuestion((prevQuestion) => {

            if (prevQuestion.question !== "") {
                setChosenAnswer(answer)
                return {
                    ...prevQuestion,
                    clicked: answer
                }
            }
        })
    }
    
    console.log(question.question)
    console.log(props.data.question)


    return (
        <div className="question">
            <div className="question--question">
                {question.question}
            </div>
            <div className="question--answers">
                {   question.answers.map(answer => {
                        
                        const isCorrect = answer === question.correctAnswer ? true : false
                        
                        return (
                            <Answer
                                answer={answer}
                                isCorrect={isCorrect}
                                isChosen={chosenAnswer}
                                setClicked={() => setClicked(answer)} 
                                check={check}
                                />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Question