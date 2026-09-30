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
          // Candidate arms perpendicular to ground waving side-to-side
          candidateFig.leftArm.rotation.x = 0;
          candidateFig.leftArm.rotation.y = 0;
          candidateFig.leftArm.rotation.z = Math.PI + 0.15 + Math.sin(time * 6.5) * 0.35;

          candidateFig.rightArm.rotation.x = 0;
          candidateFig.rightArm.rotation.y = 0;
          candidateFig.rightArm.rotation.z = Math.PI - 0.15 + Math.sin(time * 6.5) * 0.35;

          flagBearer1.rightArm.rotation.x = -1.8 + Math.sin(time * 6.5) * 0.35;
          flagBearer2.leftArm.rotation.x = -1.8 + Math.cos(time * 6.5) * 0.35;
          flag1.rotation.y = Math.sin(time * 6.5) * 0.4;
          flag2.rotation.y = Math.cos(time * 6.5) * 0.4;
        }
      });

    } else if (sceneType === 'debate') {
      // --- GRAN DEBATE MUNICIPAL LIMA 2026 (SET OFICIAL JNE / TV NACIONAL) ---

      // 1. Backdrop LED Wall (1024x512 Canvas Texture)
      const backdropCanvas = document.createElement('canvas');
      backdropCanvas.width = 1024;
      backdropCanvas.height = 512;
      const bCtx = backdropCanvas.getContext('2d');
      if (bCtx) {
        // Studio backdrop soft gradient
        const bgGrad = bCtx.createLinearGradient(0, 0, 0, 512);
        bgGrad.addColorStop(0, '#0f172a');
        bgGrad.addColorStop(0.12, '#cbd5e1');
        bgGrad.addColorStop(0.85, '#f1f5f9');
        bgGrad.addColorStop(1, '#94a3b8');
        bCtx.fillStyle = bgGrad;
        bCtx.fillRect(0, 0, 1024, 512);

        // Top studio lighting rig
        bCtx.fillStyle = '#090d16';
        bCtx.fillRect(0, 0, 1024, 42);
        for (let x = 50; x < 1000; x += 65) {
          bCtx.fillStyle = '#e2e8f0';
          bCtx.beginPath();
          bCtx.arc(x, 21, 9, 0, Math.PI * 2);
          bCtx.fill();
          bCtx.fillStyle = '#fef08a';
          bCtx.beginPath();
          bCtx.arc(x, 21, 5, 0, Math.PI * 2);
          bCtx.fill();
        }

        // Left & Right Red Vertical TV Studio Accent Columns (as in the photo)
        bCtx.fillStyle = '#dc2626';
        bCtx.fillRect(25, 42, 95, 470);
        bCtx.fillStyle = '#ffffff';
        bCtx.font = '900 14px Arial, sans-serif';
        bCtx.save();
        bCtx.translate(72, 275);
        bCtx.rotate(-Math.PI / 2);
        bCtx.textAlign = 'center';
        bCtx.fillText('DEBATE MUNICIPAL LIMA 2026', 0, 0);
        bCtx.restore();

        bCtx.fillStyle = '#dc2626';
        bCtx.fillRect(904, 42, 95, 470);
        bCtx.fillStyle = '#ffffff';
        bCtx.save();
        bCtx.translate(951, 275);
        bCtx.rotate(Math.PI / 2);
        bCtx.textAlign = 'center';
        bCtx.fillText('DEBATE MUNICIPAL LIMA 2026', 0, 0);
        bCtx.restore();

        // Architectural arches and colonial facades of Lima Plaza Mayor in light silhouette
        bCtx.fillStyle = 'rgba(148, 163, 184, 0.4)';
        for (let bx = 140; bx < 880; bx += 32) {
          bCtx.fillRect(bx, 280, 20, 180);
          bCtx.beginPath();
          bCtx.arc(bx + 10, 280, 10, Math.PI, 0);
          bCtx.fill();
        }
        bCtx.fillRect(130, 360, 760, 110);

        // Left side: JNE Logo
        bCtx.fillStyle = '#dc2626';
        bCtx.beginPath();
        bCtx.moveTo(225, 110);
        bCtx.lineTo(245, 88);
        bCtx.lineTo(265, 110);
        bCtx.lineTo(255, 124);
        bCtx.lineTo(235, 124);
        bCtx.closePath();
        bCtx.fill();
        bCtx.fillStyle = '#2563eb';
        bCtx.beginPath();
        bCtx.arc(245, 106, 7, 0, Math.PI * 2);
        bCtx.fill();
        bCtx.fillStyle = '#dc2626';
        bCtx.font = '900 24px Arial, sans-serif';
        bCtx.textAlign = 'center';
        bCtx.fillText('JNE', 245, 150);
        bCtx.fillStyle = '#64748b';
        bCtx.font = 'bold 8px Arial, sans-serif';
        bCtx.fillText('JURADO NACIONAL DE ELECCIONES', 245, 163);

        // Right side: ERM 2026 Logo
        bCtx.fillStyle = '#dc2626';
        bCtx.font = '900 32px Arial, sans-serif';
        bCtx.textAlign = 'center';
        bCtx.fillText('ERM', 780, 126);
        bCtx.fillStyle = '#1e3a8a';
        bCtx.font = '900 26px Arial, sans-serif';
        bCtx.fillText('2026', 780, 154);
        bCtx.fillStyle = '#64748b';
        bCtx.font = 'bold 8px Arial, sans-serif';
        bCtx.fillText('Elecciones Regionales y Municipales', 780, 168);

        // Center Main Typography: DEBATE MUNICIPAL LIMA 2026
        bCtx.fillStyle = '#1e293b';
        bCtx.font = '900 66px Arial, sans-serif';
        bCtx.textAlign = 'center';
        bCtx.fillText('DEBATE', 512, 136);

        // "MUNICIPAL" in bold red badge
        bCtx.fillStyle = '#dc2626';
        const rx = 325, ry = 152, rw = 374, rh = 54;
        if (bCtx.roundRect) {
          bCtx.beginPath();
          bCtx.roundRect(rx, ry, rw, rh, 6);
          bCtx.fill();
        } else {
          bCtx.fillRect(rx, ry, rw, rh);
        }

        bCtx.fillStyle = '#ffffff';
        bCtx.font = '900 40px Arial, sans-serif';
        bCtx.fillText('MUNICIPAL', 512, 192);

        // "LIMA 2026"
        bCtx.fillStyle = '#1e293b';
        bCtx.font = '900 32px Arial, sans-serif';
        bCtx.fillText('LIMA 2026', 512, 236);

        // Bottom official broadcast bar
        bCtx.fillStyle = '#0f172a';
        bCtx.fillRect(120, 474, 784, 38);
        bCtx.fillStyle = '#ffffff';
        bCtx.font = 'bold 12px Arial, sans-serif';
        bCtx.fillText('TRANSMISIÓN OFICIAL EN VIVO • SEÑAL NACIONAL • JNE', 512, 498);
      }

      const backdropTex = new THREE.CanvasTexture(backdropCanvas);
      const backdropGeo = new THREE.PlaneGeometry(7.2, 3.1);
      const backdropMat = new THREE.MeshStandardMaterial({ map: backdropTex, roughness: 0.35 });
      const backdrop = new THREE.Mesh(backdropGeo, backdropMat);
      backdrop.position.set(0, 1.62, -1.8);
      scene.add(backdrop);

      // 2. Glossy Circular Stage Floor
      const stageGeo = new THREE.CylinderGeometry(4.4, 4.6, 0.12, 36);
      const stageMat = new THREE.MeshStandardMaterial({ 
        color: 0x090d16, 
        roughness: 0.16, 
        metalness: 0.6 
      });
      const stage = new THREE.Mesh(stageGeo, stageMat);
      stage.position.set(0, 0.06, 0);
      scene.add(stage);

      // Floor Center Decal: "DEBATE MUNICIPAL LIMA 2026"
      const floorCanvas = document.createElement('canvas');
      floorCanvas.width = 512;
      floorCanvas.height = 256;
      const fCtx = floorCanvas.getContext('2d');
      if (fCtx) {
        fCtx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        if (fCtx.roundRect) {
          fCtx.beginPath();
          fCtx.roundRect(30, 20, 452, 216, 12);
          fCtx.fill();
        } else {
          fCtx.fillRect(30, 20, 452, 216);
        }

        fCtx.fillStyle = '#dc2626';
        fCtx.fillRect(30, 85, 452, 70);

        fCtx.fillStyle = '#1e293b';
        fCtx.font = '900 42px Arial, sans-serif';
        fCtx.textAlign = 'center';
        fCtx.fillText('DEBATE', 256, 70);

        fCtx.fillStyle = '#ffffff';
        fCtx.font = '900 38px Arial, sans-serif';
        fCtx.fillText('MUNICIPAL', 256, 137);

        fCtx.fillStyle = '#1e293b';
        fCtx.font = '900 32px Arial, sans-serif';
        fCtx.fillText('LIMA 2026', 256, 205);
      }
      const floorTex = new THREE.CanvasTexture(floorCanvas);
      const floorDecal = new THREE.Mesh(
        new THREE.PlaneGeometry(1.6, 0.8),
        new THREE.MeshStandardMaterial({ map: floorTex, transparent: true, roughness: 0.2 })
      );
      floorDecal.rotation.x = -Math.PI / 2;
      floorDecal.position.set(0, 0.125, 0.35);
      scene.add(floorDecal);

      // 3. Helper for Seated Figures on White Armchairs
      const createSeatedCandidate = (colorHex: number, posX: number, posZ: number, rotY: number) => {
        const chairGroup = new THREE.Group();
        chairGroup.position.set(posX, 0.1, posZ);
        chairGroup.rotation.y = rotY;

        const chairWhiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.35 });
        const chairLegMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.8 });

        // Seat cushion
        const seat = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.07, 0.36), chairWhiteMat);
        seat.position.y = 0.34;
        chairGroup.add(seat);

        // Backrest
        const back = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.44, 0.05), chairWhiteMat);
        back.position.set(0, 0.60, -0.15);
        chairGroup.add(back);

        // Chair legs
        const legGeo = new THREE.CylinderGeometry(0.016, 0.014, 0.34, 6);
        const l1 = new THREE.Mesh(legGeo, chairLegMat);
        l1.position.set(-0.15, 0.17, -0.15);
        const l2 = new THREE.Mesh(legGeo, chairLegMat);
        l2.position.set(0.15, 0.17, -0.15);
        const l3 = new THREE.Mesh(legGeo, chairLegMat);
        l3.position.set(-0.15, 0.17, 0.15);
        const l4 = new THREE.Mesh(legGeo, chairLegMat);
        l4.position.set(0.15, 0.17, 0.15);
        chairGroup.add(l1, l2, l3, l4);

        // Seated Person Body
        const suitMat = new THREE.MeshStandardMaterial({ color: colorHex, roughness: 0.5 });
        const skinMat = new THREE.MeshStandardMaterial({ color: 0xfbd38d, roughness: 0.6 });

        // Torso
        const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.58, 8), suitMat);
        torso.position.set(0, 0.68, -0.02);
        chairGroup.add(torso);

        // Head
        const head = new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 12), skinMat);
        head.position.set(0, 1.12, -0.02);
        chairGroup.add(head);

        // Legs bent forward
        const legs = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.11, 0.3), suitMat);
        legs.position.set(0, 0.40, 0.13);
        chairGroup.add(legs);

        // Arms resting naturally
        const armLength = 0.44;
        const armGeo = new THREE.CylinderGeometry(0.042, 0.038, armLength, 6);
        armGeo.translate(0, -armLength / 2, 0);

        const leftArm = new THREE.Mesh(armGeo, suitMat);
        leftArm.position.set(-0.24, 0.92, -0.02);
        leftArm.rotation.x = -0.7;
        leftArm.rotation.z = -0.1;
        chairGroup.add(leftArm);

        const rightArm = new THREE.Mesh(armGeo, suitMat);
        rightArm.position.set(0.24, 0.92, -0.02);
        rightArm.rotation.x = -0.7;
        rightArm.rotation.z = 0.1;
        chairGroup.add(rightArm);

        scene.add(chairGroup);
        return { chairGroup, head, leftArm, rightArm };
      };

      // 4. Helper for Sleek Modern White Lecterns
      const createLectern = (posX: number, posZ: number) => {
        const lecternGroup = new THREE.Group();
        lecternGroup.position.set(posX, 0.1, posZ);

        const whiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
        const redMat = new THREE.MeshStandardMaterial({ color: 0xdc2626 });
        const baseMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.6 });

        // Base plate
        const base = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.05, 0.38), baseMat);
        base.position.y = 0.025;
        lecternGroup.add(base);

        // White angled pillar
        const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.85, 0.22), whiteMat);
        pillar.position.set(0, 0.45, 0);
        pillar.rotation.x = 0.08;
        lecternGroup.add(pillar);

        // Red V-accent line on front
        const accent = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.55, 0.02), redMat);
        accent.position.set(0, 0.48, 0.12);
        accent.rotation.x = 0.08;
        lecternGroup.add(accent);

        // Slanted top reading desk
        const topDesk = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.04, 0.32), whiteMat);
        topDesk.position.set(0, 0.88, 0.02);
        topDesk.rotation.x = -0.22;
        lecternGroup.add(topDesk);

        // Microphone
        const micStand = new THREE.Mesh(
          new THREE.CylinderGeometry(0.008, 0.008, 0.22, 6),
          new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9 })
        );
        micStand.position.set(0.08, 1.0, 0.02);
        micStand.rotation.x = 0.35;
        lecternGroup.add(micStand);

        scene.add(lecternGroup);
        return lecternGroup;
      };

      // 5. Center Moderator Desk with JNE Logo & 2 Moderators
      const deskGroup = new THREE.Group();
      deskGroup.position.set(0, 0.1, -0.85);

      const deskWhiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
      const deskRedMat = new THREE.MeshStandardMaterial({ color: 0xdc2626 });

      const deskMain = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.68, 0.55), deskWhiteMat);
      deskMain.position.y = 0.34;
      deskGroup.add(deskMain);

      const deskFront = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.46, 0.02), deskRedMat);
      deskFront.position.set(0, 0.34, 0.28);
      deskGroup.add(deskFront);

      const deskInnerWhite = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.38, 0.03), deskWhiteMat);
      deskInnerWhite.position.set(0, 0.34, 0.28);
      deskGroup.add(deskInnerWhite);

      const jneDeskLogo = new THREE.Mesh(
        new THREE.BoxGeometry(0.24, 0.14, 0.04),
        deskRedMat
      );
      jneDeskLogo.position.set(0, 0.34, 0.29);
      deskGroup.add(jneDeskLogo);

      scene.add(deskGroup);

      // 2 Moderators seated behind desk
      const mod1 = createSeatedCandidate(0x1e293b, -0.38, -1.18, 0.08); // Male moderator in dark suit
      const mod2 = createSeatedCandidate(0xd4b996, 0.38, -1.18, -0.08); // Female moderator in tan suit

      // 6. Two Active Debating Lecterns & Candidates in Forefront
      createLectern(-0.95, 0.45);
      createLectern(0.95, 0.45);

      const cand1 = createPerson(0x2563eb, -0.95, 0.1);
      cand1.group.rotation.y = 0.3;

      const cand2 = createPerson(0xb91c1c, 0.95, 0.1);
      cand2.group.rotation.y = -0.3;

      // 7. Full Panel of Seated Candidates (Left and Right Wings, like in the reference photo)
      const leftSeated = [
        createSeatedCandidate(0x1d4ed8, -2.75, 0.55, 0.95),  // Blue suit
        createSeatedCandidate(0x334155, -2.45, 0.1, 0.75),   // Charcoal suit
        createSeatedCandidate(0xf8fafc, -2.15, -0.35, 0.55), // Light suit
        createSeatedCandidate(0xc2410c, -1.85, -0.8, 0.35),  // Terracotta suit
        createSeatedCandidate(0xdc2626, -1.55, -1.25, 0.15), // Red dress / suit
      ];

      const rightSeated = [
        createSeatedCandidate(0x059669, 1.55, -1.25, -0.15), // Green blazer
        createSeatedCandidate(0x0284c7, 1.85, -0.8, -0.35),  // Light blue suit
        createSeatedCandidate(0x1e3a8a, 2.15, -0.35, -0.55), // Navy suit
        createSeatedCandidate(0x0f172a, 2.45, 0.1, -0.75),   // Black suit
        createSeatedCandidate(0x64748b, 2.75, 0.55, -0.95),  // Slate suit
      ];

      // 8. Animations
      animatedObjects.push({
        update: (time) => {
          // Debating candidates gesturing and speaking
          cand1.head.rotation.y = 0.3 + Math.sin(time * 3.5) * 0.25;
          cand1.rightArm.rotation.x = -0.85 + Math.sin(time * 6.5) * 0.5;
          cand1.leftArm.rotation.x = -0.6 + Math.cos(time * 5.5) * 0.3;

          cand2.head.rotation.y = -0.3 + Math.cos(time * 3.2) * 0.25;
          cand2.leftArm.rotation.x = -0.85 + Math.cos(time * 6.2) * 0.5;
          cand2.rightArm.rotation.x = -0.6 + Math.sin(time * 5.0) * 0.3;

          // Moderators observing
          mod1.head.rotation.y = Math.sin(time * 2.5) * 0.15;
          mod1.head.rotation.x = 0.08 + Math.sin(time * 3.0) * 0.06;
          mod2.head.rotation.y = Math.cos(time * 2.2) * 0.15;

          // Subtle reactions from seated candidates
          leftSeated.forEach((c, idx) => {
            c.head.rotation.y = Math.sin(time * 2 + idx) * 0.12;
          });
          rightSeated.forEach((c, idx) => {
            c.head.rotation.y = Math.cos(time * 2 + idx) * 0.12;
          });
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

    } else if (sceneType === 'pichanga_futbol') {
      // --- PICHANGA EN VILLA EL SALVADOR (LOSA DEPORTIVA CON EQUIPO Y BARRA EN TRIBUNAS) ---
      
      // 1. Concrete Losa Deportiva Pitch
      const pitchGeo = new THREE.BoxGeometry(6.6, 0.08, 4.2);
      const pitchMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.7 });
      const pitch = new THREE.Mesh(pitchGeo, pitchMat);
      pitch.position.set(0, 0.04, 0);
      scene.add(pitch);

      // Pitch white field markings
      const linesCanvas = document.createElement('canvas');
      linesCanvas.width = 512;
      linesCanvas.height = 320;
      const lCtx = linesCanvas.getContext('2d');
      if (lCtx) {
        lCtx.strokeStyle = '#ffffff';
        lCtx.lineWidth = 10;
        lCtx.strokeRect(20, 20, 472, 280);
        // Half line & center circle
        lCtx.beginPath();
        lCtx.moveTo(256, 20);
        lCtx.lineTo(256, 300);
        lCtx.stroke();
        lCtx.beginPath();
        lCtx.arc(256, 160, 50, 0, Math.PI * 2);
        lCtx.stroke();
        // Penalty areas
        lCtx.strokeRect(20, 90, 80, 140);
        lCtx.strokeRect(412, 90, 80, 140);
      }
      const linesTex = new THREE.CanvasTexture(linesCanvas);
      const linesMat = new THREE.MeshBasicMaterial({ map: linesTex, transparent: true, opacity: 0.85 });
      const markingsPlane = new THREE.Mesh(new THREE.PlaneGeometry(6.4, 4.0), linesMat);
      markingsPlane.rotation.x = -Math.PI / 2;
      markingsPlane.position.set(0, 0.085, 0);
      scene.add(markingsPlane);

      // 2. Stepped Concrete Tribunas (Grandstand) in Background
      const bleacherMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.8 });
      const tier1 = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.45, 0.7), bleacherMat);
      tier1.position.set(0, 0.225, -1.6);
      scene.add(tier1);

      const tier2 = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.9, 0.7), bleacherMat);
      tier2.position.set(0, 0.45, -2.15);
      scene.add(tier2);

      // 3. Banners / Pancartas held by Barra over the Tribunas
      const bannerCanvas1 = document.createElement('canvas');
      bannerCanvas1.width = 512;
      bannerCanvas1.height = 160;
      const bc1 = bannerCanvas1.getContext('2d');
      if (bc1) {
        bc1.fillStyle = '#dc2626';
        bc1.fillRect(0, 0, 512, 160);
        bc1.fillStyle = '#ffffff';
        bc1.fillRect(10, 10, 492, 140);
        bc1.fillStyle = '#dc2626';
        bc1.font = '900 32px Arial, sans-serif';
        bc1.textAlign = 'center';
        bc1.fillText('⚽ ¡FUERZA VILLA EL SALVADOR! ⚽', 256, 65);
        bc1.fillStyle = '#0f172a';
        bc1.font = 'bold 24px Arial, sans-serif';
        bc1.fillText('★ BARRIO UNIDO POR EL TRIUNFO ★', 256, 115);
      }
      const bannerTex1 = new THREE.CanvasTexture(bannerCanvas1);
      const pancarta1 = new THREE.Mesh(
        new THREE.PlaneGeometry(2.6, 0.8),
        new THREE.MeshStandardMaterial({ map: bannerTex1, side: THREE.DoubleSide })
      );
      pancarta1.position.set(-1.4, 1.55, -2.0);
      scene.add(pancarta1);

      const bannerCanvas2 = document.createElement('canvas');
      bannerCanvas2.width = 512;
      bannerCanvas2.height = 160;
      const bc2 = bannerCanvas2.getContext('2d');
      if (bc2) {
        bc2.fillStyle = '#0284c7';
        bc2.fillRect(0, 0, 512, 160);
        bc2.fillStyle = '#ffffff';
        bc2.fillRect(10, 10, 492, 140);
        bc2.fillStyle = '#0284c7';
        bc2.font = '900 32px Arial, sans-serif';
        bc2.textAlign = 'center';
        bc2.fillText('★ ALCALDE GOLEADOR 2026 ★', 256, 65);
        bc2.fillStyle = '#b91c1c';
        bc2.font = 'bold 24px Arial, sans-serif';
        bc2.fillText('¡VOTA CON GARRA Y CORAZÓN!', 256, 115);
      }
      const bannerTex2 = new THREE.CanvasTexture(bannerCanvas2);
      const pancarta2 = new THREE.Mesh(
        new THREE.PlaneGeometry(2.6, 0.8),
        new THREE.MeshStandardMaterial({ map: bannerTex2, side: THREE.DoubleSide })
      );
      pancarta2.position.set(1.4, 1.55, -2.0);
      scene.add(pancarta2);

      // Barra supporters standing on tribunas
      const fan1 = createPerson(0xdc2626, -2.2, -1.8);
      fan1.group.position.y = 0.45;
      const fan2 = createPerson(0x2563eb, 0, -2.15);
      fan2.group.position.y = 0.9;
      const fan3 = createPerson(0xf59e0b, 2.2, -1.8);
      fan3.group.position.y = 0.45;

      // 4. Soccer Team Players
      // Front Captain / Candidate with the ball
      const starStriker = createPerson(0x2563eb, 0, 0.15);
      
      // Teammates in formation behind him
      const teammateLeft = createPerson(0x1d4ed8, -1.15, -0.65);
      const teammateRight = createPerson(0x1d4ed8, 1.15, -0.65);
      const teammateBack = createPerson(0x0284c7, 0, -1.1);

      // 5. Classic Soccer Ball in front
      const ballCanvas = document.createElement('canvas');
      ballCanvas.width = 128;
      ballCanvas.height = 128;
      const ballCtx = ballCanvas.getContext('2d');
      if (ballCtx) {
        ballCtx.fillStyle = '#ffffff';
        ballCtx.fillRect(0, 0, 128, 128);
        ballCtx.fillStyle = '#0f172a';
        ballCtx.beginPath();
        ballCtx.arc(64, 64, 28, 0, Math.PI * 2);
        ballCtx.fill();
        for (let a = 0; a < Math.PI * 2; a += Math.PI / 2) {
          ballCtx.beginPath();
          ballCtx.arc(64 + Math.cos(a) * 50, 64 + Math.sin(a) * 50, 16, 0, Math.PI * 2);
          ballCtx.fill();
        }
      }
      const ballTex = new THREE.CanvasTexture(ballCanvas);
      const ballGeo = new THREE.SphereGeometry(0.14, 16, 16);
      const ballMat = new THREE.MeshStandardMaterial({ map: ballTex, roughness: 0.4 });
      const soccerBall = new THREE.Mesh(ballGeo, ballMat);
      soccerBall.position.set(0, 0.18, 0.6);
      scene.add(soccerBall);

      animatedObjects.push({
        update: (time) => {
          // Ball rolling and slight kick bounce
          soccerBall.position.x = Math.sin(time * 3.5) * 0.22;
          soccerBall.position.z = 0.6 + Math.cos(time * 3.5) * 0.1;
          soccerBall.rotation.x = time * 5;
          soccerBall.rotation.y = time * 2;

          // Star striker dribbling posture and movement
          starStriker.group.position.x = Math.sin(time * 3.5) * 0.15;
          starStriker.rightArm.rotation.x = -0.7 + Math.sin(time * 4) * 0.4;
          starStriker.leftArm.rotation.x = -0.7 + Math.cos(time * 4) * 0.4;
          starStriker.head.rotation.y = Math.sin(time * 2.5) * 0.2;

          // Teammates in dynamic ready pose
          teammateLeft.leftArm.rotation.x = -0.6 + Math.sin(time * 3 + 1) * 0.3;
          teammateRight.rightArm.rotation.x = -0.6 + Math.cos(time * 3 + 1) * 0.3;
          teammateBack.leftArm.rotation.z = Math.PI - 0.2 + Math.sin(time * 4) * 0.3;
          teammateBack.rightArm.rotation.z = Math.PI + 0.2 + Math.cos(time * 4) * 0.3;

          // Barra hinchada jumping and waving banners on tribunas
          const jump1 = Math.max(0, Math.sin(time * 6)) * 0.12;
          fan1.group.position.y = 0.45 + jump1;
          fan1.leftArm.rotation.z = Math.PI - 0.2 + Math.sin(time * 7) * 0.5;
          fan1.rightArm.rotation.z = Math.PI + 0.2 + Math.cos(time * 7) * 0.5;

          const jump2 = Math.max(0, Math.sin(time * 6 + 1.2)) * 0.14;
          fan2.group.position.y = 0.9 + jump2;
          fan2.leftArm.rotation.z = Math.PI - 0.2 + Math.cos(time * 7) * 0.5;
          fan2.rightArm.rotation.z = Math.PI + 0.2 + Math.sin(time * 7) * 0.5;

          const jump3 = Math.max(0, Math.sin(time * 6 + 2.4)) * 0.12;
          fan3.group.position.y = 0.45 + jump3;
          fan3.leftArm.rotation.z = Math.PI - 0.2 + Math.sin(time * 7.5) * 0.5;
          fan3.rightArm.rotation.z = Math.PI + 0.2 + Math.cos(time * 7.5) * 0.5;

          pancarta1.rotation.z = Math.sin(time * 4) * 0.05;
          pancarta2.rotation.z = Math.cos(time * 4) * 0.05;
        }
      });

    } else if (sceneType === 'cuartel_estrategia') {
      // --- CUARTEL DE CAMPAÑA / ASESOR FORMAL EN VEDA ELECTORAL (SIN LAPTOPS) ---

      // 1. Boardroom Strategy Table (Dark polished mahogany)
      const tableGeo = new THREE.BoxGeometry(3.6, 0.78, 1.4);
      const tableMat = new THREE.MeshStandardMaterial({ color: 0x3e2723, roughness: 0.3, metalness: 0.2 });
      const table = new THREE.Mesh(tableGeo, tableMat);
      table.position.set(0, 0.39, 0);
      scene.add(table);

      // Strategy Map laid flat on the table
      const mapCanvas = document.createElement('canvas');
      mapCanvas.width = 512;
      mapCanvas.height = 256;
      const mCtx = mapCanvas.getContext('2d');
      if (mCtx) {
        mCtx.fillStyle = '#f8fafc';
        mCtx.fillRect(0, 0, 512, 256);
        mCtx.strokeStyle = '#0284c7';
        mCtx.lineWidth = 4;
        mCtx.strokeRect(10, 10, 492, 236);
        // Stylized map zones of Lima
        mCtx.fillStyle = '#38bdf8';
        mCtx.fillRect(60, 40, 100, 160); // Cono Norte
        mCtx.fillStyle = '#34d399';
        mCtx.fillRect(190, 80, 110, 100); // Lima Centro
        mCtx.fillStyle = '#fbbf24';
        mCtx.fillRect(320, 50, 130, 90); // Cono Este
        mCtx.fillStyle = '#f87171';
        mCtx.fillRect(310, 150, 140, 70); // Cono Sur
        mCtx.fillStyle = '#0f172a';
        mCtx.font = 'bold 16px sans-serif';
        mCtx.textAlign = 'center';
        mCtx.fillText('MAPA ELECTORAL LIMA 2026 // PLAN DE CONTINGENCIA', 256, 30);
      }
      const mapTex = new THREE.CanvasTexture(mapCanvas);
      const mapMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(2.4, 1.0),
        new THREE.MeshBasicMaterial({ map: mapTex })
      );
      mapMesh.rotation.x = -Math.PI / 2;
      mapMesh.position.set(0, 0.79, 0);
      scene.add(mapMesh);

      // Physical folders / confidential paper dossiers on table (NO LAPTOPS)
      const folderMat1 = new THREE.MeshStandardMaterial({ color: 0xb91c1c });
      const folderMat2 = new THREE.MeshStandardMaterial({ color: 0x1d4ed8 });
      const folder1 = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.04, 0.48), folderMat1);
      folder1.position.set(-1.1, 0.81, 0.2);
      folder1.rotation.y = 0.2;
      scene.add(folder1);

      const folder2 = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.04, 0.48), folderMat2);
      folder2.position.set(1.1, 0.81, -0.15);
      folder2.rotation.y = -0.3;
      scene.add(folder2);

      // Red strategic hotline telephone (formal office prop)
      const phoneBase = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.09, 0.22), new THREE.MeshStandardMaterial({ color: 0xdc2626 }));
      phoneBase.position.set(-1.25, 0.83, -0.35);
      scene.add(phoneBase);

      // 2. Background Briefing Whiteboard
      const boardCanvas = document.createElement('canvas');
      boardCanvas.width = 512;
      boardCanvas.height = 256;
      const bdCtx = boardCanvas.getContext('2d');
      if (bdCtx) {
        bdCtx.fillStyle = '#0f172a';
        bdCtx.fillRect(0, 0, 512, 256);
        bdCtx.fillStyle = '#dc2626';
        bdCtx.fillRect(0, 0, 512, 38);
        bdCtx.fillStyle = '#ffffff';
        bdCtx.font = 'bold 20px Arial, sans-serif';
        bdCtx.textAlign = 'center';
        bdCtx.fillText('★ BÚNKER DE CAMPAÑA • VEDA ELECTORAL ★', 256, 26);

        bdCtx.fillStyle = '#e2e8f0';
        bdCtx.font = '16px monospace';
        bdCtx.textAlign = 'left';
        bdCtx.fillText('• HORAS PARA EL SUFRAGIO: 24h', 30, 80);
        bdCtx.fillText('• MONITOREO DE REDES: ACTIVO', 30, 115);
        bdCtx.fillText('• PERSONEROS ASIGNADOS: 100%', 30, 150);
        bdCtx.fillText('• CONTROL DE CRISIS: MÁXIMO', 30, 185);

        // Graphic bar on right
        bdCtx.fillStyle = '#38bdf8';
        bdCtx.fillRect(360, 70, 45, 140);
        bdCtx.fillStyle = '#f59e0b';
        bdCtx.fillRect(420, 110, 45, 100);
      }
      const boardTex = new THREE.CanvasTexture(boardCanvas);
      const boardMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(3.6, 1.8),
        new THREE.MeshStandardMaterial({ map: boardTex, roughness: 0.5 })
      );
      boardMesh.position.set(0, 1.6, -1.3);
      scene.add(boardMesh);

      // 3. Figures: Asesor Fantasma in Formal Dark Suit with Tie (NO LAPTOPS)
      const formalAdvisor = createPerson(0x0f172a, -0.65, -0.2); // Dark navy suit
      // Formal tie detail
      const tieMesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.06, 0.45, 0.05),
        new THREE.MeshStandardMaterial({ color: 0xdc2626 })
      );
      tieMesh.position.set(-0.65, 0.85, -0.04);
      scene.add(tieMesh);

      // Campaign Deputy / Co-Strategist in formal charcoal attire
      const formalDeputy = createPerson(0x1e293b, 0.75, -0.2);

      animatedObjects.push({
        update: (time) => {
          // Formal advisor gestures solemnly towards the map and briefing board
          formalAdvisor.rightArm.rotation.x = -0.9 + Math.sin(time * 2.5) * 0.25;
          formalAdvisor.leftArm.rotation.x = -0.4 + Math.cos(time * 2) * 0.15;
          formalAdvisor.head.rotation.y = Math.sin(time * 1.8) * 0.25;

          // Tie follows slight torso sway
          tieMesh.position.y = 0.85 + Math.sin(time * 2) * 0.01;

          // Formal deputy listens and nods with serious composure
          formalDeputy.head.rotation.x = Math.sin(time * 2.2) * 0.1;
          formalDeputy.head.rotation.y = -0.3 + Math.cos(time * 1.5) * 0.15;
          formalDeputy.leftArm.rotation.x = -0.7 + Math.sin(time * 2) * 0.15;
        }
      });

    } else if (sceneType === 'fiscalizacion_jne') {
      // --- AUDIENCIA DE FISCALIZACIÓN EN LA SEDE DEL JNE ---
      // 1. Official JNE Backdrop
      const jneCanvas = document.createElement('canvas');
      jneCanvas.width = 512;
      jneCanvas.height = 256;
      const jCtx = jneCanvas.getContext('2d');
      if (jCtx) {
        const bgGrad = jCtx.createLinearGradient(0, 0, 0, 256);
        bgGrad.addColorStop(0, '#0f172a');
        bgGrad.addColorStop(1, '#1e293b');
        jCtx.fillStyle = bgGrad;
        jCtx.fillRect(0, 0, 512, 256);

        // Header Red Bar
        jCtx.fillStyle = '#dc2626';
        jCtx.fillRect(0, 0, 512, 40);

        jCtx.fillStyle = '#ffffff';
        jCtx.font = '900 20px Arial, sans-serif';
        jCtx.textAlign = 'center';
        jCtx.fillText('JURADO NACIONAL DE ELECCIONES', 256, 28);

        // Scales of Justice symbol & subtitle
        jCtx.fillStyle = '#fbbf24';
        jCtx.font = '28px serif';
        jCtx.fillText('⚖️', 256, 85);

        jCtx.fillStyle = '#f8fafc';
        jCtx.font = 'bold 16px Arial, sans-serif';
        jCtx.fillText('DIRECCIÓN NACIONAL DE FISCALIZACIÓN ELECTORAL', 256, 120);

        jCtx.fillStyle = '#94a3b8';
        jCtx.font = '12px Arial, sans-serif';
        jCtx.fillText('AUDIENCIA SUMARIA DE TACHAS Y EXCLUSIÓN DE LISTAS • LIMA 2026', 256, 145);

        // Official stamp box
        jCtx.strokeStyle = '#dc2626';
        jCtx.lineWidth = 2;
        jCtx.strokeRect(130, 168, 252, 42);
        jCtx.fillStyle = '#ef4444';
        jCtx.font = 'bold 12px monospace';
        jCtx.fillText('EXPEDIENTE N° ERM-2026-00482', 256, 194);
      }
      const jneTex = new THREE.CanvasTexture(jneCanvas);
      const jneBackdrop = new THREE.Mesh(
        new THREE.PlaneGeometry(3.6, 1.8),
        new THREE.MeshStandardMaterial({ map: jneTex, roughness: 0.4 })
      );
      jneBackdrop.position.set(0, 1.6, -1.3);
      scene.add(jneBackdrop);

      // Peruvian Flag on stand next to bench
      const flagPole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, 2.2, 8),
        new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.8 })
      );
      flagPole.position.set(-1.6, 1.1, -0.6);
      scene.add(flagPole);

      const flagMat = new THREE.MeshStandardMaterial({ color: 0xdc2626 });
      const flagMesh = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.35, 0.02), flagMat);
      flagMesh.position.set(-1.45, 1.8, -0.6);
      scene.add(flagMesh);
      const flagWhite = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.35, 0.025), new THREE.MeshStandardMaterial({ color: 0xffffff }));
      flagWhite.position.set(-1.45, 1.8, -0.6);
      scene.add(flagWhite);

      // Elevated Judicial Bench (Mahogany tribunal desk)
      const bench = new THREE.Mesh(
        new THREE.BoxGeometry(2.4, 0.85, 0.9),
        new THREE.MeshStandardMaterial({ color: 0x2b1d0c, roughness: 0.4 })
      );
      bench.position.set(-0.3, 0.42, -0.4);
      scene.add(bench);

      // Wooden Gavel on block
      const gavelBlock = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.09, 0.04, 12),
        new THREE.MeshStandardMaterial({ color: 0x451a03 })
      );
      gavelBlock.position.set(0.35, 0.87, -0.2);
      scene.add(gavelBlock);

      const gavelGroup = new THREE.Group();
      gavelGroup.position.set(0.35, 0.92, -0.2);
      const gavelHead = new THREE.Mesh(
        new THREE.CylinderGeometry(0.03, 0.03, 0.12, 8),
        new THREE.MeshStandardMaterial({ color: 0x78350f })
      );
      gavelHead.rotation.z = Math.PI / 2;
      gavelGroup.add(gavelHead);
      const gavelHandle = new THREE.Mesh(
        new THREE.CylinderGeometry(0.012, 0.012, 0.18, 6),
        new THREE.MeshStandardMaterial({ color: 0xb45309 })
      );
      gavelHandle.position.set(0, -0.06, 0.08);
      gavelHandle.rotation.x = Math.PI / 2;
      gavelGroup.add(gavelHandle);
      scene.add(gavelGroup);

      // Legal dossier file folders
      const fileFolder = new THREE.Mesh(
        new THREE.BoxGeometry(0.35, 0.04, 0.42),
        new THREE.MeshStandardMaterial({ color: 0x991b1b })
      );
      fileFolder.position.set(-0.25, 0.87, -0.25);
      fileFolder.rotation.y = 0.15;
      scene.add(fileFolder);

      // Jueza Fiscalizadora (Dra. Alanya) seated behind bench
      const jueza = createPerson(0x0f172a, -0.3, -0.7);
      // Red-and-white official magistrate ribbon around neck
      const judgeRibbon = new THREE.Mesh(
        new THREE.BoxGeometry(0.24, 0.18, 0.05),
        new THREE.MeshStandardMaterial({ color: 0xdc2626 })
      );
      judgeRibbon.position.set(-0.3, 1.25, -0.68);
      scene.add(judgeRibbon);

      // Candidate standing in front of tribunal with defense brief
      const candidato = createPerson(0x2563eb, 1.0, 0.4);
      candidato.group.rotation.y = -0.5;

      const defenseDoc = new THREE.Mesh(
        new THREE.BoxGeometry(0.24, 0.02, 0.32),
        new THREE.MeshStandardMaterial({ color: 0xffffff })
      );
      defenseDoc.position.set(0.9, 0.95, 0.4);
      scene.add(defenseDoc);

      animatedObjects.push({
        update: (time) => {
          // Jueza examines papers and strikes gavel periodically
          const strikeCycle = Math.sin(time * 3);
          if (strikeCycle > 0.8) {
            gavelGroup.rotation.x = -0.6 + (strikeCycle - 0.8) * 3;
            gavelGroup.position.y = 0.94 - (strikeCycle - 0.8) * 0.15;
            jueza.rightArm.rotation.x = -1.1 + (strikeCycle - 0.8) * 1.5;
          } else {
            gavelGroup.rotation.x = 0;
            gavelGroup.position.y = 0.92;
            jueza.rightArm.rotation.x = -0.8 + Math.sin(time * 2) * 0.15;
          }
          jueza.leftArm.rotation.x = -0.7 + Math.cos(time * 2) * 0.1;
          jueza.head.rotation.y = 0.2 + Math.sin(time * 1.5) * 0.15;

          // Candidate pleads defense and gestures with hands
          candidato.leftArm.rotation.x = -0.9 + Math.sin(time * 4) * 0.35;
          candidato.rightArm.rotation.x = -0.6 + Math.cos(time * 3.5) * 0.25;
          candidato.head.rotation.y = -0.5 + Math.sin(time * 2) * 0.1;
          defenseDoc.position.y = 0.95 + Math.sin(time * 4) * 0.03;
        }
      });

    } else if (sceneType === 'centro_campana') {
      // --- CENTRO DE CAMPAÑA / COMITÉ DE CRISIS Y PRENSA ---
      // 1. Campaign War Room Backdrop Canvas
      const campCanvas = document.createElement('canvas');
      campCanvas.width = 512;
      campCanvas.height = 256;
      const ccCtx = campCanvas.getContext('2d');
      if (ccCtx) {
        ccCtx.fillStyle = '#0f172a';
        ccCtx.fillRect(0, 0, 512, 256);
        // Header
        ccCtx.fillStyle = '#0284c7';
        ccCtx.fillRect(0, 0, 512, 40);
        ccCtx.fillStyle = '#ffffff';
        ccCtx.font = '900 18px Arial, sans-serif';
        ccCtx.textAlign = 'center';
        ccCtx.fillText('★ BÚNKER DE CAMPAÑA // COMITÉ DE CRISIS & PRENSA ★', 256, 27);

        // Crisis notes on board
        ccCtx.fillStyle = '#dc2626';
        ccCtx.fillRect(30, 60, 210, 30);
        ccCtx.fillStyle = '#ffffff';
        ccCtx.font = 'bold 13px Arial, sans-serif';
        ccCtx.fillText('🚨 ALERTA: AUDIO FILTRADO', 135, 80);

        ccCtx.fillStyle = '#e2e8f0';
        ccCtx.font = '12px monospace';
        ccCtx.textAlign = 'left';
        ccCtx.fillText('• MONITOREO DE RADIOS: RPP / EXITOSA', 30, 115);
        ccCtx.fillText('• GESTIÓN DE DAÑOS EN REDES: ACTIVA', 30, 140);
        ccCtx.fillText('• COMUNICADO OFICIAL: EN REDACCIÓN', 30, 165);
        ccCtx.fillText('• RESPUESTA A TRANSPORTISTAS: PENDIENTE', 30, 190);

        // Bar chart on right
        ccCtx.fillStyle = '#38bdf8';
        ccCtx.fillRect(300, 75, 40, 130);
        ccCtx.fillStyle = '#f59e0b';
        ccCtx.fillRect(360, 105, 40, 100);
        ccCtx.fillStyle = '#ef4444';
        ccCtx.fillRect(420, 135, 40, 70);
      }
      const campTex = new THREE.CanvasTexture(campCanvas);
      const campBackdrop = new THREE.Mesh(
        new THREE.PlaneGeometry(3.6, 1.8),
        new THREE.MeshStandardMaterial({ map: campTex, roughness: 0.5 })
      );
      campBackdrop.position.set(0, 1.6, -1.3);
      scene.add(campBackdrop);

      // Office desk with phones and papers
      const desk = new THREE.Mesh(
        new THREE.BoxGeometry(2.6, 0.75, 1.0),
        new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5 })
      );
      desk.position.set(0, 0.38, -0.3);
      scene.add(desk);

      // Megaphone on desk
      const megaphone = new THREE.Mesh(
        new THREE.ConeGeometry(0.08, 0.22, 12),
        new THREE.MeshStandardMaterial({ color: 0xdc2626 })
      );
      megaphone.rotation.z = Math.PI / 2;
      megaphone.position.set(0.65, 0.83, -0.2);
      scene.add(megaphone);

      // Broadcast phone on desk
      const phone = new THREE.Mesh(
        new THREE.BoxGeometry(0.18, 0.08, 0.18),
        new THREE.MeshStandardMaterial({ color: 0x0f172a })
      );
      phone.position.set(-0.65, 0.81, -0.2);
      scene.add(phone);

      // Jefe de Prensa (left side, holding clipboard and gesturing urgently)
      const jefePrensa = createPerson(0xd97706, -0.85, 0.1);
      // Candidate (right side, listening and strategizing)
      const cand = createPerson(0x2563eb, 0.75, 0.1);

      animatedObjects.push({
        update: (time) => {
          // Jefe de prensa gesticulates with urgency
          jefePrensa.rightArm.rotation.x = -1.1 + Math.sin(time * 5.5) * 0.45;
          jefePrensa.leftArm.rotation.x = -0.7 + Math.cos(time * 4) * 0.25;
          jefePrensa.head.rotation.y = 0.4 + Math.sin(time * 3) * 0.2;

          // Candidate nods thoughtfully
          cand.leftArm.rotation.x = -0.5 + Math.sin(time * 2.5) * 0.2;
          cand.head.rotation.x = Math.sin(time * 2.5) * 0.08;
          cand.head.rotation.y = -0.4 + Math.cos(time * 2) * 0.15;
        }
      });

    } else if (sceneType === 'chifa_trucho') {
      // --- REUNIÓN CLANDESTINA EN CHIFA TRUCHO / MALETÍN DE FONDOS OSCUROS ---
      // Dim, moody red-amber ambient light
      const chifaWarmLight = new THREE.PointLight(0xff4500, isLight ? 1.5 : 2.5, 8);
      chifaWarmLight.position.set(0, 2.2, 0);
      scene.add(chifaWarmLight);

      // Backdrop wall with Chinese Chifa decor
      const chifaCanvas = document.createElement('canvas');
      chifaCanvas.width = 512;
      chifaCanvas.height = 256;
      const chCtx = chifaCanvas.getContext('2d');
      if (chCtx) {
        chCtx.fillStyle = '#450a0a';
        chCtx.fillRect(0, 0, 512, 256);

        // Gold decorative border
        chCtx.strokeStyle = '#d97706';
        chCtx.lineWidth = 6;
        chCtx.strokeRect(15, 15, 482, 226);

        // Chifa Neon Sign
        chCtx.fillStyle = '#fbbf24';
        chCtx.font = '900 28px sans-serif';
        chCtx.textAlign = 'center';
        chCtx.fillText('★ CHIFA TRUCHO • SALÓN PRIVADO ★', 256, 65);

        chCtx.fillStyle = '#f87171';
        chCtx.font = 'bold 20px Arial, sans-serif';
        chCtx.fillText('“EL DRAGÓN DORADO”', 256, 110);

        chCtx.fillStyle = '#fef08a';
        chCtx.font = '36px serif';
        chCtx.fillText('🏮 🐉 🏮', 256, 160);

        chCtx.fillStyle = '#cbd5e1';
        chCtx.font = '12px sans-serif';
        chCtx.fillText('REUNIÓN A PUERTA CERRADA • SIN PRENSA • SIN CELULARES', 256, 205);
      }
      const chifaTex = new THREE.CanvasTexture(chifaCanvas);
      const chifaWall = new THREE.Mesh(
        new THREE.PlaneGeometry(3.6, 1.8),
        new THREE.MeshStandardMaterial({ map: chifaTex, roughness: 0.4 })
      );
      chifaWall.position.set(0, 1.6, -1.3);
      scene.add(chifaWall);

      // 2 Hanging Red Chinese Paper Lanterns
      const lanternMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.3, emissive: 0x991b1b, emissiveIntensity: 0.5 });
      const goldTrimMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.8 });

      const createLantern = (x: number) => {
        const lanternGroup = new THREE.Group();
        lanternGroup.position.set(x, 2.0, -0.4);

        const globe = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 12), lanternMat);
        globe.scale.set(1, 1.25, 1);
        lanternGroup.add(globe);

        const topCap = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.05, 8), goldTrimMat);
        topCap.position.y = 0.24;
        lanternGroup.add(topCap);

        const bottomTassel = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.06, 0.16, 6), goldTrimMat);
        bottomTassel.position.y = -0.28;
        lanternGroup.add(bottomTassel);

        scene.add(lanternGroup);
        return lanternGroup;
      };

      const lanternL = createLantern(-1.4);
      const lanternR = createLantern(1.4);

      // Round Chifa Table
      const roundTable = new THREE.Mesh(
        new THREE.CylinderGeometry(1.2, 1.2, 0.08, 24),
        new THREE.MeshStandardMaterial({ color: 0x7c2d12, roughness: 0.3 })
      );
      roundTable.position.set(0, 0.75, 0);
      scene.add(roundTable);

      const tableBase = new THREE.Mesh(
        new THREE.CylinderGeometry(0.18, 0.35, 0.72, 12),
        new THREE.MeshStandardMaterial({ color: 0x451a03 })
      );
      tableBase.position.set(0, 0.36, 0);
      scene.add(tableBase);

      // Red Lazy Susan Centerpiece
      const lazySusan = new THREE.Mesh(
        new THREE.CylinderGeometry(0.65, 0.65, 0.03, 20),
        new THREE.MeshStandardMaterial({ color: 0xb91c1c })
      );
      lazySusan.position.set(0, 0.80, 0);
      scene.add(lazySusan);

      // Teapot & Bowls of Chaufa
      const teapot = new THREE.Mesh(
        new THREE.SphereGeometry(0.09, 10, 10),
        new THREE.MeshStandardMaterial({ color: 0xffffff })
      );
      teapot.position.set(-0.25, 0.88, 0.15);
      scene.add(teapot);

      // THE FAMOUS BRIEFCASE OF CASH (Maletín Negro)
      const briefcaseGroup = new THREE.Group();
      briefcaseGroup.position.set(0.15, 0.83, -0.05);

      const caseMat = new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.3, metalness: 0.4 });
      const caseBase = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.06, 0.34), caseMat);
      briefcaseGroup.add(caseBase);

      const caseLid = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.04, 0.34), caseMat);
      caseLid.position.set(0, 0.12, -0.1);
      caseLid.rotation.x = -0.55; // Open lid!
      briefcaseGroup.add(caseLid);

      // Stacks of cash inside (Green money bundles S/.)
      const cashMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.7 });
      for (let cx = -0.16; cx <= 0.16; cx += 0.16) {
        for (let cz = -0.07; cz <= 0.07; cz += 0.14) {
          const cashBundle = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.04, 0.10), cashMat);
          cashBundle.position.set(cx, 0.04, cz);
          briefcaseGroup.add(cashBundle);
        }
      }
      scene.add(briefcaseGroup);

      // Don Gino: Shady operator in dark suit with dark sunglasses
      const donGino = createPerson(0x18181b, -0.85, 0.1);
      donGino.group.rotation.y = 0.55;
      // Dark sunglasses
      const shades = new THREE.Mesh(
        new THREE.BoxGeometry(0.24, 0.05, 0.06),
        new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.1 })
      );
      shades.position.set(-0.85, 1.5, 0.24);
      scene.add(shades);

      // Candidate opposite at table
      const candGino = createPerson(0x2563eb, 0.85, 0.1);
      candGino.group.rotation.y = -0.55;

      animatedObjects.push({
        update: (time) => {
          // Lanterns sway subtly
          lanternL.rotation.z = Math.sin(time * 2) * 0.06;
          lanternR.rotation.z = Math.cos(time * 2) * 0.06;

          // Don Gino slides hand towards the briefcase and whispers secretively
          donGino.rightArm.rotation.x = -0.9 + Math.sin(time * 2.5) * 0.25;
          donGino.head.rotation.y = 0.55 + Math.sin(time * 1.8) * 0.15;
          shades.position.y = 1.5 + Math.sin(time * 2) * 0.01;

          // Candidate leans back cautiously, observing the cash
          candGino.leftArm.rotation.x = -0.6 + Math.cos(time * 2) * 0.15;
          candGino.rightArm.rotation.x = -0.6 + Math.sin(time * 2) * 0.15;
          candGino.head.rotation.y = -0.55 + Math.sin(time * 1.5) * 0.12;

          // Lazy susan slowly rotates
          lazySusan.rotation.y = time * 0.2;
        }
      });

    } else if (sceneType === 'flash_electoral') {
      // --- SET TELEVISIÓN // FLASH ELECTORAL A BOCA DE URNA (4:00 PM) ---
      // 1. High-Tech News LED Video Wall Canvas
      const flashCanvas = document.createElement('canvas');
      flashCanvas.width = 1024;
      flashCanvas.height = 512;
      const flCtx = flashCanvas.getContext('2d');
      if (flCtx) {
        // News studio gradient
        const bgGrad = flCtx.createLinearGradient(0, 0, 0, 512);
        bgGrad.addColorStop(0, '#090d16');
        bgGrad.addColorStop(0.5, '#0c1b33');
        bgGrad.addColorStop(1, '#090d16');
        flCtx.fillStyle = bgGrad;
        flCtx.fillRect(0, 0, 1024, 512);

        // Header Top Bar
        flCtx.fillStyle = '#dc2626';
        flCtx.fillRect(0, 0, 1024, 70);
        flCtx.fillStyle = '#ffffff';
        flCtx.font = '900 36px Arial, sans-serif';
        flCtx.textAlign = 'center';
        flCtx.fillText('★ AMÉRICA NOTICIAS • FLASH ELECTORAL 4:00 PM ★', 512, 48);

        // Subheader
        flCtx.fillStyle = '#38bdf8';
        flCtx.font = 'bold 22px Arial, sans-serif';
        flCtx.fillText('ELECCIONES MUNICIPALES LIMA 2026 // RESULTADOS A BOCA DE URNA', 512, 115);

        // Giant "EMPATE TÉCNICO" Badge
        flCtx.fillStyle = '#ef4444';
        flCtx.fillRect(260, 140, 504, 55);
        flCtx.fillStyle = '#ffffff';
        flCtx.font = '900 32px Arial, sans-serif';
        flCtx.fillText('¡EMPATE TÉCNICO AL MILÍMETRO!', 512, 180);

        // Poll Bars Comparison Graphic
        // Candidate 1 Bar (Blue)
        flCtx.fillStyle = '#2563eb';
        flCtx.fillRect(150, 230, 320, 75);
        flCtx.fillStyle = '#ffffff';
        flCtx.font = '900 34px Arial, sans-serif';
        flCtx.textAlign = 'left';
        flCtx.fillText('CANDIDATO A: 26.4%', 170, 280);

        // Candidate 2 Bar (Red)
        flCtx.fillStyle = '#dc2626';
        flCtx.fillRect(554, 230, 320, 75);
        flCtx.fillStyle = '#ffffff';
        flCtx.fillText('CANDIDATO B: 25.8%', 574, 280);

        // Margin of error notice
        flCtx.fillStyle = '#94a3b8';
        flCtx.font = 'bold 18px monospace';
        flCtx.textAlign = 'center';
        flCtx.fillText('MARGEN DE ERROR: ±1.5% • CONTEO RÁPIDO DE ACTAS EN PROCESO', 512, 350);

        // Live News ticker on backdrop
        flCtx.fillStyle = '#1e293b';
        flCtx.fillRect(80, 420, 864, 45);
        flCtx.fillStyle = '#facc15';
        flCtx.font = 'bold 18px Arial, sans-serif';
        flCtx.fillText('🔴 TRANSMISIÓN EN DIRECTO • CIERRE DEFINITIVO DE MESAS EN TODO EL PAÍS', 512, 450);
      }
      const flashTex = new THREE.CanvasTexture(flashCanvas);
      const flashBackdrop = new THREE.Mesh(
        new THREE.PlaneGeometry(7.2, 3.1),
        new THREE.MeshStandardMaterial({ map: flashTex, roughness: 0.3 })
      );
      flashBackdrop.position.set(0, 1.62, -1.8);
      scene.add(flashBackdrop);

      // Curved Modern News Anchor Desk
      const anchorDesk = new THREE.Mesh(
        new THREE.CylinderGeometry(2.4, 2.4, 0.8, 32, 1, false, Math.PI * 0.75, Math.PI * 0.5),
        new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.2, metalness: 0.6 })
      );
      anchorDesk.position.set(0, 0.4, 0.8);
      scene.add(anchorDesk);

      // Glowing Cyan LED strip on desk front
      const ledStrip = new THREE.Mesh(
        new THREE.CylinderGeometry(2.42, 2.42, 0.05, 32, 1, false, Math.PI * 0.75, Math.PI * 0.5),
        new THREE.MeshBasicMaterial({ color: 0x06b6d4 })
      );
      ledStrip.position.set(0, 0.72, 0.8);
      scene.add(ledStrip);

      // Desktop table surface behind the curve
      const deskTop = new THREE.Mesh(
        new THREE.BoxGeometry(2.2, 0.05, 0.9),
        new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3 })
      );
      deskTop.position.set(0, 0.78, 0);
      scene.add(deskTop);

      // Anchor Microphones
      for (let mx = -0.3; mx <= 0.3; mx += 0.6) {
        const aMic = new THREE.Mesh(
          new THREE.CylinderGeometry(0.015, 0.015, 0.2, 6),
          new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.8 })
        );
        aMic.position.set(mx, 0.9, -0.1);
        aMic.rotation.x = 0.25;
        scene.add(aMic);
      }

      // Tablet / news papers on desk
      const newsTablet = new THREE.Mesh(
        new THREE.BoxGeometry(0.32, 0.02, 0.24),
        new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.2 })
      );
      newsTablet.position.set(-0.25, 0.81, 0.1);
      newsTablet.rotation.y = 0.15;
      scene.add(newsTablet);

      // ========================================================
      // FEDERICO SALAZAR:
      // - Tall, distinguished proportions
      // - Cabeza de triángulo invertido (wide forehead, narrow pointed chin)
      // - Characteristic black spectacles / glasses
      // - Formal dark suit and tie
      // ========================================================
      const fedGroup = new THREE.Group();
      fedGroup.position.set(0, 0, -0.25);

      // 1. Tall Torso & Body
      const fedBody = new THREE.Mesh(
        new THREE.CylinderGeometry(0.22, 0.26, 1.05, 8),
        new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4 }) // Dark navy suit
      );
      fedBody.position.y = 0.95;
      fedGroup.add(fedBody);

      // Formal White Shirt Collar & Yellow/Red Tie
      const fedTie = new THREE.Mesh(
        new THREE.BoxGeometry(0.06, 0.45, 0.04),
        new THREE.MeshStandardMaterial({ color: 0xdc2626 }) // Red tie
      );
      fedTie.position.set(0, 1.05, 0.23);
      fedGroup.add(fedTie);

      // 2. INVERTED TRIANGLE HEAD (Cabeza de triángulo invertido)
      // Top radius 0.24, bottom radius 0.10 (tapered down to a sharp chin)
      const triangleHeadGeo = new THREE.CylinderGeometry(0.24, 0.11, 0.42, 6);
      const skinMat = new THREE.MeshStandardMaterial({ color: 0xfbd38d, roughness: 0.6 });
      const fedHead = new THREE.Mesh(triangleHeadGeo, skinMat);
      fedHead.position.y = 1.65;
      fedGroup.add(fedHead);

      // Rounded scalp top
      const scalpGeo = new THREE.SphereGeometry(0.23, 12, 10, 0, Math.PI * 2, 0, Math.PI / 2);
      const fedScalp = new THREE.Mesh(scalpGeo, skinMat);
      fedScalp.position.y = 1.85;
      fedGroup.add(fedScalp);

      // Hair (signature neat parted dark hair)
      const hairMat = new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.8 });
      const fedHair = new THREE.Mesh(
        new THREE.BoxGeometry(0.42, 0.12, 0.32),
        hairMat
      );
      fedHair.position.set(0, 1.88, -0.04);
      fedGroup.add(fedHair);

      // 3. ICONIC GLASSES (Lentes negros de Federico)
      const glassesGroup = new THREE.Group();
      glassesGroup.position.set(0, 1.68, 0.22);

      const frameMat = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.2 });
      // Left rim
      const rimL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.07, 0.02), frameMat);
      rimL.position.set(-0.08, 0, 0);
      glassesGroup.add(rimL);
      // Right rim
      const rimR = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.07, 0.02), frameMat);
      rimR.position.set(0.08, 0, 0);
      glassesGroup.add(rimR);
      // Bridge
      const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.02, 0.02), frameMat);
      glassesGroup.add(bridge);
      // Lenses (slightly reflective glass)
      const lensMat = new THREE.MeshStandardMaterial({ color: 0x93c5fd, transparent: true, opacity: 0.6 });
      const lensL = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.05, 0.01), lensMat);
      lensL.position.set(-0.08, 0, 0.005);
      glassesGroup.add(lensL);
      const lensR = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.05, 0.01), lensMat);
      lensR.position.set(0.08, 0, 0.005);
      glassesGroup.add(lensR);

      fedGroup.add(glassesGroup);

      // 4. Arms
      const armLength = 0.58;
      const armGeo = new THREE.CylinderGeometry(0.06, 0.05, armLength, 8);
      armGeo.translate(0, -armLength / 2, 0);
      const armSuitMat = new THREE.MeshStandardMaterial({ color: 0x0f172a });

      const fedLeftArm = new THREE.Mesh(armGeo, armSuitMat);
      fedLeftArm.position.set(-0.35, 1.38, 0);
      fedGroup.add(fedLeftArm);

      const fedRightArm = new THREE.Mesh(armGeo, armSuitMat);
      fedRightArm.position.set(0.35, 1.38, 0);
      fedGroup.add(fedRightArm);

      scene.add(fedGroup);

      animatedObjects.push({
        update: (time) => {
          // Federico Salazar gestures emphatically to report the flash
          // Right arm gestures towards camera or raises to adjust glasses
          const gestureCycle = Math.sin(time * 3);
          if (gestureCycle > 0.6) {
            // Adjusts glasses gesture!
            fedRightArm.rotation.x = -1.5;
            fedRightArm.rotation.z = -0.3;
          } else {
            fedRightArm.rotation.x = -0.9 + Math.sin(time * 5) * 0.35;
            fedRightArm.rotation.z = 0.1;
          }

          // Left arm holds tablet / desk
          fedLeftArm.rotation.x = -0.7 + Math.cos(time * 4) * 0.2;

          // Head looks between camera and notes
          fedHead.rotation.x = 0.05 + Math.sin(time * 2.5) * 0.1;
          fedHead.rotation.y = Math.sin(time * 2) * 0.2;
          fedScalp.rotation.y = fedHead.rotation.y;
          fedHair.rotation.y = fedHead.rotation.y;
          glassesGroup.rotation.y = fedHead.rotation.y;
          glassesGroup.position.x = Math.sin(fedHead.rotation.y) * 0.04;
        }
      });

    } else {
      // --- MITIN CALLEJERO / CIERRE DE CAMPAÑA ---
      const stage = new THREE.Mesh(
        new THREE.BoxGeometry(4.4, 0.4, 2.5),
        new THREE.MeshStandardMaterial({ color: 0x334155 })
      );
      stage.position.set(0, 0.2, 0);
      scene.add(stage);

      // Pancarta gigante detrás de los candidatos (1.5x la altura del candidato: 1.7 * 1.5 = 2.55)
      const candidateHeight = 1.7;
      const bannerHeight = candidateHeight * 1.5; // 2.55 unidades
      const bannerWidth = 4.2;

      // Canvas Texture para la pancarta electoral
      const bannerCanvas = document.createElement('canvas');
      bannerCanvas.width = 512;
      bannerCanvas.height = 320;
      const bCtx = bannerCanvas.getContext('2d');
      if (bCtx) {
        // Franja electoral rojiblanca / mitin
        bCtx.fillStyle = '#b91c1c';
        bCtx.fillRect(0, 0, 512, 320);
        bCtx.fillStyle = '#ffffff';
        bCtx.fillRect(130, 0, 252, 320);

        // Marco
        bCtx.strokeStyle = '#7f1d1d';
        bCtx.lineWidth = 10;
        bCtx.strokeRect(0, 0, 512, 320);

        // Textos del mitin
        bCtx.fillStyle = '#ffffff';
        bCtx.font = 'bold 22px Arial, sans-serif';
        bCtx.textAlign = 'center';
        bCtx.fillText('★ GRAN MITIN DE CIERRE ★', 256, 44);

        bCtx.fillStyle = '#0f172a';
        bCtx.font = '900 38px Arial, sans-serif';
        bCtx.fillText('LIMA 2026', 256, 145);

        bCtx.fillStyle = '#dc2626';
        bCtx.font = 'bold 20px Arial, sans-serif';
        bCtx.fillText('¡VOTA CON EL CORAZÓN!', 256, 185);

        bCtx.fillStyle = '#ffffff';
        bCtx.font = 'bold 18px Arial, sans-serif';
        bCtx.fillText('★ PLAZA CENTRAL METROPOLITANA ★', 256, 285);
      }
      const bannerTex = new THREE.CanvasTexture(bannerCanvas);
      const bannerMat = new THREE.MeshStandardMaterial({
        map: bannerTex,
        roughness: 0.5,
        side: THREE.DoubleSide
      });
      const bannerGeo = new THREE.PlaneGeometry(bannerWidth, bannerHeight);
      const banner = new THREE.Mesh(bannerGeo, bannerMat);
      banner.position.set(0, 0.4 + bannerHeight / 2, -1.15);
      scene.add(banner);

      // Postes y estructura de soporte metálico de la pancarta
      const poleGeo = new THREE.CylinderGeometry(0.04, 0.04, bannerHeight + 0.5, 8);
      const poleMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.8, roughness: 0.3 });
      
      const leftPole = new THREE.Mesh(poleGeo, poleMat);
      leftPole.position.set(-bannerWidth / 2 - 0.05, 0.4 + (bannerHeight + 0.5) / 2, -1.16);
      scene.add(leftPole);

      const rightPole = new THREE.Mesh(poleGeo, poleMat);
      rightPole.position.set(bannerWidth / 2 + 0.05, 0.4 + (bannerHeight + 0.5) / 2, -1.16);
      scene.add(rightPole);

      const topBar = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, bannerWidth + 0.3, 8), poleMat);
      topBar.rotation.z = Math.PI / 2;
      topBar.position.set(0, 0.4 + bannerHeight, -1.16);
      scene.add(topBar);

      const candidateFig = createPerson(0x2563eb, 0, 0);
      const supporterFig = createPerson(0x059669, 1.2, 0.8);

      animatedObjects.push({
        update: (time) => {
          // Arms perpendicular to the ground (pointing straight up in rally triumph), waving energetically side to side
          candidateFig.leftArm.rotation.x = 0;
          candidateFig.leftArm.rotation.y = 0;
          candidateFig.leftArm.rotation.z = Math.PI + 0.15 + Math.sin(time * 6.5) * 0.35;

          candidateFig.rightArm.rotation.x = 0;
          candidateFig.rightArm.rotation.y = 0;
          candidateFig.rightArm.rotation.z = Math.PI - 0.15 + Math.sin(time * 6.5) * 0.35;

          candidateFig.head.rotation.y = Math.sin(time * 3.5) * 0.2;

          supporterFig.leftArm.rotation.x = 0;
          supporterFig.leftArm.rotation.y = 0;
          supporterFig.leftArm.rotation.z = Math.PI + 0.2 + Math.sin(time * 7.5) * 0.38;

          supporterFig.rightArm.rotation.x = 0;
          supporterFig.rightArm.rotation.y = 0;
          supporterFig.rightArm.rotation.z = Math.PI - 0.2 + Math.sin(time * 7.5) * 0.38;

          supporterFig.head.rotation.y = Math.sin(time * 4) * 0.25;
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
    <div className="w-full bg-white dark:bg-[#0c0c0e] rounded-xl border border-slate-200 dark:border-neutral-800 overflow-hidden relative shadow-sm">
      
      {/* Title Overlay */}
      <div className="absolute top-2 left-2 z-10 flex items-center justify-between right-2 pointer-events-none">
        <div className="bg-white/90 dark:bg-[#121214]/90 backdrop-blur-md px-2 py-0.5 rounded border border-slate-200 dark:border-neutral-700 text-[9px] font-sans font-semibold text-slate-800 dark:text-neutral-200 flex items-center gap-1.5 shadow-sm">
          <Video className="w-3 h-3 text-slate-500 dark:text-neutral-400" />
          <span>SIMULADOR 3D // ESCENA ELECTORAL</span>
        </div>

        <div className="bg-red-50 dark:bg-red-950/90 border border-red-300 dark:border-red-700/60 px-2 py-0.5 rounded text-[9px] font-sans font-bold text-red-700 dark:text-red-200 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
          EN VIVO
        </div>
      </div>

      {/* WebGL Canvas Container */}
      <div ref={mountRef} className="w-full h-36 sm:h-40 md:h-44 bg-slate-100 dark:bg-[#050505]" />

      {/* Bottom Subtitle / Info */}
      <div className="bg-slate-50 dark:bg-[#121214]/95 px-3 py-1.5 border-t border-slate-200 dark:border-neutral-800 flex items-center justify-between text-[10px] font-sans text-slate-600 dark:text-neutral-400">
        <span className="truncate text-slate-900 dark:text-neutral-200 font-bold">{title}</span>
        <span className="shrink-0 text-slate-400 dark:text-neutral-500 flex items-center gap-1">
          <Eye className="w-3 h-3" /> THREE.JS 3D
        </span>
      </div>

    </div>
  );
};
