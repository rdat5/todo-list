import { format } from 'date-fns';

import { DomManager } from './domManager.js';
import { UserProjects } from './userProjects.js';
import { Project } from './project.js';
import { Todo } from './todo.js';
console.log("Testing...");


// Add initial default project with default todo
const userProjects = new UserProjects();
userProjects.addProject(new Project("Default Project"));
userProjects.projects[0].addTodo(new Todo("Make a todo list", 
        "Add a todo item to your project", 
        new Date(), 
        "Urgent"));
userProjects.projects[0].addTodo(new Todo());
userProjects.projects[0].todos[0].isDone = true;

const domManager = new DomManager(userProjects);
domManager.initializeUI();

domManager.currentProjectIndex = 0;

domManager.renderPage();