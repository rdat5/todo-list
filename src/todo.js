class Todo
{
    constructor(title = "Task name", desc = "Task description", dueDate = "1/1/1901", priority = "1")
    {
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    isDone = false;

    toggleIsDone()
    {
        this.isDone = !this.isDone;
    }
}

export { Todo };