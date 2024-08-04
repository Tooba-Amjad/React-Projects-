import { useEffect, useState } from 'react';
import Navbar from './Components/Navbar'; // Capitalized 'Navbar'
import {v4 as uuid4} from 'uuid';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
function App() {
const [todo,setTodo]=useState("")
const[todos,setTodos]=useState([])
const [finished, setfinished] = useState(true)
useEffect(() => {
  let todostring=localStorage.getItem("todos")
  if(todostring){
  let todos=JSON.parse(localStorage.getItem("todos"))
  setTodos(todos)}
 }, [])


  
const handle=(e)=>{
  setfinished(!finished)
  
}

const saveTOLS=() => {
  localStorage.setItem("todos",JSON.stringify(todos))
  
}

const HandleEdit=(e,id)=>{
 let t= todos.filter(i=>i.id===id)
  setTodo(t[0].todo)
  let newtodos= todos.filter(item=>{
    return item.id!==id
   });
   setTodos(newtodos)
   saveTOLS()
}
const HandleDelete=(e,id)=>{
 
  let index=todos.findIndex(item=>{
    return item.id===id
   })
  let newtodos= todos.filter(item=>{
    return item.id!==id
   });
   setTodos(newtodos)
   saveTOLS()
}
const Add=()=>{
setTodos([...todos,{id:uuid4(),todo,isCompleted:false}])
setTodo('')
saveTOLS()
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
   saveTOLS()
  }
  
  return (
    <>
      <Navbar /> 
      <div className="mx-3  md:container md:mx-auto my-5 rounded-xl bg-violet-100 p-5 min-h-[80vh] md:w-[35%]">
      <div className="addTodo my-5 flex flex-col gap-4">
        <h1 className='font-bold text-xl text-center'>ITask - Manage Your ToDos At One Place</h1>
            <h2 className='text-lg font-bold'>Add a ToDo</h2>
          
          <input onChange={handleChange} value={todo} type="text"  className='w-full'/>
          <button onClick={Add} disabled={todo.length<3}className='bg-violet-800 hover:bg-violet-950 p-3 py-1 px-2 text-sm font-bold text-white rounded-md '>Save</button>
          <div/>
        
          
          <h2 className='text-lg font-bond'>Your Todos</h2>
        <div className='todos'>
       <input type="checkbox" name="Finished Task "  checked={finished} onChange={handle}
       id="" /> Show Finished 
          {todos.length===0 && <div className='m-5'>No Todo to display</div>}
          {todos.map(item=>{

          return (finished || !item.isCompleted)&& <div key={item.id}className='todo flex my-3 justify-between'>
            <div className='flex gap-5'>

            
            <input onChange={HandleCheckbox} type="checkbox" checked={item.isCompleted}name={item.id} id="" />
            <div className={item.isCompleted?"line-through":""}>{item.todo}
            </div>
            </div>
            <div className="buttons flex h-full" >
              <button onClick={(e)=>{HandleEdit(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 px-2 text-sm font-bold text-white rounded-md mx-1'><MdEdit /></button>
              <button onClick={(e)=>{HandleDelete(e,item.id)}} className="bg-violet-800 hover:bg-violet-950 p-3 py-1 px-2 text-sm font-bold text-white rounded-md mx-1"><MdDelete /></button>
            </div>
           
          </div>
          })}
          </div>
        </div>
      </div>
    
    </>
  );
}

export default App;
