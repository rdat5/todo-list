import './ui.css';

const pageWrap = document.querySelector('.page-wrap');
const sidebarElem = document.createElement('div');
const mainElem = document.createElement('div');

class DomManager
{
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

    generateTodoCard(todo, id)
    {
        
        // Todo container
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card-container');

        // Todo checked
        const checkBoxContainer = document.createElement('div');
        checkBoxContainer.classList.add("checkbox-container");
        const cardCheck = document.createElement('input');
        cardCheck.type = "checkbox";
        cardCheck.setAttribute('id', 'todoChecked' + id);
        const checkLabel = document.createElement('label');
        checkLabel.textContent = "Done?";
        checkLabel.style.fontSize = "0.5rem";
        checkLabel.setAttribute('for', cardCheck.getAttribute('id'));
        checkBoxContainer.appendChild(cardCheck);
        checkBoxContainer.appendChild(checkLabel);
        cardContainer.appendChild(checkBoxContainer);
        
        // Todo title
        const cardTitle = document.createElement('p');
        cardTitle.textContent = todo.title;
        cardContainer.appendChild(cardTitle);

        // Todo description
        const cardDesc = document.createElement('p');
        cardDesc.textContent = todo.desc;
        cardContainer.appendChild(cardDesc);

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
        cardEditBtn.textContent = "[E]";
        cardContainer.appendChild(cardEditBtn);

        // Todo delete button
        const cardDelBtn = document.createElement('button');
        cardDelBtn.textContent = "[X]";
        cardContainer.appendChild(cardDelBtn);

        return cardContainer;
    }

    renderProjects(projects)
    {
        for (let i = 0; i < projects.length; i++)
        {
            const proj = document.createElement('button');
            proj.textContent = projects[i].name;

            sidebarElem.appendChild(proj);
        }
        const addNew = document.createElement('button');
        addNew.textContent = "Add New Project";
        sidebarElem.appendChild(addNew);
    }

    renderTodos(todos)
    {
        for (let i = 0; i < todos.length; i++)
        {
            mainElem.appendChild(this.generateTodoCard(todos[i], i));
        }
        const addNewTodoBtn = document.createElement('button');
        addNewTodoBtn.textContent = "[+] Add New Todo"
        mainElem.appendChild(addNewTodoBtn);
    }
}

export { DomManager };