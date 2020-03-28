import React, { useMemo } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLoader, Dom } from 'react-three-fiber'
import { useConvexPolyhedron } from 'use-cannon'

import { getGeometry, mergeCoplanarFaces } from './util/util'

export default function Model(props) {
	const { nodes } = useLoader(GLTFLoader, props.url)
	const geo = useMemo(() => getGeometry(nodes.Collider || nodes.Object), [nodes])
	const geo2 = useMemo(() => mergeCoplanarFaces(geo), [geo])

	const [ref] = useConvexPolyhedron(() => ({
		...props,
		mass: props.mass || 1,
		args: geo2
	}))

	return (
		<group ref={ref}>
			<Dom className="model-info"><span>{props.info}</span></Dom>
			<mesh receiveShadow castShadow ref={ref}>
				<primitive object={props.debug ? geo : nodes.Object} attach="geometry" />
				<meshStandardMaterial attach="material" wireframe />
			</mesh>
		</group>
	)
}
