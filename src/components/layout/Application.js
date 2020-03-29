import React, { Component } from 'react'

import Viewport from '../canvas/Viewport'
import Scene from '../canvas/Scene'

export default class Application extends Component {
	constructor (props) {
		super(props)
		this.state = {
			values: {youtube: 0, netflix: 0, facebook: 0, LTE: 0, skype: 0}, // preset or entered values
			wattage: { value: 0, unit: 'Wh' }, // consumption per annum
			objects: { // objects that take up that wattage
				batteries: 0
			}
		}

		this.computeObjects = this.computeObjects.bind(this)
		this.changePreset = this.changePreset.bind(this)
	}

	computeObjects () {
		// test behaviour
		let { wattage, objects } = this.state
		this.setState({
			objects: { batteries: objects.batteries + 1 },
			wattage:  { value: wattage.value + 0.45, unit: wattage.unit }
		})
	}

	changePreset ({ nativeEvent }) {
		const v = parseInt(nativeEvent.target.value)
		switch (v) {
			case 0:
				this.setState({ values: { youtube: 3, netflix: 1, facebook: 0, LTE: 0, skype: 0 }})
				break;

			default:
				this.setState({ values: { youtube: 0, netflix: 0, facebook: 0, LTE: 0, skype: 0 } })
				break;
		}
	}

	render () {
		const { wattage, objects, values } = this.state

		const NumberField = ({field, name, hours = 0}) => (
			<div className="input-group">
				<label htmlFor={name}>{field}</label>
				<input min="0" name={name} size="2" type="number" defaultValue={hours}/>
			</div>
		)

		return (
			<section id="app" role="main">
				<aside id="form">
					<select name="presets" onChange={this.changePreset}>
						<option value="-1">Presets</option>
						<option value="0">Heavy Gaming (Online, PC)</option>
						<option value="1">Light Gaming (Online, PC)</option>
						<option value="2">Light Gaming (Local, PC)</option>
						<option value="3">Heavy Gaming (Online, Console)</option>
						<option value="4">Some YouTube Hours</option>
					</select>
					<NumberField hours={values.youtube} field="Hours on Youtube" name="youtube" />
					<NumberField hours={values.netflix} field="Hours on NetFlix" name="netflix" />
					<NumberField hours={values.facebook} field="Hours on Facebook" name="facebook" />
					<NumberField hours={values.LTE} field="Hours using 4G LTE" name="LTE" />
					<NumberField hours={values.skype} field="Hours videoconferencing" name="skype" />
					<select>
						<option>Canada</option>
					</select>
					<button onClick={this.computeObjects}>Calculate Wattage</button>
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
