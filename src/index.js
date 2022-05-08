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
format(Date.now(), 'MM/dd/yyyy'), 
"Urgent"));
userProjects.projects[0].addTodo(new Todo());
userProjects.projects[0].todos[0].isDone = true;

const domManager = new DomManager(userProjects);
domManager.initializeUI();

// userProjects.projects[0].addTodo(new Todo("Other todo", "Other description"));
// userProjects.projects[0].addTodo(new Todo("Bruh", "Something or the other", "12/25/2022", "Low"));
// userProjects.addProject(new Project("Other Project"));

// domManager.renderProjects(userProjects.projects);
// domManager.renderTodos(userProjects.projects[0].todos);
domManager.currentProjectIndex = 0;
domManager.renderProjects();
domManager.renderTodos();