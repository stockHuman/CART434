import React from 'react'
import useIntersection from '../util/useIntersect'

export default () => {
	const { observerEntry, ref } = useIntersection({ threshold: 1 });

	return (
		<>
		<div id="top-of-site-anchor" ref={ref}></div>
		<nav id="menu" role="navigation" aria-label="Main" className={observerEntry.isIntersecting ? 'transparent' : '' }>
			<ul>
				<li><a href="#about">about</a></li>
			</ul>
		</nav>
		</>
	)
}
