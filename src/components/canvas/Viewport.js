import React, { Suspense } from 'react'
import { sRGBEncoding, ACESFilmicToneMapping } from 'three'
import { Canvas, Dom } from 'react-three-fiber'

import Env from './Env'

export default function Viewport (props) {
	return (

		<Canvas
			// see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Application_Role
			role="application"
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
					<span>loading</span>
				</Dom>
			}>
				<fog attach="fog" args={['#fbf7f5', 16, 80]} />
				<ambientLight intensity={0.3} />
				<Env />
				<scene>{props.children}</scene>
			</Suspense>
		</Canvas>
	)
}
