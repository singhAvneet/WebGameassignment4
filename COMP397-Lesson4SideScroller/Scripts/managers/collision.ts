﻿module managers {
    export class Collision {
        private coins: objects.coins;
        private game: createjs.Container;
        
        constructor() {

        }

        update(_player: objects.GameObject, object2: objects.GameObject): void {
            this._checkCollision(_player, object2);
            
           
            
  
        }

        private _distance(p1: createjs.Point, p2: createjs.Point): number {
            return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));

        }
        private _checkCollision(_player: objects.GameObject, object2: objects.GameObject): void {
            if (this._distance(_player.getPosition(), object2.getPosition()) < (object2.getHalfHeigth()))// +(_player.getHalfHeigth()))//
            {
                if (!object2.getCollision()) {
                    switch (object2.getObjectName()) {
                        case "coins":
                            scoreboard.removeLives(2);
                            createjs.Sound.play("coin");
                            game.removeChild(object2);
                            break;

                        case "truck2":
                            createjs.Sound.play("blast");
                            scoreboard.removescore(50);
                            scoreboard.removeLives(1);
                            //stage.removeChild(object2);    
                            break;
                        case "truck1":
                            createjs.Sound.play("blast");
                            scoreboard.removescore(50);
                            scoreboard.removeLives(1);

                            break;
                        case "fuel":
                            scoreboard.addLives(2);
                        //    scoreboard.addScore(50);
                            console.log("fuel");
                            game.removeChild(object2);
                            break;
                    }
                    object2.setCollision(true);
                }
                else {
                    scoreboard.addScore(1);
                    object2.setCollision(false);
                }
            }


        }


        


        }
    }