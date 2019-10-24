import React from 'react';
import {Redirect} from "react-router-dom";

import TodoListItem from './todo-list-item';

import './todo-list.css';

export default class TodoList extends React.Component {

    render() {
        const allTodos = this.props.todos;
        const lists = this.props.lists;

        const list = lists.find((list) => list.id.toString() === this.props.listId);
        if(!list) return <Redirect to='/' />

        let todos = allTodos.filter((todo) => todo.listId === this.props.listId);

        const elements = todos.map((todo) => {
            return (
                    <TodoListItem 
                    key = {todo.id}
                    {... todo}
                    onDeleted = {() => this.props.onDeleted(todo.id)} 
                    onToggleDone = {() => this.props.onToggleDone(todo.id)}
                    onEdit = {() => this.props.onEdit(todo.id)} />
            );
        })

        return(
            <div>
                <h2>{list.name}</h2>
                <ul>{elements}</ul>
            </div>
        );
    }
}