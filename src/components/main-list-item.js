import React from 'react';
import {Link} from "react-router-dom";

import './main-list-item.css'

export default class MainListItem extends React.Component {    
    render() {
        return(
                <Link to={`/${this.props.id}`} 
                    onClick={this.props.onSelect} className={this.props.activeList ? "selected" : ""}>
                    
                    <div>
                        <span>{this.props.name}</span>
                        <div>
                            <button onClick={this.props.onEdit}>Edit</button>
                            <button onClick={this.props.onDeleted}>Delete</button>
                        </div>
                    </div>
                </Link>
        );
    }
}