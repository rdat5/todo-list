import { format } from 'date-fns';

class Todo
{
    constructor(title = "Task name", desc = "Task description", dueDate = format(new Date(2014, 1, 11), 'MM/dd/yyyy'), priority = "Urgent")
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