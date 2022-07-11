import React, { useEffect, useState } from 'react'
import './Attempt.scss'

interface Props {
    input: string,
    attemptno: number
}

const Attempt : React.FC<Props> = ({input,attemptno}) => {

    const [attempt, setAttempt] = useState('')

    useEffect(() =>{
        
        var len = input.split('').length
        setAttempt((prev) =>{
           var newstate = input
           for(let i=0; i<5-len; ++i){
            newstate+= ' '
           }
           return newstate
        })
    })

  return (
    <div className="attempt-wrapper">
        {attempt.split('').map((char,i) => (
            <div key={i} className="char-box">
                {char}
            </div>
        ))}
    </div>

  )
}

export default Attempt