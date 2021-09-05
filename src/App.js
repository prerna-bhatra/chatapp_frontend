import React , {useState , useEffect } from 'react';
import io from 'socket.io-client';
import TextField from '@material-ui/core/TextField'
import logo from './logo.svg';
import './App.css';


const socket = io.connect("http://localhost:4000",{ transports : ['websocket'] })



function App() {
  const [state , setState ] = useState({message:" " , name:""})
  const [chat ,setChat] =useState([])

  const onMessageSubmit=(e)=>
  {
    console.log("socket",socket)
    
    e.preventDefault();
    console.log("SUBMIT")
    const {name,message}=state;
    socket.emit('message',{name,message})
    setState({message:"",name:""})
      
  }


  const onTxtChange=(e)=>
  {
    // console.log("EEEE",e?.target?.name ,"m",e?.target?.value)
    setState({...state,[e?.target?.name]:e?.target?.value})
  
  }

  const renderChat=()=>
  {
    // console.log("RENDER",chat,"LENGHT",chat.length)


    return chat.map(({name,message},index)=>(
        <div key={index}>
        <h3>{name}:<span>{message}</span></h3>
        </div>
    ))
  }


  useEffect(()=>{
    socket.on('message',({name,message})=>{
      setChat([...chat, {name , message}])
    })
  })
  
  return (
    <div className="card">
      <form onSubmit={(e)=>onMessageSubmit(e)}>
        <h1>Message</h1>
        <div className="name-field">
              <TextField 
              name ="name"
              onChange={e=>onTxtChange(e)}
              value={state?.name}
              label="Name">

              </TextField>
        </div>


        <div className="name-field">
              <TextField 
              name ="message"
              onChange={e=>onTxtChange(e)}
              value={state?.message}
              label="Message"
              variant="outlined"
              id="outlined-multiline-static">
             
              </TextField>
        </div>

        <button >
          Send 
        </button>
      </form>
      <div className="send-chat">
          <h1>Chat Log</h1>
          {renderChat()}
          {/* {
            chat.map((n,i)=>(
              <div>
                hjgfdb
              </div>
            ))
          } */}
      </div>
    </div>
  );
}

export default App;
