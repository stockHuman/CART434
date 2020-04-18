import React, { Component, createRef } from 'react'

import Viewport from '../canvas/Viewport'
import Scene from '../canvas/Scene'
import Text from '../canvas/Text'

import { equivalencies } from '../../data'

export default class Application extends Component {
	constructor(props) {
		super(props)
		this.state = {
			values: { youtube: 0, netflix: 0, facebook: 0, LTE: 0, skype: 0, browsing: 0, gaming: 0 }, // preset or entered values
			wattage: { value: 0, unit: 'Wh' }, // consumption per annum
			objects: {
				// objects that take up that wattage
				bean: 0,
				arm: 0,
				container: 0,
				lamp: 0
			},
		}
		this.ref = createRef()

		this.computeObjects = this.computeObjects.bind(this)
		this.changePreset = this.changePreset.bind(this)
	}

	computeObjects() {
		// test behaviour
		const { children } = this.ref.current

		const fields = Array.from(children).map((el) => {
			if (el.className === 'input-group') {
				return {
					type: 'hour',
					data: {
						name: el.lastChild.attributes.name.value,
						value: parseInt(el.lastChild.value || el.lastChild.attributes.placeholder.value),
					},
				}
			} else if (el.tagName === 'SELECT') {
				return {
					type: 'preset',
					data: {
						name: el.attributes.name.value,
						value: parseInt(el.selectedOptions[0].value),
					},
				}
			} else {
				return null
			}
		})

		const hourInputs = fields.filter((i) => i && i.type === 'hour')
		const presetInputs = fields.filter((i) => i && i.type === 'preset')

		const yearlyWatts = (wattHours) => wattHours * 365

		let watts = 0
		hourInputs.forEach(({ data }) => {
			watts += yearlyWatts(equivalencies[data.name] * data.value)
		})

		switch (presetInputs[1].data.value) {
			case 0:
				watts += yearlyWatts(equivalencies.baseline.phone)
				break
			case 1:
				watts += yearlyWatts(equivalencies.baseline.tablet)
				break
			case 2:
				watts += yearlyWatts(equivalencies.baseline.laptop)
				break
			case 3:
				watts += yearlyWatts(equivalencies.baseline.glaptop)
				break
			case 4:
				watts += yearlyWatts(equivalencies.baseline.desktop)
				break
			case 5:
				watts += yearlyWatts(equivalencies.baseline.desktop)
				break
			case 6:
				watts += yearlyWatts(equivalencies.baseline.desktop)
				break
			case 7:
				watts += yearlyWatts(equivalencies.baseline.desktop)
				break
			default:
				break
		}

		if (presetInputs[1].data.value === 0) {
			watts += equivalencies.constants.celltower
		}

		let objects = {}
		let unit = 'Wh'

		if (watts < 10000) {

		} else {

		}

		this.setState({
			objects,
			wattage: { value: watts, unit },
		})
	}

	changePreset({ nativeEvent }) {
		const v = parseInt(nativeEvent.target.value)
		switch (v) {
			case 0:
				this.setState({
					values: { youtube: 3, netflix: 1, facebook: 0, LTE: 0, skype: 0, browsing: 0, gaming: 0 },
				})
				break
			case 1:
				this.setState({
					values: { youtube: 3, netflix: 1, facebook: 0, LTE: 0, skype: 0, browsing: 0, gaming: 0 },
				})
				break
			case 2:
				this.setState({
					values: { youtube: 3, netflix: 1, facebook: 0, LTE: 0, skype: 0, browsing: 0, gaming: 0 },
				})
				break
			case 3:
				this.setState({
					values: { youtube: 3, netflix: 1, facebook: 0, LTE: 0, skype: 0, browsing: 0, gaming: 0 },
				})
				break
			case 4:
				this.setState({
					values: { youtube: 3, netflix: 1, facebook: 0, LTE: 0, skype: 0, browsing: 0, gaming: 0 },
				})
				break
			default:

				break
		}
	}

	render() {
		const { wattage, objects, values } = this.state

		const NumberField = ({ field, name, hours = 0 }) => {
			return (
				<div className="input-group">
					<label htmlFor={name}>{field}</label>
					<input min="0" name={name} size="2" type="number" placeholder={hours} onChange={(e) => {
						let v = {...values, [name]: parseInt(e.nativeEvent.data)}
						this.setState({values: v})
					}} />
				</div>
			)
		}

		return (
			<section id="app" role="main">
				<aside id="form" ref={this.ref}>
					<h3>Daily Activity</h3>
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
					<NumberField hours={values.browsing} field="Hours web browsing" name="browsing" />
					<NumberField hours={values.gaming} field="Hours gaming (avg.)" name="gaming" />
					<select name="device">
						<option value="-1">Primary device</option>
						<option value="0">Smartphone</option>
						<option value="1">Netbook / Tablet</option>
						<option value="2">Laptop</option>
						<option value="3">Gaming Laptop</option>
						<option value="4">Desktop, &lt; 350W</option>
						<option value="5">Desktop, ~ 450W</option>
						<option value="6">Desktop, &gt; 500W</option>
						<option value="7">Pro Desktop, Multi-monitor setup</option>
					</select>
					<div className="explainer">
						<hr />
						<p>
							Enter in the number of hours you spend daily for each of the listed activities, if any, and
							on what device most often.
						</p>
					</div>

					<button onClick={this.computeObjects}>Calculate Wattage</button>
				</aside>
				<Viewport>
					<Text
						string={wattage.value + ' ' + wattage.unit}
						options={{
							position: [ 0, 2, -10 ],
							color: '#3CB371',
						}}
						size={2}
						bevelEnabled={true}
						height={0.1}
						bevelThickness={0.3}
						bevelSize={0.04}
						bevelSegments={4}
						curveSegments={16}
					/>
					<Scene {...objects} />
				</Viewport>
				<span id="app-inayr" className="info">
					in a year
				</span>
				<span id="app-wattage" className="info">
					{wattage.value} {wattage.unit}
				</span>
			</section>
		)
	}
}
