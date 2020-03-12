import React, { useMemo } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLoader, Dom } from 'react-three-fiber'
import { useConvexPolyhedron } from 'use-cannon'

import { getGeometry } from './util/util'

/**
 *
 * @param {string} url The path to a .glb, .gltf file to load
 * @param {Vector3} position where to initially place the model
 */
export default function Model(props) {
	const { nodes } = useLoader(GLTFLoader, props.url)
	const geo = useMemo(() => getGeometry(nodes.Collider), [nodes])
	const [ref] = useConvexPolyhedron(() => ({ mass: 100, ...props, args: geo }))

	return (
		<group ref={ref}>
			<Dom className="model-info"><span>{props.info}</span></Dom>
			<mesh castShadow ref={ref} dispose={null}>
				<primitive object={nodes.Object} attach="geometry" />
				<meshNormalMaterial attach="material" />
			</mesh>
		</group>
	)
}
