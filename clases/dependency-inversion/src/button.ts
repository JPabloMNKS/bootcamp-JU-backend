export default class Button{

    constructor(private lamp: Swichable){
    }

    onButtonListener(status: boolean){
        status ? this.lamp.turnOn(): this.lamp.turnOff();
    }
}