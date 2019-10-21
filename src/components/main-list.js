import React from 'react';

import MainListItem from './main-list-item';

export default class MainList extends React.Component {
 
    render() {
        const lists = this.props.lists;

        const elements = lists.map((item) => {
            return (
                <li key = {item.id}>
                        <MainListItem 
                        {... item}
                        onSelect = {() => this.props.onSelect(item.id)} 
                        onDeleted = {() => this.props.onDeleted(item.id)} />
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