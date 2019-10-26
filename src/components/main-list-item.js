import React from 'react';
import {Link} from "react-router-dom";

import './main-list-item.css'

export default class MainListItem extends React.Component {    

    select = (event) => { 
        let li = event.currentTarget;
        let ul = li.parentNode;
        
        let selected = ul.querySelectorAll('.selected');
        for(let elem of selected) {
            elem.classList.remove('selected');
        }  

        li.classList.add('selected');
    }
 
    render() {
        return(
                <Link to={`/${this.props.id}`} onClick={this.select} >
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