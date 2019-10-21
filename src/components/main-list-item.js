import React from 'react';
import {Link} from "react-router-dom";

export default class MainListItem extends React.Component {
    
    render() {
        return(
            <div>
                <Link to={`/${this.props.id}`} >
                    <span onClick = {this.props.onSelect}>{this.props.name}</span>
                </Link>
                <button onClick={this.props.onDeleted}>Remove</button>
            </div>
        );
    }
}