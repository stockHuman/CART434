import React, { useMemo } from 'react'
import * as CANNON from 'cannon'
import {
	Geometry,
	BufferGeometry,
	Vector3
} from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { ConvexHull } from 'three/examples/jsm/math/ConvexHull'
import { useLoader } from 'react-three-fiber'

import { useCannon } from './useCannon'

/**
 *
 * @param {string} url The path to a .glb, .gltf file to load
 * @param {Vector3} position where to initially place the model
 */
export default function Model({ url, position, mass = 1000 }) {
	const gltf = useLoader(GLTFLoader, url)
	const ref = useCannon({ mass }, body => {
		body.addShape(new CANNON.ConvexPolyhedron())
		body.position.set(...position)
	})
	let g = new Shape(gltf.scene.children[0])
	console.log(gltf.scene.children[0])

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
	const geo = new Geometry()
	geo.fromBufferGeometry(mesh.geometry)

	const shape = useMemo(() => {
		let eps = 1e-4

		if (!geo|| !geo.vertices.length) return null;

		// Perturb.
		for (let i = 0; i < geo.vertices.length; i++) {
			geo.vertices[i].x += (Math.random() - 0.5) * eps
			geo.vertices[i].y += (Math.random() - 0.5) * eps
			geo.vertices[i].z += (Math.random() - 0.5) * eps
		}
		mesh.geometry = new BufferGeometry().fromGeometry(geo)

		// Compute the 3D convex hull.
		const hull = new ConvexHull().setFromObject(mesh)

		// Convert from THREE.Vector3 to CANNON.Vec3.
		const vertices = new Array(hull.vertices.length)

		for (let i = 0; i < vertices.length; i++) {
			vertices[i] = new CANNON.Vec3(
				hull.vertices[i].point.x,
				hull.vertices[i].point.y,
				hull.vertices[i].point.z
			)
		}
		let f = hull.faces[0]

		console.log(f.compute())

		// Convert from THREE.Face to Array<number>.
		const faces = new Array(hull.faces.length)
		for (let i = 0; i < hull.faces.length; i++) {
			faces[i] = [hull.faces[i].a, hull.faces[i].b, hull.faces[i].c]
		}

		return new CANNON.ConvexPolyhedron(vertices, faces)
	}, [])
	return shape
}
