export class Task{
    constructor(task=''){
        this.type='Task';
        this.task=task;
        this.id=+new Date();  //одинаковые id для разных элементов!(генератор сл. чисел || uuid)
        this.finished=false;
    }
}

export class TaskWithSubTasks extends Task{
    constructor(task,subTasks){
        super();
        this.type='TaskWithSubTasks';
        this.task=task;
        this.subTasks=subTasks;
    }
    add(task){
        this.subTasks.push(task);
    }
    remove(id){
        this.subTasks=this.subTasks.filter((t)=>t!==id)
    }
}

export class TaskWithTimer extends Task{
    constructor(task,finalTime){
        super();
        this.type='TaskWithTimer';
        this.task=task;
        this.finalTime=finalTime
    }
}