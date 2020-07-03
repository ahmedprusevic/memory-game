import React, { Component } from 'react';
import Navbar from './Navbar';
import Card from './Card';
import WonDialog from './WonDialog';
import './MemoryGame.css';


class MemoryGame extends Component {
    
    constructor(props){
        super(props);
        this.state= {
            cards: this.shuffle(this.props.cards),
            check: [],
            correct: [],
            open: [],
            isChecking: false,
            timerOn: false,
            timerStart: 0,
            timerTime: 0,
            numberOfMoves: 0,
            openDialog: false,
            isRestarting: false
        };
        
        this.shuffle = this.shuffle.bind(this);
        this.check = this.check.bind(this);
        this.resetCheck= this.resetCheck.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.restart = this.restart.bind(this);
    }

    check(id, key) {
        this.setState({
            check:[...this.state.check, id],
            open:[...this.state.open, key]
        });
        if(this.state.check.length === 1) {
            this.setState({isChecking: true});
        }
        setTimeout(() => { 
            if(this.state.check.length === 2){
                (this.state.check.every(v => v === this.state.check[0])) ? this.setState({correct: [...this.state.correct, id]}) : this.setState({isWrong:true})
                this.resetCheck();
                this.setState({isChecking: false, numberOfMoves: this.state.numberOfMoves + 1});
            }
         }, 1500);
        
        
    } 

    resetCheck(){
        this.setState({
            check:[],
            open: []
        });
        (this.state.correct.length === 8) && this.stopTimer();
    }
    
    
    shuffle(cards){
        for (let i = 0; i < 1000; i++)
            {
                let location1 = Math.floor((Math.random() * cards.length));
                let location2 = Math.floor((Math.random() * cards.length));
                let tmp = cards[location1];

                cards[location1] = cards[location2];
                cards[location2] = tmp; 
            }
        return cards;
    }

    startTimer() {
        this.setState({
          timerOn: true,
          timerTime: this.state.timerTime,
          timerStart: Date.now() - this.state.timerTime
        });
        this.timer = setInterval(() => {
          this.setState({
            timerTime: Date.now() - this.state.timerStart
          });
        }, 10);
      };

      restart(){
        this.setState({
            cards: this.shuffle(this.props.cards),
            check: [],
            correct: [],
            open: [],
            isChecking: false,
            numberOfMoves: 0,
            openDialog: false,
            isRestarting: true
        })
        this.resetTimer();

        setTimeout(()=>{
          this.setState({isRestarting: false})
      }, 1000)
      }

      stopTimer()  {
        this.setState({ openDialog: true,  timerOn: false });
        clearInterval(this.timer);
      };

      resetTimer() {
        this.setState({
          timerStart: 0,
          timerTime: 0
        });
      };

    render() {
       const { cards,correct, open, isChecking, timerTime, numberOfMoves, openDialog, isRestarting } = this.state;
       const { key } = this.props;
        return(
            <>
            <Navbar 
            timerTime={timerTime} 
            numberOfMoves={numberOfMoves}
            restart={this.restart}/>
            <div className="MemoryBoard">
            {cards.map((icon) => (
                <Card 
                icon= {icon} 
                check={this.check} 
                resetCheck={this.resetCheck} 
                isCorrect={(correct.includes(icon.id) ? true : false)}
                isOpen= {(open.includes(icon.key) ? true : false)}
                key={key}
                isChecking={isChecking}
                startTimer={this.startTimer}
                isRestarting= {isRestarting}
                />
            ))}
            </div>
            <WonDialog 
            open= {openDialog}
            time= {timerTime}
            numMoves={numberOfMoves}
            restart = {this.restart}
            />
            </>
        );
    }
}

export default MemoryGame;