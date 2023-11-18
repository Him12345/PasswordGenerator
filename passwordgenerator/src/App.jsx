import { useState,useEffect,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useCallback } from 'react';

function App() {


  const [length, setlength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [characterAllowed, setcharacterAllowed] = useState(false)
  const [password, setpassword] = useState()

//use useRef hook


const passwordRef=useRef(null);









  const passwordGenerator=useCallback(()=>{
       
     let pass=""
     let str="ABCDEFGHIJKLMNOPQRSTWXYZabcdefghijklmnopqrstuvwxyz"

     if(numberAllowed) str+="0123456789"
     if(characterAllowed) str+="!@£$%^&*(){}~`"
    

     for (let i = 1; i <length; i++) {

        let char=Math.floor(Math.random() * str.length + 1);
        pass+=str.charAt(char);


       
     }

     setpassword(pass);
     


  },[length,numberAllowed,characterAllowed,setpassword])


  const copypasswordtoclipboard=useCallback(()=>{
    passwordRef.current?.select();
    
    window.navigator.clipboard.writeText(password)
  },[password])



   useEffect(() => {
     passwordGenerator();

   }, [length,numberAllowed,characterAllowed,passwordGenerator])



  return (
    <>

      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-8 text-orange-500 bg-gray-700">

      <h1 className='text-white text-center'>Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
       <input type="text" ref={passwordRef} value={password} className="outline-none w-full py-1 px-3" placeholder='password' readOnly />
        <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copypasswordtoclipboard}>copy</button>
      </div>

       <div className="flex text-sm gap-x-2">
         <div className="flex items-center gap-x-1">
         <input type="range" min={6} max={100} value={length}  className="cursor-pointer" onChange={(e)=>{setlength(e.target.value)}}/>
         <label>length:{length}</label>

         </div>


         <div className="flex items-center gap-x-1">

           <input type="checkbox" defaultChecked={numberAllowed} id="numberInput" onChange={(e)=>{setnumberAllowed((prev)=>!prev)}}/>
         <label>Numbers</label>

         </div>

         <div className="flex items-center gap-x-1">

<input type="checkbox" defaultChecked={characterAllowed} id="numberInput" onChange={(e)=>{setcharacterAllowed((prev)=>!prev)}}/>
<label>Characters</label>

</div>
       </div>
      </div>
    </>
  )
}

export default App
