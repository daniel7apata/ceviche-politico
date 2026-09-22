import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Scene3DType } from '../types';
import { Video, Eye } from 'lucide-react';

interface ThreeEventViewerProps {
  sceneType: Scene3DType;
  title: string;
  theme?: 'light' | 'dark';
}

export const ThreeEventViewer: React.FC<ThreeEventViewerProps> = ({ sceneType, title, theme = 'dark' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 220;

    const isLight = theme === 'light';

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(isLight ? 0xf1f5f9 : 0x0a0f1d);
    scene.fog = new THREE.FogExp2(isLight ? 0xf1f5f9 : 0x0a0f1d, isLight ? 0.025 : 0.04);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.7, 4.4);
    camera.lookAt(0, 1.05, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Dynamic ResizeObserver to adapt smoothly to window/panel resize
    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    resizeObserver.observe(container);

    // 2. Lighting (Natural, warm studio & neutral fill, adaptable to theme)
    const ambientLight = new THREE.AmbientLight(0xffffff, isLight ? 1.15 : 0.85);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(isLight ? 0xfffbeb : 0xe2e8f0, isLight ? 1.6 : 1.4);
    mainLight.position.set(5, 10, 7);
    scene.add(mainLight);

    const accentLight = new THREE.PointLight(0xf59e0b, isLight ? 1.2 : 1.8, 12);
    accentLight.position.set(-3, 2, 2);
    scene.add(accentLight);

    // Floor grid (Adapts to light and dark theme)
    const gridHelper = new THREE.GridHelper(
      12, 
      12, 
      isLight ? 0x94a3b8 : 0x475569, 
      isLight ? 0xcbd5e1 : 0x1e293b
    );
    gridHelper.position.y = 0;
    scene.add(gridHelper);

    const animatedObjects: { update: (time: number) => void }[] = [];

    // Helper: Create a stylized humanoid figure
    const createPerson = (colorHex: number, posX: number, posZ: number) => {
      const group = new THREE.Group();
      group.position.set(posX, 0, posZ);

      // Body / Torso
      const bodyGeo = new THREE.CylinderGeometry(0.22, 0.28, 0.9, 8);
      const bodyMat = new THREE.MeshStandardMaterial({ color: colorHex, roughness: 0.5 });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.position.y = 0.85;
      group.add(body);

      // Head
      const headGeo = new THREE.SphereGeometry(0.2, 16, 16);
      const headMat = new THREE.MeshStandardMaterial({ color: 0xfbd38d, roughness: 0.6 });
      const head = new THREE.Mesh(headGeo, headMat);
      head.position.y = 1.5;
      group.add(head);

      // Arms - pivot from the shoulder (top extreme) rather than center of cylinder
      const armLength = 0.55;
      const armGeo = new THREE.CylinderGeometry(0.06, 0.05, armLength, 8);
      // Translate downwards by half its length so the local (0,0,0) origin is at the shoulder joint
      armGeo.translate(0, -armLength / 2, 0);
      const armMat = new THREE.MeshStandardMaterial({ color: colorHex });
      
      const leftArm = new THREE.Mesh(armGeo, armMat);
      leftArm.position.set(-0.32, 1.22, 0);
      group.add(leftArm);

      const rightArm = new THREE.Mesh(armGeo, armMat);
      rightArm.position.set(0.32, 1.22, 0);
      group.add(rightArm);

      scene.add(group);
      return { group, head, leftArm, rightArm, body };
    };

    // 3. Build specific scene
    if (sceneType === 'pan_chicharron') {
      // --- MERCADO / PAN CON CHICHARRÓN ---
      const stallGeo = new THREE.BoxGeometry(2.4, 0.9, 1.2);
      const stallMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.6 });
      const stall = new THREE.Mesh(stallGeo, stallMat);
      stall.position.set(0, 0.45, 0);
      scene.add(stall);

      const roofGeo = new THREE.BoxGeometry(2.6, 0.1, 1.5);
      const roofMat = new THREE.MeshStandardMaterial({ color: 0xd97706 });
      const roof = new THREE.Mesh(roofGeo, roofMat);
      roof.position.set(0, 2.2, 0);
      scene.add(roof);

      const bunGeo = new THREE.SphereGeometry(0.18, 12, 8);
      bunGeo.scale(1.3, 0.8, 1);
      const bunMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.3 });
      const sandwich = new THREE.Mesh(bunGeo, bunMat);
      sandwich.position.set(0, 1.05, 0.2);
      scene.add(sandwich);

      const senito = createPerson(0xbe185d, -0.9, -0.2);
      const candidato = createPerson(0x2563eb, 0.9, 0.6);

      animatedObjects.push({
        update: (time) => {
          // Faster, energetic arm movements pivoting cleanly from the shoulder
          senito.rightArm.rotation.x = -1.1 + Math.sin(time * 6.5) * 0.4;
          senito.head.rotation.y = 0.4 + Math.sin(time * 3.5) * 0.15;
          candidato.leftArm.rotation.x = -1.1 + Math.cos(time * 6.5) * 0.4;
          candidato.head.rotation.x = Math.sin(time * 4) * 0.15;
          sandwich.position.y = 1.05 + Math.sin(time * 6.5) * 0.04;
        }
      });

    } else if (sceneType === 'caldo_gallina') {
      // --- OLLA COMÚN / CALDO DE GALLINA CON PATA ---
      const cart = new THREE.Mesh(
        new THREE.BoxGeometry(2.2, 0.85, 1.1),
        new THREE.MeshStandardMaterial({ color: 0x475569 })
      );
      cart.position.set(0, 0.42, 0);
      scene.add(cart);

      // Big soup pot
      const pot = new THREE.Mesh(
        new THREE.CylinderGeometry(0.45, 0.4, 0.5, 16),
        new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8 })
      );
      pot.position.set(-0.3, 1.05, 0);
      scene.add(pot);

      // Steam particles
      const steamCount = 5;
      const steamBubbles: THREE.Mesh[] = [];
      const steamGeo = new THREE.SphereGeometry(0.08, 8, 8);
      const steamMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.4 });
      for (let i = 0; i < steamCount; i++) {
        const steam = new THREE.Mesh(steamGeo, steamMat);
        steam.position.set(-0.3 + (Math.random() - 0.5) * 0.3, 1.3 + i * 0.25, (Math.random() - 0.5) * 0.2);
        scene.add(steam);
        steamBubbles.push(steam);
      }

      const cocinera = createPerson(0xd97706, -1.0, -0.2);
      const comensal = createPerson(0x2563eb, 0.9, 0.2);

      animatedObjects.push({
        update: (time) => {
          cocinera.rightArm.rotation.x = -1.2 + Math.sin(time * 7.5) * 0.45;
          cocinera.head.rotation.y = Math.sin(time * 3.5) * 0.2;
          comensal.leftArm.rotation.x = -1.1 + Math.cos(time * 7) * 0.4;
          comensal.head.rotation.x = Math.sin(time * 4) * 0.15;
          steamBubbles.forEach((sb, idx) => {
            sb.position.y = 1.3 + ((time * 0.8 + idx * 0.3) % 1.2);
            sb.scale.setScalar(1 + ((time * 0.8 + idx * 0.3) % 1.2) * 0.5);
          });
        }
      });

    } else if (sceneType === 'conferencia_prensa') {
      // --- CONFERENCIA DE PRENSA / RUEDA DE MEDIOS ---
      const pressPodium = new THREE.Mesh(
        new THREE.BoxGeometry(2.0, 1.0, 0.8),
        new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 })
      );
      pressPodium.position.set(0, 0.5, -0.5);
      scene.add(pressPodium);

      // Microphones
      for (let m = -0.4; m <= 0.4; m += 0.4) {
        const mic = new THREE.Mesh(
          new THREE.CylinderGeometry(0.03, 0.03, 0.3, 8),
          new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9 })
        );
        mic.position.set(m, 1.15, -0.2);
        scene.add(mic);
      }

      // Candidate speaker
      const speaker = createPerson(0x1d4ed8, 0, -0.9);

      // 2 Reporters with cameras
      const rep1 = createPerson(0x475569, -1.3, 1.1);
      const rep2 = createPerson(0x64748b, 1.3, 1.1);

      // Paparazzi camera flash light
      const flashLight = new THREE.PointLight(0xffffff, 0, 10);
      flashLight.position.set(0, 1.5, 1.5);
      scene.add(flashLight);

      animatedObjects.push({
        update: (time) => {
          speaker.rightArm.rotation.x = -0.9 + Math.sin(time * 7) * 0.5;
          speaker.leftArm.rotation.x = -0.5 + Math.cos(time * 6) * 0.3;
          speaker.head.rotation.y = Math.sin(time * 3.5) * 0.3;
          rep1.rightArm.rotation.x = -1.2 + Math.sin(time * 8) * 0.25;
          rep2.leftArm.rotation.x = -1.2 + Math.cos(time * 8) * 0.25;
          // Random flash blinking
          flashLight.intensity = Math.sin(time * 12) > 0.85 ? 4.0 : 0;
        }
      });

    } else if (sceneType === 'mitin_banderas') {
      // --- MITIN CON BANDERAS Y PANCARTAS ONDEANTES ---
      const stage = new THREE.Mesh(
        new THREE.BoxGeometry(4.2, 0.4, 2.5),
        new THREE.MeshStandardMaterial({ color: 0x334155 })
      );
      stage.position.set(0, 0.2, 0);
      scene.add(stage);

      // Big Peruvian red-and-white banner behind
      const bannerGeo = new THREE.PlaneGeometry(3.6, 1.2, 8, 4);
      const bannerMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, side: THREE.DoubleSide });
      const banner = new THREE.Mesh(bannerGeo, bannerMat);
      banner.position.set(0, 2.1, -1.1);
      scene.add(banner);

      const candidateFig = createPerson(0x2563eb, 0, 0.1);
      const flagBearer1 = createPerson(0xdc2626, -1.4, 0.6);
      const flagBearer2 = createPerson(0xdc2626, 1.4, 0.6);

      // Flags
      const flagGeo = new THREE.BoxGeometry(0.8, 0.5, 0.02);
      const flagMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
      const flag1 = new THREE.Mesh(flagGeo, flagMat);
      flag1.position.set(-1.4, 1.7, 0.6);
      scene.add(flag1);

      const flag2 = new THREE.Mesh(flagGeo, flagMat);
      flag2.position.set(1.4, 1.7, 0.6);
      scene.add(flag2);

      animatedObjects.push({
        update: (time) => {
          candidateFig.leftArm.rotation.x = -2.1 + Math.sin(time * 7.5) * 0.45;
          candidateFig.rightArm.rotation.x = -2.1 + Math.cos(time * 7.5) * 0.45;
          flagBearer1.rightArm.rotation.x = -1.8 + Math.sin(time * 6.5) * 0.35;
          flagBearer2.leftArm.rotation.x = -1.8 + Math.cos(time * 6.5) * 0.35;
          flag1.rotation.y = Math.sin(time * 6.5) * 0.4;
          flag2.rotation.y = Math.cos(time * 6.5) * 0.4;
        }
      });

    } else if (sceneType === 'debate') {
      // --- TELEVISED DEBATE / 2 PODIUMS ---
      const backdrop = new THREE.Mesh(
        new THREE.PlaneGeometry(5, 2.6),
        new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 })
      );
      backdrop.position.set(0, 1.5, -1.5);
      scene.add(backdrop);

      const podGeo = new THREE.CylinderGeometry(0.35, 0.45, 1, 8);
      const podMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.4 });
      
      const podL = new THREE.Mesh(podGeo, podMat);
      podL.position.set(-1.4, 0.5, 0);
      scene.add(podL);

      const podR = new THREE.Mesh(podGeo, podMat);
      podR.position.set(1.4, 0.5, 0);
      scene.add(podR);

      const cand1 = createPerson(0x2563eb, -1.4, -0.3);
      const cand2 = createPerson(0xb91c1c, 1.4, -0.3);

      animatedObjects.push({
        update: (time) => {
          cand1.head.rotation.y = Math.sin(time * 3.5) * 0.3;
          cand1.rightArm.rotation.x = -0.7 + Math.sin(time * 6.5) * 0.55;
          cand2.head.rotation.y = Math.cos(time * 3.2) * 0.3;
          cand2.leftArm.rotation.x = -0.7 + Math.cos(time * 6.2) * 0.55;
        }
      });

    } else if (sceneType === 'batalla_aura') {
      // --- BATALLA DE AURA ANIME ---
      const fighter1 = createPerson(0x7c3aed, -1.5, 0);
      const fighter2 = createPerson(0x0284c7, 1.5, 0);
      fighter1.group.rotation.y = Math.PI / 3;
      fighter2.group.rotation.y = -Math.PI / 3;

      const ringGeo = new THREE.RingGeometry(0.6, 0.8, 32);
      const auraRing1 = new THREE.Mesh(
        ringGeo,
        new THREE.MeshBasicMaterial({ color: 0x7c3aed, side: THREE.DoubleSide })
      );
      auraRing1.rotation.x = Math.PI / 2;
      auraRing1.position.set(-1.5, 0.05, 0);
      scene.add(auraRing1);

      const auraRing2 = new THREE.Mesh(
        ringGeo,
        new THREE.MeshBasicMaterial({ color: 0x0284c7, side: THREE.DoubleSide })
      );
      auraRing2.rotation.x = Math.PI / 2;
      auraRing2.position.set(1.5, 0.05, 0);
      scene.add(auraRing2);

      animatedObjects.push({
        update: (time) => {
          const s1 = 1 + Math.sin(time * 7) * 0.3;
          auraRing1.scale.set(s1, s1, s1);
          const s2 = 1 + Math.cos(time * 7) * 0.3;
          auraRing2.scale.set(s2, s2, s2);
          fighter1.group.position.y = Math.sin(time * 5.5) * 0.12;
          fighter2.group.position.y = Math.cos(time * 5.5) * 0.12;
          fighter1.leftArm.rotation.x = -1.2 + Math.sin(time * 8.5) * 0.35;
          fighter1.rightArm.rotation.x = -0.8 + Math.cos(time * 7.5) * 0.3;
          fighter2.rightArm.rotation.x = -1.2 + Math.cos(time * 8.5) * 0.35;
          fighter2.leftArm.rotation.x = -0.8 + Math.sin(time * 7.5) * 0.3;
        }
      });

    } else if (sceneType === 'entrevista_tv') {
      // --- TV STUDIO INTERVIEW DESK ---
      const desk = new THREE.Mesh(
        new THREE.BoxGeometry(3.5, 0.8, 1.2),
        new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.5 })
      );
      desk.position.set(0, 0.4, 0);
      scene.add(desk);

      const anchor = createPerson(0xb91c1c, -1.0, -0.3);
      const guest = createPerson(0x2563eb, 1.0, -0.3);

      animatedObjects.push({
        update: (time) => {
          anchor.head.rotation.y = 0.3 + Math.sin(time * 3) * 0.2;
          anchor.leftArm.rotation.x = -0.7 + Math.sin(time * 6) * 0.35;
          guest.head.rotation.y = -0.3 + Math.cos(time * 3) * 0.2;
          guest.rightArm.rotation.x = -0.8 + Math.sin(time * 7) * 0.45;
        }
      });

    } else {
      // --- MITIN CALLEJERO REGULAR ---
      const stage = new THREE.Mesh(
        new THREE.BoxGeometry(4, 0.4, 2.5),
        new THREE.MeshStandardMaterial({ color: 0x334155 })
      );
      stage.position.set(0, 0.2, 0);
      scene.add(stage);

      const candidateFig = createPerson(0x2563eb, 0, 0);
      const supporterFig = createPerson(0x059669, 1.2, 0.8);

      animatedObjects.push({
        update: (time) => {
          candidateFig.leftArm.rotation.x = -2.0 + Math.sin(time * 7.5) * 0.45;
          candidateFig.rightArm.rotation.x = -2.0 + Math.cos(time * 7.5) * 0.45;
          supporterFig.rightArm.rotation.x = -2.2 + Math.sin(time * 8.5) * 0.5;
        }
      });
    }

    // 4. Render loop
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Gentle camera sway
      camera.position.x = Math.sin(elapsedTime * 0.25) * 0.5;
      camera.lookAt(0, 1.0, 0);

      animatedObjects.forEach((obj) => obj.update(elapsedTime));
      renderer.render(scene, camera);
    };

    animate();

    // 5. Cleanup
    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, [sceneType, theme]);

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden relative shadow-sm">
      
      {/* Title Overlay */}
      <div className="absolute top-2 left-2 z-10 flex items-center justify-between right-2 pointer-events-none">
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 text-[9px] font-sans font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 shadow-sm">
          <Video className="w-3 h-3 text-slate-500 dark:text-slate-400" />
          <span>SIMULADOR 3D // ESCENA ELECTORAL</span>
        </div>

        <div className="bg-red-50 dark:bg-red-950/90 border border-red-300 dark:border-red-700/60 px-2 py-0.5 rounded text-[9px] font-sans font-bold text-red-700 dark:text-red-200 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
          EN VIVO
        </div>
      </div>

      {/* WebGL Canvas Container */}
      <div ref={mountRef} className="w-full h-52 sm:h-56 md:h-64 bg-slate-100 dark:bg-slate-950" />

      {/* Bottom Subtitle / Info */}
      <div className="bg-slate-50 dark:bg-slate-950/95 px-3 py-1.5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[10px] font-sans text-slate-600 dark:text-slate-400">
        <span className="truncate text-slate-900 dark:text-slate-200 font-bold">{title}</span>
        <span className="shrink-0 text-slate-400 dark:text-slate-500 flex items-center gap-1">
          <Eye className="w-3 h-3" /> THREE.JS 3D
        </span>
      </div>

    </div>
  );
};
