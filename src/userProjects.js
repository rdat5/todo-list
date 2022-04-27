import { Project } from "./project";

class UserProjects
{
    projects = [];

    addProject(project)
    {
        this.projects.push(project);
    }
}

export { UserProjects };