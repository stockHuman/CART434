import React from 'react'

export default (props) => {
	console.log(props)
	return (
		<scene>
			<mesh>
				<coneBufferGeometry attach="geometry" args={[1, 2, 3]} />
				<meshStandardMaterial attach="material" color={0xff100f} />
			</mesh>
		</scene>
	)
}
