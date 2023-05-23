import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeScene = () => {
  const sceneRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer, cloudParticles = [], flash, rain, rainGeo, rainCount = 15000;

    const init = () => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
      camera.position.z = 1;
      camera.rotation.x = 1.16;
      camera.rotation.y = -0.12;
      camera.rotation.z = 0.27;

      const ambient = new THREE.AmbientLight(0x555555);
      scene.add(ambient);

      const directionalLight = new THREE.DirectionalLight(0xffeedd);
      directionalLight.position.set(0, 0, 1);
      scene.add(directionalLight);

      flash = new THREE.PointLight(0x062d89, 30, 500, 1.7);
      flash.position.set(200, 300, 100);
      scene.add(flash);

      renderer = new THREE.WebGLRenderer();
      scene.fog = new THREE.FogExp2(0x11111f, 0.002);
      renderer.setClearColor(scene.fog.color);
      renderer.setSize(window.innerWidth, window.innerHeight);
      sceneRef.current.appendChild(renderer.domElement);

      rainGeo = new THREE.BufferGeometry();
      const positions = [];
      const velocities = [];
      for (let i = 0; i < rainCount; i++) {
        positions.push(
          Math.random() * 400 - 200,
          Math.random() * 500 - 250,
          Math.random() * 400 - 200
        );
        velocities.push(0);
      }
      rainGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      rainGeo.setAttribute('velocity', new THREE.Float32BufferAttribute(velocities, 1));

      const rainMaterial = new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 0.1,
        transparent: true,
      });
      rain = new THREE.Points(rainGeo, rainMaterial);
      scene.add(rain);

      const loader = new THREE.TextureLoader();
      loader.load(process.env.PUBLIC_URL + '/smoke.png', function (texture) {
        const cloudGeo = new THREE.PlaneBufferGeometry(500, 500);
        const cloudMaterial = new THREE.MeshLambertMaterial({
          map: texture,
          transparent: true,
        });

        for (let p = 0; p < 25; p++) {
          const cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
          cloud.position.set(
            Math.random() * 800 - 400,
            500,
            Math.random() * 500 - 450
          );
          cloud.rotation.x = 1.16;
          cloud.rotation.y = -0.12;
          cloud.rotation.z = Math.random() * 360;
          cloud.material.opacity = 0.6;
          cloudParticles.push(cloud);
          scene.add(cloud);
        }

        animate();
      });
    };

    const animate = () => {
      cloudParticles.forEach((p) => {
        p.rotation.z -= 0.002;
      });

      const positions = rainGeo.getAttribute('position');
      const velocities = rainGeo.getAttribute('velocity');

      for (let i = 0; i < positions.array.length; i += 3) {
        velocities.array[i / 3] -= 0.1 + Math.random() * 0.1;
        positions.array[i + 1] += velocities.array[i / 3];

        if (positions.array[i + 1] < -200) {
          positions.array[i + 1] = 200;
          velocities.array[i / 3] = 0;
        }
      }

      positions.needsUpdate = true;
      velocities.needsUpdate = true;

      rain.rotation.y += 0.002;

      if (Math.random() > 0.93 || flash.power > 100) {
        if (flash.power < 100)
          flash.position.set(
            Math.random() * 400,
            300 + Math.random() * 200,
            100
          );
        flash.power = 50 + Math.random() * 500;
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    init();

    // Cleanup
    return () => {
      if (sceneRef.current && sceneRef.current.removeChild) {
        sceneRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={sceneRef} />;
};

export default ThreeScene;
