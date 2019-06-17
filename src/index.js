import TodoApp from './todo'
import {Task} from "./class";



let ul=document.getElementById('taskList');

function view(){
    ul.innerHTML="";
    Todo.todos.map((ta)=>{
        const li=createLi(ta);
        if(ta.type==='TaskWithSubTasks'){
            const subUl=document.createElement('ul');
            ta.subTasks.map((t)=>{
                subUl.appendChild(createLi(t));
            });
            const button=document.createElement('button');
            button.innerText='+';
            subUl.appendChild(button);
            li.appendChild(subUl);
        }
        ul.appendChild(li);
    });
    console.log('view');
}

function createLi(t){
    const li=document.createElement('li');
    li.dataset.id=t.id;
    const span=document.createElement('span');
    span.innerText=t.task;

    const button=document.createElement('button');
    button.innerText='X';
    button.addEventListener('click',remove);

    li.appendChild(span);
    li.appendChild(button);

    return li;
}

function remove(e){
    const id=e.target.parentNode.dataset.id;
    Todo.remove(id);
    view();
    console.log('remove');
}


const Todo= new TodoApp();
console.log(Todo);

Todo.addTask('1');
console.log(Todo);

const Task1=new Task('21');
const Task2=new Task('22');
const Task3=new Task('23');
Todo.addTaskWithSubTasks('2',[Task1,Task2,Task3]);
console.log(Todo);

Todo.addTaskWithTimer('3',+new Date()+10000);
console.log(Todo);
view();

Todo.addTask('1');
console.log(Todo);
view();

