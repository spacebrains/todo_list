import {Task,TaskWithSubTasks,TaskWithTimer} from './class.js'

export default class TodoApp {
    constructor(){
        this.todos=[];
        this.load();
    }
    addTask(task){
        this.todos.push(new Task(task));
    }

    addTaskWithSubTasks(task,subTasks){
        this.todos.push(new TaskWithSubTasks(task,subTasks));
    }

    addTaskWithTimer(task,finalTime){
        this.todos.push(new TaskWithTimer(task,finalTime));
    }

    remove(id){
        console.log(id);
        this.todos=this.todos.filter((t)=>t.id !== +id);
        console.log(this.todos);
    }

    deleteFinished(){
        this.todos=this.todos.filter((t)=>!t.finished)
    }

    save() {
        /*localStorage*/
    }

    load() {
        /*localStorage*/
    }
}




