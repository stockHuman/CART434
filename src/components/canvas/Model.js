import React, { useMemo } from 'react'
import { Geometry } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLoader, Dom } from 'react-three-fiber'
import { useConvexPolyhedron } from 'use-cannon'

/**
 *
 * @param {string} url The path to a .glb, .gltf file to load
 * @param {Vector3} position where to initially place the model
 */
export default function Model(props) {
	const { scene } = useLoader(GLTFLoader, props.url)
	const args = useMemo(() => {
		const geo = new Geometry().fromBufferGeometry(scene.children[0].geometry)
		return [geo.vertices.map(v => [v.x, v.y, v.z]), geo.faces.map(f => [f.a, f.b, f.c])]
	}, [scene])
	const [ref] = useConvexPolyhedron(() => ({ mass: 100, ...props, args }))

	return (
		<group ref={ref}>
			<Dom className="model-info"><span>{props.info}</span></Dom>
			<mesh castShadow ref={ref} geometry={scene.children[0].geometry} dispose={null}>
				<meshNormalMaterial attach="material" />
			</mesh>
		</group>
	)
}
