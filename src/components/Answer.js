import { useEffect, useState } from "react"
import { nanoid } from "nanoid"

const Answer = (props) => {
    const [answer, setAnswer] = useState({})

    useEffect(() => {
        setAnswer(() => ({
            id: nanoid(),
            answer: props.answer,
            isCorrect: props.isCorrect
        }))
    }, [props.answer])

    useEffect(() => { 
        setAnswer((answer) => ({
            ...answer,
            isChosen: props.isChosen === answer.answer ? true : false,
            style: props.isChosen === answer.answer ? "#D6DBF5" : "#F5F7FB"
        }))
    }, [props.isChosen])

    useEffect(() => {
        if (props.check) {
            setAnswer(answer => {
                let style
                if (!answer.isCorrect && answer.isChosen) {
                    style = "#F8BCBC"
                } else if (answer.isCorrect) {
                    style = "#94D7A2"

                } else {
                    style = "#F5F7FB"
                }
                return {
                    ...answer,
                    style: style
                }
            })
        }
    }, [props.check])



    // console.log(props.check)

    return (

        <div>
            <button 
                className="question--answers-button"
                style={{backgroundColor: answer.style}}
                onClick={props.setClicked}>{answer.answer}
                
            </button>
        </div>
    )
}

export default Answer