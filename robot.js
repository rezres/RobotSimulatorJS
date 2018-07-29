class Robot {
    constructor() {
        this.y = 0;
        this.x = 0;
        this.f = 0;
        this.maxCoordinatorX = 400;
        this.maxCoordinatorY = 400;
        this.isPlaced = false;
        this.isOffline = false;
        this.isMoving = false;
    }
    showModalInfo(Message) {
        $("#customModalContent").html(Message);
        $("#customModalHeader").attr("class", "modal-header alert-info");
        $("#customModalTitle").html("<span class='glyphicon glyphicon-info-sign text-primary'></span>");
        $("#customModal").modal('show');
    }
    showModalError(Message) {
        $("#customModalContent").html(Message);
        $("#customModalHeader").attr("class", "modal-header alert-danger");
        $("#customModalTitle").html("<span class='glyphicon glyphicon-exclamation-sign text-danger'></span>");
        $("#customModal").modal('show');
    }
    currentlyPlaced() {
        if (this.isPlaced === false) {
            this.showModalError("Please Place ME First :)");
            return false;
        }
        else {
            return this.isPlaced;
        }
    }

    myDirection() {
        if (this.currentlyPlaced()) {
            switch (this.f) {
                case 'N':
                    return "North";
                case 'S':
                    return "South";
                case 'W':
                    return "West";
                case 'E':
                    return "East";
            }
        }
    }
    pleaseDont() {
        this.showModalError("Please Don't Kill me :( ");

        return false;
    }
    currentlyNotOffline() {
        if (this.isOffline === false) { return true; }
        else {
            this.showModalError("I am currently Offline");
            return false;
        }

    }
    validDirection(direction) {
        switch (direction) {
            case 'N':
            case 'North':
                return "N";
            case 'S':
            case 'South':
                return "S";
            case 'W':
            case 'West':
                return "W";
            case 'E':
            case 'East':
                return "E";
            default:
                return false;
        }
    }
    facingNorth() { return this.f === "N"; }
    facingEast() { return this.f === "E"; }
    facingSouth() { return this.f === "S"; }
    facingWest() { return this.f === "W"; }

    place(X, Y, F) {
        if (this.currentlyNotOffline()) {
            var insertedDirection = this.validDirection(F);
            if (insertedDirection !== false) {
                if (X >= 0 && X <= (this.maxCoordinatorX / 100) && Y >= 0 && Y <= (this.maxCoordinatorY / 100)) {
                    this.isPlaced = true;
                    this.x = X * 100;
                    this.y = Y * 100;
                    this.f = insertedDirection;
                }
            }
        }

    }
    canTurn() {
        if (this.isMoving === false && this.currentlyNotOffline() && this.currentlyPlaced()) {
            return true;
        }

        return false;
    }
    canMove() {
        if (this.currentlyPlaced() && this.isMoving === false && this.currentlyNotOffline()) {
            //If North, Increase Y 
            if (this.facingNorth()) {
                if (this.y === this.maxCoordinatorY) {
                    this.pleaseDont();
                    return false;
                }
                else
                    return true;
            }
            //If South, Decrease Y 
            else if (this.facingSouth()) {
                if (this.y === 0) {
                    this.pleaseDont();
                    return false;
                } else
                    return true;
            }
            //If East, increase X
            else if (this.facingEast()) {
                if (this.x === this.maxCoordinatorX) {
                    this.pleaseDont();
                    return false;
                } else
                    return true;
            }
            //If West, decrease X
            else if (this.facingWest()) {
                if (this.x === 0) {
                    this.pleaseDont();
                    return false;
                } else
                    return true;
            }
        }
        return false;
    }
    goOffline() {
        if (this.currentlyPlaced()) {
            this.isOffline = true;
            setTimeout(() => {
                this.isOffline = false;
            }, 5000);
        }
        else
            this.place

    }
    transitMoveStart() {
        if (this.canMove()) {
            this.isMoving = true;
            var count = 0;
            this.transitMove(count);
        }
    }
    transitMove(count) {
        setTimeout(() => {
            this.move();
            count++;
            if (count < 100) {
                this.transitMove(count);
            }
            else {
                this.isMoving = false;
            }
        }, 10);
    }
    move() {
        //If North, Increase Y 
        if (this.facingNorth()) {
            if (this.y === this.maxCoordinatorY) {
                return this.pleaseDont();
            }
            else {
                this.y = this.y + 1;
            }
        }
        //If South, Decrease Y 
        else if (this.facingSouth()) {
            if (this.y === 0)
                return this.pleaseDont();
            else
                this.y -= 1;
        }
        //If East, increase X
        else if (this.facingEast()) {
            if (this.x === this.maxCoordinatorX)
                return this.pleaseDont();
            else
                this.x += 1;
        }
        //If West, decrease X
        else if (this.facingWest()) {
            if (this.x === 0)
                return this.pleaseDont();
            else
                this.x -= 1;
        }

    }
    left() {
        if (this.canTurn()) {
            //f =>  f - 90  
            //If North = 360-90 = 270  =  West  
            if (this.facingNorth()) {
                this.f = 'W';
            }
            //If West = 270 - 90 = 180 = South 
            else if (this.facingWest()) {
                this.f = 'S';
            }
            //If South = 180 - 90 = 90 = East  
            else if (this.facingSouth()) {
                this.f = 'E'
            }
            //If East = 90 - 90 = 0  = North  
            else if (this.facingEast()) {
                this.f = 'N';
            }
        }
    }
    right() {
        if (this.canTurn()) {
            //f =>  f + 90  
            //If North = 0+90 = 90  =  East  
            if (this.facingNorth()) {
                this.f = 'E';
            }
            //If East = 90 + 90 = 180 = South 
            else if (this.facingEast()) {
                this.f = 'S';
            }
            //If South = 180 + 90 = 270 = West  
            else if (this.facingSouth()) {
                this.f = 'W'
            }
            //If East = 270 + 90 = 380  = North  
            else if (this.facingWest()) {
                this.f = 'N';
            }
        }
    }
    report() {
        if (this.currentlyPlaced()) {
            var direction = this.myDirection();
            this.showModalInfo("I am Currently Facing " + direction + " at X = " + (this.x / 100) + " and Y = " + (this.y / 100));
        }
        else return false;
    }
};