import React from 'react';

import './todo-list-item.css';

export default class TodoListItem extends React.Component {
    
    render() {
        return(
            <li>
                <div>
                    <input type="checkbox" checked={this.props.done} onChange = {this.props.onToggleDone} />
                    <span className = {this.props.done ? 'done' : null}
                        onClick = {this.props.onEdit}>{this.props.task}
                    </span>
                </div>
                <button onClick = {this.props.onDelete}>Delete</button>
            </li>
        );
    }
}