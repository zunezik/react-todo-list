import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import TodoList from './components/todo-list';
import MainList from './components/main-list';
import AddForm from './components/add-form';
import Api from './api';

import './app.css';

export default class App extends React.Component {

    state = {
        lists : [],
        waitingLists: true
    }

    componentDidMount() {
        Api.getLists()
            .then((lists) => {
                this.setState({lists: lists, waitingLists: false});
            }) 
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
                lists: this.deleteArrItem(id, lists)
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
                <Route 
                    path='/:id'
                    render={(props) => <main><TodoList listId = {props.match.params.id}
                                                     lists = {this.state.lists}
                                                     waitingLists = {this.state.waitingLists}
                                              />
                                       </main>}>
                </Route>
            </div>
        </Router>
        );
    }
}