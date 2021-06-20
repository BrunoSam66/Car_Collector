
var myWord = ["Ca", "r", "_", "Co", "lle", "c", "tor"];
var myColors = ["#23fe25", "#fb4f14 ", "pink", "red", "yellow", "black", "blue"];
for (var i = 0; i < myWord.length; i++) {
    document.getElementById("logo").innerHTML += "<span style='color:" + myColors[i] + "'>" + myWord[i] + "</span>";
}
document.getElementById("YouWin").style.display = "none";
document.getElementById("NewRecord").style.display = "none";
document.getElementById("gameouver").style.display = "none"
document.getElementById("TrayAgain").style.display = "none";
document.getElementById("recorde1").style.display = "none";
document.getElementById("pontuacao").style.display = "none";
document.getElementById("botaoJogar").addEventListener("click", function() {

    Start();
    document.getElementById("logo").style.display = "none";
    document.getElementById("botaoJogar").style.display = "none";
    document.getElementById("recorde1").style.display = "block";
    document.getElementById("pontuacao").style.display = "inline";
});

var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var but = document.getElementById("botaoJogar");
var img = document.getElementById("imagemInicial");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
    modal.style.display = "block";
}
but.onclick = function() {
    img.style.display = "none";
}
span.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function resetRecord(){
    localStorage.clear();
    localStorage.setItem("Timer",today.getTime());
}

var today= new Date();
var idealIntervalTime;
var diffInHours;
var diffInTime;
var lastSavedTime;
var loader = new THREE.TextureLoader();
var importer = new THREE.FBXLoader();
var prespetiva1;
var camera=false;
var GameOver = false;
var ganhou = false;
var marchalenta = false;
var camaraOrtograficaFlag = false; // FALSE não esta a ser usada true está a ser usada
const velocidade = 0.06;
var recorde;
var totalcubos = 0;
var contador = 0;
var tamanho = 0.4; //tamanho dos cubos
var limiteZ = 12;
var Bomba = CreateBomb();
var estrada = addMundo();
var limitex = 1.58;
var cena = new THREE.Scene();
var camara = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
var renderer = new THREE.WebGLRenderer();

renderer.shadowCameraNear = 3;
renderer.shadowCameraFar = camara.far;
renderer.shadowCameraFov = 50;
renderer.shadowMapBias = 0.0039;
renderer.shadowMapDarkness = 0.5;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMapEnabled = true;
renderer.shadowMapSoft = true;
document.body.appendChild(renderer.domElement);

var estadoluzpointLight = false; //flag do estado da luz
var estadoluzDirectionalLight = false; //flag do estado da luz direcional

var flagCarDrunk=false;
//Variável que guardará o objeto importado
var objetoImportado;

//Variável que irá guardar o controlador de animações do objeto importado

var mixerAnimacao;

//Variável que é responsável por controlar o tempo da aplicação
var relogio = new THREE.Clock();

//point light
var light = new THREE.DirectionalLight("#ffffff", 1);

//soptligth

var Leftfarol = new THREE.SpotLight("#ffffff");

Leftfarol.shadow.mapSize.width = 10;
Leftfarol.shadow.mapSize.height = 10;
Leftfarol.shadow.camera.near = 0.5;
Leftfarol.shadow.camera.far = 1;
Leftfarol.shadow.focus = 0.000001;
Leftfarol.flipSided = false;
Leftfarol.castShadow = true;

var Rightfarol = new THREE.SpotLight("#ffffff");
Rightfarol.flipSided = false;
Rightfarol.castShadow = true;
Rightfarol.shadow.mapSize.width = 10;
Rightfarol.shadow.mapSize.height = 10;
Rightfarol.shadow.camera.near = 0.5;
Rightfarol.shadow.camera.far = 10;
Rightfarol.shadow.focus = 0.000001;

//farois farois_traseiros
var farois_traseirosLeft = new THREE.RectAreaLight(0xff0000, 1.5, 5, 5);

var luz = new THREE.DirectionalLight("#ffffff", 0.2);
luz.lookAt(estrada);
luz.position.set(0,10,0);

//Construir Background
var material1 = new THREE.MeshLambertMaterial({
    map: loader.load("./Imagens/background.jpg"),
});
var geometry = new THREE.PlaneGeometry(65, 33);
var imagem = new THREE.Mesh(geometry, material1);
imagem.position.set(0, -0.4, -9);


var mat = new THREE.MeshLambertMaterial({
    map: loader.load("./Imagens/background.jpg"),
});
var geoy = new THREE.PlaneGeometry(85, 50);
var imag = new THREE.Mesh(geoy, mat);
imag.position.set(0, -0.4, -9);

