import { useState, useCallback,useEffect} from 'react';
import './App.css';

function App() {
    const [length, setLength] = useState(8);
    const [numberAllowed, setNumberAllowed] = useState(false);
    const [stringAllowed, setStringAllowed] = useState(false);
    const [password, setPassword] = useState("");

    const passwordGenerator = useCallback(() => {
        let pass = "";
        let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (numberAllowed) {
            str += "0123456789";
        }
        if (stringAllowed) {
            str += "!@#%^&*()?><";
        }

        for (let i = 0; i < length; i++) {
            let char = Math.floor(Math.random() * str.length);
            pass += str.charAt(char);
        }
        setPassword(pass);
    }, [length, numberAllowed, stringAllowed]);
useEffect(()=>{
    passwordGenerator();

},[setLength,setNumberAllowed,setStringAllowed,passwordGenerator])
    return (
        <>
            <h1 className='text-center text-pretty bg-orange-700'>Password Generator</h1>
            <input type="text" value={password} readOnly className='bg-purple-700' />
            <button className='bg-cyan-700' onClick={() => navigator.clipboard.writeText(password)}>Copy</button>
            <input 
                type="range" 
                min={6} 
                max={100} 
                value={length} 
                onChange={(e) => setLength(e.target.value)} 
            />
            <label>Length: {length}</label>
            <input 
                type="checkbox" 
                checked={numberAllowed} 
                onChange={() => setNumberAllowed((prev) => !prev)} 
            />
            <label>Include Numbers</label>
            <input 
                type="checkbox" 
                checked={stringAllowed} 
                onChange={() => setStringAllowed((prev) => !prev)} 
            />
            <label>Include Special Characters</label>
            {/* <button className='bg-blue-700' onClick={passwordGenerator}>Generate Password</button> */}
        </>
    );
}

export default App;

