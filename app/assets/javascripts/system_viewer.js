/**
 * Created by pixelshade on 2.12.2014.
 */

var controls, scene, renderer, camera, Offset, objects = [], canvasWidth, canvasHeight;
var mouse = { x: 0, y: 0 }, INTERSECTED, SELECTED, projector, selectedScaleX, selectedScaleY, selectedScaleZ, selectedAnimFrame;
var popupTitle, popupContent, popup;
var CANVAS_HEIGHT = 500;

if (typeof(Number.prototype.toRad) === "undefined") {
    Number.prototype.toRad = function () {
        return this * Math.PI / 180;
    }
}


$(document).on('ready page:load', function () {
    var a = $("#system_viewer");

    if (a.length) {
        main(a);
        popup = $("#objectInfo");
        popupTitle = $("#objectInfoTitle");
        popupContent = $("#objectInfoContent");
    } else {
        console.log('nenasiel som');
    }
});

function init(canvas) {
    Offset = canvas.offset();
    canvasWidth = canvas.width();

    canvasHeight = CANVAS_HEIGHT;
    projector = new THREE.Projector();
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight, 0.01, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(canvasWidth, canvasHeight);
    camera.position.z = 5;
    camera.position.y = 5;
    canvas.append(renderer.domElement);

    controls = new THREE.TrackballControls(camera, renderer.domElement);

    controls.rotateSpeed = 2.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;

    controls.noZoom = false;
    controls.noPan = false;

    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;
//    controls.addEventListener( 'change', render );

    var addLight = function () {
        scene.add(new THREE.AmbientLight(0x404040));

        var light = new THREE.DirectionalLight(0xffffff, 0.5);
        light.position.set(1, 1, 1);
        scene.add(light);
    };

    var createSpaceBg = function () {
        var spaceBG = new THREE.Mesh(
            new THREE.SphereGeometry(100, 64, 64),
            new THREE.MeshBasicMaterial({
                map: THREE.ImageUtils.loadTexture('/assets/galaxy_starfield.png'),
                side: THREE.BackSide
            })
        );
        scene.add(spaceBG);
    };
    addLight();
    createSpaceBg();

    window.addEventListener('resize', onWindowResize, false);
    renderer.domElement.addEventListener('mousemove', onDocumentMouseMove);
    renderer.domElement.addEventListener('click', onClick);

//    return scene;
}

function onWindowResize() {
    canvasWidth = $("#system_viewer").width();
    canvasHeight = CANVAS_HEIGHT;
    camera.aspect = canvasHeight / canvasWidth;
    camera.updateProjectionMatrix();
    renderer.setSize(canvasWidth, canvasHeight);
    controls.handleResize();
    render();
}

function onClick(event) {


    if (INTERSECTED != null) {
        SELECTED = INTERSECTED;

        var info = SELECTED.info;
        info += "<hr> Size:" + SELECTED.orig.size+ "<br>";
        info += " RotX,Y,Z: " + SELECTED.orig.rotX +" "+SELECTED.orig.rotY+" "+SELECTED.orig.rotZ + "<br>";
        info += " PosX,Y,Z: " + SELECTED.orig.posX +" "+SELECTED.orig.posY+" "+SELECTED.orig.posZ;


        popupContent.html(info);
        popupTitle.html(SELECTED.name);
        console.log(Offset);
        var mx = event.pageX - (popup.width() / 2);
        var my = event.pageY - (popup.height()) - 5;

        popup.css({
            top: my + "px", left: mx + "px"
        });

        popup.show();
    } else {
        SELECTED = null;
        popup.hide();
    }
}

function onDocumentMouseMove(event) {
    // the following line would stop any other event handler from firing
    // (such as the mouse's TrackballControls)
//    event.preventDefault();
    mouse.x = ( (event.pageX - Offset.left) / canvasWidth ) * 2 - 1;
    mouse.y = -( (event.pageY - Offset.top) / canvasHeight ) * 2 + 1;

    highlightMouseOver();
}

function drawGrid() {
    var planeW = 50; // pixels
    var planeH = 50; // pixels
    var numW = 1; // how many wide (50*50 = 2500 pixels wide)
    var numH = 1; // how many tall (50*50 = 2500 pixels tall)
    var plane = new THREE.Mesh(
        new THREE.PlaneBufferGeometry(planeW * numW, planeH * numH, planeW, planeH),
        new THREE.MeshLambertMaterial({
            color: 0x999999,
            opacity: 0.01,
            wireframe: true
        })
    );
    plane.rotation.x = 45;
//    plane.rotation. = 180;
//plane.position.z =  3;
    scene.add(plane);
}

