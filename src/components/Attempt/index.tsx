import React, { useEffect, useState } from 'react'
import './Attempt.scss'

interface Props {
    input: string,
    word: string,
    currattempt: number,
    attemptno: number
}

interface propsBox {
    char: string,
    color: string,
}

const Attempt : React.FC<Props> = ({input,word,currattempt,attemptno}) => {


    interface ColorCode{
        char: string,
        color: string
    }

    // const [attempt, setAttempt] = useState('')
    // const [wordsplit, setWordSplit] = useState<string[]>([])
    const [colorcodes, setColorCodes] = useState<ColorCode[]>([])

    const initializeColorCode = () => {
        for(let i=0; i<5; ++i){
            setColorCodes((prev) =>{
                return([...prev,{char: ' ', color:'purple'}])
            })
        }
    }


    const colorCode = () => {

    
            setColorCodes(()=>{

                let newcolorcodes = []

                for(let i=0; i<5; ++i){
                    if(input[i]){
                        newcolorcodes.push({char: input[i], color: 'purple'})
                    }
                    else{
                        newcolorcodes.push({char: ' ', color: 'grey'})
                    }
                }
                
                return newcolorcodes
            })

        
    }


    const evaluate = () => {

        console.log(colorcodes[1].char ,word[1])
        console.log(input[0].indexOf(input[0]))
        for(let i =0; i<5; ++i){

            setColorCodes((prev) =>{
                let newcolorcodes = prev
                if(word[i] === newcolorcodes[i].char){
                    newcolorcodes[i].color = 'green'
                }
                if(newcolorcodes[i].color != 'green' && word.split('').includes(input[i])){
                    newcolorcodes[i].color = 'yellow'
                }
                
                return newcolorcodes
            })
        }
    }
    
    useEffect(() => {
        // setWordSplit(word.split(''))
        initializeColorCode();

    },[])

    
    

    useEffect(() =>{


        colorCode();
        
        if(input.length === 5 && currattempt > attemptno){
            evaluate();
        }

        
    },[input, currattempt])



  return (
    <div className="attempt-wrapper">
        {colorcodes.map((item,i) => (<Box key={i} char={item.char} color={item.color}/>        
        ))}
    </div>

  )
}

export default Attempt


const Box: React.FC<propsBox> = ({char, color='grey'}) =>{

    return(
        <div className={`char-box ${color}`}>
                    {char}
        </div>
    )
}
