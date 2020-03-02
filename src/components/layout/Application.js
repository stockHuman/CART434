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

		this.computeObjects = this.computeObjects.bind(this)
	}

	computeObjects () {
		// test behaviour
		let b = this.state.objects.batteries
		this.setState({objects: { batteries: b+1}})
	}

	render () {
		const { wattage, objects } = this.state
		return (
			<section id="app" role="main">
				<aside id="form">
					<select>
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
				<span id="app-wattage" className="info">{wattage}</span>
			</section>
		)
	}
}
