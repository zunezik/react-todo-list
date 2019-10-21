import React from 'react';

import TodoListItem from './todo-list-item';

export default class TodoList extends React.Component {
 
    render() {
        const todos = this.props.todos;

        const elements = todos.map((item) => {
            return (
                <li key = {item.id}>
                    <TodoListItem 
                    {... item}
                    onDeleted = {() => this.props.onDeleted(item.id)} 
                    onToggleDone = {() => this.props.onToggleDone(item.id)}
                    onEdit = {() => this.props.onEdit(item.id)} />
                </li>
            );
        })

        return(
            <div>
                <ul>{elements}</ul>
            </div>
        );
    }
}