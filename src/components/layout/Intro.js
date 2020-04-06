import React from 'react'

export default () => (
	<section id="intro">
		<h1 className="title">Data Falls</h1>
		<p className="description">The notion that internet browsing has any carbon impact at all is largely completely foreign to your average netizen.<br />
Indeed, online browsing, or other computer-related behavior is generally thought of as carbon neutral, with perhaps some minor concern for the carbon impact of shipping and manufacturing the initial components.
This project aims to educate and illustrate in a jovial manner, the electrical costs running major services entails, and how that is affected by local and international power delivery.</p>
		<button onClick={() => {
			let e = document.getElementById('app')
			e.scrollIntoView({ behavior: "smooth" })
		}}>View the app</button>
		<div className="scroll-me"></div>
	</section>
)
