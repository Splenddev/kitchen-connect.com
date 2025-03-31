import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';

const Cart3D = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 6);
    // camera.lookAt(0, 2, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      600,
      // window.innerWidth,
      window.innerHeight
    );
    mountRef.current.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    const loader = new GLTFLoader();
    let cart;
    loader.load('/models/shopping_cart.glb', (gltf) => {
      cart = gltf.scene;
      cart.position.set(-20, 0, 0);
      scene.add(cart);
      animateCart();
    });

    function dropItem() {
      const itemGeometry = new THREE.SphereGeometry(0.2, 32, 32);
      const itemMaterial = new THREE.MeshStandardMaterial({ color: 0xffcc00 });
      const item = new THREE.Mesh(itemGeometry, itemMaterial);

      const cartX = cart.position.x;
      const cartZ = cart.position.z;

      item.position.set(cartX + 6, cart.position.y + 2, cartZ);
      scene.add(item);

      gsap.to(item.position, {
        y: cart.position.y + 0.2,
        duration: 1.5,
        ease: 'bounce.out',
        onComplete: () => scene.remove(item),
      });
    }

    function animateCart() {
      gsap
        .timeline({ repeat: -1 })
        .to(cart.position, { x: 2, duration: 3, ease: 'power2.inOut' })
        .call(() => dropItem())
        .to(cart.position, { x: 4, duration: 3, ease: 'power2.inOut' })
        .call(() =>
          gsap.to(cart.scale, { y: 1.2, duration: 0.3, yoyo: true, repeat: 1 })
        ) // Jump effect
        .to(cart.position, { x: 0, duration: 0 }); // Reset position
    }

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      controls.update();
    };
    animate();

    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} />;
};

export default Cart3D;
