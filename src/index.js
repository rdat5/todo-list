import { DomManager } from './domManager.js';
import { UserProjects } from './userProjects.js';
import { Project } from './project.js';
import { Todo } from './todo.js';
console.log("Testing...");

const domManager = new DomManager();
domManager.initializeUI();

// Add initial default project with default todo
const userProjects = new UserProjects();
userProjects.addProject(new Project());
userProjects.projects[0].addTodo(new Todo());
userProjects.projects[0].addTodo(new Todo("Other todo", "Other description"));
userProjects.addProject(new Project("Other Project"));

domManager.renderProjects(userProjects.projects);
domManager.renderTodos(userProjects.projects[0].todos);