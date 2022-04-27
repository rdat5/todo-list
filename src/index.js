import { initializeUI } from './ui_load.js';
import { UserProjects } from './userProjects.js';
import { Project } from './project.js';
import { Todo } from './todo.js';
console.log("Testing...");

initializeUI();

// Add initial default project with default todo
const userProjects = new UserProjects();
userProjects.addProject(new Project());
userProjects.projects[0].addTodo(new Todo());