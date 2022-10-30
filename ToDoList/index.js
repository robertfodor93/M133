import ToDo from './todo.js'

const UI = {
    input: document.querySelector('#input_element'),
    tasks: document.querySelector('#tasks'),
    num_tasks: document.querySelector('#num_tasks'),
    btn_delete_completed: document.querySelector('#btn_delete_completed')
}

const TODOS = []

createToDo('Task 1')
createToDo('Task 2', true)
createToDo('Task 3', true)

UI.input.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
        createToDo(UI.input.value)
        UI.input.value = ''
    }
})

UI.btn_delete_completed.addEventListener('click', e => {
    TODOS.filter(td => td.isDone === true).forEach(td => {
        td.element.remove()
        TODOS.splice(TODOS.findIndex(_td => _td == td), 1)
    })
})

function createToDo(taskTitle, done = false) {
    const NEW_TODO = new ToDo(taskTitle, done)
    NEW_TODO.addEventListener('taskCompletedChange', updateTaskCount)
    NEW_TODO.addEventListener('taskDelete', () => {
        TODOS.splice(TODOS.findIndex(td => td === NEW_TODO), 1)
        updateTaskCount()
    })

    TODOS.push(NEW_TODO)
    UI.tasks.append(NEW_TODO.element)
    updateTaskCount()
}

function updateTaskCount() {
    const openToDos = TODOS.length - TODOS.reduce((a, b) => a + b.isDone, 0)
    UI.num_tasks.innerText =
    openToDos == 0 ? `Keine offenen Aufgaben`
            : openToDos == 1 ? `1 offene Aufgabe`
                : `${openToDos} offene Aufgaben`
}

updateTaskCount()