import { format } from 'date-fns';

class Todo
{
    constructor(title = "Task name", desc = "Task description", dueDate = new Date(2002, 3, 1), priority = "Urgent")
    {
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    isDone = false;
    isRevealed = false;

    toggleIsDone()
    {
        this.isDone = !this.isDone;
    }
}

export { Todo };