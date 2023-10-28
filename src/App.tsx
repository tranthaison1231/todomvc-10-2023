import { useRef, type KeyboardEvent, useState, useEffect } from 'react'
import { type Todo, createTodo, deleteTodo, getTodos, updateTodo } from './api/todos'
import Footer from './components/Footer'
import Input from './components/Input'
import SwitchThemeButton from './components/SwitchThemeButton'
import Title from './components/Title'
import TodoItem from './components/Todo'
import { useHash } from './hooks/useHash'

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const hash = useHash()
  const filter = hash.replace(/^#\//, '')

  const inputRef = useRef<HTMLInputElement>(null)

  const onKeyUp = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current?.value.trim() !== '') {
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

  const handleToggle = async (id: string) => {
    const todo = todos.find(item => item.id === id)
    if (!todo) return
    await updateTodo(id, {
      checked: !todo.checked
    })
    setTodos(todos => todos.map(todo => (todo.id === id ? { ...todo, checked: !todo.checked } : todo)))
  }

  const handleDelete = async (id: string) => {
    await deleteTodo(id)
    setTodos(todos => todos.filter(todo => todo.id !== id))
  }

  const leftTotal = todos.filter(todo => !todo.checked).length

  const toggleAll = async () => {
    const newTodos = todos.map(todo => ({
      ...todo,
      checked: Boolean(leftTotal)
    }))
    await Promise.all(newTodos.map(async todo => updateTodo(todo.id, todo)))
    setTodos(newTodos)
  }

  const clearCompleted = async () => {
    const deletedTodos = todos.filter(todo => todo.checked)
    await Promise.all(deletedTodos.map(async todo => deleteTodo(todo.id)))
    setTodos(todos.filter(todo => !todo.checked))
  }

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await getTodos()
      setTodos(todos)
    }

    void fetchTodos()
  }, [])

  let filterTodos = [...todos]
  if (filter === 'active') {
    filterTodos = todos.filter(todo => !todo.checked)
  } else if (filter === 'completed') {
    filterTodos = todos.filter(todo => todo.checked)
  }

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
              <Input
                iconClick={toggleAll}
                onKeyUp={onKeyUp}
                ref={inputRef}
                iconClass={leftTotal === 0 ? 'text-black' : ''}
              />
              <ul id="list" className="min-h-[10rem] border-t border-t-gray-300">
                {filterTodos.map(todo => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onDelete={async () => handleDelete(todo.id)}
                    onToggle={async () => handleToggle(todo.id)}
                  />
                ))}
              </ul>
            </div>
            <Footer
              clearCompleted={clearCompleted}
              leftTotal={todos.filter(todo => !todo.checked).length}
              canClearCompleted={todos.filter(todo => todo.checked).length > 0}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
