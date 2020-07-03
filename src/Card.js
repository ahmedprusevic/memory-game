import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
    constructor(props){
        super(props);
     
        this.handleClick=this.handleClick.bind(this);
    }
    handleClick(){
        this.props.check(this.props.icon.id, this.props.icon.key)
        this.props.startTimer()
    }
    
    render(){
        const { icon, isCorrect, isOpen, isChecking,isRestarting } = this.props
        return(
            <button
            className={`Card ${isOpen && 'open pulse'} ${isCorrect && 'correct jello-horizontal'} ${isRestarting && 'flipInY'}`} 
            onClick={this.handleClick}
            disabled={isChecking || isCorrect || isOpen}
            >
                <i className={icon.icon} />
            </button>
        );
    }
}


export default Card