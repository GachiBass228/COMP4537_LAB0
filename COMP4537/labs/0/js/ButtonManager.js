import { ButtonEntity } from "./ButtonEntity.js";

export class ButtonManager{
    constructor(){
        this.buttons = [];
    }

    clear(){
        this.buttons.forEach(btn => btn.remove())
        this.buttons = [];
    }

    createButtons(count){
        for (let i = 0; i < count; i++){
            const color = `hsl(${Math.random() * 360}, 70%, 60%)`;
            const button = new ButtonEntity(i, color);
            this.buttons.push(button);
        }
    }

    arrangeInRow(){
        let x = 20;
        let y = 60;
        this.buttons.forEach(btn => {
            btn.setPosition(x, y);
            x += btn.element.offsetWidth + 10;
        });
    }

    scramble(){
        const btnWidth = this.buttons[0].element.offsetWidth;
        const btnHeight = this.buttons[0].element.offsetHeight;
        const maxX = window.innerWidth - btnWidth;
        const maxY = window.innerHeight - btnHeight;

        this.buttons.forEach(btn => {
            btn.setPosition(Math.random() * maxX, Math.random() * maxY);
        });
    }

    hideOrders(){
        this.buttons.forEach(btn => btn.hideOrder());
    }

    showOrders(){
        this.buttons.forEach(btn => btn.showOrder());
    }

    enableClicks(handler){
        this.buttons.forEach(btn => btn.enableClick(() => handler(btn)));
    }

    disableClicks(){
        this.buttons.forEach(btn => btn.disableClick());
    }
}
