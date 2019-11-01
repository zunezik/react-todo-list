import React from "react"
import { Redirect } from "react-router-dom"

import TodoListItem from "./todo-list-item"
import Api from "../api"
import AddForm from "./add-form"

import "./todo-list.css"

export default class TodoList extends React.Component {
    state = {
        todos: null,
        waitingTodos: true,
        listId: null
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.listId !== prevState.listId) {
            return {
                listId: nextProps.listId,
                waitingTodos: true
            }
        }

        return null
    }

    componentDidMount() {
        Api.getTodosByListId(this.state.listId).then(todos => {
            this.setState({ todos: todos, waitingTodos: false })
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.waitingTodos) {
            Api.getTodosByListId(this.state.listId).then(todos => {
                this.setState({ todos: todos, waitingTodos: false })
            })
        }
    }

    createTodoItem = (text, listId) => {
        return {
            id: null,
            listId: listId,
            done: false,
            task: text
        }
    }

    deleteTodo = id => {
        Api.deleteTodo(id).then(
            this.setState(({ todos }) => {
                return { todos: this.deleteArrItem(id, todos) }
            })
        )
    }

    addTodo = (text, listId) => {
        const newTodo = this.createTodoItem(text, listId)

        Api.saveTodo(newTodo).then(returnedTodo => {
            this.setState(prevState => {
                const newTodos = [...prevState.todos, returnedTodo]
                return { todos: newTodos }
            })
        })
    }

    toggleDone = id => {
        const todos = this.state.todos
        const oldTodo = todos.filter(todo => todo.id === id)[0]
        const newTodo = { ...oldTodo, done: !oldTodo.done }

        this.updateTodo(newTodo)
    }

    editTodoTask = id => {
        const todos = this.state.todos
        let todo = todos.filter(todo => todo.id === id)[0]

        let newTask = prompt("Update", todo.task)
        if (newTask != null) {
            todo.task = newTask
        }

        this.updateTodo(todo)
    }

    updateTodo = todo => {
        Api.updateTodo(todo).then(
            this.setState(({ todos }) => {
                return { todos: this.updateArrayItem(todo, todos) }
            })
        )
    }

    deleteArrItem = (id, arr) => {
        const index = arr.findIndex(el => el.id === id)

        const newArr = [...arr.slice(0, index), ...arr.slice(index + 1)]

        return newArr
    }

    updateArrayItem = (item, arr) => {
        const index = arr.findIndex(el => el.id === item.id)
        const newArr = [...arr.slice(0, index), item, ...arr.slice(index + 1)]

        return newArr
    }

    render() {
        if (this.state.waitingTodos || this.props.waitingLists) {
            return null
        }

        const todos = this.state.todos
        const lists = this.props.lists

        console.log(lists)
        const list = lists.find(
            list => list.id.toString() === this.props.listId
        )
        if (!list) return <Redirect to="/" />

        const elements = todos.map(todo => {
            return (
                <TodoListItem
                    key={todo.id}
                    {...todo}
                    onDelete={() => this.deleteTodo(todo.id)}
                    onToggleDone={() => this.toggleDone(todo.id)}
                    onEdit={() => this.editTodoTask(todo.id)}
                />
            )
        })

        return (
            <div>
                <h2>{list.name}</h2>
                <ul>{elements}</ul>
                <AddForm listId={this.state.listId} onAdded={this.addTodo} />
            </div>
        )
    }
}
