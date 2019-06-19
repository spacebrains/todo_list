export default class Task {
    constructor(task = '') {
        this.task = task;
        this.id = Math.random();
        this.finished = false;
    }
}