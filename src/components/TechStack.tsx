import * as THREE from "three";
import { useRef, useMemo, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useTexture, Float } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/TechStack.css";

const imageUrls = [
  "/images/react2.webp",
  "/images/next2.webp",
  "/images/node2.webp",
  "/images/express.webp",
  "/images/mongo.webp",
  "/images/mysql.webp",
  "/images/typescript.webp",
  "/images/javascript.webp",
];

const sphereGeometry = new THREE.SphereGeometry(1, 24, 24);

type SphereProps = {
  scale: number;
  texture: THREE.Texture;
  isActive: boolean;
};

function SphereGeo({ scale, texture, isActive }: SphereProps) {
  const api = useRef<RapierRigidBody>(null);
  const { viewport } = useThree();
  
  // Create a specialized material for each sphere to ensure textures show up correctly
  const material = useMemo(() => new THREE.MeshPhysicalMaterial({
    map: texture,
    emissive: "#ffffff",
    emissiveMap: texture,
    emissiveIntensity: 0.1, // Reduced for performance
    metalness: 0.3,
    roughness: 0.4,
    clearcoat: 0.3,
  }), [texture]);

  useFrame((_state, delta) => {
    if (!api.current || !isActive) return;
    
    // Constant centering force
    const currentTranslation = api.current.translation();
    const vec = new THREE.Vector3(currentTranslation.x, currentTranslation.y, currentTranslation.z);
    
    // Sub-frame delta can cause jitters, clamping strength
    const strength = 120; 
    const impulse = vec
      .normalize()
      .multiplyScalar(-strength * Math.min(delta, 0.05) * scale);

    api.current.applyImpulse(impulse, true);
    
    // Keep them roughly within the viewport - with a softer boundary
    if (Math.abs(currentTranslation.x) > viewport.width * 0.8) {
        api.current.applyImpulse({ x: -currentTranslation.x * 0.5, y: 0, z: 0 }, true);
    }
    if (Math.abs(currentTranslation.y) > viewport.height * 0.8) {
        api.current.applyImpulse({ x: 0, y: -currentTranslation.y * 0.5, z: 0 }, true);
    }
  });

  return (
    <RigidBody
      linearDamping={1.5}
      angularDamping={1}
      friction={0.2}
      position={[
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 5
      ]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        args={[0.1 * scale, scale]}
      />
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh
          castShadow={false} // Shadows on 25 overlapping spheres is heavy
          receiveShadow={false}
          scale={scale}
          geometry={sphereGeometry}
          material={material}
        />
      </Float>
    </RigidBody>
  );
}

function Pointer() {
  const ref = useRef<RapierRigidBody>(null);
  const { viewport, mouse } = useThree();

  useFrame(() => {
    if (!ref.current) return;
    
    // Map mouse to scene coordinates
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;
    
    ref.current.setNextKinematicTranslation({ x, y, z: 0 });
  });

  return (
    <RigidBody
      position={[0, 0, 0]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStackContent = ({ isActive }: { isActive: boolean }) => {
  const textures = useTexture(imageUrls);
  
  const spheres = useMemo(() => {
    // Reduced count to 18 for better performance
    return [...Array(18)].map((_, i) => ({
      scale: 0.7 + Math.random() * 0.5,
      texture: textures[i % textures.length],
    }));
  }, [textures]);

  return (
    <>
      <ambientLight intensity={0.8} />
      <spotLight
        position={[10, 10, 10]}
        penumbra={1}
        angle={0.25}
        color="#c2a4ff"
        intensity={1.5}
        castShadow={false}
      />
      <directionalLight position={[-5, 5, 5]} intensity={0.5} color="#ffffff" />
      
      <Physics gravity={[0, 0, 0]} colliders={false}>
        <Pointer />
        {spheres.map((props, i) => (
          <SphereGeo
            key={i}
            {...props}
            isActive={isActive}
          />
        ))}
      </Physics>
      
      <Environment
        files="/models/char_enviorment.hdr"
        environmentIntensity={0.3}
      />
      
      <EffectComposer enableNormalPass={false}>
        <Bloom luminanceThreshold={1} intensity={0.3} levels={7} />
      </EffectComposer>
    </>
  );
};

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "+=100%",
      pin: true,
      onToggle: (self) => setIsActive(self.isActive),
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div className="techstack" ref={sectionRef}>
      <div className="section-container">
        <h2>
          My <span>Techstack</span>
        </h2>
      </div>

      <div className="tech-canvas">
        <Canvas
          camera={{ position: [0, 0, 18], fov: 35 }}
          gl={{ 
            antialias: false, // Performance win
            alpha: true,
            powerPreference: "high-performance" 
          }}
          dpr={[1, 1.5]} // Capped at 1.5 for performance
          onCreated={(state) => (state.gl.toneMappingExposure = 1.2)}
        >
          <Suspense fallback={null}>
            <TechStackContent isActive={isActive} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default TechStack;

