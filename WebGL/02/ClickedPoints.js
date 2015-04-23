/**
 * Created by YUHENG on 23/04/2015.
 */
// Vertex Shader program
var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'void main() {\n' +
    '   gl_Position = a_Position;\n' + // Coordiates
    '   gl_PointSize = 10.0;\n' + // Set the point size
    '}\n';

// Fragment shader program
var FSHADER_SOURCE =
    'void main() {\n' +
    '   gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);\n' + // Set the color
    '}\n';

function main(){
    var canvas = document.getElementById('webgl');
    var gl = getWebGLContext(canvas);
    if(!gl){
        console.log('Failed to get the rendering context for WebGL.');
        return;
    }

    // Initialize shaders
    if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)){
        console.log('Failed to initialize shaders.');
        return;
    }

    // get the storage location of attribute value
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if(a_Position < 0){
        console.log('Failed to get the storage location of a_Position.');
        return;
    }
    // var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');

    // Pass vertex position to attribute variable
    gl.vertexAttrib3f(a_Position, 0.5, 0.0, 0.0);
    // gl.vertexAttrib1f(a_PointSize, 50.0);
    // Register function (event handler) to be called on a mouse press
    canvas.onmousedown = function(ev) { click(ev, gl, canvas, a_Position); };

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    gl.clear(gl.COLOR_BUFFER_BIT);

}

var g_points  = []; // the array for a mouse press
function click(ev, gl, canvas, a_Position) {
    var x = ev.clientX; // x coordinates of a mouse pointer
    var y = ev.clientY;
    var rect = ev.target.getBoundingClientRect();

    x = ((x - rect.left) - canvas.height / 2) / (canvas.height / 2);
    y = (canvas.width / 2 - (y - rect.top)) / (canvas.width / 2);
    // Store the coordinates to g_points array
    g_points.push(x);
    g_points.push(y);
    gl.clear(gl.COLOR_BUFFER_BIT);

    var len = g_points.length;
    for (var i = 0; i < len; i += 2) {
        // Pass the position of a point to a_Position variable
        gl.vertexAttrib3f(a_Position, g_points[i], g_points[i + 1], 0.0);

        // Draw a point
        gl.drawArrays(gl.POINTS, 0, 1);
    }
}