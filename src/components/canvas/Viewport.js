import React, { Suspense } from 'react'
import { sRGBEncoding, ACESFilmicToneMapping, Vector3 } from 'three'
import { Canvas, Dom } from 'react-three-fiber'
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib'

import Env from './Env'

export default function Viewport (props) {
	RectAreaLightUniformsLib.init()

	return (

		<Canvas
			// see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Application_Role
			role="application"
			id="canvas-container"
			pixelRatio={Math.min(window.devicePixelRatio, 3) || 1}
			onCreated={({ gl }) => {
				gl.alpha = false
				gl.antialias = false
				gl.setClearColor(props.background || '#000000')
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
				<rectAreaLight
					intensity={3}
					position={[0, 10, -10]}
					width={30}
					height={30}
					onUpdate={self => self.lookAt(new Vector3(0, 0, 0))}
				/>
				<fog attach="fog" args={['#fbf7f5', 16, 80]} />
				<scene>{props.children}</scene>
			</Suspense>
		</Canvas>
	)
}
