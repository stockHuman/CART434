import React from 'react'

export default () => (
	<section id="intro">
		<h1 className="title">Streams</h1>
		<p className="description">ndard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised</p>
		<button onClick={() => {
			let e = document.getElementById('app')
			e.scrollIntoView({ behavior: "smooth" })
		}}>View the app</button>
	</section>
)