//Construir carro
var carro = Car();
carro.position.set(0, -3, 14);
carro.rotation.z = Math.PI * 0.5;
carro.rotation.x = Math.PI * -0.5;
carro.scale.x = 0.015;
carro.scale.y = 0.023;
carro.scale.z = 0.02;
//luzes ambiente
var luzAmbienteRight = new THREE.AmbientLight("#ffffff", 0.16);

luzAmbienteRight.position.set(
    1 + carro.position.x,
    carro.position.y,
    carro.position.z);

var luzAmbienteLeft = new THREE.AmbientLight("#ffffff", 0.16);

luzAmbienteRight.position.set(
    -1 + carro.position.x,
    carro.position.y,
    carro.position.z);


var estadoAmbientLight;

//colocar luz nos farois
Leftfarol.position.set(
    carro.position.x,
    carro.position.y + 1,
    carro.position.z
);

Rightfarol.position.set(
    carro.position.x,
    carro.position.y + 1,
    carro.position.z
);


var camaraOrtografica1 = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camaraOrtografica1.position.set(0, 0.4, 20.5);

var camaraOrtografica = new THREE.OrthographicCamera(   
    window.innerWidth / - 120,
    window.innerWidth / 120,
    window.innerHeight / 150,
    window.innerHeight / -120,
    1,
    1000);
camaraOrtografica.rotation.x= Math.PI/-8;
camaraOrtografica.position.set(0,2.8, 25);
camaraOrtografica.updateProjectionMatrix();

function setScale(obj,tamanho, tamanho1, tamanho2) {
    if (tamanho1 == undefined && tamanho2 == undefined) {
        tamanho1 = tamanho;
        tamanho2 = tamanho;
    }
    obj.scale.x = tamanho;
    obj.scale.y = tamanho1;
    obj.scale.z = tamanho2;
}

