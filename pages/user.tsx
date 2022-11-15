import React, { FormEvent } from 'react'

function User() {
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
  return (
    <>
        <form >
            <input ref={email} type="email" name="" id="" />
            <input ref={text} type="text" name="" id="" />
            <button onClick={createUser}>send</button>
        </form>
    </>
  )
}

export default User