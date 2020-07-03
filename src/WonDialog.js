import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class WonDialog extends Component {
  render() {
      const { open, time, numMoves } = this.props
      const handleClick = () => {
          this.props.restart()
      }
    let seconds = ("0" + (Math.floor(time / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(time / 60000) % 60)).slice(-2);
    return (
        <div>
         <Dialog open={open}>
            <DialogTitle id="alert-dialog-title">{"CONGRADULATIONS!"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                 It took you {minutes} : {seconds} minutes to finish and {numMoves} moves.
                </DialogContentText>
                </DialogContent>
            <DialogActions>
                <Button color="primary" autoFocus onClick={handleClick}>
                    Play Again
                </Button>
            </DialogActions>
         </Dialog>
        </div>
    );
  }
}

export default WonDialog