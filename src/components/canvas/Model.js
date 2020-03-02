import React, { useMemo } from 'react'
import * as CANNON from 'cannon'
import { Geometry } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLoader, Dom } from 'react-three-fiber'

import { useCannon } from './useCannon'

/**
 *
 * @param {string} url The path to a .glb, .gltf file to load
 * @param {Vector3} position where to initially place the model
 */
export default function Model({ url, position, mass = 1000, info = 'Doot' }) {
	const gltf = useLoader(GLTFLoader, url)
	const shape = Shape(gltf.scene.children[0])
	const ref = useCannon({ mass }, body => {
		body.addShape(shape)
		body.position.set(...position)
	})

	return (
		<group ref={ref}>
			<Dom className="model-info"><span>{info}</span></Dom>
			<mesh castShadow receiveShadow>
				<primitive attach="geometry" object={gltf.scene.children[0].geometry} />
				<meshNormalMaterial attach="material" />
			</mesh>
		</group>
	)
}

/**
 * Translates Three object data into a Cannon-compatible mesh
 * @param  {THREE.Object3D} mesh
 * @return {CANNON.Shape}
 */
function Shape (mesh) {
	const shape = useMemo(() => {
		const geo = new Geometry()
		geo.fromBufferGeometry(mesh.geometry)

		// Convert from THREE.Vector3 to CANNON.Vec3.
		const vertices = new Array(geo.vertices.length)

		for (let i = 0; i < vertices.length; i++) {
			vertices[i] = new CANNON.Vec3(
				geo.vertices[i].x,
				geo.vertices[i].y,
				geo.vertices[i].z
			)
		}

		// Convert from THREE.Face to Array<number>
		const faces = new Array(geo.faces.length)
		for (let i = 0; i < geo.faces.length; i++) {
			faces[i] = [geo.faces[i].a, geo.faces[i].b, geo.faces[i].c]
		}

		// NOTE: non-convex shapes will produce errors in inopportune collisions
		return new CANNON.ConvexPolyhedron(vertices, faces)
	}, [mesh])

	return shape
}
