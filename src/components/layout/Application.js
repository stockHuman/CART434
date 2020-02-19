import React, { Component } from 'react'

import Viewport from '../canvas/Viewport'
import Scene from '../canvas/Scene'

export default class Application extends Component {

	constructor (props) {
		super(props)
		this.state = {
			wattage: '0Wh', // consumption per annum
			objects: { // objects that take up that wattage
				batteries: 0
			}
		}
	}

	computeObjects () {

	}

	render () {
		const { wattage, objects } = this.state
		return (
			<section id="app" role="main">
				<aside id="form">

				</aside>
				<Viewport>
					<Scene {...objects} />
				</Viewport>
				<span id="app-inayr">in a year</span>
				<span id="app-wattage">{wattage}</span>
			</section>
		)
	}
}
