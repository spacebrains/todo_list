export default class Task {
    public task: string;
    public id: number;
    public finished: boolean;
    constructor(task = '') {
        this.task = task;
        this.id = Math.random();
        this.finished = false;
    }
}