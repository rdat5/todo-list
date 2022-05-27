import { UserProjects } from "./userProjects.js";
import { Project } from "./project.js";
import { Todo } from "./todo.js";
import { format, parseISO } from 'date-fns';

class DataManager
{
    static saveData(userProjData)
    {
            localStorage.setItem('user-project', JSON.stringify(userProjData));
    }

    static loadData()
    {
            let parsedData = JSON.parse(localStorage.getItem('user-project'));
    
            let loadedUserData = new UserProjects();
    
            for (let i = 0; i < parsedData.projects.length; i++)
            {
                    loadedUserData.addProject(new Project(parsedData.projects[i].name))
    
                    for (let j = 0; j < parsedData.projects[i].todos.length; j++)
                    {
                            let todoTitle = parsedData.projects[i].todos[j].title;
                            let todoDesc = parsedData.projects[i].todos[j].desc;
                            let todoDue = parseISO(parsedData.projects[i].todos[j].dueDate, 'yyyy-MM-dd', new Date());
                            let todoPriority = parsedData.projects[i].todos[j].priority;
                            let todoIsDone = parsedData.projects[i].todos[j].isDone;
    
                            loadedUserData.projects[i].addTodo(new Todo(todoTitle, todoDesc, todoDue, todoPriority));
                            loadedUserData.projects[i].todos[j].isDone = todoIsDone;
                    }
            }
            return loadedUserData;
    }
}

export { DataManager };