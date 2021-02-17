import React from "react";
import * as THREE from "three";
export default function Render() {
  // START SCRIPT ----------------------->
  React.useEffect(() => {
    let camera, scene, renderer, group;

    let mouseX = 0,
      mouseY = 0;

    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    init();
    animate();

    function init() {
      camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        1,
        10000
      );
      camera.position.z = 1300;

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x1a202c);
      scene.fog = new THREE.Fog(0x000000, 1, 10000);

      const geometry = new THREE.BoxGeometry(100, 100, 100);
      const material = new THREE.MeshNormalMaterial();

      group = new THREE.Group();

      for (let i = 0; i < 1000; i++) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = Math.random() * 2000 - 1000;
        mesh.position.y = Math.random() * 2000 - 1000;
        mesh.position.z = Math.random() * 2000 - 1000;

        mesh.rotation.x = Math.random() * 2 * Math.PI;
        mesh.rotation.y = Math.random() * 2 * Math.PI;

        mesh.matrixAutoUpdate = false;
        mesh.updateMatrix();

        group.add(mesh);
      }

      scene.add(group);

      //

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.getElementById("canva").appendChild(renderer.domElement);

      //

      //

      document.addEventListener("mousemove", onDocumentMouseMove);

      //

      window.addEventListener("resize", onWindowResize);
    }

    function onWindowResize() {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function onDocumentMouseMove(event) {
      var x = window.matchMedia("(min-width: 800px)");
      if (x.matches) {
        mouseX = (event.clientX - windowHalfX) * 2.5;
        mouseY = (event.clientY - windowHalfY) * 2.5;
      }
    }

    //

    function animate() {
      requestAnimationFrame(animate);

      render();
    }

    function render() {
      const time = Date.now() * 0.001;

      const rx = Math.sin(time * 0.7) * 0.375,
        ry = Math.sin(time * 0.3) * 0.25,
        rz = Math.sin(time * 0.2) * 0.25;

      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;

      camera.lookAt(scene.position);

      group.rotation.x = rx;
      group.rotation.y = ry;
      group.rotation.z = rz;

      renderer.render(scene, camera);
    }
  }, []);
  // ENDS SCRIPT ------------------------<
  return (
    <div
      id="canva"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        // filter: "blur(1px)",
      }}
    ></div>
  );
}
