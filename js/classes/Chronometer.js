export class Chronometer {
    constructor() {
        this.changed = 0;
        this.stop = false;
        this.elapsedTime = 0;
        this.startTime = 0;
        this.minutes = 0;
        this.seconds = 0;
    }
    updateTime(moved) {
        if (moved) {
            if(this.changed === 0){
                this.startTime = Date.now() - this.elapsedTime;
                this.changed = 1;
            }
            this.elapsedTime = Date.now() - this.startTime;
            this.seconds = Math.floor((this.elapsedTime / 1000) % 60);
            this.minutes = Math.floor((this.elapsedTime / (1000 * 60)) % 60);
            let chronometer = document.getElementById('chronometer');
            if (this.seconds < 10 && this.minutes < 10) {
                chronometer.innerHTML = "0" + this.minutes + " : 0" + this.seconds;
            } else if (this.seconds > 10 && this.minutes < 10) {
                chronometer.innerHTML = "0" + this.minutes + " : " + this.seconds;
            } else if (this.seconds < 10 && this.minutes > 10) {
                chronometer.innerHTML = this.minutes + " : 0" + this.seconds;
            } else if (this.seconds > 10 && this.minutes > 10) {
                chronometer.innerHTML = this.minutes + " : " + this.seconds;
            }
        }
    }
    stopChronometer(){
        this.stop = true;
    }
}