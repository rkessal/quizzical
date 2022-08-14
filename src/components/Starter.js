import React from "react"

const Starter = (props) => {
    return (
        <div className="starter">
            <h1 className="starter--title">Quizzical</h1>
            <button className="starter--button" onClick={props.start}>Start quiz</button>
        </div>
    )
}

export default Starter