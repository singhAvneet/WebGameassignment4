var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var states;
(function (states) {
    // MENU CLASS
    var Menu = (function (_super) {
        __extends(Menu, _super);
        // CONSTRUCTOR
        function Menu() {
            _super.call(this);
        }
        // PUBLIC METHODS
        Menu.prototype.start = function () {
            this.welcomeImage = new createjs.Bitmap(assets.getResult("welcome"));
            this.addChild(this.welcomeImage);
            this._helloLabel = new objects.Label("Road Cracker", "50px Consolas", "#ffff00", 220, 148, false);
            this.addChild(this._helloLabel); // add label to the stage
            this._instructionButton = new objects.Button("instructionButton", 320, 290);
            this._instructionButton.on("click", this._instructionClick, this); // event listener
            this.addChild(this._instructionButton);
            // start button
            this._startButton = new objects.Button("StartButton", 320, 340);
            //     this._startButton = new createjs.Bitmap("START");
            this._startButton.on("click", this._clickStartButton, this); // event listener
            this.addChild(this._startButton);
            stage.addChild(this);
        };
        Menu.prototype.update = function () {
        };
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++
        // Callback function / Event Handler for Start Button Click
        Menu.prototype._clickStartButton = function (event) {
            createjs.Sound.play("yay"); // activate static class play 
            changeState(config.PLAY_STATE);
            state = 1;
        };
        Menu.prototype._instructionClick = function (event) {
            changeState(config.INSTRUCTION_STATE);
        };
        return Menu;
    })(objects.Scene);
    states.Menu = Menu;
})(states || (states = {}));
//# sourceMappingURL=menu.js.map