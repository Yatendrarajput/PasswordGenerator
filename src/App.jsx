import { useState,useCallback, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const [length,setLength]=useState(8);
  const [numberAllowed,setNumberAllowed]=useState(false);
  const [charAllowed , setCharAllowed]=useState(false);
  const [password,setPassword]=useState("");
  //Reference hook
  const passwordRef= useRef(null);

  const passwordGenerator = useCallback(()=>{
    let pass ="";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 0; i <= length; i++) {
      let char= Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setPassword(pass);
  },
    [length,numberAllowed,charAllowed,setPassword])

// Function for copy

const copyToClipboard = useCallback(() => {
  passwordRef.current?.select()
  //let suppose u hhave to  select onnly portion of text then
  passwordRef.current?.setSelectionRange(0,5);
  window.navigator.clipboard.writeText(password)
    
}, [password]);

  
   useEffect(()=>{
    passwordGenerator()
   },[length,numberAllowed,charAllowed,passwordGenerator]);

  

  return (
    <>
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password generator</h1>
      <div className='flex items-center shadow rounded-lg overflow-hidden mb-4'>
        <input
          type='text'
          value={password}
          className='outline-none py-1 px-3 flex-grow rounded-l-lg'
          placeholder='password'
          readOnly
          ref={passwordRef}
        />
        <button className='outline-none bg-blue-700 text-white px-3 py-1 shrink-0 rounded-r-lg'
        onClick={copyToClipboard}>
          copy
        </button>
      </div>

      <div className='flex justify-center text-sm gap-x-6'>
         <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              className='cursor-pointer'
              onChange={(e)=>{setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
         </div>
         <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={()=>{
                setNumberAllowed((prev)=>!prev)
              }}
            />
            <label>Numbers</label>
         </div>
         <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id='numberInput'
              onChange={()=>{
                setCharAllowed((prev)=>!prev)
              }}
            />
            <label>Charcater</label>
         </div>
      </div>
    </div>
  </>
  )
}

export default App
