import React from 'react';

export default class AddForm extends React.Component {

    state = {
        inputValue: ''
    }

    onInputChange = (e) => {
        this.setState({inputValue: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onAdded(this.state.inputValue, this.props.listId);
        this.setState({inputValue: ''});
    }
    
    render() {
        return(
        <form onSubmit={this.onSubmit}>
            <input type='text' 
                    placeholder='Type here'
                    onChange={this.onInputChange} 
                    value={this.state.inputValue}/>
        </form>
        );
    }
}