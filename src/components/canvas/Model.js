import React from 'react'
import * as CANNON from 'cannon'
import { Geometry } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLoader } from 'react-three-fiber'

import { useCannon } from './useCannon'

/**
 *
 * @param {string} url The path to a .glb, .gltf file to load
 * @param {Vector3} position where to initially place the model
 */
export default function Model({ url, position, mass = 1000 }) {
	const gltf = useLoader(GLTFLoader, url)
	const shape = Shape(gltf.scene.children[0])
	const ref = useCannon({ mass }, body => {
		body.addShape(shape)
		body.position.set(...position)
	})

	return (
		<mesh ref={ref} castShadow receiveShadow>
			<primitive attach="geometry" object={gltf.scene.children[0].geometry} />
			<meshNormalMaterial attach="material" />
		</mesh>
	)
}

/**
 *
 * @param  {THREE.Object3D.geometry} geometry
 * @return {CANNON.Shape}
 */
function Shape (mesh) {
	console.log('called')
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

	return new CANNON.ConvexPolyhedron(vertices, faces)
}
