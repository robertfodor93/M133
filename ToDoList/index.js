import ToDo from './todo.js'

let todos = []

const UI = {
    input: document.querySelector('#input_element'),
    tasks: document.querySelector('#tasks'),
    num_tasks: document.querySelector('#num_tasks'),
    btn_delete_completed: document.querySelector('#btn_delete_completed')
}

UI.input.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
        createToDo(UI.input.value)
        UI.input.value = ''
    }
})

UI.btn_delete_completed.addEventListener('click', e => {
    todos.filter(td => td.isDone === true).forEach(td => {
        td.element.remove()
        todos.splice(todos.findIndex(_td => _td == td), 1)
    })
})

function createToDo(taskTitle, done = false) {
    const NEW_TODO = new ToDo(taskTitle, done)
    NEW_TODO.addEventListener('taskCompletedChange', updateTaskCount)
    NEW_TODO.addEventListener('taskDelete', () => {
        todos.splice(todos.findIndex(td => td === NEW_TODO), 1)
        updateTaskCount()
        updateLocalStorage()
    })
    todos.push(NEW_TODO)
    UI.tasks.append(NEW_TODO.element)
    todos.sort((a, b) => a.title.localeCompare(b.title))
    let items = [...UI.tasks.children]
    items.sort((a, b) => a.innerText.localeCompare(b.innerText))
    UI.tasks.append(...items)
    updateTaskCount()
    updateLocalStorage()
}

function updateTaskCount() {
    const openToDos = todos.length - todos.reduce((a, b) => a + b.isDone, 0)
    UI.num_tasks.innerText =
    openToDos == 0 ? `Keine offenen Aufgaben`
            : openToDos == 1 ? `1 offene Aufgabe`
                : `${openToDos} offene Aufgaben`
                UI.btn_delete_completed.disabled = !todos.some(t => t.isDone)
}

function updateLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos.map(td => {
        return {
            title: td.title,
            isDone: td.isDone
        }
    })))
}

if (localStorage.getItem('todos')) {
    let todosToParse = JSON.parse(localStorage.getItem('todos'))
    for (let todo of todosToParse) createToDo(todo.title, todo.isDone)
}

updateTaskCount()