const renderCanvas = document.createElement("canvas");
renderCanvas.width = 1080;
renderCanvas.height = 720;

const gl = renderCanvas.getContext("webgl2");
const shaderProgram = gl.createProgram()
vbo = gl.createBuffer()
ebo = gl.createBuffer()

uniformAspectRatio = null;
uniformTime = null;

const vertexshadersrc = `#version 300 es
precision highp float;

in vec4 aposition;

out vec2 coord;

void main()
{
    gl_Position = aposition;
    coord = aposition.xy;
}
`;

const fragmentshadersrc = `#version 300 es
precision highp float;

out vec4 fragColor;

uniform float time;
uniform vec2 screen;

in vec2 coord;

void main()
{
    float whratio = (screen.x/screen.y);
    vec3 pxp = vec3(coord.x*whratio,coord.y,0.0);

    fragColor = vec4(vec3(1.0)*time,1.0);
}
`;

function onStart()
{
    if (!gl)
    {
        console.log("Webgl is not supported.")
        alert("Your browser does not support webgl. Please use one that does.");
    }

    var vertexshader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexshader,vertexshadersrc);
    gl.compileShader(vertexshader);
    if (!gl.getShaderParameter(vertexshader,gl.COMPILE_STATUS))
    {
        alert("Vertex shader failed to compile..."+"\n"+gl.getShaderInfoLog(vertexshader))
    }

    var fragmentshader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentshader,fragmentshadersrc);
    gl.compileShader(fragmentshader);
    if (!gl.getShaderParameter(fragmentshader,gl.COMPILE_STATUS))
    {
        alert("Vertex shader failed to compile..."+"\n"+gl.getShaderInfoLog(fragmentshader))
    }

    gl.attachShader(shaderProgram,vertexshader);
    gl.attachShader(shaderProgram,fragmentshader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram,gl.LINK_STATUS))
    {
        alert("Shader program failed to link..."+"\n"+gl.getProgramInfoLog(shaderProgram));
    }

    vertexdata = [
        -1.0,-1.0,0.0,1.0,
        -1.0, 1.0,0.0,1.0,
         1.0, 1.0,0.0,1.0,
         1.0,-1.0,0.0,1.0
    ];

    indexdata = [
        0,1,2,
        2,3,0
    ]

    gl.bindBuffer(gl.ARRAY_BUFFER,vbo);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertexdata),gl.STATIC_DRAW);
    const aPosition = gl.getAttribLocation(shaderProgram,"aposition");
    if (aPosition < 0)
    {
        alert("aposition is undefined...")
    }
    gl.vertexAttribPointer(aPosition,4,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(aPosition);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ebo)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Int32Array(indexdata),gl.STATIC_DRAW)

    gl.viewport(0,0,1080,720)

    gl.clearColor(1,0,1,1);

    uniformAspectRatio = gl.getUniformLocation(shaderProgram,"screen");
    uniformTime = gl.getUniformLocation(shaderProgram,"time");
        
    window.requestAnimationFrame(onFrame);
}


function onFrame()
{
    gl.useProgram(shaderProgram)

    time = (Date.now()/1000);
    console.log(time)

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.uniform1f(uniformTime,.5);
    gl.uniform2f(uniformAspectRatio,renderCanvas.width,renderCanvas.height);

    gl.bindBuffer(gl.ARRAY_BUFFER,vbo);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ebo);
    gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_INT,null);

    document.getElementById("shaderbackground").style.background = "no-repeat url("+renderCanvas.toDataURL()+")";
    document.getElementById("shaderbackground").style.backgroundSize = "cover";
    window.requestAnimationFrame(onFrame);
}

window.addEventListener("load",onStart);