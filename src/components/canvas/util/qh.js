import {
	Vector3,
	Face3
} from 'three'

/**

	QuickHull
	---------

	The MIT License

	Copyright &copy 2010-2014 three.js authors

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN

	THE SOFTWARE.

	---

	@author mark lundin / https://mark-lundin.com

	This is a 3D implementation of the Quick Hull algorithm.
	It is a fast way of computing a convex hull with average complexity
	of O(n log(n)).
	It uses depends on three.js and is supposed to create THREE.Geometry.

	It's also very messy

*/

/**
 *
 */
export default class QuickHull {
	/**
	* @param {THREE.Geometry} geometry
	*/
	constructor (geometry) {
		this._geometry = geometry
		this.faces = []
		this.faceStack = []
		this.perimiter = []
		this.dcur = 0
	}

	reset () {
		this.ab = new Vector3()
		this.ac = new Vector3()
		this.ax = new Vector3()
		this.suba = new Vector3()
		this.subb = new Vector3()
		this.normal = new Vector3()
		this.diff = new Vector3()
		this.subaA = new Vector3()
		this.subaB = new Vector3()
		this.subC = new Vector3()
	}

	process ( points ) {
		// Iterate through all the faces and remove
		while (this.faceStack.length > 0) {
			this.cull(this.faceStack.shift(), points)
		}
	}

	norm (a, b, c) {
		const ca = new Vector3()
		const ba = new Vector3()
		const N = new Vector3()

		const fn = (a, b, c) => {
			ca.subVectors(c, a)
			ba.subVectors(b, a)
			N.crossVectors(ca, ba)
			return N.normalize()
		}

		return fn(a, b, c)
	}

	getNormal (face, points) {
		if (face.normal !== undefined) return face.normal

		const p0 = points[face[0]]
		const p1 = points[face[1]]
		const p2 = points[face[2]]

		this.ab.subVectors(p1, p0)
		this.ac.subVectors(p2, p0)
		this.normal.crossVectors(this.ac, this.ab)
		this.normal.normalize()

		return face.normal = this.normal.clone()
	}

	assignPoints (face, pointset, points) {
		// ASSIGNING POINTS TO FACE
		const p0 = points[face[0]]
		const norm = this.getNormal(face, points)

		let dots = []

		// Sort all the points by their distance from the plane
		pointset.sort((aItem, bItem) => {
			dots[aItem.x / 3] = dots[aItem.x / 3] !== undefined ? dots[aItem.x / 3] : norm.dot(this.suba.subVectors(aItem, p0))
			dots[bItem.x / 3] = dots[bItem.x / 3] !== undefined ? dots[bItem.x / 3] : norm.dot(this.subb.subVectors(bItem, p0))
			return dots[aItem.x / 3] - dots[bItem.x / 3]
		})

		// TODO :: Must be a faster way of finding an index in this array
		let index = pointset.length

		if (index === 1) dots[pointset[0].x / 3] = norm.dot(this.suba.subVectors(pointset[0], p0))
		while (index-- > 0 && dots[pointset[index].x / 3] > 0) // mutates 'index' - Mike

		if (index + 1 < pointset.length && dots[pointset[index + 1].x / 3] > 0) {
			face.visiblePoints = pointset.splice(index + 1)
		}
	}

