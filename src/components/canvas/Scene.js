import React from 'react'
import { usePlane, Physics } from 'use-cannon'

import Model from './Model'
import data from '../../data'

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
				url: data.battery.url,
				info: `12 AA batteries - ${Math.floor(Math.random() * 5)}GWh`,
				position: [2.5 - Math.random() * 5, Math.random() * 30, Math.random()],
				key: Math.random()
			})
		}
	}

	return (
		<Physics iterations={10}>
			<Floor rotation={[-Math.PI / 2, 0, 0]}  />
			{ objects.map(object => (
				<Model
					url={object.url}
					position={object.position}
					overlay={object.info}
					key={object.key}
				/>
			)) }
			<Model
				url={data.lamp.url}
				position={[0, 15, 0]}
				rotation={[0, 0.4, 1]}
				mass={3}
				overlay={'Light a small town for a week'}
			/>
			<Model
				url={data.container.url}
				position={[2, 11, -6]}
				rotation={[-1, 0.2, 1]}
				mass={200}
				overlay={'Ship A container to China from X'}
			/>
			<Model
				url={data.bean.url}
				position={[-3, 10, 0]}
				rotation={[Math.PI, 1, 2]}
				mass={0.1}
				overlay={'Big bean'}
			/>
		</Physics>
	)
}
