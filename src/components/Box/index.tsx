import React from 'react'



interface propsBox {
    char: string,
    color: string,
}



const Box: React.FC<propsBox> = ({char, color='grey'}) =>{

    return(
        <div className={`char-box ${color}`}>
                    {char}
        </div>
    )
}

export default Box
