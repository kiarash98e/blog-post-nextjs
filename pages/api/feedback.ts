// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs'
import path from 'path'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === "POST") {
    
    const email = req.body.email
    const text = req.body.text
    
    const newUser = {
      id: new Date().toString(),
      email: email,
      text: text
    }


    const reqeust = path.join(process.cwd(),"data","user.json")
    const readReq:any =  fs.readFileSync(reqeust)
    const dataAll = JSON.parse(readReq)
    dataAll.push(newUser)
    fs.writeFileSync(reqeust,JSON.stringify(dataAll))
    res.status(201).json({ data: newUser })
  }
  else{
    res.status(200).json({ name: 'John Doe' })
  }
}
