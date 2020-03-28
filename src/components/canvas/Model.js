import React, { useMemo } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLoader, Dom } from 'react-three-fiber'
import { useConvexPolyhedron } from 'use-cannon'

import { getGeometry, mergeCoplanarFaces } from './util/util'

export default function Model(props) {
	const { nodes } = useLoader(GLTFLoader, props.url)
	const geo = useMemo(() => getGeometry(nodes.Collider || nodes.Object), [nodes])
	// const geo2 = useMemo(() => mergeCoplanarFaces(geo), [geo])

	const [ref] = useConvexPolyhedron(() => ({
		...props,
		mass: props.mass || 1,
		args: geo
	}))

	return (
		<group ref={ref}>
			<Dom className="model-info"><span>{props.info}{props.debug ? <p>DEBUG</p> : null}</span></Dom>
			<mesh receiveShadow castShadow>
				<primitive object={nodes.Object} attach="geometry" />
			</mesh>
			{props.debug ?
				<mesh geometry={geo}>
					<meshBasicMaterial attach="material" wireframe />
				</mesh>
			: null}
		</group>
	)
}
