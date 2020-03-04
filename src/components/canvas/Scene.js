import React from 'react'

import { useCannon, Physics } from './use-cannon/src/index'
import Model from './Model'

// 3D models
import Obj from '../../assets/meshes/testobject.glb'

// via https://codesandbox.io/s/r3f-cannon-instanced-physics-g1s88
function Floor({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
	// Register plane as a physics body with zero mass
	const [ref] = useCannon({ mass: 0, type: 'Plane', position, rotation })
	return (
		<mesh ref={ref} receiveShadow>
			<planeBufferGeometry attach="geometry" args={[100, 100]} />
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
					position={[Math.random()* 2, Math.random() * 10, Math.random()]}
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
			<Physics>
				<Floor rotation={[-Math.PI / 2, 0, 0]}  />
				{objects}
			</Physics>
		</scene>
	)
}
