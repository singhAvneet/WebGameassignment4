var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var states;
(function (states) {
    // OVER CLASS
    var Over = (function (_super) {
        __extends(Over, _super);
        // CONSTRUCTOR
        function Over() {
            _super.call(this);
        }
        // PUBLIC METHODS
        Over.prototype.start = function () {
            this.endingScreen = new createjs.Bitmap(assets.getResult("ending"));
            this.addChild(this.endingScreen);
            // level label
            if (state === 3 && winning) {
                this._levelLabel = new objects.Label("You Won", "50px Consolas", "#000000", 320, 140, true);
                this.addChild(this._levelLabel);
            }
            else {
                this._levelLabel = new objects.Label("Game Over", "50px Consolas", "#000000", 320, 140, true);
                this.addChild(this._levelLabel); // add label to the stage
            }
            this._levelLabel = new objects.Label("Your Total Score :" + scoreboard.getScore(), "50px Consolas", "#000000", 320, 240, true);
            this.addChild(this._levelLabel); // add label to the stage
            this.addChild(this._levelLabel);
            this._backButton = new objects.Button("BackButton", 320, 340);
            this._backButton.on("click", this._clickBackButton, this); // event listener
            this.addChild(this._backButton);
            stage.addChild(this);
        };
        Over.prototype.update = function () {
            //this._levelLabel.rotation += 5;
        };
        // PRIVATE METHODS ++++++++++++++++++++++++++++++++++++++++++++++
        // Callback function / Event Handler for Back Button Click
        Over.prototype._clickBackButton = function (event) {
            changeState(config.MENU_STATE);
        };
        return Over;
    })(objects.Scene);
    states.Over = Over;
})(states || (states = {}));
//# sourceMappingURL=over.js.map