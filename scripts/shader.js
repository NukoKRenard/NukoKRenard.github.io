const renderCanvas = document.createElement("canvas");
const gl = renderCanvas.getContext("webgl2");
const shaderProgram = gl.createProgram()
vbo = gl.createBuffer()
ebo = gl.createBuffer()

const vertexshadersrc = `#version 300 es
precision mediump float;

in vec4 aposition;

out vec2 coord;

void main()
{
    gl_Position = aposition;
    coord = aposition.xy;
}
`;

const fragmentshadersrc = `#version 300 es
precision mediump float;

out vec4 fragColor;

uniform float time;
uniform vec2 screen;

in vec2 coord;

void main()
{
    float whratio = (screen.x/screen.y);
    vec3 pxp = vec3(coord.x*whratio,coord.y,0.0);

    fragColor = vec4(coord,0.0,1.0);
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

    gl.clearColor(1,0,1,1);
        
    window.requestAnimationFrame(onFrame);
}


function onFrame()
{
    renderCanvas.width = window.innerWidth;
    renderCanvas.height = window.innerHeight;
    gl.viewport(0,0,window.innerWidth,window.innerHeight)
    gl.useProgram(shaderProgram)

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.uniform1f(gl.getUniformLocation(shaderProgram,"time"),.3)
    gl.uniform2f(gl.getUniformLocation(shaderProgram,"screen"),renderCanvas.width,renderCanvas.height);

    gl.bindBuffer(gl.ARRAY_BUFFER,vbo);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ebo);
    gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_INT,null);

    document.getElementById("shaderbackground").style.background = "url("+renderCanvas.toDataURL()+")";
    window.requestAnimationFrame(onFrame);
}

window.addEventListener("load",onStart);