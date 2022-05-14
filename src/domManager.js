import './ui.css';
import { format, parseISO } from 'date-fns';
import { Todo } from './todo';
import { Project } from './project';

const pageWrap = document.querySelector('.page-wrap');
const sidebarElem = document.createElement('div');
const mainElem = document.createElement('div');

class DomManager
{
    currentProjectIndex;

    constructor(userProj)
    {
        this.userProj = userProj;
    }

     initializeUI()
    {
        const headerElem = document.createElement('div');
        headerElem.classList.add('page-header');
        const headerText = document.createElement('h1');
        headerText.textContent = "Todo List";
        headerElem.appendChild(headerText);
        pageWrap.appendChild(headerElem);
    
        sidebarElem.classList.add('page-sidebar');
        pageWrap.appendChild(sidebarElem);
    
        mainElem.classList.add('page-main');
        pageWrap.appendChild(mainElem);
    
        const footerElem = document.createElement('div');
        footerElem.classList.add('page-footer');
        footerElem.textContent = "Ray Allen Datuin 2022";
        pageWrap.appendChild(footerElem);
    }

    generateElement(elemType, elemClass, elemText)
    {
        const element = document.createElement(elemType);
        if (elemClass)
        {
            element.classList.add(elemClass);
        }
        if (elemText)
        {
            element.textContent = elemText;
        }

        return element;
    }

    removeAllChildren(parent)
    {
        while (parent.firstChild)
        {
            parent.removeChild(parent.firstChild);
        }
    }

    generateTodoCard(todo, id)
    {
        
        // Todo container
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card-container');
        if (todo.isDone)
        {
            cardContainer.style.backgroundColor = "rgba(0, 0, 0, 0.33)";
        }
        else
        {
            cardContainer.style.backgroundColor = "none";
        }
        cardContainer.addEventListener("click", () => {
            console.log("clicked");
            cardDesc.style.display = "block";
        })

        // Todo checked
        const doneButton = document.createElement('button');
        doneButton.style.width = "100%";
        if (todo.isDone)
        {
            doneButton.textContent = "☑";
        }
        else
        {
            doneButton.textContent = "☐";
        }
        doneButton.addEventListener("click", (event) =>{
            event.stopPropagation();
            this.userProj.projects[this.currentProjectIndex].todos[id].toggleIsDone();
            this.renderTodos();
        });
        cardContainer.appendChild(doneButton);
        
        // Todo title/Description
        const titleDescContainer = document.createElement('div');
        const cardTitle = document.createElement('p');
        cardTitle.textContent = todo.title;
        titleDescContainer.appendChild(cardTitle);
        const cardDesc = document.createElement('p');
        cardDesc.textContent = todo.desc;
        cardDesc.classList.add("todo-description");
        cardDesc.style.display = "none";
        cardDesc.style.fontSize = "0.8rem";
        titleDescContainer.appendChild(cardDesc);
        cardContainer.appendChild(titleDescContainer);

        // Todo due date
        const cardDue = document.createElement('p');
        cardDue.textContent = todo.dueDate;
        cardContainer.appendChild(cardDue);
        
        // Todo priority
        const cardPriority = document.createElement('p');
        cardPriority.textContent = todo.priority;
        cardContainer.appendChild(cardPriority);

        // Todo delete button
        const cardDelBtn = document.createElement('button');
        cardDelBtn.textContent = "⌫";
        cardDelBtn.addEventListener("click", (event) => {
            event.stopPropagation();
            console.log("Delete!");
            this.userProj.projects[this.currentProjectIndex].deleteTodo(id);
            this.renderTodos();
        })
        cardContainer.appendChild(cardDelBtn);

        return cardContainer;
    }

