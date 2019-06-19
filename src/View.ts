import TodoApp from "./TodoApp";
import TaskWithTimer from "./TaskWithTimer";
import TaskWithSubTasks from "./TaskWithSubtasks";
import Task from "./Task";


export default class View {
    public TodoApp: TodoApp;
    private todos: Array<Task>;

    constructor() {
        this.TodoApp = new TodoApp;
        this.todos = this.TodoApp.todos;
        this.render();
    }

    render() {
        this.search();
        this.drawTodos();
        this.drawForms();
        this.deleteFinished();
    }

    search() {
        const form = document.getElementById('search');
        const input = document.querySelector('#search input') as HTMLInputElement;
        const clear = document.querySelector('#search span') as HTMLSpanElement;
        form.onsubmit = (e) => {
            e.preventDefault();
            this.todos = this.TodoApp.todos;
            this.todos = this.TodoApp.search(input.value);
            this.drawTodos();
        };
        clear.onclick = () => {
            this.todos = this.TodoApp.todos;
            input.value = '';
            this.drawTodos();
        };
    }

    drawTask(task) {
        const li = document.createElement('li');
        const div = document.createElement('div');
        const span = document.createElement('span');
        const button = document.createElement('button');
        task.finished ? span.className = 'finished' : span.className = 'notFinished';
        span.innerText = task.task;
        button.innerText = 'x';
        li.dataset.id = task.id;
        div.appendChild(span);
        div.appendChild(button);
        li.appendChild(div);

        button.onclick = (e) => {
            e.preventDefault();
            const target = e.target as HTMLInputElement;
            const parent = target.parentNode.parentNode as HTMLDivElement;
            const id = parent.dataset.id;
            this.TodoApp.remove(id);
            this.TodoApp.save();
            this.todos = this.TodoApp.todos;
            this.drawTodos();
        };

        span.onclick = (e) => {
            const target = e.target as HTMLInputElement;
            const parent = target.parentNode.parentNode as HTMLDivElement;
            const id = parent.dataset.id;
            this.TodoApp.finishById(id);
            this.TodoApp.save();
            this.todos = this.TodoApp.todos;
            this.drawTodos();
        };

        return li;
    }

    drawTaskWithSubtasks(task) {
        const li = this.drawTask(task);
        const ul = document.createElement('ul');
        task.subTasks.forEach(subT => {
            const subLi = this.drawTask(subT);
            ul.appendChild(subLi);
        });
        const div = document.createElement('div');
        const button = document.createElement('button');
        button.innerText = '+';
        div.appendChild(button);
        button.onclick = e => {
            const target = e.target as HTMLInputElement;
            const parent = target.parentNode.parentNode as HTMLDivElement;
            const id = parent.dataset.id;
            div.innerHTML = '';
            div.appendChild(this.drawFormForSubTask(id));
        };

        li.appendChild(ul);
        li.appendChild(div);
        return li;
    }

    drawFormForSubTask(id) {
        const form = document.createElement('form');
        const input = document.createElement('input');
        const button = document.createElement('button');
        button.innerText = 'add';
        form.appendChild(input);
        form.appendChild(button);

        form.onsubmit = e => {
            e.preventDefault();
            this.TodoApp.addSubTask(id, input.value);
            this.TodoApp.save();
            this.drawTodos();
        };
        return form;
    };

    drawTaskWithTimer(task) {
        const li = this.drawTask(task);
        const span = document.createElement('span');
        span.innerText = `${Math.round((task.finalTime - Date.now()) / 3600000)} hours`;
        li.appendChild(span);
        return li;
    }

    drawTodos() {
        const ul = document.getElementById('todos');
        ul.innerHTML = '';
        this.todos.forEach(t => {
            let li;
            if (t instanceof TaskWithSubTasks)
                li = this.drawTaskWithSubtasks(t);
            else if (t instanceof TaskWithTimer)
                li = this.drawTaskWithTimer(t);
            else if (t instanceof Task)
                li = this.drawTask(t);

            ul.appendChild(li);
        })
    }

    drawFormForTask() {
        const form = document.createElement('form');
        const input = document.createElement('input');
        const button = document.createElement('button');
        button.innerText = 'add';
        form.appendChild(input);
        form.appendChild(button);

        form.onsubmit = e => {
            e.preventDefault();
            this.TodoApp.addTask(input.value);
            this.TodoApp.save();
            this.drawTodos();
        };
        return form;
    };

    drawFormForTaskWithSubTasks() {
        const form = document.createElement('form');
        const input = document.createElement('input');
        const button = document.createElement('button');
        button.innerText = 'add';
        form.appendChild(input);
        form.appendChild(button);

        form.onsubmit = e => {
            e.preventDefault();
            this.TodoApp.addTaskWithSubTasks(input.value);
            this.TodoApp.save();
            this.drawTodos();
        };
        return form;
    };

    drawFormForTaskWithTimer() {
        const form = document.createElement('form');
        const inputText = document.createElement('input');
        inputText.type = 'text';
        const inputDate = document.createElement('input') ;
        inputDate.setAttribute('type', 'datetime-local');
        const button = document.createElement('button');
        button.innerText = 'add';
        form.appendChild(inputText);
        form.appendChild(inputDate);
        form.appendChild(button);

        form.onsubmit = e => {
            e.preventDefault();
            console.log(inputDate.value);
            this.TodoApp.addTaskWithTimer(inputText.value, inputDate.value);
            this.TodoApp.save();
            this.drawTodos();
        };
        return form;
    };

    drawForms() {
        const radio = document.getElementById('radio');
        const div = document.getElementById('addTasks');
        const exit = document.createElement('button');
        exit.innerText = 'x';
        exit.onclick = () => {
            div.innerHTML = '';
        };

        radio.onchange = e => {
            div.innerHTML = '';
            const target = e.target as HTMLInputElement;
            const parent=target.parentNode as HTMLLabelElement;
            const type = parent.dataset.type;
            let form;
            if (type === 'Task')
                form = this.drawFormForTask();
            else if (type === 'TaskWithSubtasks')
                form = this.drawFormForTaskWithSubTasks();
            else if (type === 'TaskWithTimer')
                form = this.drawFormForTaskWithTimer();

            div.appendChild(form);
            div.appendChild(exit);
        }
    }

    deleteFinished() {
        const button = document.getElementById('deleteFinished');
        button.onclick = () => {
            this.TodoApp.deleteFinished();
            this.TodoApp.save();
            this.todos = this.TodoApp.todos;
            this.drawTodos();
        }

    }


}
