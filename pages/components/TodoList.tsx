import { X } from 'phosphor-react';
import React, { useState } from 'react'

type isList = {
  id: number;
  title: string;
  completed: boolean;
  onDelete: any;

}




export const TodoList = ({ title, completed, id, onDelete }: isList) => {
  const [isCompleted, setIsCompleted] = useState(completed)

  function handleToggleTaskCompletion() {
    setIsCompleted(!isCompleted)
  }

  const handleDel = () => {
    onDelete(id)
  }

  return (
    <div className={isCompleted ? 'task-container completed' : 'task-container'}>
      <div className="check-and-title">
        <label className="checkbox-container">
          <input
            type="checkbox"
            defaultChecked={isCompleted}
            onClick={handleToggleTaskCompletion}
          />

          <span className="checkmark">

          </span>
        </label>

        <p>{title}</p>
      </div>

      <div>
        <X
          size={24}
          onClick={handleDel}
        />
      </div>

    </div>
  )
}