    generateNewTodoForm()
    {
        // container
        const newTodoForm = document.createElement('div');
        newTodoForm.classList.add("new-todo-form");
        
        // todo title
        const titleInput = document.createElement('input');
        titleInput.setAttribute('id', 'title-input');
        const titleInputLabel = document.createElement('label');
        titleInputLabel.htmlFor = 'title-input';
        titleInputLabel.textContent = "Title";
        newTodoForm.appendChild(titleInputLabel);
        newTodoForm.appendChild(titleInput);

        // todo description
        const descInput = document.createElement('input');
        descInput.setAttribute('id', 'desc-input');
        const descInputLabel = document.createElement('label');
        descInputLabel.htmlFor = 'desc-input';
        descInputLabel.textContent = "Description";
        newTodoForm.appendChild(descInputLabel);
        newTodoForm.appendChild(descInput);

        // todo due date
        const dateInputLabel = this.generateElement('label', null, "Date Due");
        dateInputLabel.htmlFor = 'date-input';
        newTodoForm.appendChild(dateInputLabel);

        const dateInput = document.createElement('input');
        dateInput.type = 'date';
        dateInput.setAttribute('id', 'date-input');
        newTodoForm.appendChild(dateInput);

        // Todo priority
        const priorities = ['Urgent', 'High', 'Normal', 'Low'];

        const datePriorityLabel = this.generateElement('label', null, 'Priority');
        datePriorityLabel.htmlFor = 'priority-input';
        newTodoForm.appendChild(datePriorityLabel);

        const priorityInput = document.createElement('select');
        priorityInput.setAttribute('id', 'priority-input');
        for (let i = 0; i < priorities.length; i++)
        {
            var option = document.createElement('option');
            option.value = priorities[i];
            option.text = priorities[i];
            priorityInput.appendChild(option);
        }
        newTodoForm.appendChild(priorityInput);

        const saveTodoBtn = this.generateElement('button', null, 'Save Todo');
        saveTodoBtn.addEventListener("click", (event) => {
            mainElem.removeChild(newTodoForm);    
            mainElem.appendChild(this.generateNewTodoButton());
            
            let formTitle = titleInput.value;
            let formDesc = descInput.value;
            let formDate;
            if (dateInput.value)
            {
                formDate = format(parseISO(dateInput.value), 'MM/dd/yyyy')
            }
            else
            {
                formDate = format(Date.now(), 'MM/dd/yyyy');
            }
            let formPriority = priorityInput.options[priorityInput.selectedIndex].text;

            this.userProj.projects[this.currentProjectIndex].addTodo(new Todo(formTitle, formDesc, formDate, formPriority));

            this.renderTodos();
        })
        newTodoForm.appendChild(saveTodoBtn);

        const cancelTodoBtn = this.generateElement('button', null, 'Cancel');
        cancelTodoBtn.addEventListener("click", () => {
            mainElem.removeChild(newTodoForm);    
            mainElem.appendChild(this.generateNewTodoButton());
            console.log("Canceling...");
            this.renderTodos();
        })
        newTodoForm.appendChild(cancelTodoBtn);
        return newTodoForm;
    }

    generateNewTodoButton()
    {
        const addNewTodoBtn = document.createElement('button');
        addNewTodoBtn.textContent = "[+] Add New Todo";
        addNewTodoBtn.addEventListener("click", () =>
        {
            mainElem.removeChild(addNewTodoBtn);
            this.onNewTodoClicked();
        })

        return addNewTodoBtn;
    }

    generateProjectCard(givenProject, id)
    {
        const projectContainer = this.generateElement('div', 'project-card', null);
        const projBtn = this.generateElement('button', null, givenProject.name);
        projBtn.addEventListener("click", () => {
            console.log("Selecting project: " + id);
            this.currentProjectIndex = id;
            this.renderTodos();
        })
        projectContainer.appendChild(projBtn);
        const projDelBtn = this.generateElement('button', null, '⌫');
        projDelBtn.addEventListener("click", () => {
            console.log("deleting project!" + id);
            this.userProj.deleteProject(id);
            this.renderPage();
        })
        projectContainer.appendChild(projDelBtn);

        return projectContainer;
    }

    onNewTodoClicked()
    {
        console.log("On todo clicked");
        mainElem.appendChild(this.generateNewTodoForm());
    }

    generateNewProjectForm()
    {
        const newProjectForm = document.createElement('div');
        newProjectForm.classList.add("new-project-form");
        
        const newProjName = document.createElement('input');
        newProjName.placeholder = "New Project Name";
        newProjectForm.appendChild(newProjName);

        const saveCancelContainer = document.createElement('div');
        saveCancelContainer.style.display = "grid";
        saveCancelContainer.style.gridTemplateColumns = "1fr 1fr";

        const saveNewProj = this.generateElement('button', null, 'Save');
        saveNewProj.addEventListener("click", () => {
            let newName;
            if (newProjName.value)
            {
                newName = newProjName.value;
            }
            else
            {
                newName = "New Project Name";
            }

            this.userProj.addProject(new Project(newName));
            this.renderProjects();
        })
        saveCancelContainer.appendChild(saveNewProj);

        const cancelNewProj = this.generateElement('button', null, 'Cancel');
        cancelNewProj.addEventListener("click", () => {
            this.renderProjects();
            console.log("canceling project...");
        })
        saveCancelContainer.appendChild(cancelNewProj);

        newProjectForm.appendChild(saveCancelContainer);

        return newProjectForm;
    }

    renderProjects()
    {
        this.removeAllChildren(sidebarElem);
        const projects = this.userProj.projects;
        for (let i = 0; i < projects.length; i++)
        {
            sidebarElem.appendChild(this.generateProjectCard(projects[i], i));
        }
        const addNew = document.createElement('button');
        addNew.textContent = "Add New Project";
        addNew.addEventListener("click", () => {
            console.log("Adding new project!");
            sidebarElem.removeChild(addNew);
            sidebarElem.appendChild(this.generateNewProjectForm());
        })
        sidebarElem.appendChild(addNew);
    }

    renderTodos()
    {   
        // Clear main element first
        this.removeAllChildren(mainElem);

        if (this.userProj.projects.length > 0)
        {
            const todos = this.userProj.projects[this.currentProjectIndex].todos;
            // Todos
            for (let i = 0; i < todos.length; i++)
            {
                mainElem.appendChild(this.generateTodoCard(todos[i], i));
            }
        }

        mainElem.appendChild(this.generateNewTodoButton());
    }

    renderPage()
    {
        this.renderProjects();
        this.renderTodos();
    }
}

export { DomManager };