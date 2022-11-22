import React, { useCallback, useEffect, useState } from 'react'
import Attempt from '../../components/Attempt'
import Navbar from '../../components/Navbar'
import './Home.scss'
import {GrPowerReset} from 'react-icons/gr'
const wordlist = ["FLOAT","CLOCK", "BUILD", "GUILD", "FIELD"]




const Home: React.FC = () => {


  const [word, setWord] = useState('')
  const [currInput, setCurrInput] = useState('')
  const [currattempt, setAttemptNo] = useState(0)
  const [inputs, setInputs] = useState(['','','','','',''])
  const [winflag,setWinFlag] = useState(false)
  const [showreset,setShowReset] = useState(false)
  const [gameend,setGameEnd] = useState(false)
 

  const setRandomWord = () =>{
    let randomNo:number = Math.floor(Math.random()*wordlist.length)
    setWord(wordlist[randomNo])
  }
  
  useEffect(() => {
    setRandomWord()
  },[])

  const gamedone = () => {

    setShowReset(true)


  }

  const onKeyPress=  useCallback((event: KeyboardEvent) =>{
    event.preventDefault()

    if(winflag || gameend ){
      return
    }

    if(currattempt === 6){
      
      setGameEnd(true)
      
    }

    if(currattempt <= 5){
      
      if(event.code === 'Enter'){       

      
        if(currInput.length === 5){
          if(word === currInput){
            
            gamedone();
            setWinFlag(true)
            // setInputs(['','','','','',''])
            // setRandomWord()
            // setAttemptNo(0)
            // setCurrInput('')
            // return
            //victory
          }
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


     
  },[currInput,currattempt,gameend,winflag,word]);

  useEffect(() => {

    document.addEventListener('keydown', onKeyPress)

    return () =>{
      document.removeEventListener('keydown', onKeyPress)
    }

  },[onKeyPress])

 


  return (
    <div className="home">


      <Navbar/>
      <div className='main'>
        <div className='left'>

        </div>
        {/* {word} */}
        <div className="wrapper">

          {inputs.map((input,i) => {
            return(<Attempt key={i} input={input} word={word} currattempt={currattempt} attemptno ={i}/>)
          })}

          
        </div>
        <div className='right'>
          {showreset?"":<GrPowerReset color='white'/>
          }
          
        </div>

      </div>
      
    </div>
  )
}

export default Home