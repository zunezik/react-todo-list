import React from "react"

import MainListItem from "./main-list-item"

import "./main-list.css"

export default class MainList extends React.Component {
    state = {
        activeList: -1
    }

    select = index => {
        this.setState({ activeList: index })
    }

    render() {
        const lists = this.props.lists

        const elements = lists.map(list => {
            return (
                <MainListItem
                    key={list.id}
                    {...list}
                    activeList={list.id === this.state.activeList}
                    onSelect={event => {
                        if (event.target.nodeName !== "BUTTON") {
                            this.select(list.id)
                        }
                    }}
                    onDeleted={() => {
                        this.props.onDeleted(list.id)
                        this.select(-1)
                    }}
                    onEdit={() => {
                        this.props.onEdit(list.id)
                        this.select(list.id)
                    }}
                />
            )
        })

        return <ul className="main-list">{elements}</ul>
    }
}
