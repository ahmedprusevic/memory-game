import React, { Component } from 'react';
import './Navbar.css'

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(){
        this.props.restart()
    }

    render(){
        const { timerTime, numberOfMoves } = this.props
        let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
        let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
        return(
            <>
            <h1 className='header'>Matching Game</h1>
            <div className='Navbar'>
            <div className="timer">
            {minutes} : {seconds}
            </div>
            <div className="nomoves">{numberOfMoves} Moves</div>
            <i className="fas fa-redo-alt" onClick={this.handleClick}/>
            </div>
            </>
        );
    }
}

export default Navbar;