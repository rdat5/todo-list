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

    generateTodoCard(todo)
    {
        // Todo container
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card-container');
        
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
    }

    renderTodos(todos)
    {
        for (let i = 0; i < todos.length; i++)
        {
            // const testTodo = document.createElement('p');
            // testTodo.textContent = todos[i].title;
            // const something = document.createElement('p');
            // something.textContent = todos[i].desc;

            // mainElem.appendChild(testTodo);
            // mainElem.appendChild(something);
            mainElem.appendChild(this.generateTodoCard(todos[i]));
        }
    }
}

export { DomManager };