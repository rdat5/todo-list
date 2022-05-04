import { DomManager } from './domManager.js';
import { UserProjects } from './userProjects.js';
import { Project } from './project.js';
import { Todo } from './todo.js';
console.log("Testing...");

const domManager = new DomManager();
domManager.initializeUI();

// Add initial default project with default todo
const userProjects = new UserProjects();
userProjects.addProject(new Project("Default Project"));
userProjects.projects[0].addTodo(new Todo("Make a todo list", 
        "Add a todo item to your project", "2/5/1991", "Urgent"));
userProjects.projects[0].todos[0].isDone = true;

// userProjects.projects[0].addTodo(new Todo("Other todo", "Other description"));
// userProjects.projects[0].addTodo(new Todo("Bruh", "Something or the other", "12/25/2022", "Low"));
// userProjects.addProject(new Project("Other Project"));

domManager.renderProjects(userProjects.projects);
domManager.renderTodos(userProjects.projects[0].todos);