for (i = 0; i < 35; i++) {
    importer.load("./Objetos/Cactus.fbx", function(object) {
        mixerAnimacao = new THREE.AnimationMixer(object);
        object.traverse(function(child) {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        object = loadFBX("./Objetos/Cactus.fbx", "./Imagens/cactus.jpg", 10);
        cena.add(object);
        object.scale.x = (Math.floor(Math.random() * (2 - 1 + 1)) + 1) * 0.001;
        object.scale.y = (Math.floor(Math.random() * (2 - 1 + 1)) + 1) * 0.001;
        object.scale.z = (Math.floor(Math.random() * (2 - 1 + 1)) + 1) * 0.001;

        var auxiliar = (PositivoVsNeagativo() * 8);
        auxiliar < 3 ? (-3 -(Math.random() * (6-3)) ): (3 + (Math.random() * (6-3)));
        auxiliar >= -3 ? (3 + (Math.random() * (6-3))):(-3 -(Math.random() * (6-3)));

        var auxiliar2 = (Math.random() * (-23)) + 17;

        object.position.set(auxiliar<0? (auxiliar-3):(auxiliar+3), -3.4, auxiliar2);
        cena.add(object);
    });
}

function randInt(min, max) {
    if (max === undefined) {
        max = min;
        min = 0;
    }
    return Math.random() * (max - min) + min | 0;
}

const canvas = document.createElement("canvas");
canvas.width = 32;
canvas.height = 32;
const context = canvas.getContext("2d");

const texture = new THREE.CanvasTexture(context.canvas);

function getCubeDotColorTexture() {
    context.canvas.width = 256;
    context.canvas.height = 256;
    context.fillStyle = '#FFF';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    var cubeGeometry3 = new THREE.BoxGeometry(0.5, 0.5, 0.5);

    context.fill();
    const cubematerial3 = new THREE.MeshLambertMaterial({
        map: texture,
    });
    return new THREE.Mesh(cubeGeometry3, cubematerial3);
}


function drawRandomDot() {
    context.fillStyle = `#${randInt(0x1000000).toString(16).padStart(6, '0')}`;
    context.beginPath();
    const x = randInt(256);
    const y = randInt(256);
    const radius = randInt(10, 64);
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
}

var aguia= new THREE.Object3D();
var cubomagico = getCubeDotColorTexture();
cubomagico.name = "CuboMagico";

  importer.load("./Objetos/aguia.fbx", function(object) {
    mixerAnimacao = new THREE.AnimationMixer(object);
    object.traverse(function(child) {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    object = loadFBX("./Objetos/aguia.fbx", "./Imagens/textura_agia.jpg", 0.1);
    object.scale.x = 0.05;
    object.scale.y = 0.05;
    object.scale.z = 0.05;
    object.rotation.y = Math.PI/2;
    object.rotation.x = Math.PI+ Math.PI/4;
    object.rotation.z = Math.PI+Math.PI/8;    
    object.position.set(-3, 2, 5);
      
    aguia.add(object);
});


 cena.add(aguia);

function AddMaterialsCena() {
    // add the image to the scene
    cubomagico.receiveShadow = true;
    CuboBonus.receiveShadow = true;
    cena.add(CuboBonus);
    imagem.receiveShadow = true;
    cena.add(imag);
    cubo1.receiveShadow = true;
    cena.add(cubo1);
    cubo2.receiveShadow = true;
    cena.add(cubo2);
    cubo3.receiveShadow = true;
    cena.add(cubo3);
    cubo4.receiveShadow = true;
    cena.add(cubo4);
    cubo5.receiveShadow = true;
    cena.add(cubo5);
    cubo6.receiveShadow = true;
    cena.add(cubo6);
    cubo7.receiveShadow = true;
    cena.add(cubo7);
    cubo8.receiveShadow = true;
    cena.add(cubo8);
    cubo9.receiveShadow = true;
    cena.add(cubo9);
    cubo10.receiveShadow = true;
    cena.add(cubo10);
    carro.receiveShadow = true;
    cena.add(carro);
    //criar estrada  
    estrada.receiveShadow = true;
    cena.add(estrada);
    cena.add(light);
    estadoluzpointLight = true;
    carro.add(Leftfarol);
    carro.add(Rightfarol);
    Leftfarol.lookAt(estrada);
    Rightfarol.lookAt(estrada);
    estadoluzDirectionalLight = true;
    //adicionar luzes ambiente
    cena.add(luzAmbienteLeft);
    cena.add(luzAmbienteRight);
    estadoAmbientLight = true;
    bombaLenta.receiveShadow = true;
    Bomba.receiveShadow = true;
    cena.add(Bomba);
    cena.add(bombaLenta);
    //add cubo textura dinamica
    cena.add(cubomagico);
    xx.rotation.x = Math.PI / 2;
    xx.rotation.y = Math.PI;
    cena.add(xx);
    cena.add(luz);
    // cena.add(new THREE.CameraHelper(camara));
}

function addMundo() {
    var geometriamundo = new THREE.BoxGeometry(12, 4, 1000000); //1000000
    var text = new THREE.TextureLoader().load("./Imagens/estrada.jpg");
    var materialmundo = new THREE.MeshLambertMaterial();
    materialmundo.map = text;
    var mundo = new THREE.Mesh(geometriamundo, materialmundo);
    mundo.rotation.z = -Math.PI / 2;
    mundo.position.set(0,-8.5,-6); 
    mixerAnimacao = new THREE.AnimationMixer(mundo);
    return mundo;
}

function creatPlanoslaterais() {

    var geometriamundo = new THREE.BoxGeometry(100, 100, 1); //1000000
    const texture1 = new THREE.TextureLoader().load('Imagens/planosLaterais.jpg');
    texture1.wrapS = THREE.RepeatWrapping;
    texture1.wrapT = THREE.RepeatWrapping;
    texture1.repeat.set(5, 5);
    var materialmundo = new THREE.MeshLambertMaterial({
        map: texture1
    });

    var mundo = new THREE.Mesh(geometriamundo, materialmundo);

    mundo.position.set(0, -9 + 5.1, -6);
    return mundo;
}



function CreateBomb() {
    const bomb = new THREE.Group();
    var bombageometry = new THREE.SphereGeometry(0.2, 32, 32, 32, 32);
    var bombaMaterial = new THREE.MeshLambertMaterial({
        color: "#000000"
    });
    var bomba = new THREE.Mesh(bombageometry, bombaMaterial);
    bomba.position.z = 12;
    bomba.castShadow = true;
    bomba.receiveShadow = true;
    bomb.add(bomba);
    const tampaGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.2, 32, 32);
    const tampaMaterial = new THREE.MeshLambertMaterial({
        color: "#ff0000"
    });
    const tampa = new THREE.Mesh(tampaGeometry, tampaMaterial);
    bomb.add(tampa);
    bomba.position.x = tampa.position.x;
    bomba.position.y = tampa.position.y -0.20;
    bomba.position.z = tampa.position.z;
    tampa.scale.set(0.4, 0.25, 0.4);
    
    return bomb;
}

function createBombaLenta() {
    const bomb = new THREE.Group();

    var bombageometry = new THREE.SphereGeometry(0.2, 32, 32, 32, 32);
    var esferaTexture = new THREE.TextureLoader().load("./Imagens/bomba.jpg");
    esferaTexture.wrapS = THREE.RepeatWrapping;
    esferaTexture.wrapT = THREE.RepeatWrapping;
    esferaTexture.repeat.set(300, 300);
    var cubeMaterial = new THREE.MeshLambertMaterial();
    cubeMaterial.map = esferaTexture;

    var bombalenta = new THREE.Mesh(bombageometry, cubeMaterial);
    bombalenta.position.z = 12;
    bombalenta.castShadow = true;
    bombalenta.receiveShadow = true;

    bomb.add(bombalenta);

    const tampaGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.2, 32, 32);

    var tampaTexture = new THREE.TextureLoader().load("./Imagens/caveira.jpg");

    var tampaMaterial = new THREE.MeshLambertMaterial();

    tampaMaterial.map = tampaTexture;
    const tampa = new THREE.Mesh(tampaGeometry, tampaMaterial);
    tampa.castShadow = true;
    tampa.receiveShadow = true;
    bomb.add(tampa);

    bombalenta.position.x = tampa.position.x;
    bombalenta.position.y = tampa.position.y - 0.22;
    bombalenta.position.z = tampa.position.z;
    tampa.scale.set(0.4, 0.4, 0.4);
    return bomb;
}

function createCuboBonus() {
    var cubeTexture = new THREE.TextureLoader().load('Imagens/Bonus.jpg');
    var cubeMaterial = new THREE.MeshLambertMaterial();
    cubeMaterial.map = cubeTexture;
    var cubeGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    return new THREE.Mesh(cubeGeometry, cubeMaterial);
}

function cubos() {
    var geometria = new THREE.BoxGeometry(tamanho, tamanho, tamanho);
    var material = new THREE.MeshLambertMaterial({
        color: 0xff0000
    });
    material.color.setHex(Math.random() * 0xffffff);
    var a=new THREE.Mesh(geometria, material);
    setScale(a,0.9);
    return a;
}

var bombaLenta = createBombaLenta();
bombaLenta.name = "BombaLenta";
var CuboBonus = createCuboBonus();
setScale(cubomagico,0.7);
CuboBonus.name = "CuboBonus";
var cubo1 = cubos();
var cubo2 = cubos();
var cubo3 = cubos();
var cubo4 = cubos();
var cubo5 = cubos();
var cubo6 = cubos();
var cubo7 = cubos();
var cubo8 = cubos();
var cubo9 = cubos();
var cubo10 = cubos();

function PositivoVsNeagativo() {
    return Math.random() * (Math.random() < 0.5 ? -1 : 1);
}

function CuboPosition(cubo) {
    //coloca o cubo numa posição inicial
    cubo.position.set(
        limitex * PositivoVsNeagativo(),
        -2.8,
        (limiteZ - 2) * Math.random()
    );
}

CuboPosition(CuboBonus);
bombaLenta.position.set(2 * PositivoVsNeagativo(), -2.6, 3 * PositivoVsNeagativo());
CuboPosition(cubo1);
CuboPosition(cubo2);
CuboPosition(cubo3);
CuboPosition(cubo4);
CuboPosition(cubo5);
CuboPosition(cubo6);
CuboPosition(cubo7);
CuboPosition(cubo8);
CuboPosition(cubo9);
CuboPosition(cubo10);
CuboPosition(cubomagico);
//position da camara
camara.position.z = 14.1; //16
camara.position.y = -2.4;
camara.position.x = 0;
//posição da point light
light.position.y = 6;
light.position.z = 10;
light.lookAt(imagem); //point light a olha para a imagem

function ModoNoturno() {
    if (!light.visible && !luzAmbienteLeft.visible && !luzAmbienteRight.visible) { //sol e ambiente apagadas    
        Rightfarol.power = 3;
        Leftfarol.power = 3;

        Leftfarol.angle = Math.PI / 3;
        Rightfarol.angle = Math.PI / 3;

        cena.add(farois_traseirosLeft);
        farois_traseirosLeft.position.set(carro.position.x - 1, carro.position.y, carro.position.z + 2.5);

        farois_traseirosLeft.power = 0.2;
        Leftfarol.angle = Math.PI / 6;
        Rightfarol.angle = Math.PI / 6;
    } else {
        cena.remove(farois_traseirosLeft);
        Rightfarol.power = 0.9;
        Leftfarol.power = 0.9;
    }
}

function Start() {  
    AddMaterialsCena();
    ModoNoturno();
    if (!GameOver) {
        requestAnimationFrame(update);
    }
}


function Play(cubo) {
    if (DetectColision(cubo) == 0) {
        //coletou o cubo
        if (cubo.name == bombaLenta.name) { //coletou a bomba preteada      
            marchalenta = true;
            if (marchalenta) {
                setTimeout(function() {
                    marchalenta = false;
                }, 10000); //demora 10 segundos a desligar a flag marchalenta
            }
            bombaLenta.position.set(2 * PositivoVsNeagativo(), -2.6, 3 * PositivoVsNeagativo()); //reposiciona a bombalenta
        } else {
            totalcubos++;
            SetCuboPosition(cubo);
            contador++; //incrementa as colleções
        }
    } else {
        //não coletou o cubo
        CubosAproximamSeCarro(); //segue o jogo
    }
}

function Jogar() {
    //console.log("cheguei aqui jogar()") 
    if (!GameOver) {
        if (totalcubos < 10001) {
            //enviar/atualizar o contador na view
            document.getElementById("contador").innerText = contador;
            //console.log(totalcubos);
            recorde = highScore();
            //console.log(recorde); 
            document.getElementById("recorde").innerText = recorde;
            goObject(Bomba);
            Play(bombaLenta);
            Play(CuboBonus);
            Play(cubo1);
            Play(cubo2);
            Play(cubo3);
            Play(cubo4);
            Play(cubo5);
            Play(cubo6);
            Play(cubo7);
            Play(cubo8);
            Play(cubo9);
            Play(cubo10);
            Play(cubomagico);

        } else if (totalcubos >= 10000) {
            document.getElementById("YouWin").style.display = "inline";

            ganhou = true;
            //  console.log(contador);
            //  console.log(totalcubos);

            tray_Again();
        } else {
            console.log("Deu erro"); //erro no totalcubos :( never happen
        }
    } else {
        GameOver = true;
        document.getElementById("gameouver").style.display = "inline";

        tray_Again();

    }
}

function tray_Again() {
    flagCarDrunk=false;
    newRecord();
    marchalenta = false;
    document.getElementById("TrayAgain").style.display = "inline";
    //console.log("mostrou o bottun");   
    document.getElementById("TrayAgain").addEventListener("click", function() {  
        document.getElementById("NewRecord").style.display = "none";
        ganhou = false;
        document.getElementById("YouWin").style.display = "none";
        document.getElementById("gameouver").style.display = "none";
        SetCuboPosition(cubo1);
        SetCuboPosition(cubo2);
        SetCuboPosition(cubo3);
        SetCuboPosition(cubo4);
        SetCuboPosition(cubo5);
        SetCuboPosition(cubo6);
        SetCuboPosition(cubo7);
        SetCuboPosition(cubo8);
        SetCuboPosition(cubo9);
        SetCuboPosition(cubo10);
        SetCuboPosition(CuboBonus);
        SetCuboPosition(bombaLenta);
        SetCuboPosition(cubomagico);
        totalcubos = 0;
        contador = 0;
        GameOver = false;
        document.getElementById("TrayAgain").style.display = "none";
    });
}

var xs=-7;
var ys;
var fim=false;
const Amplitude=5;

function aguiaAnimation(){
    if( (xs >= -8 && xs < 15) && !fim){
      
        xs+=0.05;
        if(xs >=14.94 &&  xs<15){
            aguia.rotation.y= Math.PI;
            fim=true;            
        }
        ys=Amplitude*Math.cos(xs*0.3);

        if(ys>=Amplitude-0.06){
           //fazer rotação  para parecer que vai descer a pique
            aguia.rotation.z= -2*Math.PI/6;
            //aguia.rotation.xs= 2*Math.PI/6;

        }
        aguia.position.set(xs,ys,Math.sqrt(xs*xs + ys*ys));
    }
    else if(fim){        
        xs-=0.05;        
        if(xs - 0.05<=1){
            aguia.rotation.y+=Math.PI/100;
            aguia.rotation.z=-Math.PI/9;
            xs=0.5;
            aguia.position.set(xs,Amplitude-1,Math.sqrt(1-(xs*xs + ys*ys)));
        }
        ys=Amplitude*Math.cos(xs*0.27);    
        aguia.position.set(xs,ys,Math.sqrt(xs*xs + ys*ys));        
    }  
}

function update() {
     if(flagCarDrunk){
         carDrunk();
     }
    Jogar();
    NiveisVelocidade();
    if (cuboCoordRotation != null) {
        CuboBonus.rotation.y += cuboCoordRotation.x * 0.09;
        cubo1.rotation.y += cuboCoordRotation.x * 0.09;
        cubo2.rotation.y -= cuboCoordRotation.x * 0.09;
        cubo3.rotation.y -= cuboCoordRotation.x * 0.09;
        cubo4.rotation.y += cuboCoordRotation.x * 0.09;
        cubo5.rotation.y += cuboCoordRotation.x * 0.09;
        cubo6.rotation.y += cuboCoordRotation.x * 0.09;
        cubo7.rotation.y += cuboCoordRotation.x * 0.09;
        cubo8.rotation.y += cuboCoordRotation.x * 0.09;
        cubo9.rotation.y += cuboCoordRotation.x * 0.09;
        cubo10.rotation.y += cuboCoordRotation.x * 0.09;
        cubomagico.rotation.y += cuboCoordRotation.x * 0.09;
    }
        aguiaAnimation();
    
    //console.log(ys +" ANGLE   "+ xs);
    
    ModoNoturno();

    if (camaraOrtograficaFlag) {
        renderer.render(cena, camaraOrtografica);
    } else {
        if(camera){
        renderer.render(cena, camara);
        }else if(!camera){
            renderer.render(cena,camaraOrtografica1);// é prestetiva mas visto mais de cima.
        }
    }
    drawRandomDot();
    texture.needsUpdate = true;
    requestAnimationFrame(update);
}

Bomba.position.set(limitex * PositivoVsNeagativo(), -2.60, (limiteZ - 15) * Math.random());

function goObject(obj) {
    if (!GameOver) {
        if (obj.position.z >= 15) {
            obj.position.set(limitex * PositivoVsNeagativo(), -2.60, (limiteZ - 1) * Math.random());
        } else if (DetectColision(Bomba) == 0) //colidiu com o carro
        {
            GameOver = true;
            obj.position.set(limitex * PositivoVsNeagativo(), -2.6, limiteZ-1 * Math.random());
            tray_Again();
            //altena logo as posições dos cubos
            CuboPosition(CuboBonus);
            CuboPosition(cubo1);
            CuboPosition(cubo2);
            CuboPosition(cubo3);
            CuboPosition(cubo4);
            CuboPosition(cubo5);
            CuboPosition(cubo6);
            CuboPosition(cubo7);
            CuboPosition(cubo8);
            CuboPosition(cubo9);
            CuboPosition(cubo10);
            CuboPosition(cubomagico);
            
            //coloca o carro na posição inicial
            carro.position.set(0, -3, 14);
            camara.position.set(0,-2.4,14.1);
        } else {
            if (!ganhou) {
                obj.position.z += (0.06 + NiveisVelocidade()); //velocidade da bomba
            }
        }
    }
}

var cuboCoordRotation;
var camaraAndar = {
    x: 0,
    y: 0,
    z: 0
};



document.addEventListener("mousemove", (ev) => {
    var x = ((ev.clientX - 0) / (window.innerWidth - 0)) * (1 - -1) + -1;
    var y = ((ev.clientY - 0) / (window.innerHeight - 0)) * (1 - -1) + -1;
    cuboCoordRotation = {
        x: x,
        y: y,
    };
});

function loadFBX(modelPath, texturePath, n_vezes, ) { //adiciona textura a objetos fbx

    var container = new THREE.Object3D();
    const textura_ = new THREE.TextureLoader().load(texturePath);
    textura_.wrapS = THREE.RepeatWrapping;
    textura_.wrapT = THREE.RepeatWrapping;
    if (typeof n_vezes === 'undefined') {
        n_vezes = 1;
    }
    textura_.repeat.set(n_vezes, n_vezes);

    importer.load(modelPath, function(object) {
        container.add(object);
        object.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
                //console.log( child.geometry.attributes.uv );
                child.material = new THREE.MeshLambertMaterial();
                child.material.map = textura_;

            }
        });

    });

    return container; //objeto texturizado 
}

