import Task from "./Task";

export default class TaskWithTimer extends Task{
    constructor(task='',finalTime= +new Date()+1000){
        super();
        this.task=task;
        this.finalTime=finalTime
    }
}