import './ui.css';

const pageWrap = document.querySelector('.page-wrap');

function initializeUI()
{
    const headerElem = document.createElement('div');
    headerElem.classList.add('page-header');
    const headerText = document.createElement('h1');
    headerText.textContent = "Todo List";
    headerElem.appendChild(headerText);
    pageWrap.appendChild(headerElem);

    const sidebarElem = document.createElement('div');
    sidebarElem.classList.add('page-sidebar');
    pageWrap.appendChild(sidebarElem);

    const mainElem = document.createElement('div');
    mainElem.classList.add('page-main');
    pageWrap.appendChild(mainElem);

    const footerElem = document.createElement('div');
    footerElem.classList.add('page-footer');
    footerElem.textContent = "Ray Allen Datuin 2022";
    pageWrap.appendChild(footerElem);
}

export { initializeUI };