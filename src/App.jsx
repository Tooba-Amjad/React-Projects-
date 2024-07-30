import { useState } from 'react';
import Navbar from './Components/Navbar'; // Capitalized 'Navbar'
import {v4 as uuid4} from 'uuid';


function App() {
const [todo,setTodo]=useState("")
const[todos,setTodos]=useState([])
const HandleEdit=()=>{

}
const HandleDelete=(e,id)=>{
  console.log(`this is ${id}`)
  let index=todos.findIndex(item=>{
    return item.id===id
   })
  let newtodos= todos.filter(item=>{
    return item.id!==id
   });
   setTodos(newtodos)
}
const Add=()=>{
setTodos([...todos,{id:uuid4(),todo,isCompleted:false}])
setTodo('')

}
const handleChange=(e)=>{
  setTodo(e.target.value)
 
  }
  const HandleCheckbox=(e) => {
    let id=e.target.name;
   let index=todos.findIndex(item=>{
    return item.id==id
   })
   let newtodos=[...todos];
   newtodos[index].isCompleted=!newtodos[index].isCompleted;
   setTodos(newtodos);

  }
  
  return (
    <>
      <Navbar /> 
      <div className="container mx-auto my-5 rounded-xl bg-violet-100 p-5 min-h-[80vh]">
      <div className="addTodo my-5">
            <h2 className='text-lg font-bold'>Add a ToDo</h2>
          </div>
          <h1 className='text-lg font-bond'>Your Todos</h1>
          <input onChange={handleChange} value={todo} type="text"  className='w-1/2'/>
          <button onClick={Add} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 px-2 text-sm font-bold text-white rounded-md mx-6'>Add</button>
          <div/>
        
        <div className='todos'>
          {todos.length===0 && <div className='m-5'>No Todo to display</div>}
          {todos.map(item=>{

          return <div key={item.id}className='todo flex w-1/2 my-3 justify-between'>
            <input onChange={HandleCheckbox} type="checkbox" value={item.isCompleted}name={item.id} id="" />
            <div className={item.isCompleted?"line-through":""}>{item.todo}
            </div>
            <div className="buttons">
              <button onClick={(e)=>{HandleEdit(item.id)}} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 px-2 text-sm font-bold text-white rounded-md mx-1'>Edit</button>
              <button onClick={(e)=>{HandleDelete(e,item.id)}} className="bg-violet-800 hover:bg-violet-950 p-3 py-1 px-2 text-sm font-bold text-white rounded-md mx-1">Delete</button>
            </div>

          </div>
          })}
        
        </div>
      </div>
    
    </>
  );
}

export default App;
