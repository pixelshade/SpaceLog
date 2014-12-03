/**
 * Created by pixelshade on 26.11.2014.
 */
$(document).on('ready page:load', function () {
    a = $("#objectViewer");
    if (a.length) {
        if(objectToShow!== undefined && objectToShow!=null) {
            displayObject(a, objectToShow);
            console.log('kreslim');
        }
    } else {
        console.log('nenasiel som');
    }
});


function displayObject(canvas, obj) {
    var width = canvas.width();
    var height = width;
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 1000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);



    var controls = new THREE.TrackballControls(camera, renderer.domElement);
    canvas.append(renderer.domElement);
    camera.position.z = 5;

    var geometry = new THREE.SphereGeometry(obj.size /10 ,32, 32);
    var material = new THREE.MeshLambertMaterial({
        map: THREE.ImageUtils.loadTexture(obj.texture_url)
//        bumpMap: THREE.ImageUtils.loadTexture('/assets/elev_bump_4k.jpg'),
//        bumpScale:   0.005,
//        specularMap: THREE.ImageUtils.loadTexture('/assets/water_4k.png'),
//        specular: new THREE.Color('grey')
    });

//    var material = new THREE.MeshPhongMaterial({ color: 0x33ff00 });
    var sphere = new THREE.Mesh(geometry, material);

    scene.add(sphere);

    var addLight = function(){
        scene.add(new THREE.AmbientLight(0x404040));

        var light = new THREE.DirectionalLight(0xffffff, 0.5);
        light.position.set(1,1,1);
        scene.add(light);
    };

    var createSpaceBg = function(){
        var spaceBG = new THREE.Mesh(
            new THREE.SphereGeometry(50, 64, 64),
            new THREE.MeshBasicMaterial({
                map: THREE.ImageUtils.loadTexture('/assets/galaxy_starfield.png'),
                side: THREE.BackSide
            })

        );
        scene.add(spaceBG);
    };

    addLight();
    createSpaceBg();


    render();


    function render() {
        controls.update();
        sphere.rotation.y += 0.005;
        requestAnimationFrame(render, canvas);
        renderer.render(scene, camera);
    }

}



