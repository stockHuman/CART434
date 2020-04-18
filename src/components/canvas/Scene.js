import React from 'react'
import { usePlane, Physics } from 'use-cannon'

import Model from './Model'
import data from '../../data'

// via https://codesandbox.io/s/r3f-cannon-instanced-physics-g1s88
function Floor({ position = [ 0, 0, 0 ], rotation = [ 0, 0, 0 ] }) {
	// Register plane as a physics body with zero mass
	const [ ref ] = usePlane(() => ({ mass: 0, position, rotation }))
	return (
		<mesh ref={ref} receiveShadow>
			<planeBufferGeometry attach="geometry" args={[ 100, 100 ]} />
			<meshStandardMaterial attach="material" color="#BFBFBF" />
		</mesh>
	)
}

function rand(min = 0, max = 1) {
  return Math.random() * (max - min) + min;
}

export default function Scene(props) {
	let objects = []

	// template, place objects in array here
	for (const property in props) {
		console.log(`${property}: ${props[property]}`)

		// the app has calculated that such an object should exist
		for (let i = 0; i < props[property]; i++) {
			let url = data.bean.url
			url = data[property].url
			objects.push({
				url: url,
				overlay: data[property].info || '',
				position: [ rand(-5, 4), rand(6, 30), rand(-3, 3) ],
				rotation: [Math.PI - Math.random(), Math.random(), Math.random()],
				key: Math.random(),
			})
		}
	}

	return (
		<Physics iterations={10}>
			{objects.map((object) => (
				<Model {...object} />
			))}
			<Floor rotation={[ -Math.PI / 2, 0, 0 ]} />
		</Physics>
	)
}
