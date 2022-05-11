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

    deleteTodo(index)
    {
        this.todos.splice(index, 1);
    }
}

export { Project };