const todosUrl = 'http://localhost:3001/todos';
const listsUrl = 'http://localhost:3001/lists';

class Api {
    constructor(todosUrl, listsUrl) {
        this.todosUrl = todosUrl;
        this.listsUrl = listsUrl;
    }

    saveList(data) {
        return fetch(listsUrl, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(this.getJson);
    }

    removeList(id) {
        return fetch(`${listsUrl}/${id}`, {
            method: 'DELETE',
        }).then(this.getJson);
    }

    getLists() {
        return fetch(listsUrl).then(this.getJson);
    }

    saveTodo(data) {
        return fetch(todosUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }).then(this.getJson);
    }

    deleteTodo(id) {
        return fetch(`${todosUrl}/${id}`, {
          method: 'DELETE',
        }).then(this.getJson);
    }

    updateTodo(id, todo) {
        return fetch(`${todosUrl}/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(todo)
        }).then(this.getJson);
    }

    getTodos() {
        return fetch(todosUrl).then(this.getJson);
    }

    getJson(res) {
        return res.json();
    }
}

export default new Api(todosUrl, listsUrl);