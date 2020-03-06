import React, { useMemo } from 'react'
import { Geometry } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLoader, Dom } from 'react-three-fiber'

import { useCannon } from './use-cannon/src/index'
/**
 *
 * @param {string} url The path to a .glb, .gltf file to load
 * @param {Vector3} position where to initially place the model
 */
export default function Model({ url, position, mass = 6000, info = 'Doot' }) {
	const gltf = useLoader(GLTFLoader, url)
	const mesh = Shape(gltf.scene.children[0])
	const [ref] = useCannon({ mass, position, type: 'ConvexPolyhedron', mesh })

	return (
		<group ref={ref}>
			<Dom className="model-info"><span>{info}</span></Dom>
			<mesh castShadow receiveShadow>
				<primitive attach="geometry" object={gltf.scene.children[0].geometry} />
				<meshStandardMaterial attach="material" />
			</mesh>
		</group>
	)
}

/**
 * Extracts Three geometry from Mesh
 * @param  {THREE.Object3D} mesh
 * @return {THREE.Geometry}
 */
function Shape (mesh) {
	const shape = useMemo(() => {
		const geo = new Geometry()
		return geo.fromBufferGeometry(mesh.geometry)
	}, [mesh])

	return shape
}
