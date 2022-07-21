import React, { useEffect, useState } from 'react'
import Attempt from '../../components/Attempt'
import './Home.scss'

const wordlist = ["FLOAT","CLOCK", "BUILD", "GUILD", "FIELD"]




const Home: React.FC = () => {


  const [word, setWord] = useState('')
  const [currInput, setCurrInput] = useState('')
  const [currattempt, setAttemptNo] = useState(0)
  const [inputs, setInputs] = useState(['','','','','',''])
  
  useEffect(() => {
    let randomNo:number = Math.floor(Math.random()*wordlist.length)
    setWord(wordlist[randomNo])
  },[])

  const onKeyPress= (event: KeyboardEvent) =>{
    event.preventDefault()

    if(currattempt <= 5){
      
      if(event.code === 'Enter'){
      
        if(currInput.length === 5){
          setCurrInput('')
          setAttemptNo(currattempt+1)
        }
        return      
      }

      if(event.code === 'Backspace' && currInput.length>0){
        setCurrInput(currInput.substring(0,currInput.length-1))
        setInputs(prevState =>{
          var newState = prevState
          newState[currattempt] = newState[currattempt].substring(0,newState[currattempt].length-1)
          return newState
        })
      }
  
      if((/[a-zA-Z]/.test(event.key)) && (event.key.split('').length === 1)){
        if(currInput.split('').length <5){
          setCurrInput(prevState => (prevState+=event.key.toUpperCase()))
          setInputs(prevState =>{
            var newState = prevState
            newState[currattempt] = newState[currattempt]+=event.key.toUpperCase()
            return newState
          })
        }
      }

    }

    

    


     
  }

  useEffect(() => {

    document.addEventListener('keydown', onKeyPress)

    return () =>{
      document.removeEventListener('keydown', onKeyPress)
    }

  },[onKeyPress])

 


  return (
    <div className="home">
      {word}
      <div className="wrapper">

        {inputs.map((input,i) => {
          return(<Attempt key={i} input={input} word={word} currattempt={currattempt} attemptno ={i}/>)
        })}

        
      </div>
    </div>
  )
}

export default Home