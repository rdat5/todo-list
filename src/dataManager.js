class DataManager
{
    static saveData(userProjData)
    {
            localStorage.setItem('user-project', JSON.stringify(userProjData));
    }
}

export { DataManager };