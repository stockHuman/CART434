import React, { Component } from 'react'

import Viewport from '../canvas/Viewport'

export default class Application extends Component {

	constructor (props) {
		super(props)
	}


	render () {
		return (
			<section id="app" role="main">
				<aside id="form">

				</aside>
				<Viewport />
				<span id="app-inayr">in a year</span>
				<span id="app-wattage">{}</span>
			</section>
		)
	}
}
