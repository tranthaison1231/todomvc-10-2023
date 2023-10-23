export type Todo = {
  id: string
  value: string
  checked: boolean
}

export async function getTodos() {
  const res = await fetch('https://650446efc8869921ae24cc6d.mockapi.io/todos')
  const todos = (await res.json()) as Todo[]
  return todos
}

export async function updateTodo(id: string, todo: Partial<Todo>) {
  try {
    const res = await fetch(`https://650446efc8869921ae24cc6d.mockapi.io/todos/${id}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(todo)
    })
    const updatedTodo = (await res.json()) as Todo
    return updatedTodo
  } catch (error) {
    console.error(error)
  }
}

export async function deleteTodo(id: string) {
  try {
    await fetch(`https://650446efc8869921ae24cc6d.mockapi.io/todos/${id}`, {
      method: 'DELETE'
    })
  } catch (error) {
    console.error(error)
  }
}

export async function createTodo(todo: Partial<Todo>) {
  try {
    const res = await fetch(`https://650446efc8869921ae24cc6d.mockapi.io/todos`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(todo)
    })
    const newTodo = (await res.json()) as Todo
    return newTodo
  } catch (error) {
    console.error(error)
  }
}
