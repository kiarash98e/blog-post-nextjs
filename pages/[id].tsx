import path from 'path'
import fs from 'fs/promises'
import { GetStaticPaths, GetStaticProps } from 'next'

type data = {
    
    id:string
    title:string
}

function Detail(props:any) {
  
    const { product } = props
    
    if (!product) {
       return <p>Loading....</p> 
    }
    
    return (
        <div>{product.title}</div>
    )
}



export const getStaticProps:GetStaticProps<any> = async(context) => {
    const { params } = context

    const productId = params!.id
    const filePath = path.join(process.cwd(), "data","data.json")
    const jsonData:any = await fs.readFile(filePath)
    const data = JSON.parse(jsonData)
    const product:data[] = data!.data.find((item:any) => item.id === productId)

    if (!product) {
        return { notFound: true }
    }
    return {
        props:{
            product
        }
    }
}

export const getStaticPaths = async() => {
    const filePath = path.join(process.cwd(), "data","data.json")
    const jsonData:any = await fs.readFile(filePath)
    const data =  JSON.parse(jsonData)
    const ids = data.data.map((item:any) => { return {params:{id:item.id}}})
    
    return {
        paths:ids,
        fallback: true
    }
}

export default Detail