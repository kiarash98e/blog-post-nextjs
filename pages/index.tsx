import path from 'path'
import fs from 'fs/promises'
import { GetStaticProps } from 'next'

export default function Home(props:any) {
  const { data } = props
  return (
    <ul>
      {
        data.map((item:any) => (
          <li key={item.id}>{item.title}</li>
        ))
      }
    </ul>
  )
}

export const getStaticProps:GetStaticProps<any> =  async(context) => {
  const filePath = path.join(process.cwd(), "data","data.json")
  const jsonData:any = await fs.readFile(filePath)
  const data = JSON.parse(jsonData)
  
  if (!data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
        // statusCode: 301
      },
    }
  }

  if (!data.data || data.data.length === 0) {
    return { notFound: true }
  }

  return {
    props:{
      data: data.data
    },
    revalidate: 120
  }
}
