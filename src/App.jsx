import { useState, useCallback, useEffect,useRef } from 'react'

function App() {
  const [length, setLength] = useState(10)
  const [isNumberAllowed, setIsNumberAllowed] = useState(false)
  const [isCharAllowed, setIsCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)
const copyPasswordToClipboard=useCallback(()=>{
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange(0,25)
  window.navigator.clipboard.writeText(password)  
},[password])
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (isNumberAllowed) str += "0123456789"
    if (isCharAllowed) str += "!@#$%^&*()-+"
    
    for (let i = 1; i < length; i++) {
      let charIndex = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(charIndex)
    }
    setPassword(pass)
  }, [length, isNumberAllowed, isCharAllowed])

  useEffect(() => {
    passwordGenerator()
  }, [passwordGenerator])

  return (
    <>
      <h1 className="text-3xl text-center">Password Generator</h1>
      <div className="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md p-6 m-auto mt-10">
        <p className="text-lg font-semibold">Generated Password:</p>
        <input type="text" value={password} readOnly className="border border-gray-300 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Generated Password" ref={passwordRef} />
        <button onClick={copyPasswordToClipboard} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Copy</button>
      </div>
      <div className="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md p-6 m-auto mt-10">
        <div className="flex items-center mb-4">
          <input type="range" id="length" min="4" max="80" value={length} onChange={(e) => setLength(parseInt(e.target.value))} className="mr-2" />
          <label htmlFor="length">Password Length: {length}</label>
        </div>
        <div className="flex items-center mb-4">
          <input type="checkbox" id="numbers" checked={isNumberAllowed} onChange={(e) => setIsNumberAllowed(e.target.checked)} className="mr-2" />
          <label htmlFor="numbers">Include Numbers</label>
        </div>
        <div className="flex items-center mb-4">
          <input type="checkbox" id="characters" checked={isCharAllowed} onChange={(e) => setIsCharAllowed(e.target.checked)} className="mr-2" />
          <label htmlFor="characters">Include Special Characters</label>
        </div>
      </div>  
    </>  
  )
}

export default App