import React, { Component } from 'react';
import './TodoList.css';
import Container from './Container';


class TodoList extends Component {
    constructor(props) {
        super(props);
        const lists = localStorage.getItem('List') === null ? [] : JSON.parse(localStorage.getItem('List'));
        this.state ={
            value: '',
            lists: lists,
        }
    }

    onChange = e => {
        this.setState({value:e.target.value})
    };

    onSubmit = e => {
        e.preventDefault();
        const newItem = this.state.value;
        if(newItem.trim() !== ''){
            const lists = [...this.state.lists, newItem];
            localStorage.setItem('List', JSON.stringify(lists));
            this.setState({lists:lists, value:""});
        }
    };

    deleteItem = index =>{
        const lists = this.state.lists.filter((item, i ) => {
            return index !== i
        });
        this.setState({lists:lists});
        localStorage.setItem('List', JSON.stringify(lists));
    };


    render() {
        return (
            <div className="TodoList">
                <h1>App For Note</h1>
               <Container
                   value={this.state.value}
                   onSubmit={this.onSubmit}
                   onChange={this.onChange}
                   lists={this.state.lists}
                   deleteItem={this.deleteItem}
               />
            </div>
        );
    }
}

export default TodoList;