function newRecord() {
    //console.log("entrei na função");
    if (GameOver || ganhou) {
        //console.log(contador+"entrei no 1º if"+recorde);
        if (contador == recorde) {
            //console.log(recorde +"depois" +contador);   
            document.getElementById("NewRecord").style.top = "500px";
            document.getElementById("NewRecord").style.display = "inline";
            contador = 0;
        }
    }
}

function NiveisVelocidade() {

    if (totalcubos <= 149) {
        return 0.006;
    }
    if (totalcubos >= 150 && totalcubos < 350) {
        return 0.007;
    } else if (totalcubos >= 351 && totalcubos < 550) {
        return 0.008;
    } else if (totalcubos >= 551 && totalcubos < 750) {
        return 0.009;
    } else if (totalcubos >= 751 && totalcubos < 950) {
        return 0.0095;
    } else if (totalcubos >= 1051 && totalcubos < 4550) {
        return 0.01;

    } else {
        return 0.04;
    }
}


  var xx = creatPlanoslaterais(); 

function carDrunk(){      
    var pontoLeftBomb= new THREE.Vector3(-limitex,Bomba.position.y, Bomba.position.z+5);
    var pontoRightBomb= new THREE.Vector3(limitex,Bomba.position.y, Bomba.position.z+5);
    var distaLimitLeft = Bomba.position.distanceTo(pontoLeftBomb);
    var distaLimitRight =Bomba.position.distanceTo(pontoRightBomb);
    
    if(distaLimitLeft < distaLimitRight){
        DeslocarCarroRight();

    }else if(distaLimitLeft > distaLimitRight){
        DeslocarCarroLeft(); 
    }       
}


