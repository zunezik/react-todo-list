import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import TodoList from './components/todo-list';
import MainList from './components/main-list';
import AddForm from './components/add-form';
import Api from './api';

export default class App extends React.Component {
    constructor() {
        super()
        Api.getLists()
        .then((lists) => {
            this.setState({lists: lists});
            this.setState({routes: this.makeRoutes()});
        }) 
    }

    state = {
        todos : [],
        lists : [],
        selectedListId : null,
        routes : null
    }

    addList = (name) => {
        const list = {
            id: null, 
            name: name
        };

        Api.saveList(list)
        .then((returnedList) => {
            this.setState((prevState) => {
                const newLists = [...prevState.lists, returnedList];
                return { lists: newLists };
            })
        })
    }

    removeList = (id) => {
        Api.removeList(id)
        .then((this.setState(({lists}) => {
            return {lists: this.deleteArrItem(id, lists)}
        })))
    }

    onSelectList = (listId) => {
        Api.getTodos()
        .then((todos) => {
            const newTodos = todos.filter((todo) => todo.listId === listId);
            this.setState({todos: newTodos, selectedListId: listId, routes: this.makeRoutes()});
        });
    }

    createTodoItem = (text, listId) => {
        return {
            id: null,
            listId: listId, 
            done: false, 
            task: text
        }
    }
    
    deleteTodo = (id) => {
        Api.deleteTodo(id)
        .then(this.setState(({todos}) => {
            return {todos: this.deleteArrItem(id, todos)}
        }))            
    }

    addTodo = (text) => {
        const listId = this.state.selectedListId;
        const newTodo = this.createTodoItem(text, listId);

        Api.saveTodo(newTodo)
        .then((returnedTodo) => {
            this.setState((prevState) => {
                const newTodos = [...prevState.todos, returnedTodo];
                return {todos: newTodos}
            })
        })  
    }

    onToggleDone = (id) => {
        const todos = this.state.todos;
        const oldItem = todos.filter((todo) => todo.id === id)[0];
        const newItem = {...oldItem, done: !oldItem.done}

        this.updateTodo(id, newItem);
    }

    onEdit = (id) => {
        const todos = this.state.todos;
        let todo = todos.filter((todo) => todo.id === id)[0];
        
        let newTask = prompt('Update', todo.task);
        if(newTask != null) {
            todo.task = newTask;
        }

        this.updateTodo(id, todo);
    }

    updateTodo(id, todo) {
        Api.updateTodo(id, todo)
        .then(this.setState(({todos}) => {
            const index = todos.findIndex((el) => el.id === id);
            const newTodos = [
                ...todos.slice(0, index),
                todo,
                ...todos.slice(index + 1)
            ]

            return {
                todos: newTodos
            }
        }))
    }

    makeRoutes = () => {
        let lists = this.state.lists;
        let routes = lists.map((item) => {
            return (
                <Route key={`${item.id}`} path={`/${item.id}`}
                    render={() => <div><TodoList todos = {this.state.todos}
                                                onDeleted = {this.deleteTodo}
                                                onToggleDone = {this.onToggleDone}
                                                onEdit = {this.onEdit} 
                                        />
                                        <AddForm onAdded = {this.addTodo} />
                                  </div>}>
                </Route>
            );
        })

        return routes;
    }

    deleteArrItem = (id, arr) => {
        const index = arr.findIndex((el) => el.id === id);

        const newArr = [
            ...arr.slice(0, index),
            ...arr.slice(index + 1)
        ]

            return newArr;
    }

    render() {
        return(
        <Router>
            <Switch>
                <Route 
                    exact path='/' 
                    render={() => <div><MainList lists = {this.state.lists}
                                                onDeleted = {this.removeList}
                                                onSelect = {this.onSelectList}
                                        />
                                        <AddForm onAdded = {this.addList}/>
                                  </div>}
                />
                {this.state.routes}
            </Switch>
        </Router>
        );
    }
}