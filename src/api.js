const todosUrl = "http://localhost:3001/todos"
const listsUrl = "http://localhost:3001/lists"
const todosByListIdUrl = "http://localhost:3001/todos?listId="

class Api {
    saveList(data) {
        return fetch(listsUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(this.getJson)
    }

    deleteList(id) {
        return fetch(`${listsUrl}/${id}`, {
            method: "DELETE"
        }).then(this.getJson)
    }

    updateList(list) {
        return fetch(`${listsUrl}/${list.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(list)
        }).then(this.getJson)
    }

    getLists() {
        return fetch(listsUrl).then(this.getJson)
    }

    saveTodo(data) {
        return fetch(todosUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(this.getJson)
    }

    deleteTodo(id) {
        return fetch(`${todosUrl}/${id}`, {
            method: "DELETE"
        }).then(this.getJson)
    }

    updateTodo(todo) {
        return fetch(`${todosUrl}/${todo.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(todo)
        }).then(this.getJson)
    }

    getTodosByListId(listId) {
        return fetch(`${todosByListIdUrl}${listId}`).then(this.getJson)
    }

    getJson(res) {
        return res.json()
    }
}

export default new Api()
