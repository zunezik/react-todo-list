import React from 'react';
import {Link} from "react-router-dom";

export default class MainListItem extends React.Component {
    
    render() {
        return(
            <li>
                <Link to={`/${this.props.id}`} >
                
                    <span>{this.props.name}</span>
                </Link>
                <div>
                    <button onClick={this.props.onEdit}>Edit</button>
                    <button onClick={this.props.onDeleted}>Delete</button>
                </div>
            </li>
        );
    }
}