import React, { useMemo } from 'react'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLoader, Dom } from 'react-three-fiber'
import { useConvexPolyhedron } from 'use-cannon'

import { getGeometry, mergeCoplanarFaces } from './util/util'

export default function Model(props) {
	const { nodes } = useLoader(GLTFLoader, props.url)
	const geo = useMemo(() =>
		mergeCoplanarFaces(getGeometry(nodes.Collider || nodes.Object)), [nodes])

	const [ref, api] = useConvexPolyhedron(() => ({
		...props,
		mass: props.mass || 1,
		args: geo
	}))

	api.rotation.set(props.rotation || [0,0,0])

	const cloned = useMemo(() => {
		const d = nodes.Object.clone()
		d.castShadow = true
		d.receiveShadow = true
		return d
	}, [nodes])

	return (
		<group ref={ref}>
			{props.show ? <Dom className="model-info"><span>{props.overlay}</span></Dom> : null }
			<primitive object={cloned} />
			{props.debug ?
				<mesh geometry={geo}>
					<meshBasicMaterial attach="material" wireframe />
				</mesh>
			: null}
		</group>
	)
}
