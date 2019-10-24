import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import TodoList from './components/todo-list';
import MainList from './components/main-list';
import AddForm from './components/add-form';
import Api from './api';

import './app.css';

export default class App extends React.Component {

    componentDidMount() {
        Api.getLists()
            .then((lists) => {
                this.setState({lists: lists});
            })

        Api.getTodos()
            .then((todos) => {
                this.setState({todos: todos});
            })
            .then(() => this.setState({todosRoute: this.generateTodosRoute()}));
    }

    state = {
        todos : [],
        lists : [],
        todosRoute: null
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

    deleteList = (id) => {
        Api.deleteList(id)
        .then((this.setState(({lists, todos}) => {
            return { 
                lists: this.deleteArrItem(id, lists),
                todos: this.deleteTodosByListId(id, todos)
            }
        })))
    }

    editListName = (id) => {
        const lists = this.state.lists;
        let list = lists.filter((list) => list.id === id)[0];
        
        let newName = prompt('Enter new name', list.name);
        if(newName != null) {
            list.name = newName;
        }

        this.updateList(list);
    }

    updateList = (list) => {
        Api.updateList(list)
            .then(this.setState(({lists}) => {
                return {lists: this.updateArrayItem(list, lists)}
            }))
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

    addTodo = (text, listId) => {
        const newTodo = this.createTodoItem(text, listId);

        Api.saveTodo(newTodo)
            .then((returnedTodo) => {
                this.setState((prevState) => {
                    const newTodos = [...prevState.todos, returnedTodo];
                    return {todos: newTodos}
                })
            })  
    }

    toggleDone = (id) => {
        const todos = this.state.todos;
        const oldTodo = todos.filter((todo) => todo.id === id)[0];
        const newTodo = {...oldTodo, done: !oldTodo.done}

        this.updateTodo(newTodo);
    }

    editTodoTask = (id) => {
        const todos = this.state.todos;
        let todo = todos.filter((todo) => todo.id === id)[0];
        
        let newTask = prompt('Update', todo.task);
        if(newTask != null) {
            todo.task = newTask;
        }

        this.updateTodo(todo);
    }

    updateTodo = (todo) => {
        Api.updateTodo(todo)
            .then(this.setState(({todos}) => {
                return {todos: this.updateArrayItem(todo, todos)}
            }))
    }

    deleteArrItem = (id, arr) => {
        const index = arr.findIndex((el) => el.id === id);

        const newArr = [
            ...arr.slice(0, index),
            ...arr.slice(index + 1)
        ]

            return newArr;
    }

    updateArrayItem = (item, arr) => {
        const index = arr.findIndex((el) => el.id === item.id);
            const newArr = [
                ...arr.slice(0, index),
                item,
                ...arr.slice(index + 1)
            ]

            return newArr;
    }

    deleteTodosByListId = (listId, todos) => {
        return todos.filter((todo) => todo.listId !== listId.toString());
    }

    generateTodosRoute() {
        return (
        <Route 
                    path='/:id'
                    render={(props) => <main><TodoList listId = {props.match.params.id}
                                                     lists = {this.state.lists}
                                                     todos = {this.state.todos}
                                                     onDeleted = {this.deleteTodo}
                                                     onToggleDone = {this.toggleDone}
                                                     onEdit = {this.editTodoTask}
                                              />
                                              <AddForm listId = {props.match.params.id} 
                                                       onAdded = {this.addTodo} />
                                       </main>}>
        </Route>
        );
    }

    render() {
        return(
        <Router>
            <div className='app'>
                <Route 
                    path='/' 
                    render={() => <nav>
                                        <h1>Todo list</h1>
                                        <MainList lists = {this.state.lists}
                                                onDeleted = {this.deleteList}
                                                onEdit = {this.editListName}
                                        />
                                        <AddForm onAdded = {this.addList}/>
                                  </nav>}>
                </Route>
                {this.state.todosRoute}
            </div>
        </Router>
        );
    }
}