document.addEventListener("keydown", (ev) => {
    var coords = {
        x: 0,
        y: 0,
        z: 0,
    };

    if (ev.keyCode == 79) { //ortográfica O 
        if (!camaraOrtograficaFlag) {
            estrada.position.set(0, -9.2, -6);
            camaraOrtograficaFlag = true;
            prespetiva1=true;
            camera=true;
            cena.add(imag);
            imagem.visible=false;
            imag.visible=true;

         }
    }
    if (ev.keyCode == 80) {//prespective P
      if(prespetiva1) {
            camaraOrtograficaFlag = false;
            camera=true;
            prespetiva1=false;  
            estrada.position.set(0, -9.1, -6);            
            imag.visible=false;           
            cena.add(imagem);
            imagem.visible=true;                
        }else  if(!prespetiva1){
            //console.log("camera " + camera + " prespetiva1 " + prespetiva1); 
            cena.add(imag); 
            imag.visible=true;
            imagem.visible=false;         
            camaraOrtograficaFlag = false;
            prespetiva1=true;
            camera=false;                      
            estrada.position.set(0,-8.5,-6);  
        } 
         
    }
    //****************************/***************** */ */

    if (ev.keyCode == 65) {
        if(!flagCarDrunk){
            DeslocarCarroLeft();
        }
    }

    if (ev.keyCode == 68) {
        if(!flagCarDrunk){
            DeslocarCarroRight();
        }
    }

    if (ev.keyCode == 49) {
        if (estadoluzpointLight) {            
            light.visible = false;
            estadoluzpointLight = false; //apagada
        } else if (!estadoluzpointLight) {            
            light.visible = true;
            light.lookAt(imagem);
            estadoluzpointLight = true; //ligada
            cena.autoUpdate;
        }
    }
    if (ev.keyCode == 50) {
        if (estadoluzDirectionalLight) {          
            Rightfarol.visible = false;
            Leftfarol.visible = false;
            estadoluzDirectionalLight = false; //apagada
            cena.autoUpdate;
        } else if (!estadoluzDirectionalLight) {            
            Rightfarol.visible = true;
            Leftfarol.visible = true;
            estadoluzDirectionalLight = true; //ligada
            cena.autoUpdate;
        }
    }

    if (ev.keyCode == 51) {
        if (estadoAmbientLight) {            
            luzAmbienteLeft.visible = false;
            luzAmbienteRight.visible = false;
            estadoAmbientLight = false; //apagada
            cena.autoUpdate;
        } else if (!estadoAmbientLight) {           
            luzAmbienteLeft.visible = true;
            luzAmbienteRight.visible = true;
            estadoAmbientLight = true; //ligada
            cena.autoUpdate;
        }
    }

    if (ev.keyCode == 32) {
       if(flagCarDrunk){
           flagCarDrunk=false;
       }else{
        flagCarDrunk=true;
       }
    }
    camaraAndar = coords;
});

