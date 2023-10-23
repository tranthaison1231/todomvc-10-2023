import { type Todo } from 'src/api/todos'

type TodoProps = {
  todo: Todo
  onDelete: () => void
}

export default function TodoItem({ todo, onDelete }: TodoProps) {
  return (
    <li className="group flex justify-between border-b border-b-gray-300 p-4">
      <div className="flex items-center gap-3">
        <svg
          data-todo="toggle"
          className={`lucide lucide-circle ${todo.checked ? 'text-green-500' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          {todo.checked ? (
            <>
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="m9 12 2 2 4-4" />
            </>
          ) : (
            <circle cx="12" cy="12" r="10" />
          )}
        </svg>
        <div contentEditable="true" data-todo="value" className={`${todo.checked ? 'line-through' : ''} p-2 text-2xl`}>
          {todo.value}
        </div>
      </div>
      <svg
        data-todo="delete"
        className="lucide lucide-trash hidden cursor-pointer group-hover:block"
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        onClick={onDelete}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      </svg>
    </li>
  )
}
