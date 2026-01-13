import {USER_MESSAGES} from "../lang/messages/en/user.js";

export class GameEngine{
    constructor(buttonManager){
        this.manager = buttonManager;
        this.expectedIndex = 0;
        this.locked = true;
        this.startTimeout = null;
    }

    start(count){
        this.reset();
        this.manager.createButtons(count);
        this.manager.arrangeInRow();
        this.startTimeout = setTimeout(() => {
            this.startScramble(count);
        }, count * 1000);
    }

    startScramble(count){
        let moves = 0;
        const interval = setInterval(() => {
            this.manager.scramble();
            moves++;

            if(moves === count){
                clearInterval(interval);
                this.startRecall();
            }
        }, 2000);
    }

    startRecall(){
        this.manager.hideOrders();
        this.locked = false;
        this.manager.enableClicks(btn => this.handleClick(btn));
    }

    handleClick(button){
        if(this.locked){
            return;
        }

        if(button.order === this.expectedIndex){
            button.showOrder();
            this.expectedIndex++;

            if(this.expectedIndex === this.manager.buttons.length){
                this.locked = true;
                this.manager.disableClicks();
                alert(USER_MESSAGES.MSG_RIGHT);
            } 
        } else{
            this.locked = true;
            this.manager.showOrders();
            this.manager.disableClicks();
            alert(USER_MESSAGES.MSG_WRONG);
        }
    }

    showInvalidRange(){
        alert(USER_MESSAGES.INVALID_RANGE);
    }

    reset(){
        if (this.startTimeout) {
            clearTimeout(this.startTimeout);
            this.startTimeout = null;
        }
        this.manager.clear();
        this.expectedIndex = 0;
        this.locked = true;
    }

}