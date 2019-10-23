import React from 'react';

import MainListItem from './main-list-item';

import './main-list.css';

export default class MainList extends React.Component {
 
    render() {
        const lists = this.props.lists;

        const elements = lists.map((list) => {
            return (
                    <MainListItem key = {list.id}
                        {... list}
                        onDeleted = {() => this.props.onDeleted(list.id)} 
                        onEdit = {() => this.props.onEdit(list.id)} />
            );
        })

        return(
            <ul className='main-list'>{elements}</ul>
        );
    }
}