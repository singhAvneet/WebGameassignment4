﻿module states {
    // GAME CLASS
    export class game2 extends objects.Scene {
        // PRIVATE INSTANCE VARIABLES
        private _ground: objects.ground;
        private _track: objects.track;
        private _smallCar: objects.smallCar;
        private _trucks: objects.truck[] = [];
        private _coins: objects.coins;
        private _fuel: objects.fuel;
        private _car: objects.car;
        private _collision: managers.Collision;
        private TruckCollided: boolean;
        private _nextButton: objects.Button;
        private _gun: objects.gun;
        private _bullet: objects.bullet[] = [];
        private _fireNumber: number;
        private _finishLine: objects.finish;
        private _gunAxsis: number;
        _scoreLabel: objects.Label;
        _livesLabel: objects.Label;
      
        // CONSTRUCTOR
        constructor() {
            super();

        }

        // PUBLIC METHODS
        public start(): void {
            TruckCollided1 = false;
            state = 2;
            game.removeAllChildren();
            scoreboard.setLives(15);
           // scoreboard.setScore(100);
            this._fireNumber = 0;
            this._nextButton = new objects.Button("NextButton", 100, 100);
      
            this._ground = new objects.ground();
            this.addChild(this._ground);

            this._track = new objects.track(7);
            this.addChild(this._track);

            this._trucks[0] = new objects.truck("truck1");
            this.addChild(this._trucks[0]);

            this._smallCar = new objects.smallCar();
            this._smallCar.sety(800);
            this.addChild(this._smallCar);
            
            this._finishLine = new objects.finish();
            this.addChild(this._finishLine);

            this._gun = new objects.gun(300);
            this.addChild(this._gun);

            this._trucks[1] = new objects.truck("truck2");
            this.addChild(this._trucks[1]);

            this._car = new objects.car();
            this.addChild(this._car);

            this._coins = new objects.coins("coins");
            this.addChild(this._coins);

            this._fuel = new objects.fuel();
            this.addChild(this._fuel);

            blast = new objects.collision("collision");
            this.addChild(blast);
            carblast = new objects.collision("collision");
            this.addChild(carblast);

            this._scoreLabel = new objects.Label("Score: ", "40px " + config.FONT_FAMILY, config.FONT_COLOR, 5, 5, false);
            this.addChild(this._scoreLabel);

            this._livesLabel = new objects.Label("Fuel: ", "40px " + config.FONT_FAMILY, config.FONT_COLOR, 350, 5, false);
            this.addChild(this._livesLabel);
                
            this._collision = new managers.Collision();

            stage.addChild(this);

        }

        public update(): void {
           

            if (TruckCollided1) {
                blast.update(p1);
                this.addChild(blast);
               

            } 
            if (carCollided && !winning) {
                scoreboard.removescore(200);
                scoreboard.removeLives(2);
                carCollided = false;
            } 

            blast.reset();
            carblast.reset();

            if (scoreboard.getLives() < 10) {
                this.addChild(this._coins);
                this.addChild(this._fuel);
            }

            this._ground.update();
            this._track.update();
            this._trucks[1].update();
            this._trucks[0].update();
          
            this._coins.update();
            this._fuel.update();
            this._car.update();
            this._smallCar.update();


            //----------------Gun and bullets----------------------------
            if (this._smallCar.gety() % 100 == 0&& this._fireNumber<=2) {
                this._bullet[this._fireNumber] = new objects.bullet();
                this.addChild(this._bullet[this._fireNumber]);
                stage.addChild(this);
              //  this._gunAxsis = Math.floor((Math.random() * 250) + 200);
               // this._gun.update(this._gunAxsis);
                this._bullet[this._fireNumber].reset(this._gunAxsis - 20);
                this._fireNumber += 1;
            }

            if (this._smallCar.gety() % 100 == 0) {
                this._gunAxsis = Math.floor((Math.random() * 250) + 200);
                this._gun.update(this._gunAxsis);
                this._bullet[0].update(this._gunAxsis - 20);
                this._bullet[1].update(this._gunAxsis - 20);
                this._bullet[2].update(this._gunAxsis - 20);
            }

            this._bullet[0].update1();
            this._bullet[1].update1();
            this._bullet[2].update1();
            //this._bullet[3].update();
            //----------------Gun and bullets----------------------------


            p1= this._collision._Truckcollision(this._trucks[0], this._trucks[1],blast);
            if (!carCollided && !winning) {
                if (this._smallCar.gety() % 8 == 0)
                    scoreboard.addScore(50);
                this._collision.update(this._car, this._trucks[1]);
                this._collision.update(this._car, this._trucks[0]);
                this._collision.update(this._car, this._bullet[0]);
                this._collision.update(this._car, this._bullet[1]);
                this._collision.update(this._car, this._bullet[2]);
                this._collision.update(this._car, this._coins);
                this._collision.update(this._car, this._fuel);
            }
        
            this.updateScore();
            if (this._smallCar.gety() < 70) {
                this._nextButton.on("click", this._clickNextButton, this); // event listener
                this.addChild(this._nextButton);
                stage.addChild(this);
                winning = true;
            }
            else
                scoreboard.removeLives(0.04);

            if (scoreboard.getLives() <= 0 || scoreboard.getLives() <= 0) {
                this.removeAllChildren();
                changeState(config.OVER_STATE);
            }
        }

        private updateScore(): void {
            this._livesLabel.text = "Fuel: " + scoreboard.getLives();
            this._scoreLabel.text = "Score: " + scoreboard.getScore();
        }
        private _clickNextButton(event: createjs.MouseEvent): void {
            changeState(config.PLAY_STATE3);
            this.removeAllChildren();
        }

    }
} 