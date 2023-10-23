import { useRef, type KeyboardEvent, useState, useEffect } from 'react'
import { type Todo, createTodo, deleteTodo, getTodos } from './api/todos'
import Footer from './components/Footer'
import Input from './components/Input'
import SwitchThemeButton from './components/SwitchThemeButton'
import Title from './components/Title'
import TodoItem from './components/Todo'

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([])

  const inputRef = useRef<HTMLInputElement>(null)

  const onKeyUp = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const todo = await createTodo({
        value: inputRef.current?.value,
        checked: false
      })
      if (todo) {
        setTodos(todos => [todo, ...todos])
      }

      inputRef.current!.value = ''
    }
  }

  const handleDelete = async (id: string) => {
    await deleteTodo(id)
    setTodos(todos => todos.filter(todo => todo.id !== id))
  }

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await getTodos()
      setTodos(todos)
    }

    void fetchTodos()
  }, [])

  return (
    <div>
      <div className="flex justify-end p-5">
        <SwitchThemeButton />
      </div>
      <div className="mt-40 flex h-screen flex-col items-center text-gray-500">
        <Title color="pink" />
        <div className="mt-3 w-1/2 bg-white">
          <div className="z-30 flex w-full flex-col justify-between rounded-sm bg-white shadow-2xl dark:bg-gray-600 dark:text-white">
            <div>
              <Input onKeyUp={onKeyUp} ref={inputRef} />
              <ul id="list" className="min-h-[10rem] border-t border-t-gray-300">
                {todos.map(todo => (
                  <TodoItem key={todo.id} todo={todo} onDelete={async () => handleDelete(todo.id)} />
                ))}
              </ul>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}
