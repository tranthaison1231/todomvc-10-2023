const inputEl = document.getElementById('input') as HTMLInputElement;
const listEl = document.getElementById('list');
const countEl = document.getElementById('count');
const toggleAllEl = document.getElementById('toggle-all');
const clearCompletedEl = document.getElementById('clear-completed');
const changeThemeEl = document.getElementById('change-theme');

function setDarkTheme(): void {
  localStorage.setItem('theme', 'dark');
  changeThemeEl!.innerHTML = `
      <circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
    `;
}

const theme = localStorage.getItem('theme');
if (theme === 'dark') {
  document.documentElement.classList.add('dark');
  setDarkTheme();
}
interface Todo {
  id: number;
  value: string;
  checked: boolean;
}

let TODOS: Todo[] = sessionStorage.getItem('todos') ? JSON.parse(sessionStorage.getItem('todos')!) : [];

function createTodoItemEl(todo: Todo) {
  const li = document.createElement('li');
  li.dataset.id = String(todo.id);
  li.className = 'group border-b flex justify-between border-b-gray-300 p-4';
  li.insertAdjacentHTML(
    'afterbegin',
    `
      <div class="flex gap-3 items-center" >
        <svg data-todo="toggle" class="${
          todo.checked ? 'text-green-500' : ''
        }" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle">
          ${
            todo.checked
              ? `<path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="m9 12 2 2 4-4" />`
              : '<circle cx="12" cy="12" r="10"/>'
          }
        </svg>
        <div contenteditable="true" data-todo="value" class="text-2xl p-2 ${todo.checked ? 'line-through' : ''}"> ${
      todo.value
    }</div>
      </div>
      <svg data-todo="delete" class="cursor-pointer hidden group-hover:block" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
    `
  );
  return li;
}

function renderTodos() {
  const filter = document.location.hash.replace(/^#\//, '');
  let filterTodos = [...TODOS];
  if (filter === 'active') filterTodos = TODOS.filter((todo) => !todo.checked);
  else if (filter === 'completed') filterTodos = TODOS.filter((todo) => todo.checked);
  listEl!.replaceChildren(...filterTodos.map((todo) => createTodoItemEl(todo)));
  let check = 0;
  TODOS.forEach((item) => {
    if (item.checked) {
      check++;
    }
  });
  countEl!.innerText = String(TODOS.length - check);
  if (check === TODOS.length && TODOS.length !== 0) {
    toggleAllEl!.classList.add('text-black', 'cursor-pointer');
  } else {
    toggleAllEl!.classList.remove('text-black', 'cursor-pointer');
  }
  const haveOneCompletedItem = TODOS.some((item) => item.checked);
  if (haveOneCompletedItem) {
    clearCompletedEl!.classList.toggle('invisible');
  }
}

clearCompletedEl!.onclick = () => {
  TODOS = TODOS.filter((item) => !item.checked);
  sessionStorage.setItem('todos', JSON.stringify(TODOS));
  renderTodos();
};

toggleAllEl!.onclick = (e) => {
  const target = e.target as HTMLButtonElement;
  if (target.classList.contains('text-black')) {
    TODOS.forEach((item) => (item.checked = false));
  }
  sessionStorage.setItem('todos', JSON.stringify(TODOS));
  renderTodos();
};

inputEl.onkeyup = (e) => {
  if (e.key === 'Enter') {
    TODOS.push({
      id: Date.now(),
      value: inputEl.value,
      checked: false,
    });
    sessionStorage.setItem('todos', JSON.stringify(TODOS));
    renderTodos();
    inputEl.value = '';
  }
};

listEl!.onclick = (e) => {
  const target = e.target as HTMLLIElement;
  if (target.getAttribute('data-todo') === 'toggle') {
    const id = parseInt(target.parentElement!.parentElement!.dataset.id!);
    TODOS = TODOS.map((item) => {
      if (item.id === id) {
        item.checked = !item.checked;
      }
      return item;
    });
    sessionStorage.setItem('todos', JSON.stringify(TODOS));
    renderTodos();
  }
  if (target.getAttribute('data-todo') === 'delete') {
    TODOS = TODOS.filter((item) => item.id !== parseInt(target.parentElement!.dataset.id!));
    sessionStorage.setItem('todos', JSON.stringify(TODOS));
    renderTodos();
  }
};

listEl!.onkeydown = (e: KeyboardEvent) => {
  const target = e.target as HTMLLIElement;
  if (e.keyCode === 13) {
    e.preventDefault();
    if (target.getAttribute('data-todo') === 'value') {
      const id = parseInt(target.parentElement!.parentElement!.dataset.id!);
      TODOS = TODOS.map((item) => {
        if (item.id === id) {
          item.value = target.innerText;
        }
        return item;
      });
      sessionStorage.setItem('todos', JSON.stringify(TODOS));
      renderTodos();
    }
  }
};

changeThemeEl!.onclick = () => {
  document.documentElement.classList.toggle('dark');
  if (document.documentElement.classList.contains('dark')) {
    setDarkTheme();
  } else {
    changeThemeEl!.innerHTML = `
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    `;
    localStorage.setItem('theme', 'light');
  }
};

window.addEventListener('hashchange', () => {
  renderTodos();
});

renderTodos();
