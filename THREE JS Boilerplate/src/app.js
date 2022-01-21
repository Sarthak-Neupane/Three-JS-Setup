import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import texture from "../assets/texture.jpg";

import * as dat from "dat.gui";

export default class Sketch {
  constructor(options) {
    this.time = 0;
    this.container = options.dom;
    this.height = this.container.offsetHeight;
    this.width = this.container.offsetWidth;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      70,
      this.width / this.height,
      0.1,
      1000
    );
    this.camera.position.z = 1;

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // this.controls.enableDamping = true;
    this.settings();
    this.resize();
    this.addObjects();
    this.render();
    this.setupResize();
  }

  settings() {
    this.setting = {
      progress: 0,
    };
    this.gui = new dat.GUI();
    this.gui.add(this.setting, "progress", 0, 1, 0.01);
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.hieght = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }

  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  addObjects() {
    this.geometry = new THREE.PlaneBufferGeometry(0.5, 0.5, 100, 100);
    this.material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      // wireframe: true,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(this.width, this.height) },
        uTexture: { value: new THREE.TextureLoader().load(texture) },
        uProgress: { value: 0 },
      },
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  render() {
    this.time += 0.01;
    this.material.uniforms.time.value = this.time;
    this.material.uniforms.uProgress.value = this.setting.progress;
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render.bind(this));
  }
}

new Sketch({ dom: document.querySelector(".container") });
