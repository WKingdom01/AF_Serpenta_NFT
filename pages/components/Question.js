import { useState } from 'react'


const Question =({question, answer}) => {
    const [open, setOpen] = useState(false) 


    return (
        <div className={`question ${open ? 'question--open' : ''}`} onClick={()=>setOpen(!open)}>
            <div className="question__title">{question}</div>
            <div className="question__answer">{answer}</div>
        </div>
    )
}

export default Question