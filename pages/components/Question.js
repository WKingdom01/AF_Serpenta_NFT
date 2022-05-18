import { useState } from 'react'


const Question = ({ question, answer }) => {


    return (
        <div className={`question`}>
            <div className="question__title">{question}</div>
            <div className="question__answer">{answer}</div>
        </div>
    )
}

export default Question