import { Project } from "./project";

class UserProjects
{
    projects = [];

    addProject(project)
    {
        this.projects.push(project);
    }

    deleteProject(index)
    {
        this.projects.splice(index, 1);
    }
}

export { UserProjects };