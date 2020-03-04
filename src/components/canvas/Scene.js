import React from 'react'
import * as CANNON from 'cannon'

import { useCannon, Provider } from './useCannon'
import Model from './Model'

// 3D models
import Obj from '../../assets/meshes/testobject.glb'

function Floor({ position }) {
	// Register plane as a physics body with zero mass
	const ref = useCannon({ mass: 0 }, body => {
		body.addShape(new CANNON.Plane())
		body.position.set(...position)
	})
	return (
		<mesh ref={ref} receiveShadow>
			<planeBufferGeometry attach="geometry" args={[1000, 1000]} />
			<meshStandardMaterial attach="material" color="#171717" />
		</mesh>
	)
}

export default (props) => {
	let objects = []

	// template, place objects in array here
	for (const property in props) {
		console.log(`${property}: ${props[property]}`)

		// the app has calculated that such an object should exist
		for (let i = 0; i < props[property]; i++) {
			objects.push(
				<Model
					url={Obj}
					position={[Math.random()* 2, Math.random(), Math.random()]}
					key={`${property}-${i}`}
					info={'Test Draidel - 0.45Wh'}
				/>
			)
		}
	}
	return (
		<scene>
			<pointLight position={[-10, -10, 30]} intensity={0.25} />
			<spotLight intensity={0.3} position={[30, 30, 50]} angle={0.2} penumbra={1} castShadow />
			<Provider>
				<Floor position={[0, 0, -10]} />
				{objects}
			</Provider>
		</scene>
	)
}
