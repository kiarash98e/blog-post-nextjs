import path from 'path'
import fs from 'fs'
import React from 'react'

function Feedbacks(props) {
  return (
    <ul>
        { props.data && props.data.map((item:any) => (
            <li key={item.id}>{item.text}</li>
        ))}
    </ul>
  )
}

export const getStaticProps:GetStaticProps<any> = async() => {
    const reqeust = path.join(process.cwd(),"data","user.json")
    const readReq:any =  fs.readFileSync(reqeust)
    const dataAll = JSON.parse(readReq)
    return{
        props:{
            data: dataAll
        }
    }
}

export default Feedbacks