	cull (face, points) {

		let visibleFaces = [face]
		const apex = points.indexOf(face.visiblePoints.pop())

		const checkFaceDirection = () => {
			let i = this.faces.length
			// Iterate through all other faces...
			while (i-- > 0) {
				let currentFace = this.faces[i]
				if (currentFace !== face) {
					// ...and check if they're pointing in the same direction
					let d = this.getNormal(currentFace, points).dot(this.diff.subVectors(points[apex], points[currentFace[0]]))
					if (d > 0) {
						visibleFaces.push(currentFace)
					}
				}
			}
		}

		// Determine Perimeter - Creates a bounded horizon

		// 1. Pick an edge A out of all possible edges
		// 2. Check if A is shared by any other face. a->b === b->a
		// 2.1 for each edge in each triangle, isShared = ( f1.a == f2.a && f1.b == f2.b ) || ( f1.a == f2.b && f1.b == f2.a )
		// 3. If not shared, then add to convex horizon set,
		//pick an end point (N) of the current edge A and choose a new edge NA connected to A.
		//Restart from 1.
		// 4. If A is shared, it is not an horizon edge, therefore flag both faces that share this edge as candidates for culling
		// 5. If candidate geometry is a degenrate triangle (ie. the tangent space normal cannot be computed) then remove that triangle from all further processing
		const determinePerimiter = () => {
			const hasOneVisibleFace = visibleFaces.length === 1

			let edgeIndex = []
			let allPoints = []

			if (visibleFaces.length === 1) {
				let currentFace = visibleFaces[0]

				this.perimeter = [
					currentFace[0],
					currentFace[1],
					currentFace[1],
					currentFace[2],
					currentFace[2],
					currentFace[0]
				]

				// remove visible face from list of faces
				if (this.faceStack.indexOf(currentFace) > -1) {
					this.faceStack.splice(this.faceStack.indexOf(currentFace), 1)
				}

				if (currentFace.visiblePoints) allPoints = allPoints.concat(currentFace.visiblePoints)
				this.faces.splice(this.faces.indexOf(currentFace), 1)

			} else {
				let i = visibleFaces.length

				while (i-- > 0) {  // for each visible face

					let currentFace = visibleFaces[i]
					let isSharedEdge
					let cEdgeIndex = 0

					// remove visible face from list of faces
					if (this.faceStack.indexOf(currentFace) > -1)
						this.faceStack.splice(this.faceStack.indexOf(currentFace), 1)

					if (currentFace.visiblePoints)
						allPoints = allPoints.concat(currentFace.visiblePoints)

					this.faces.splice(this.faces.indexOf(currentFace), 1)

					while (cEdgeIndex < 3) { // Iterate through it's edges
						isSharedEdge = false
						let j = visibleFaces.length
						let a = currentFace[cEdgeIndex]
						let b = currentFace[(cEdgeIndex + 1) % 3]


						while (j-- > 0 && !isSharedEdge) { // find another visible faces

							let compareFace = visibleFaces[j]
							edgeIndex = 0

							// isSharedEdge = compareFace == currentFace
							if (compareFace !== currentFace) {

								while (edgeIndex < 3 && !isSharedEdge) { // Check all it's indices
									let nextIndex = (edgeIndex + 1)
									isSharedEdge = (compareFace[edgeIndex] === a && compareFace[nextIndex % 3] === b) ||
										(compareFace[edgeIndex] === b && compareFace[nextIndex % 3] === a)

									edgeIndex++
								}
							}
						}

						if (!isSharedEdge || hasOneVisibleFace) {
							this.perimeter.push(a)
							this.perimeter.push(b)
						}

						cEdgeIndex++
					}
				}
			}

			// create new face for all pairs around edge
			let i = 0
			let l = this.perimeter.length / 2

			while (i < l) {
				let f = [this.perimeter[i * 2 + 1], apex, this.perimeter[i * 2]]
				this.assignPoints(f, allPoints, points)
				this.faces.push(f)
				if (f.visiblePoints !== undefined) this.faceStack.push(f)
				i++
			}

		}

		checkFaceDirection()
		determinePerimiter()
	}

	distSqPointSegment (a, b, c) {
		const ab = new Vector3()
		const ac = new Vector3()
		const bc = new Vector3()

		const fn = (a, b, c) => {

			ab.subVectors(b, a)
			ac.subVectors(c, a)
			bc.subVectors(c, b)

			let e = ac.dot(ab)
			if (e < 0.0) return ac.dot(ac)

			let f = ab.dot(ab)
			if (e >= f) return bc.dot(bc)
			return ac.dot(ac) - e * e / f
		}
		return fn(a, b, c)
	}

