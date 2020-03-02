import React, { Component } from 'react'

import Viewport from '../canvas/Viewport'
import Scene from '../canvas/Scene'

export default class Application extends Component {

	constructor (props) {
		super(props)
		this.state = {
			wattage: { value: 0, unit: 'Wh' }, // consumption per annum
			objects: { // objects that take up that wattage
				batteries: 0
			}
		}

		this.computeObjects = this.computeObjects.bind(this)
	}

	computeObjects () {
		// test behaviour
		let { wattage, objects } = this.state
		this.setState({
			objects: { batteries: objects.batteries + 1 },
			wattage:  { value: wattage.value + 0.45, unit: wattage.unit }
		})
	}

	render () {
		const { wattage, objects } = this.state
		return (
			<section id="app" role="main">
				<aside id="form">
					<select name="presets">
						<option>Presets</option>
						<option>Heavy Gaming (Online, PC)</option>
						<option>Light Gaming (Online, PC)</option>
						<option>Light Gaming (Local, PC)</option>
						<option>Heavy Gaming (Online, Console)</option>
						<option>Some YouTube Hours</option>
					</select>
					<button onClick={this.computeObjects}>test</button>
				</aside>
				<Viewport>
					<Scene {...objects} />
				</Viewport>
				<span id="app-inayr" className="info">in a year</span>
				<span id="app-wattage" className="info">{wattage.value} {wattage.unit}</span>
			</section>
		)
	}
}
