// Const listEl = document.getElementById('list')
// const countEl = document.getElementById('count')
// const toggleAllEl = document.getElementById('toggle-all')
// const clearCompletedEl = document.getElementById('clear-completed')

// let todos: Todo[] = []

// function renderTodos() {
//   const filter = document.location.hash.replace(/^#\//, '')
//   let filterTodos = [...todos]
//   if (filter === 'active') {
//     filterTodos = todos.filter(todo => !todo.checked)
//   } else if (filter === 'completed') {
//     filterTodos = todos.filter(todo => todo.checked)
//   }

//   listEl!.replaceChildren(...filterTodos.map(todo => createTodoItemEl(todo)))
//   let check = 0
//   todos.forEach(item => {
//     if (item.checked) {
//       check++
//     }
//   })
//   countEl!.innerText = String(todos.length - check)
//   if (check === todos.length && todos.length !== 0) {
//     toggleAllEl!.classList.add('text-black', 'cursor-pointer')
//   } else {
//     toggleAllEl!.classList.remove('text-black', 'cursor-pointer')
//   }

//   const haveOneCompletedItem = todos.some(item => item.checked)
//   if (haveOneCompletedItem) {
//     clearCompletedEl!.classList.toggle('invisible')
//   }
// }

// clearCompletedEl!.onclick = () => {
//   todos = todos.filter(item => !item.checked)
//   renderTodos()
// }

// toggleAllEl!.onclick = e => {
//   const target = e.target as HTMLButtonElement
//   if (target.classList.contains('text-black')) {
//     todos.forEach(item => {
//       item.checked = false
//     })
//   }

//   renderTodos()
// }

// inputEl.onkeyup = async e => {
//   if (e.key === 'Enter') {
//     await createTodo({
//       value: inputEl.value,
//       checked: false
//     })
//     inputEl.value = ''
//   }
// }

// listEl!.onclick = e => {
//   const target = e.target as HTMLLIElement
//   if (target.getAttribute('data-todo') === 'toggle') {
//     const id = target.parentElement!.parentElement!.dataset.id!
//     const newTodo = todos.find(item => item.id === id)
//     updateTodo(id, {
//       checked: !newTodo.checked
//     })
//   }

//   if (target.getAttribute('data-todo') === 'delete') {
//     const id = target.parentElement!.dataset.id!
//     deleteTodo(id)
//   }
// }

// listEl!.onkeydown = (e: KeyboardEvent) => {
//   const target = e.target as HTMLLIElement
//   if (e.keyCode === 13) {
//     e.preventDefault()
//     if (target.getAttribute('data-todo') === 'value') {
//       const id = target.parentElement!.parentElement!.dataset.id!
//       updateTodo(id, {
//         value: target.innerText
//       })
//     }
//   }
// }

// window.addEventListener('hashchange', () => {
//   renderTodos()
// })

// getTodos()
