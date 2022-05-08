import './ui.css';

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

        // Todo checked
        const doneButton = document.createElement('button');
        doneButton.style.width = "100%";
        if (todo.isDone)
        {
            doneButton.textContent = "☑ Complete";
        }
        else
        {
            doneButton.textContent = "☐ Incomplete";
        }
        cardContainer.appendChild(doneButton);
        
        // Todo title
        const cardTitle = document.createElement('p');
        cardTitle.textContent = todo.title;
        cardContainer.appendChild(cardTitle);

        // Todo due date
        const cardDue = document.createElement('p');
        cardDue.textContent = todo.dueDate;
        cardContainer.appendChild(cardDue);
        
        // Todo priority
        const cardPriority = document.createElement('p');
        cardPriority.textContent = todo.priority;
        cardContainer.appendChild(cardPriority);

        // Todo edit button
        const cardEditBtn = document.createElement('button');
        cardEditBtn.textContent = "🖊";
        cardContainer.appendChild(cardEditBtn);

        // Todo delete button
        const cardDelBtn = document.createElement('button');
        cardDelBtn.textContent = "⌫";
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
        saveTodoBtn.addEventListener("click", () => {
            mainElem.removeChild(newTodoForm);    
            mainElem.appendChild(this.generateNewTodoButton());
        })
        newTodoForm.appendChild(saveTodoBtn);

        const cancelTodoBtn = this.generateElement('button', null, 'Cancel');
        cancelTodoBtn.addEventListener("click", () => {
            mainElem.removeChild(newTodoForm);    
            mainElem.appendChild(this.generateNewTodoButton());
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

    generateProjectCard(givenProject)
    {
        const projectContainer = this.generateElement('div', 'project-card', null);
        const projBtn = this.generateElement('button', null, givenProject.name);
        projectContainer.appendChild(projBtn);
        const projDelBtn = this.generateElement('button', null, '⌫');
        projectContainer.appendChild(projDelBtn);

        return projectContainer;
    }

    onNewTodoClicked()
    {
        console.log("On todo clicked");
        mainElem.appendChild(this.generateNewTodoForm());
    }

    renderProjects()
    {
        const projects = this.userProj.projects;
        for (let i = 0; i < projects.length; i++)
        {
            // const proj = document.createElement('button');
            // proj.textContent = projects[i].name;

            sidebarElem.appendChild(this.generateProjectCard(projects[i]));
        }
        const addNew = document.createElement('button');
        addNew.textContent = "Add New Project";
        sidebarElem.appendChild(addNew);
    }

    renderTodos()
    {
        const todos = this.userProj.projects[this.currentProjectIndex].todos;
        // Todos
        for (let i = 0; i < todos.length; i++)
        {
            mainElem.appendChild(this.generateTodoCard(todos[i], i));
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