function DeslocarCarroRight() {
    var velocidadeAndarx;
    if (marchalenta) {
        velocidadeAndarx = (velocidade + NiveisVelocidade() - 0.01) / 2; //atrasar a velocidade em praticamente /2
    } else {
        velocidadeAndarx = (velocidade + NiveisVelocidade());
    }
    if (!GameOver && !ganhou) {
        if (carro.position.x+velocidadeAndarx > limitex || camara.position.x-0.4 > limitex) {
            camara.position.x=(limitex-0.07);
            carro.position.x = limitex;
        } else{
            carro.position.x += velocidadeAndarx;
            camara.position.x+= velocidadeAndarx;
        }

    }
}

function DeslocarCarroLeft() {
    var velocidadeAndarx;
    if (marchalenta) {
        velocidadeAndarx = (velocidade + NiveisVelocidade() - 0.01) / 2; //atrasar a velocidade em praticamente /2
    } else {
        velocidadeAndarx = (velocidade + NiveisVelocidade());
    }
    if (!GameOver && !ganhou) {
        if (carro.position.x-velocidadeAndarx< -limitex || camara.position.x + 0.4 < -limitex) {
            carro.position.x = -limitex;
            camara.position.x=(-limitex+0.07);
        } else{
            carro.position.x -= velocidadeAndarx;
            camara.position.x -= velocidadeAndarx;
        }

    }
}

