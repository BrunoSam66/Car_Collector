
const rodaGeometry = new THREE.CylinderGeometry(5, 5,33,12);
const rodaMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
const FarolGeometry = new THREE.CylinderGeometry(2, 2,62,12,25);
const FarolMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });

const config = {
    showHitZones: false,
    shadows: true, // Use shadow
    trees: true, // Add trees to the map
    curbs: true, // Show texture on the extruded geometry
    grid: false // Show grid helper
};

function getCarFrontTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 32;
    const context = canvas.getContext("2d");
  
    context.fillStyle = "#ff0000";
    context.fillRect(0, 0, 64, 32);
  
    context.fillStyle = "#d1d1d1d1";
    context.fillRect(8, 8, 49, 24);
  
    return new THREE.CanvasTexture(canvas);
  }

  function getCarSideTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 120;
    canvas.height = 30;
    const context = canvas.getContext("2d");
  
    context.fillStyle = "#ff0000";
    context.fillRect(0, 0, 128, 32);
  
    context.fillStyle = "#d1d1d1d1";
    context.fillRect(10, 8, 38, 24);
    context.fillRect(58, 8, 60, 24);
  
    return new THREE.CanvasTexture(canvas);
  }

  function HitZone() {
    const hitZone = new THREE.Mesh(
      new THREE.CylinderGeometry(20, 20, 60, 30),
      new THREE.MeshStandardMaterial({ color: 0xff0000 })
    );
    hitZone.position.z = 25;
    hitZone.rotation.x = Math.PI / 2;
  
    scene.add(hitZone);
    return hitZone;
  }

  function Roda() {
    const roda = new THREE.Mesh(rodaGeometry, rodaMaterial);
    roda.position.z = 3;
    roda.castShadow = false;
    roda.receiveShadow = false;
    return roda;
  }

  function Farois() {
    const Farol = new THREE.Mesh(FarolGeometry, FarolMaterial);
    Farol.position.z=10;   
    Farol.castShadow = false;
    Farol.receiveShadow = false;
    return Farol;
  }
  
function Car() {
    const car = new THREE.Group();
  
    const color = 0xff0000;
  
    const main = new THREE.Mesh(
      new THREE.BoxBufferGeometry(60, 30, 15),
      new THREE.MeshLambertMaterial({ color })
    );
    main.position.z = 12;
    main.castShadow = true;
    main.receiveShadow = true;
    car.add(main);
  
    const carFrontTexture = getCarFrontTexture();
    carFrontTexture.center = new THREE.Vector2(0.5, 0.5);
    carFrontTexture.rotation = Math.PI / 2;
  
    const carBackTexture = getCarFrontTexture();
    carBackTexture.center = new THREE.Vector2(0.5, 0.5);
    carBackTexture.rotation = -Math.PI / 2;
  
    const carLeftSideTexture = getCarSideTexture();
    carLeftSideTexture.flipY = false;
  
    const carRightSideTexture = getCarSideTexture();
  
    const cabin = new THREE.Mesh(new THREE.BoxBufferGeometry(33, 24, 12), [
      new THREE.MeshLambertMaterial({ map: carFrontTexture }),
      new THREE.MeshStandardMaterial({ map: carBackTexture }),
      new THREE.MeshLambertMaterial({ map: carLeftSideTexture }),
      new THREE.MeshLambertMaterial({ map: carRightSideTexture }),
      new THREE.MeshLambertMaterial({ color: 0xff0000 }), // cima
      new THREE.MeshLambertMaterial({ color: 0xff0000 }) // baixo
    ]);
    cabin.position.x = -6;
    cabin.position.z = 25.5;
    cabin.castShadow = true;
    cabin.receiveShadow = true;
    car.add(cabin);
  
    const backroda = new Roda();
    backroda.position.x = -18;
    car.add(backroda);
  
    const frontroda = new Roda();
    frontroda.position.x = 18;
    car.add(frontroda);

    const FarolLeft= new Farois();
    FarolLeft.position.y=-12;
    FarolLeft.rotation.z=Math.PI/2;
    car.add(FarolLeft);

    const FarolRight= new Farois();
    FarolRight.position.y=12;    
    FarolRight.rotation.z=Math.PI/2;
    car.add(FarolRight);
  
    if (config.showHitZones) {  
      car.userData.hitZone1 = HitZone();
      car.userData.hitZone2 = HitZone();
    }  
    return car;
}

  