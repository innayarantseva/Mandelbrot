/***** global vars ******/
//var CPS = Complex Plane Square, which means we tke in concideration a square 2*CPS by 2*CPS region of the complex plane. This square is centered at the complex plane's origin
var CPS = 2; 
var MAX_ITERATIONS = 300; 
var DELTA = 0.008;

//complex numbers constructor Complex
function Complex(x, y) {
    this.x = x || 0;
    this.y = y || 0;
}

//method toString represents a complex number as "x + yi"
Complex.prototype.toString = function() {
    return this.y >= 0 ? this.x + " + " + this.y + "i" : this.x + " - " + this.y + "i";
};

//method modulus returns a real number that equal to the absolute value of given complex num
Complex.prototype.modulus = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};

//method add defines an addition operation for two given complex numbers
Complex.prototype.add = function(z) {
    return new Complex(this.x + z.x, this.y + z.y);
};

//method square returns a complex num that is equal to square of given complex num
Complex.prototype.square = function() {
    var x = this.x * this.x - this.y * this.y;
    var y = 2 * this.x * this.y;
    
    return new Complex(x, y);
};


//Object globals stores all global vars needed
var globals = {};
globals.canvas = document.getElementsByClassName("canvas")[0];
globals.canvas.ctx = globals.canvas.getContext('2d');
globals.canvas.ctx.fillStyle = "black";  

initializeCoordinateSystem();
drawMandelbrotSet();
drawCoordinateAxes();

function initializeCoordinateSystem() {
    var ctx = globals.canvas.ctx;
    //center the canvas coordinate system
    ctx.translate(globals.canvas.width / 2, globals.canvas.height / 2);
    //flip the y-axis and scale it with delta
    ctx.scale(1/DELTA, -1/DELTA);
}

function drawMandelbrotSet() {
    var ctx = globals.canvas.ctx;
    //Real part axis
    for (var Re = -CPS; Re <= CPS; Re = Re + DELTA) {
        next_c_value:
        //Im part axis
        for (var Im = -CPS; Im <= CPS; Im = Im + DELTA) {
            var z = new Complex(0, 0);
            var c = new Complex(Re, Im);
            
            for (var iterationCount = 1; iterationCount <= MAX_ITERATIONS; iterationCount++) {
                z = c.add( z.square() );
                if (z.modulus() > 2) {
                    continue next_c_value;
                };
            };
            
            ctx.fillRect(Re, Im, DELTA, DELTA);
        };
    };
};

function drawCoordinateAxes() {
    /* 
      Draws coordinate axes that are exactly as long as the (square) complex plane region under consideration.
    */
      var ctx = globals.canvas.ctx;
      
      ctx.lineWidth = DELTA;
      ctx.strokeStyle = "red";
      
      // Draw the x-axis:
      ctx.beginPath();
      ctx.moveTo(CPS, 0);
      ctx.lineTo(-CPS, 0);
      ctx.stroke();
      
      // Draw the y-axis:
      ctx.beginPath();
      ctx.moveTo(0, CPS);
      ctx.lineTo(0, -CPS);
      ctx.stroke();      
    } // drawCoordinateAxes


