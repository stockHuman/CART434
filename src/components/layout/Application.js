import React, { Component } from 'react'

import Viewport from '../canvas/Viewport'

export default class Application extends Component {

	constructor (props) {
		super(props)
		this.state = {

		}
	}


	render () {
		return (
			<section id="app" role="main">
				<aside id="form">

				</aside>
				<Viewport>
					<mesh>
						<coneBufferGeometry attach="geometry" args={[1, 2, 3]} />
						<meshBasicMaterial attach="material" color={0xff00ff} />
					</mesh>
				</Viewport>
				<span id="app-inayr">in a year</span>
				<span id="app-wattage">{}</span>
			</section>
		)
	}
}
