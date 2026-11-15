import * as THREE from "three";

const bodyShape = new THREE.Shape();
bodyShape.moveTo(-2.95, 0.56);
bodyShape.lineTo(-3.08, 0.72);
bodyShape.quadraticCurveTo(-3.05, 0.84, -2.62, 0.94);
bodyShape.lineTo(-1.65, 1.1);
bodyShape.lineTo(-1.05, 1.53);
bodyShape.quadraticCurveTo(-0.83, 1.68, -0.47, 1.69);
bodyShape.lineTo(0.87, 1.65);
bodyShape.quadraticCurveTo(1.2, 1.62, 1.49, 1.37);
bodyShape.lineTo(2.05, 1.02);
bodyShape.lineTo(2.72, 0.86);
bodyShape.quadraticCurveTo(2.98, 0.76, 2.98, 0.58);
bodyShape.lineTo(2.82, 0.42);
bodyShape.lineTo(-2.73, 0.42);
bodyShape.closePath();

const cabinShape = new THREE.Shape();
cabinShape.moveTo(-1.55, 1.12);
cabinShape.lineTo(-0.95, 1.53);
cabinShape.quadraticCurveTo(-0.78, 1.63, -0.48, 1.63);
cabinShape.lineTo(0.77, 1.59);
cabinShape.quadraticCurveTo(1.02, 1.57, 1.25, 1.38);
cabinShape.lineTo(1.64, 1.12);
cabinShape.closePath();

const bodyOptions: THREE.ExtrudeGeometryOptions = {
  depth: 1.84,
  bevelEnabled: true,
  bevelSegments: 3,
  steps: 1,
  bevelSize: 0.055,
  bevelThickness: 0.055,
  curveSegments: 8,
};

const cabinOptions: THREE.ExtrudeGeometryOptions = {
  depth: 1.62,
  bevelEnabled: true,
  bevelSegments: 2,
  steps: 1,
  bevelSize: 0.025,
  bevelThickness: 0.035,
  curveSegments: 8,
};

type VehicleModelProps = {
  color?: string;
  lighting?: boolean;
  wheelStyle?: "aero" | "sport";
};

function Wheel({ x, z, style }: { x: number; z: number; style: "aero" | "sport" }) {
  const spokePositions = style === "sport" ? 8 : 5;
  return (
    <group position={[x, 0.54, z]}>
      <mesh castShadow>
        <torusGeometry args={[0.405, 0.12, 12, 48]} />
        <meshStandardMaterial color="#080a0d" roughness={0.76} metalness={0.1} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.275, 0.275, 0.16, 40]} />
        <meshStandardMaterial color="#727b85" roughness={0.32} metalness={0.9} />
      </mesh>
      <mesh>
        <torusGeometry args={[0.255, 0.024, 8, 48]} />
        <meshStandardMaterial color="#d9e0e6" roughness={0.22} metalness={0.88} />
      </mesh>
      {Array.from({ length: spokePositions }, (_, index) => (
        <mesh key={index} position={[0, 0, 0]} rotation={[0, 0, (Math.PI * 2 * index) / spokePositions]}>
          <boxGeometry args={[0.035, 0.245, 0.065]} />
          <meshStandardMaterial color="#c3cbd2" roughness={0.25} metalness={0.86} />
        </mesh>
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.065, 0.065, 0.18, 24]} />
        <meshStandardMaterial color="#171c22" roughness={0.3} metalness={0.8} />
      </mesh>
    </group>
  );
}

export function VehicleModel({ color = "#b8c0c8", lighting = true, wheelStyle = "aero" }: VehicleModelProps) {
  return (
    <group rotation={[0, -0.12, 0]}>
      <mesh castShadow receiveShadow position={[0, 0, -0.92]}>
        <extrudeGeometry args={[bodyShape, bodyOptions]} />
        <meshPhysicalMaterial color={color} metalness={0.78} roughness={0.24} clearcoat={0.9} clearcoatRoughness={0.18} />
      </mesh>
      <mesh castShadow position={[0, 0, -0.81]}>
        <extrudeGeometry args={[cabinShape, cabinOptions]} />
        <meshPhysicalMaterial color="#111820" metalness={0.54} roughness={0.18} clearcoat={1} />
      </mesh>
      <mesh position={[-0.05, 1.57, 0]} scale={[0.67, 0.04, 0.74]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#10151b" metalness={0.5} roughness={0.17} />
      </mesh>
      <mesh position={[-3.025, 0.8, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.98, 0.07, 0.025]} />
        <meshStandardMaterial color={lighting ? "#dcecff" : "#626b75"} emissive={lighting ? "#a9d1ff" : "#000000"} emissiveIntensity={lighting ? 3.2 : 0} toneMapped={false} />
      </mesh>
      <mesh position={[2.91, 0.75, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.86, 0.045, 0.035]} />
        <meshStandardMaterial color="#ff344b" emissive="#8b0717" emissiveIntensity={1.1} toneMapped={false} />
      </mesh>
      <mesh position={[-2.2, 0.68, 0]}>
        <boxGeometry args={[0.3, 0.035, 1.91]} />
        <meshStandardMaterial color="#dce3e9" metalness={0.8} roughness={0.24} />
      </mesh>
      <mesh position={[0.15, 0.48, 0]}>
        <boxGeometry args={[3.85, 0.1, 1.5]} />
        <meshStandardMaterial color="#171b20" metalness={0.6} roughness={0.5} />
      </mesh>
      <Wheel x={-1.93} z={1.03} style={wheelStyle} />
      <Wheel x={1.91} z={1.03} style={wheelStyle} />
      <Wheel x={-1.93} z={-1.03} style={wheelStyle} />
      <Wheel x={1.91} z={-1.03} style={wheelStyle} />
    </group>
  );
}