	// main method
	generate () {
		this.reset()

		const points = this._geometry.vertices
		const extremes = points.slice(0, 6)

		let max = 0
		let v0, v1, v2, v3, N, D;

    /*
     *  FIND EXTREMETIES
     */
		for (let i = points.length - 1; i >= 0; i--) {
			if (points[i].x < extremes[0].x) extremes[0] = points[i]
			if (points[i].x > extremes[1].x) extremes[1] = points[i]

			if (points[i].y < extremes[2].y) extremes[2] = points[i]
			if (points[i].y < extremes[3].y) extremes[3] = points[i]

			if (points[i].z < extremes[4].z) extremes[4] = points[i]
			if (points[i].z < extremes[5].z) extremes[5] = points[i]

		}

    // Find the longest line between the extremeties
		for (let i = 5; i >= 0; i--) {
			let j = i-1

			while (j-- > 0) {
				if (max < (this.dcur = extremes[i].distanceToSquared(extremes[j]))) {
					max = this.dcur
					v0 = extremes[i]
					v1 = extremes[j]
				}
			}
		}

		// 3. Find the most distant point to the line segment, this creates a plane
		max = 0
		for (let i = 5; i >= 0; i--) {
			this.dcur = this.distSqPointSegment(v0, v1, extremes[i])
			if (max < this.dcur) {
				max = this.dcur;
				v2 = extremes[i]
			}
		}

		// 4. Find the most distant point to the plane.
		N = this.norm(v0, v1, v2)
		D = N.dot(v0)

		max = 0
		for (let i = points.length - 1; i >= 0; i--) {
			this.dcur = Math.abs(points[i].dot(N) - D)
			if (max < this.dcur) {
				max = this.dcur
				v3 = points[i]
			}
		}

		const v0Index = points.indexOf(v0)
		const v1Index = points.indexOf(v1)
		const v2Index = points.indexOf(v2)
		const v3Index = points.indexOf(v3)

		//  We now have a tetrahedron as the base geometry.
		//  Now we must subdivide the
		const tetrahedron = [
			[v2Index, v1Index, v0Index],
			[v1Index, v3Index, v0Index],
			[v2Index, v3Index, v1Index],
			[v0Index, v3Index, v2Index],
		]

		this.subaA.subVectors(v1, v0).normalize()
		this.subaB.subVectors(v2, v0).normalize()
		this.subC.subVectors(v3, v0).normalize()
		let sign = this.subC.dot(new Vector3().crossVectors(this.subaB, this.subaA))

		// Reverse the winding if negative sign
		if (sign < 0) {
			tetrahedron[0].reverse()
			tetrahedron[1].reverse()
			tetrahedron[2].reverse()
			tetrahedron[3].reverse()
		}

		// One for each face of the pyramid
		const pointsCloned = points.slice()
		pointsCloned.splice(pointsCloned.indexOf(v0), 1)
		pointsCloned.splice(pointsCloned.indexOf(v1), 1)
		pointsCloned.splice(pointsCloned.indexOf(v2), 1)
		pointsCloned.splice(pointsCloned.indexOf(v3), 1)

		for (let i = 0; i < tetrahedron.length; i++) {
			this.assignPoints(tetrahedron[i], pointsCloned, points)
			if (tetrahedron[i].visiblePoints !== undefined) {
				this.faceStack.push(tetrahedron[i])
			}
			this.faces.push(tetrahedron[i])
		}

		this.process(points)

		//  Assign to our geometry object
		for (let i = 0; i < this.faces.length; i++) {
			this._geometry.faces[i] = new Face3(
				this.faces[i][2],
				this.faces[i][1],
				this.faces[i][0],
				this.faces[i].normal
			)
		}
		this._geometry.normalsNeedUpdate = true

		return this._geometry
	}
}
