import { useState, useEffect, useRef } from 'react'

export default function useIntersection(options) {
	const [ observerEntry, setEntry ] = useState({})
	const ref = useRef()

	useEffect(
		() => {
			const observer = new IntersectionObserver((entries) => setEntry(entries[0]), options)
			observer.observe(ref.current)
			return () => observer.disconnect()
		},
		[ ref ]
	)
	return { observerEntry, ref }
}