function CubosAproximamSeCarro() {
    if (!GameOver && !ganhou) {
        bombaLenta.position.z += NiveisVelocidade();
        if (bombaLenta.position.z >= 15) {
            bombaLenta.position.set(2 * PositivoVsNeagativo(), -2.6, 3 * PositivoVsNeagativo());
        }
        CuboBonus.position.z += NiveisVelocidade();
        CuboFugiu(CuboBonus);
        //console.log(GameOver);
        cubo1.position.z += NiveisVelocidade();
        CuboFugiu(cubo1);
        cubo2.position.z += NiveisVelocidade();
        CuboFugiu(cubo2);
        cubo3.position.z += NiveisVelocidade();
        CuboFugiu(cubo3);
        cubo4.position.z += NiveisVelocidade();
        CuboFugiu(cubo4);
        cubo5.position.z += NiveisVelocidade();
        CuboFugiu(cubo5);
        cubo6.position.z += NiveisVelocidade();
        CuboFugiu(cubo6);
        cubo7.position.z += NiveisVelocidade();
        CuboFugiu(cubo7);
        cubo8.position.z += NiveisVelocidade();
        CuboFugiu(cubo8);
        cubo9.position.z += NiveisVelocidade();
        CuboFugiu(cubo9);
        cubo10.position.z += NiveisVelocidade();
        CuboFugiu(cubo10);
        cubomagico.position.z += NiveisVelocidade();
        CuboFugiu(cubomagico);
    }
}

