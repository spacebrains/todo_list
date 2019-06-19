import Task from './Task'
import TaskWithTimer from './TaskWithTimer'
import TaskWithSubTasks from './TaskWithSubtasks'

export default class TodoApp {
    public todos: Array<Task>;

    constructor() {
        this.todos = [];
        this.load();
    }

    addTask(task = '') {
        const newTask = new Task(task);
        this.todos.push(newTask);
        return newTask;
    }

    addTaskWithSubTasks(task = '') {
        const newTaskWithSubTasks = new TaskWithSubTasks(task);
        this.todos.push(newTaskWithSubTasks);
        return newTaskWithSubTasks;
    }

    addSubTask(id, task = '') {
        let newSubTask;
        this.todos.forEach((t) => {
            if (+t.id === +id && t instanceof TaskWithSubTasks)
                newSubTask = t.addSubTask(task);
        });
        return newSubTask ? newSubTask : console.warn('not found task with id:' + id);
    }

    addTaskWithTimer(task = '', finalTime) {
        const newTaskWithTimer = new TaskWithTimer(task, finalTime);
        this.todos.push(newTaskWithTimer);
        return newTaskWithTimer;
    }

    remove(id) {
        this.todos = this.todos.filter((t) => {
            if (t instanceof TaskWithSubTasks)
                t.remove(id);
            return t.id !== +id;
        });
    }

    finishById(id) {
        this.todos = this.todos.map((t) => {
            if (+t.id === +id)
                t.finished = !t.finished;
            else if (t instanceof TaskWithSubTasks)
                t.finishById(id);
            return t;
        });
    }

    deleteFinished() {
        this.todos = this.todos.filter((t) => {
            if (t instanceof TaskWithSubTasks)
                t.deleteFinished();
            return !t.finished;
        });
    }

    search(substring) {
        let result = [];
        this.todos.forEach((t) => {
            if (t.task.toLowerCase().indexOf(substring.toLowerCase()) + 1)
                result.push(t);
            if (t instanceof TaskWithSubTasks)
                result = [...result, ...t.search(substring)];

        });

        return result;
    }

    save() {
        const todosForJson = this.todos.map((t) => {
            const obj = {task: t.task, finished: t.finished, type: "", finalTime: null, subTasks: []};
            if (t instanceof TaskWithTimer) {
                obj.type = 'TaskWithTimer';
                obj.finalTime = +t.finalTime;
            } else if (t instanceof TaskWithSubTasks) {
                obj.type = 'TaskWithSubTasks';
                obj.subTasks = t.subTasks.map((subt) => {
                    return {task: subt.task, finished: subt.finished}
                });
            } else
                obj.type = 'Task';
            return obj;
        });
        localStorage['data'] = '';
        localStorage['data'] = JSON.stringify({todos: todosForJson});
    }

    load() {
        if (!localStorage['data']) return;
        const data = JSON.parse(localStorage['data']).todos;
        this.todos = data.map((t) => {
            if (t.type === 'Task') {
                const newTask = this.addTask(t.task);
                newTask.finished = t.finished;
                return newTask;
            } else if (t.type === 'TaskWithSubTasks') {
                const newTaskWithSubTasks = this.addTaskWithSubTasks(t.task);
                newTaskWithSubTasks.finished = t.finished;
                t.subTasks.forEach((subt) => {
                    const newSubTask = newTaskWithSubTasks.addSubTask(subt.task);
                    newSubTask.finished = subt.finished;
                });
                return newTaskWithSubTasks;
            } else if (t.type === 'TaskWithTimer') {
                const newTaskWithTimer = this.addTaskWithTimer(t.task, t.finalTime);
                newTaskWithTimer.finished = t.finished;
                return newTaskWithTimer;
            }
        })
    }
}




