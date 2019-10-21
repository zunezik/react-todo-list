import React from 'react';

import './todo-list-item.css';

export default class TodoListItem extends React.Component {
    
    render() {
        return(
            <div>
                <input type="checkbox" checked={this.props.done} onChange = {this.props.onToggleDone} />
                <span className = {this.props.done ? 'done' : null}
                 onClick = {this.props.onEdit}>{this.props.task}</span>
                <button onClick = {this.props.onDeleted}>Delete</button>
            </div>
        );
    }
}