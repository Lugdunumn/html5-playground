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
    'precision mediump float;\n' +
    'uniform vec4 u_FragColor;\n' + // uniform variable
    'void main() {\n' +
    '   gl_FragColor = u_FragColor;\n' + // Set the color
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
    if(a_Position < 0){ // return value is -1
        console.log('Failed to get the storage location of a_Position.');
        return;
    }

    var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
    if (!u_FragColor) { // return value is null not -1
        console.log('Failed to get u_FragColor variable.');
        return;
    }


    // var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');

    // Pass vertex position to attribute variable
    //gl.vertexAttrib3f(a_Position, 0.5, 0.0, 0.0);
    // gl.vertexAttrib1f(a_PointSize, 50.0);
    // Register function (event handler) to be called on a mouse press
    canvas.onmousedown = function(ev) { click(ev, gl, canvas, a_Position, u_FragColor); };

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    gl.clear(gl.COLOR_BUFFER_BIT);

}

var g_points  = []; // the array for a mouse press
var g_colors = []; // the array to be store the color of a point
function click(ev, gl, canvas, a_Position, u_FragColor) {
    var x = ev.clientX; // x coordinates of a mouse pointer
    var y = ev.clientY;
    var rect = ev.target.getBoundingClientRect();

    x = ((x - rect.left) - canvas.height / 2) / (canvas.height / 2);
    y = (canvas.width / 2 - (y - rect.top)) / (canvas.width / 2);
    // Store the coordinates to g_points array
    //g_points.push(x);
    //g_points.push(y);
    g_points.push([x, y]);
    // Store the coordinates to g_points array
    if(x >= 0.0 && y >= 0.0){ // First quadrant
        g_colors.push([1.0, 0.0, 0.0, 1.0]); // Red
    } else if(x < 0.0 && y < 0.0) { // Third quadrant
        g_colors.push([0.0, 1.0, 0.0, 1.0]); // Green
    } else {
        g_colors.push([1.0, 1.0, 1.0, 1.0]); // white
    }
    gl.clear(gl.COLOR_BUFFER_BIT);

    var len = g_points.length;
    for (var i = 0; i < len; i ++) {
        var xy = g_points[i];
        var rgba = g_colors[i];
        // Pass the position of a point to a_Position variable
        gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);

        // Pass the color of a point to u_FragColor variable
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
        // Draw a point
        gl.drawArrays(gl.POINTS, 0, 1);
    }
}