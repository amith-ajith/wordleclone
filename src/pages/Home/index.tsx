import React, { useEffect, useState } from 'react'
import Attempt from '../../components/Attempt'
import './Home.scss'

const wordlist = ["FLOAT","CLOCK", "BUILD", "GUILD", "FIELD"]




const Home: React.FC = () => {


  const [word, setWord] = useState('')
  const [currInput, setCurrInput] = useState('')
  const [attemptno, setAttemptNo] = useState(0)
  const [inputs, setInputs] = useState(['','','','','',''])
  
  useEffect(() => {
    let randomNo:number = Math.floor(Math.random()*wordlist.length)
    setWord(wordlist[randomNo])
  },[])

  const onKeyPress= (event: KeyboardEvent) =>{
    event.preventDefault()
    console.log(event.key)

    if(attemptno <= 5){
      
      if(event.code === 'Enter'){
      
        if(currInput.length === 5){
          setCurrInput('')
          setAttemptNo(attemptno+1)
        }
        return      
      }

      if(event.code === 'Backspace' && currInput.length>0){
        setCurrInput(currInput.substring(0,currInput.length-1))
        setInputs(prevState =>{
          var newState = prevState
          newState[attemptno] = newState[attemptno].substring(0,newState[attemptno].length-1)
          return newState
        })
      }
  
      if((/[a-zA-Z]/.test(event.key)) && (event.key.split('').length === 1)){
        if(currInput.split('').length <5){
          setCurrInput(prevState => (prevState+=event.key))
          setInputs(prevState =>{
            var newState = prevState
            newState[attemptno] = newState[attemptno]+=event.key
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

 


  console.log('curren input',currInput, currInput.length)

  return (
    <div className="home">
      <div className="wrapper">

        {inputs.map((input,i) => {
          return(<Attempt key={i} input={input} attemptno={attemptno}/>)
        })}

        
      </div>
    </div>
  )
}

export default Home