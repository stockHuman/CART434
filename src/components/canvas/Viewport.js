import React, { useCallback, Suspense, useRef } from 'react'
import { sRGBEncoding, ACESFilmicToneMapping } from 'three'
import { useThree, useFrame, Canvas, Dom  } from 'react-three-fiber'
import lerp from 'lerp'

import Env from './Env'

export default function Viewport (props) {
	const mouse = useRef([0, 0])
	const onMouseMove = useCallback(({ clientX: x, clientY: y }) => (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]), [])
	const d = 8.25

	return (
		<Canvas
			// see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Application_Role
			role="application"
			id="canvas-container"
			pixelRatio={Math.min(window.devicePixelRatio, 3) || 1}
			camera={{ position: [0, 1, 6], fov: 70 }}
			onMouseMove={onMouseMove}
			onCreated={({ gl }) => {
				gl.alpha = false
				gl.antialias = false
				gl.setClearColor(props.background || '#BFBFBF')
				gl.outputEncoding = sRGBEncoding
				gl.toneMappingExposure = 0.8
				gl.toneMapping = ACESFilmicToneMapping
				gl.physicallyCorrectLights = true
			}}
			gl2
			concurrent
		>
			<directionalLight
				position={[-8, 12, 8]}
				shadow-camera-left={d * -1}
				shadow-camera-bottom={d * -1}
				shadow-camera-right={d}
				shadow-camera-top={d}
				shadow-camera-near={0.1}
				shadow-camera-far={1500}
				castShadow
			/>
			<Suspense fallback={
				<Dom center
					className="loader"
					position={[0, 0, 0]}>
					<span style={{color: 'blue'}}>loading</span>
				</Dom>
			}>
				<Env />
				<Motion mouse={mouse}>
					<scene>{props.children}</scene>
				</Motion>
			</Suspense>
		</Canvas>
	)
}

function Motion ({ mouse, children }) {
	const ref = useRef()
	const { size, viewport } = useThree()
	const aspect = size.width / viewport.width
	useFrame(() => {
		if (ref.current) {
			ref.current.rotation.x = lerp(ref.current.rotation.x, 0 + mouse.current[1] / aspect / 200, 0.1)
			ref.current.rotation.y = lerp(ref.current.rotation.y, 0 + mouse.current[0] / aspect / 40, 0.1)
		}
	})

	return (
		<group ref={ref}>
			{children}
		</group>
	)
}
