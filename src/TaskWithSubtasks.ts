import Task from "./Task";

export default class TaskWithSubTasks extends Task {
    public subTasks: Array<Task>;
    constructor(task = '') {
        super();
        this.task = task;
        this.subTasks = [];
    }

    addSubTask(task) {
        const newTask = new Task(task);
        this.subTasks.push(newTask);
        return newTask;
    }

    remove(id: number) {
        this.subTasks = this.subTasks.filter((t) => t.id !== +id);
    }

    deleteFinished() {
        this.subTasks = this.subTasks.filter((t) => !t.finished);
    }

    finishById(id){
        this.subTasks=this.subTasks.map((t)=>{
            if(+t.id===+id)
                t.finished=!t.finished;
            return t;
        });
        this.allFinished();
    }

    allFinished() {
        this.finished = this.subTasks.every((t) => t.finished);
    }

    search(substring) {
        return this.subTasks.filter((t) => t.task.toLowerCase().indexOf(substring.toLowerCase())+1)
    }
}