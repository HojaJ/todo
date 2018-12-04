import React, {Component} from 'react';
import './Container.css';

class Container extends Component {
    constructor(props) {
        super(props);
        this.enterButton = React.createRef();
        this.state ={
            show: true,
            filtered: []
        };
    }

    onFilter = e => {
        this.setState({show: e.target.value === ''});
        let filtered = [];
        const letter = e.target.value.toLowerCase();
        this.props.lists.forEach(function (item) {
            if(item.toLowerCase().indexOf(letter) !== -1){
                filtered.push(item);
            }
        });
        this.setState({filtered});
    };

    renderLi(item,i){
        return <li key={i}>{item}<button onClick={this.props.deleteItem.bind(this,i)} className='delete-item'>&times;</button></li>
    }
    handleKeyPressEnter = (e) => {
        if (e.key === 'Enter') {
            this.enterButton.current.click();
        }
    };
    render() {
        const lists = this.state.show ? this.props.lists : this.state.filtered;
        return (
            <div className="Elements">
                <input
                    onKeyPress={this.handleKeyPressEnter}
                    placeholder="Task"
                    type="text"
                    onChange={this.props.onChange}
                    value={this.props.value}
                />


                <input type="submit" value="Add Note" onClick={this.props.onSubmit} ref={this.enterButton} />
                <input type="text" onChange={this.onFilter}/>
                <ul className="List">
                    {lists !== "" && lists.map((item,i) => {
                        return this.renderLi(item,i)
                    })}
                </ul>
            </div>
        );
    }
}

export default Container;