function CuboFugiu(cubo) {
    if (cubo.position.z >= 15) {
        totalcubos++;
        SetCuboPosition(cubo);
    }
}

function SetCuboPosition(cubo) {
    //coloca o cubo numa posição inicial  
    if (cubo.name == CuboBonus.name) {
        CuboBonus.position.set(limitex * PositivoVsNeagativo(), -2.7, -20);
        //console.log("coletei Bonus"+ contador);
    } else if (cubo.name == bombaLenta.name) {
        bombaLenta.position.set(2 * PositivoVsNeagativo(), -2.6, 3 * PositivoVsNeagativo());
    } else {
        cubo.position.set(
            limitex * PositivoVsNeagativo(),
            -2.8,
            (limiteZ + (Math.random() < 0.5 ? -5 : -8)) * Math.random()
        );
    }
}



function DetectColision(cubo) {
    //calcula a distancia entre o carro e o cubo, se 0 --->colisão, se 1---> não coletou
    var c = Math.sqrt(
        Math.pow(carro.position.x - cubo.position.x, 2) +
        Math.pow(carro.position.y - cubo.position.y, 2) +
        Math.pow(carro.position.z - cubo.position.z, 2)
    );
    //console.log(contador);
    if (c < 0.6) {
        if (cubo.name == CuboBonus.name) {
            contador = contador + 4;
            //console.log("coletei Bonus"+ contador);
            //cubo bonus coletado incrementa 4 na pontuação e posteriormente mais 1
            return 0;
        } else if (cubo.name == bombaLenta.name) {
            marchalenta = true;
            return 0;
        }
        //colletou
        return 0;
    }
    return 1;
}

function highScore() { 
    var saved = 0;
    try {
        saved = parseFloat(localStorage.highScore);
    } catch (e) {
        saved = 0;
    }
    if (!(typeof contador === 'undefined')) {
        try {
            contador = parseFloat(contador);
        } catch (e) {
            console.log(contador + "possível erro");
        }
        //console.log(saved +"antes" +contador);
        if (contador > saved) {
            saved = contador;
            localStorage.highScore = '' + contador;
        }
    }
    if (isNaN(saved)) {
        saved = 0;
        localStorage.highScore = '0';
    } 

    /*if(!localStorage.getItem("Timer"))
    {
        localStorage.setItem("Timer",today.getTime());
    }
    else{
         lastSavedTime=localStorage.getItem("Timer");
         diffInTime = Math.abs(today.getTime()- lastSavedTime);
         diffInHours = Math.ceil(diffInTime / (1000 * 60 * 60 ));//horas
         idealIntervalTime=diffInHours>=24?0:diffInTime;//verifica se já passaram 24 horas e se sim reset o tempo e o secorde;
        setInterval(function(){
            resetRecord();
        },idealIntervalTime);
    } */

    return saved;
}
