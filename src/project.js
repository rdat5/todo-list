import { Todo } from "./todo";
class Project
{
    constructor(name = "Project name")
    {
        this.name = name;
    }

    todos = [];

    addTodo(todo)
    {
        this.todos.push(todo);
    }
}

export { Project };