import { useRouter } from "next/router";
import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { TodoList } from "../components/TodoList";
import { IoMdAdd } from "react-icons/io";
import { X } from "phosphor-react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type isList = {
  id: number;
  title: string;
  completed: boolean;
  onDelete: Function;
}

type newTask = {
  id: number;
  title: string;
  isComplete: boolean;
}

const User = () => {
  const router = useRouter()
  const { id } = router.query


  const [task, setTask] = useState('')
  const [tasks, setTasks]: any = useState([])
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState([])

  function handleCreateTask() {
    if (task === '') {
      toast.error('Type some task')
    } else {
      const idRandom = (num: number) => Math.floor(Math.random() * num)

      const newTask = { id: idRandom(102343), title: task, isComplete: false }

      setTasks([...tasks, newTask])

      setTask("")
    }
  }

  function handleToggleTaskCompletion(id: number) {
    const taskComplete = tasks.map((task: newTask) => {
			if (task.id === id) {
				return { ...task, isComplete: !task.isComplete }
			}

			return task
		})

		setTasks(taskComplete)
  }

  const handleDelete = (id: number) => {
		setTasks(tasks.filter((remove: newTask) => remove.id !== id))
	}


  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${id}`)
    .then((response) => {
      //console.log(response.data)
      setTodos(response.data)
    })
  }, [])

  const onDelete = async (id: isList) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then((res) => {
      if(res.status !== 200) {
        return
      } else {
        setTodos(todos.filter((todo: number | any) => {
          return todo.id !== id;
        }))
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className='app'>

      <ToastContainer />

      <div className='todo'>

        <header>

          <input type="text" value={task} onChange={(e) => setTask(e.target.value)} />

          <button onClick={handleCreateTask}><IoMdAdd /></button>

        </header>


        {
          todos.map((todo: isList, id) => (
            <div key={id}>
              <TodoList id={todo.id} title={todo.title} completed={todo.completed} onDelete={onDelete}/>
            </div>
          ))
        }

        {/* Create a new to do */}

        {
          tasks.map((task: any) => (
            <div key={task.id} className={task.isComplete ? 'task-container completed' : 'task-container'}>
              <div className='check-and-title' >
                <label className="checkbox-container">
                  <input
                    onClick={() => handleToggleTaskCompletion(task.id)}
                    type="checkbox"
                  />

                  <p className='checkmark'></p>
                </label>

                <p>{task.title}</p>
              </div>

              <div>
                <X className='remove' onClick={() => handleDelete(task.id)} />
              </div>

            </div>
          ))}

      </div>

    </div>
  )
}

export default User