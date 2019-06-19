import Task from "./Task";

export default class TaskWithSubTasks extends Task{
    constructor(task=''){
        super();
        this.task=task;
        this.subTasks=[];
    }

    addSubTask(task=''){
        const newTask = Task(task);
        this.subTasks.push(newTask);
        return newTask;
    }

    remove(id){
        this.subTasks=this.subTasks.filter((t)=>t.id !== +id);
    }

    deleteFinished(){
        this.subTasks=this.subTasks.filter((t)=> !t.finished);
    }

    allFinished(){
        this.finished=this.subTasks.every((t)=>t.finished);
    }

    search(substring){
        return this.todos.filter((t)=> t.task.toLowerCase().indexOf(substring.toLowerCase()))
    }
}