/**
 * Created by YUHENG on 22/04/2015.
 */
var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');

context.font = '38pt Arial';
context.fillStyle = 'cornflowerblue';

context.fillText('Hello Canvas', canvas.width/2 - 150,
canvas.height/2 + 15);

context.strokeText('Hello Canvas', canvas.width/2 - 150,
canvas.height/2 + 15);
