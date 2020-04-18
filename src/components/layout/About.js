import React from 'react'

export default () => {
	return (
		<section id="about" role="complementary">
			<div className="half">
				<h3>About</h3>
				<p>At the heart of this project is my own hope for a greener future, which, perhaps some day, might actually come to be. As someone in the tech world with a personal fondness for environmentalism, I've been increasingly aware of and interested in the carbon footprint the behemoth that the internet has on the world, and how digital habits impact that picture.</p>
				<p>The aim of this project is, in broad terms, encourage one to see the massive scale that online services live in, and to hopefully take from that not a message of personal culpability, but a notion of interconnectedness between scales large and small. The shipping container, as a 3D model, was specially chosen as that industry alone furnishes all the little tech miracles we enjoy, and contributes massively to both oceanic environmental degradation, invasive speacies proliferation and to global carbon emissions. </p>
				<p>_</p>
				<p>Thank you kindly for giving this a look</p>
			</div>
			<div className="half">
			<h3>Sources</h3>
			<p>Data was compiled from a variety of academic and popular sources, and when necessary, interpolated to arrive at the figures that comprise the back-end of this app.</p>
			<ul>
				<li>YouTube video power usage: <a href="https://sustainabilityillustrated.com/en/2016/04/21/energy-use-youtube-videos/">Minute Earth</a></li>
				<li>LTE by application: <a href="https://res.mdpi.com/d_attachment/energies/energies-12-00184/article_deploy/energies-12-00184.pdf">Modeling the Total Energy Consumption of Mobile Network Services and Applications</a>, Table 1</li>
				<li>Additional notes on mobile power consumption (2013): <a href="https://thinkprogress.org/does-your-iphone-use-as-much-electricity-as-a-new-refrigerator-not-even-close-4a5e0ab41a13/">ThinkProgress</a></li>
				<li>Streaming on Netflix: <a href="https://www.carbonbrief.org/factcheck-what-is-the-carbon-footprint-of-streaming-video-on-netflix">CarbonBrief</a></li>
				<li>Insights into website sustainability and server usage (<a href="https://www.lowtechmagazine.com/2020/01/how-sustainable-is-a-solar-powered-website.html">lowtechmagazine</a>)</li>
				<li>recent article on emissions and energy use of the internet (<a href="https://dannyvankooten.com/website-carbon-emissions">dannyvankooten</a>)</li>
				<li>Energy used to brew a cup of coffee (<a href="https://business.directenergy.com/blog/2017/september/international-coffee-day">DirectEnergy</a>, using 0.08Wh as an average between drip and espresso)</li>
				<li>Emma Mærsk energy use per hour <a href="https://en.wikipedia.org/wiki/Emma_M%C3%A6rsk">WikiPedia, Wärtsilä-Sulzer RTA96-C</a></li>
				<li>Many other minor sources listed within source comments or with supplementary documentation linked in the footer.</li>
			</ul>
			</div>
		</section>
	)
}
