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

    renderProjects(project)
    {
        const proj = document.createElement('button');
        proj.textContent = project.name;

        sidebarElem.appendChild(proj);
    }

    renderTodos(todo)
    {
        const testTodo = document.createElement('p');
        testTodo.textContent = todo.title;
        const something = document.createElement('p');
        something.textContent = todo.desc;

        mainElem.appendChild(testTodo);
        mainElem.appendChild(something);
    }
}

export { DomManager };