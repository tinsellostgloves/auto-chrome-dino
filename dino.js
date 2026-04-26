const originalUpdate = Runner.prototype.update;

Runner.prototype.update = function() {
    originalUpdate.apply(this, arguments);
    
    if (this.crashed) return;

    const obstacles = this.horizon.obstacles;
    let needToDodge = false;

    if (obstacles.length > 0) {
        const obstacle = obstacles[0];
        const distance = obstacle.xPos - this.tRex.xPos;
        const speed = this.currentSpeed;
        
        if (distance < speed * 18 && distance > 0) {
            needToDodge = true;
            if (obstacle.yPos < 75) {
                if (!this.tRex.ducking) this.tRex.setDuck(true);
            } else {
                if (!this.tRex.jumping && !this.tRex.ducking) {
                    if (this.playSound && this.soundFx) {
                        this.playSound(this.soundFx.BUTTON_PRESS);
                    }
                    this.tRex.startJump(speed);
                }
            }
        }
    }
    
    if (!needToDodge && this.tRex.ducking && !this.tRex.jumping) {
        this.tRex.setDuck(false);
    }
};
