import React, { useEffect, useState } from 'react'
import './Attempt.scss'
import Box from '../Box'

interface Props {
    input: string,
    word: string,
    currattempt: number,
    attemptno: number
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

    useEffect(() => {
        initializeColorCode();

    },[])


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

    // const findcount = (word : string, char_in : string) => {
    //         let split = word.split('')
    //         let count = 0
    //         for(let i = 0; i < split.length; ++i){
    //             if(word[i] === char_in){
    //                 count++
    //             }
    //         }
    //         return count
    // } 

    const findcolor = (input_char : string, index:number ) => {

        let word_index : number[] = []
        let input_index : number[] = []

        for(let i =0; i<5; ++i){

            if(word[i] === input_char){
                word_index.push(i)
            }

            if(input[i] === input_char){
                input_index.push(i)
            }



        }
        let same_indexes : number[] = word_index.filter((x) => input_index.includes(x))
        let diff_word_index = word_index.filter((x) => !same_indexes.includes(x))
        let diff_input_index = input_index.filter((x) => !same_indexes.includes(x))

        

        console.log('diff',input_char,index,diff_word_index,diff_input_index)
 

        return 'yellow'
    }




    const evaluate = () => {

        for(let i =0; i<5; ++i){

            setColorCodes((prev) =>{
                let newcolorcodes = prev
             
                if(word.split('').includes(input[i]))
                    newcolorcodes[i].color = findcolor(input[i],i)

                if(word[i] === newcolorcodes[i].char){
                    newcolorcodes[i].color = 'green'
                }
                if(!word.split('').includes(input[i])){
                    newcolorcodes[i].color = 'red'
                }
                
                return newcolorcodes
            })
        }
    }
 
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


