import React from 'react'
import { usePlane, Physics } from 'use-cannon'

import Model from './Model'

// 3D models
import ModelLamp from '../../assets/meshes/MichaelH_Pixies_StreetLamp_MOD.001.glb'
import ModelBattery from '../../assets/meshes/MichaelH_Pixies_Battery_MOD.000.glb'
import ModelContainer from '../../assets/meshes/MichaelH_Pixies_Container_MOD.001.glb'

// via https://codesandbox.io/s/r3f-cannon-instanced-physics-g1s88
function Floor({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
	// Register plane as a physics body with zero mass
	const [ref] = usePlane(() => ({ mass: 0, position, rotation }))
	return (
		<mesh ref={ref} receiveShadow>
			<planeBufferGeometry attach="geometry" args={[100, 100]} />
			<meshStandardMaterial attach="material" color="#BFBFBF" />
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
			objects.push({
				url: ModelBattery,
				info: `12 AA batteries - ${Math.floor(Math.random() * 5)}GWh`,
				position: [2.5 - Math.random() * 5, Math.random() * 30, Math.random()],
				key: Math.random()
			})
		}
	}

	return (
		<scene>
			<Physics iterations={10} size={40}>
				<Floor rotation={[-Math.PI / 2, 0, 0]}  />
				{ objects.map(object => (
					<Model
						url={object.url}
						position={object.position}
						info={object.info}
						key={object.key}
					/>
				)) }
				<Model
					url={ModelLamp}
					position={[3, 5, 0]}
					info={'Light a small town for a week'}
				/>
				<Model
					url={ModelContainer}
					position={[5, 10, 0]}
					rotation={[Math.PI / 4, 0, 2]}
					mass={200}
					info={'Light a small town for a week'}
				/>
			</Physics>
		</scene>
	)
}
