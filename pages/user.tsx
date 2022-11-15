import React, { FormEvent } from 'react'

function User() {
    
    const [feedbackItems,setFeedbackItems] = React.useState([])
    
    const email = React.useRef() as any
    const text = React.useRef() as any

    const createUser = (e:FormEvent) => {
        e.preventDefault()
        const emailVal = email!.current!.value
        const textVal = text!.current!.value
        
        const req = { email: emailVal, text: textVal }
        fetch("/api/feedback",{
            method:"POST",
            body: JSON.stringify(req),
            headers:{
                'content-type': 'application/json'
            }
        })
        .then((res:any) => res.json())
        .then((data:any) => console.log(data))
    }

    const loadData = () => {
        fetch("/api/feedback")
        .then((res:any) => res.json())
        .then((data:any) => {
            setFeedbackItems(data.data)
        })

    }
  return (
    <>
        <form >
            <input ref={email} type="email" name="" id="" />
            <input ref={text} type="text" name="" id="" />
            <button onClick={createUser}>send</button>
        </form>
        <hr />
        <div>
            <h4>feedback item</h4>
            <button onClick={loadData}>load feedback</button>
            <ul>
                {feedbackItems && feedbackItems.map((item:any) => (
                    <li key={item.id}>{item.text}</li>
                ))}
            </ul>
        </div>
    </>
  )
}

export default User