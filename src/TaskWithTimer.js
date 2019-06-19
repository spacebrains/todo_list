import Task from "./Task";

export default class TaskWithTimer extends Task {
    constructor(task = '', finalTime = Date.now()) {
        super();
        this.task = task;
        this.finalTime = new Date(finalTime);
        this.isFinish();
    }

    isFinish() {
        if (+new Date() > this.finalTime)
            this.finished = true;
    }
}