export default class ToDo extends EventTarget {
    constructor(title, isDone = false) {
        super()
        this.title = title
        this.isDone = isDone

        // create ui element
        const TASK = document.createElement('div')
        TASK.classList.add('task')
        if (this.isDone) TASK.classList.add('completed')
        else TASK.classList.remove('completed')

        // create checkbox
        const TASK_CHECK = document.createElement('input')
        TASK_CHECK.setAttribute('type', 'checkbox')
        TASK_CHECK.checked = this.isDone

        TASK_CHECK.addEventListener('change', e => {
            this.isDone = TASK_CHECK.checked

            if (this.isDone) TASK.classList.add('completed')
            else TASK.classList.remove('completed')

            this.dispatchEvent(new UIEvent('taskCompletedChange', {
                detail: {
                    completed: this.isDone
                }
            }))
        })

        const TASK_TITLE = document.createElement('p')
        TASK_TITLE.innerText = this.title

        const TASK_DELETE_BTN = document.createElement('button')
        TASK_DELETE_BTN.innerText = 'Löschen'

        TASK_DELETE_BTN.addEventListener('click', e => {
            this.dispatchEvent(new UIEvent('taskDelete'))
            TASK.remove()
            this.element = null
        })

        // append children
        TASK.append(TASK_CHECK, TASK_TITLE, TASK_DELETE_BTN)

        // set task element
        this.element = TASK
    }
}