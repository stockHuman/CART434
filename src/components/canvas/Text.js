import React, { useRef } from 'react'
import { useFrame } from 'react-three-fiber'
import typeface from '../../assets/fonts/uni-neue-italic.json'
import { Font } from 'three/src/extras/core/Font'

// implements https://threejs.org/docs/#api/en/geometries/TextGeometry
export default ({ string, options = { position: [ 0, 0, 0 ] }, ...props }) => {
	const ref = useRef()
	const font = new Font(typeface)

	let t = Math.random() * 100
	let speed = options.speed || 0.01

	useFrame(() => {
		t += speed
		const s = Math.cos(t)
		ref.current.rotation.set(s * -6, 0, s * 0.05)
	})

	return (
		<mesh
			ref={ref}
			position={options.position}
			rotation={options.rotation || [ 0, 0, 0 ]}
		>
			<textGeometry
				attach="geometry"
				args={[ string, { ...{ font }, ...props } ]}
				onUpdate={(geo) => geo.center()}
			/>
			<meshStandardMaterial
				attach="material"
				color={options.color || '#f5f50f'}
				metalness={1.0}
				roughness={0.7}
			/>
		</mesh>
	)
}
