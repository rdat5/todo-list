import { format, parseISO } from 'date-fns';

import { DomManager } from './domManager.js';
import { UserProjects } from './userProjects.js';
import { Project } from './project.js';
import { Todo } from './todo.js';
import { DataManager } from './dataManager.js';
console.log("Testing...");

let userProjects;

function storageAvailable(type) 
{
        var storage;
        try {
            storage = window[type];
            var x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch(e) {
            return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                (storage && storage.length !== 0);
        }
}

function createDefaultProject()
{
        userProjects = new UserProjects();
        userProjects.addProject(new Project("Default Project"));
        userProjects.projects[0].addTodo(new Todo(
                "Make a todo list",
                "Add a todo item to your project",
                new Date(),
                "Urgent"));
        userProjects.projects[0].todos[0].isDone = true;
}

function loadData()
{
        let parsedData = JSON.parse(localStorage.getItem('user-project'));

        let loadedUserData = new UserProjects();

        for (let i = 0; i < parsedData.projects.length; i++)
        {
                loadedUserData.addProject(new Project(parsedData.projects[i].name))

                for (let j = 0; j < parsedData.projects[i].todos.length; j++)
                {
                        let todoTitle = parsedData.projects[i].todos[j].title;
                        let todoDesc = parsedData.projects[i].todos[j].desc;
                        let todoDue = parseISO(parsedData.projects[i].todos[j].dueDate, 'yyyy-MM-dd', new Date());
                        let todoPriority = parsedData.projects[i].todos[j].priority;
                        let todoIsDone = parsedData.projects[i].todos[j].isDone;

                        loadedUserData.projects[i].addTodo(new Todo(todoTitle, todoDesc, todoDue, todoPriority));
                        loadedUserData.projects[i].todos[j].isDone = todoIsDone;
                }
        }
        return loadedUserData;
}

if (storageAvailable('localStorage'))
{
        console.log("Storage is available");

        if (localStorage.getItem('user-project'))
        {
                console.log("Data available, now loading...");
                userProjects = loadData();
        }
        else
        {
                console.log("Data unavailable, creating new data...");
                createDefaultProject();
                DataManager.saveData(userProjects);
        }
}
else
{
        console.log("Storage not available");
        createDefaultProject();
}

console.log(userProjects);
const domManager = new DomManager(userProjects);
domManager.initializeUI();

domManager.currentProjectIndex = 0;

domManager.renderPage();