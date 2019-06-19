import Task from "./Task";

export default class TaskWithTimer extends Task {
    public finalTime: Date;

    constructor(task = '', finalTime: Date) {
        super();
        this.task = task;
        this.finalTime = new Date(finalTime);
        this.isFinish();
        console.log(finalTime);
    }

    isFinish() {
        if (new Date() > this.finalTime)
            this.finished = true;
    }
}