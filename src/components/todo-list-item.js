import React from 'react';

import './todo-list-item.css';

export default class TodoListItem extends React.Component {
    
    render() {
        return(
            <li>
                <label className = {this.props.done ? 'done' : null}>
                    <input type="checkbox" 
                            checked={this.props.done} onChange = {this.props.onToggleDone} />
                    {this.props.task}
                </label>
                <div>
                    <button onClick = {this.props.onEdit}>Edit</button>
                    <button onClick = {this.props.onDelete}>Delete</button>
                </div>
            </li>
        );
    }
}