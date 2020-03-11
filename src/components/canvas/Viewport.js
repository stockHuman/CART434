import React, { useCallback, Suspense, useRef } from 'react'
import { sRGBEncoding, ACESFilmicToneMapping } from 'three'
import { Canvas, Dom } from 'react-three-fiber'
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib'

import Env from './Env'

export default function Viewport (props) {
	RectAreaLightUniformsLib.init()
	const mouse = useRef([0, 0])
	const onMouseMove = useCallback(({ clientX: x, clientY: y }) => (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]), [])

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
			<Suspense fallback={
				<Dom center
					className="loader"
					position={[0, 0, 0]}>
					<span style={{color: 'blue'}}>loading</span>
				</Dom>
			}>
				<Env />
				<scene>{props.children}</scene>
			</Suspense>
		</Canvas>
	)
}
