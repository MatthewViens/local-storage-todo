const todoList = document.getElementById('todo-list')
const todoForm = document.getElementById('todo-form')
const todoInput = document.getElementById('todo-input')

let todos = []

const saveTodos = () => {
    const stringified = JSON.stringify(todos)
    localStorage.setItem('todos', stringified)
    renderTodos()
}

const renderTodos = () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [] 
    todoList.innerHTML = ''
    for (const todo of todos) {
        createTodoEl(todo)
    }
}

const deleteTodo = (deleteEl) => {
    for (const todo of todos) {
        if (deleteEl.dataset.key == todo.key) {
            todos.splice(todos.indexOf(todo), 1)
        }
    }
    saveTodos()
}

const changeTodoStatus = (todoEl) => {
    for (const todo of todos) {
        if (todoEl.dataset.key == todo.key) {
            todo.status === "new" ? todo.status = "done" : todo.status = "new"
        }
    }
    saveTodos()
}

const createTodoEl = (todo) => {
    const newEntry = document.createElement('li')
    const deleteEl = document.createElement('span')
    deleteEl.textContent = 'X'
    newEntry.textContent = todo.value
    newEntry.dataset.key = todo.key
    deleteEl.dataset.key = todo.key
    deleteEl.addEventListener('click', (e) => deleteTodo(e.target))
    newEntry.appendChild(deleteEl)
    newEntry.addEventListener('click', (e) => changeTodoStatus(e.target))
    if (todo.status === 'done') {
        newEntry.classList.add('done')
    }
    todoList.appendChild(newEntry)
}

todoForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const todo = {
        key: Date.now(),
        value: todoInput.value,
        status: "new"
    }
    todoInput.value = ''
    todos.push(todo)
    saveTodos()
})

renderTodos()
