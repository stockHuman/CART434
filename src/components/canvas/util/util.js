// via https://github.com/donmccurdy/three-to-cannon/blob/master/index.js

import { Geometry, BufferGeometry, Vector3, Quaternion, Matrix4 } from 'three'

/**
 * Returns a single geometry for the given object. If the object is compound,
 * its geometries are automatically merged.
 * @param {THREE.Object3D} object
 * @return {THREE.Geometry}
 */
export function getGeometry (object) {
	var matrix, mesh
	const meshes = getMeshes(object)
	const combined = new Geometry()

	if (meshes.length === 0) return null

	// Apply scale  – it can't easily be applied to a CANNON.Shape later.
	if (meshes.length === 1) {
		let position = new Vector3()
		let quaternion = new Quaternion()
		let scale = new Vector3()
		let _tempGeo = new Geometry()

		if (meshes[0].geometry.isBufferGeometry) {
			if (meshes[0].geometry.attributes.position
				&& meshes[0].geometry.attributes.position.itemSize > 2) {
				_tempGeo.fromBufferGeometry(meshes[0].geometry)
			}
		} else {
			_tempGeo = meshes[0].geometry.clone()
		}
		_tempGeo.metadata = meshes[0].geometry.metadata
		meshes[0].updateMatrixWorld()
		meshes[0].matrixWorld.decompose(position, quaternion, scale)
		return _tempGeo.scale(scale.x, scale.y, scale.z)
	}

	// Recursively merge geometry, preserving local transforms.
	while ((mesh = meshes.pop())) {
		mesh.updateMatrixWorld()
		if (mesh.geometry.isBufferGeometry) {
			if (mesh.geometry.attributes.position
				&& mesh.geometry.attributes.position.itemSize > 2) {
				let _tempGeo = new Geometry()
				_tempGeo.fromBufferGeometry(mesh.geometry)
				combined.merge(_tempGeo, mesh.matrixWorld)
				_tempGeo.dispose()
			}
		} else {
			combined.merge(mesh.geometry, mesh.matrixWorld)
		}
	}

	matrix = new Matrix4()
	matrix.scale(object.scale)
	combined.applyMatrix(matrix)
	return combined
}

/**
 * @param  {THREE.Geometry} geometry
 * @return {Array<number>}
 */
export function getVertices (geometry) {
	if (!geometry.attributes) {
		geometry = new BufferGeometry().fromGeometry(geometry)
	}
	return (geometry.attributes.position || {}).array || []
}

/**
 * Returns a flat array of THREE.Mesh instances from the given object. If
 * nested transformations are found, they are applied to child meshes
 * as mesh.userData.matrix, so that each mesh has its position/rotation/scale
 * independently of all of its parents except the top-level object.
 * @param  {THREE.Object3D} object
 * @return {Array<THREE.Mesh>}
 */
function getMeshes (object) {
	let meshes = []
	object.traverse(o => {
		if (o.type === 'Mesh') {
			meshes.push(o)
		}
	})
	return meshes
}

/**
 * @param  {THREE.Geometry} object
 * @return {THREE.Geometry}
 */
export function mergeCoplanarFaces(geometry) {
	// buffer
	let vertices = []

	// helper variables
	let thresholdDot = 0.9998476951563913 // thresh @ 1 // Math.cos(MathUtils.DEG2RAD * thresholdAngle)
	let edge = [0, 0]
	let edges = {}
	let edge1
	let edge2
	let key
	let keys = ['a', 'b', 'c']

	// prepare source geometry
	let geometry2 = geometry.clone()


	geometry2.mergeVertices()
	geometry2.computeFaceNormals()

	const sourceVertices = geometry2.vertices
	const faces = geometry2.faces

	// now create a data structure where each entry represents an edge with its adjoining faces

	for (let i = 0, l = faces.length; i < l; i++) {
		const face = faces[i]
		for (let j = 0; j < 3; j++) {
			edge1 = face[keys[j]]
			edge2 = face[keys[(j + 1) % 3]]
			edge[0] = Math.min(edge1, edge2)
			edge[1] = Math.max(edge1, edge2)

			key = `${edge[0]},${edge[1]}`

			if (edges[key] === undefined) {
				edges[key] = { index1: edge[0], index2: edge[1], face1: i, face2: undefined }
			} else {
				edges[key].face2 = i
			}
		}
	}

	// generate vertices
	for (key in edges) {
		const e = edges[key]

		// an edge is only rendered if the angle (in degrees) between the face normals of the adjoining faces exceeds this value. default = 1 degree.
		if (e.face2 === undefined || faces[e.face1].normal.dot(faces[e.face2].normal) <= thresholdDot) {
			let vertex = sourceVertices[e.index1];
			vertices.push(vertex.x, vertex.y, vertex.z);

			vertex = sourceVertices[e.index2];
			vertices.push(vertex.x, vertex.y, vertex.z);
		}
	}
	// build geometry
	return geometry2
}