function highlightMouseOver() {


    var vector = new THREE.Vector3(mouse.x, mouse.y, 1);
    projector.unprojectVector(vector, camera);
    var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

    var intersects = ray.intersectObjects(objects);

    if (intersects.length > 0) {
        if (INTERSECTED == null) {

            console.log('predchadzajuci bol nul, teraz je novy');
            INTERSECTED = intersects[ 0 ].object;
            selectedScaleX = INTERSECTED.scale.x;
            selectedScaleY = INTERSECTED.scale.y;
            selectedScaleZ = INTERSECTED.scale.z;
        }
        else {
            INTERSECTED = intersects[ 0 ].object;
            console.log('stojime stale na ' + INTERSECTED.name);
        }

        INTERSECTED.geometry.colorsNeedUpdate = true;

    }
    else {
        // restore previous intersection object (if it exists) to its original color
        if (INTERSECTED) {
            console.log('napravujem');
//            INTERSECTED.material.specular = new THREE.Color('red')
//            INTERSECTED.face.color = baseColor;
//            INTERSECTED.geometry.colorsNeedUpdate=true;
            INTERSECTED.scale.x = selectedScaleX;
            INTERSECTED.scale.y = selectedScaleY;
            INTERSECTED.scale.z = selectedScaleZ;

        }
        console.log('deselected');
        INTERSECTED = null;
        selectedAnimFrame = 0;
    }

}


function render() {
    requestAnimationFrame(render);
    controls.update();
    animate();
    renderer.render(scene, camera);

}

function main(canvas) {
    init(canvas);
    loadObjects();
    addStarts(50);
//    drawGrid();
    render();
}


function animate() {
    for (var i = 0; i < objects.length; i++) {
        if (INTERSECTED != null && INTERSECTED == objects[i]) {
            var rad = selectedAnimFrame.toRad();
            var animPhase = (Math.sin(rad)/3+0.2);
            objects[i].scale.x = selectedScaleX +  animPhase * selectedScaleX;
            objects[i].scale.y = selectedScaleY + animPhase * selectedScaleY;
            objects[i].scale.z = selectedScaleZ + animPhase * selectedScaleZ;

            selectedAnimFrame = (selectedAnimFrame + 5) % 360;
            console.log(selectedAnimFrame);
        } else {
            objects[i].rotation.x += objects[i].orig.rotX/100;
            objects[i].rotation.y += objects[i].orig.rotY/100;
            objects[i].rotation.z += objects[i].orig.rotZ/100;
        }
    }


}

function loadObjects() {
    if (planets !== undefined) {
        for (var i = 0; i < planets.length; ++i) {
            objects.push(addObject(scene, planets[i]));
        }
    }
}

function addObject(scene, obj) {

    var geometry = new THREE.SphereGeometry(obj.size / 10, 32, 32);
    var material = new THREE.MeshLambertMaterial({
        map: THREE.ImageUtils.loadTexture(obj.texture_url),
        bumpMap: THREE.ImageUtils.loadTexture(obj.texture_url)
//        bumpScale:   0.005,
//        specularMap: THREE.ImageUtils.loadTexture('/assets/water_4k.png'),
//        specular: new THREE.Color('grey')
    });

//    var material = new THREE.MeshPhongMaterial({ color: 0x33ff00 });
    var sphere = new THREE.Mesh(geometry, material);

    scene.add(sphere);
    sphere.position.x = obj.posX;
    sphere.position.y = obj.posY;
    sphere.position.z = obj.posZ;
    sphere.name = obj.name;
    sphere.info = obj.info;
    sphere.orig = obj;


    return sphere;
}


function addStarts(radius) {
    var i, r = radius, starsGeometry = [ new THREE.Geometry(), new THREE.Geometry() ];

    for (i = 0; i < 250; i++) {

        var vertex = new THREE.Vector3();
        vertex.x = Math.random() * 2 - 1;
        vertex.y = Math.random() * 2 - 1;
        vertex.z = Math.random() * 2 - 1;
        vertex.multiplyScalar(r);

        starsGeometry[ 0 ].vertices.push(vertex);

    }

    for (i = 0; i < 1500; i++) {

        var vertex = new THREE.Vector3();
        vertex.x = Math.random() * 2 - 1;
        vertex.y = Math.random() * 2 - 1;
        vertex.z = Math.random() * 2 - 1;
        vertex.multiplyScalar(r);

        starsGeometry[ 1 ].vertices.push(vertex);

    }

    var stars;
    var starsMaterials = [
        new THREE.PointCloudMaterial({ color: 0x555555, size: 2, sizeAttenuation: false }),
        new THREE.PointCloudMaterial({ color: 0x555555, size: 1, sizeAttenuation: false }),
        new THREE.PointCloudMaterial({ color: 0x333333, size: 2, sizeAttenuation: false }),
        new THREE.PointCloudMaterial({ color: 0x3a3a3a, size: 1, sizeAttenuation: false }),
        new THREE.PointCloudMaterial({ color: 0x1a1a1a, size: 2, sizeAttenuation: false }),
        new THREE.PointCloudMaterial({ color: 0x1a1a1a, size: 1, sizeAttenuation: false })
    ];

    for (i = 10; i < 30; i++) {

        stars = new THREE.PointCloud(starsGeometry[ i % 2 ], starsMaterials[ i % 6 ]);

        stars.rotation.x = Math.random() * 6;
        stars.rotation.y = Math.random() * 6;
        stars.rotation.z = Math.random() * 6;

        s = i * 10;
        stars.scale.set(s, s, s);

        stars.matrixAutoUpdate = false;
        stars.updateMatrix();


        scene.add(stars);
    }
}
