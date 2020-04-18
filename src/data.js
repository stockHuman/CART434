// 3D models
import modelLamp from './assets/meshes/StreetLamp.glb'
import modelBattery from './assets/meshes/Battery.glb'
import modelContainer from './assets/meshes/Container.glb'
import modelBean from './assets/meshes/Bean.glb'
import modelPlane from './assets/meshes/Plane.glb'
import modelArm from './assets/meshes/Arm.glb'
import modelHome from './assets/meshes/Home.glb'

// See about section for energy citations
const lamp = {
	url: modelLamp,
	mass: 5,
	cost: 960,
	info: 'Light a small park for a night'
}

const home = {
	url: modelHome,
	mass: 200
}

const battery = {
	url: modelBattery,
	mass: 1,
	info: 'Use 100 AA batteries',
}

const container = {
	url: modelContainer,
	mass: 200,
	cost: 81000,
	info: 'Power a Mærsk E-Class for an hour'
}

const bean = {
	url: modelBean,
	mass: 0.4,
	cost: 0.08,
	info: 'Brew a cup of coffee'
}

const airplane = {
	url: modelPlane,
	mass: 600
}

const arm = {
	url: modelArm,
	mass: 1,
	cost: 80,
	info: 'manipulate objects for an hour'
}

export default { lamp, battery, container, bean, airplane, arm, home }

// All values represented in Watt-hours
export const equivalencies = {
	youtube: 222, // 60 * 3.75Wh (2500mAh @ 1.5V), or 60 min * 1 AA battery / min
	LTE: 0.55, // average for most smarphone activities over LTE
	facebook: 0, // update
	skype: 360, // given similar assumptions to YouTube
	netflix: 260, // via IEA study, derived from CarbonBrief analysis
	browsing: 100,
	gaming: 240, // computed via a rough average of common processor / GPU combinations
	baseline: { // add to total (not multiplied by hours per day)
		phone: 8, // (~2500mAh @ 3.7V) not fully discharged every night
		tablet: 10,
		laptop: 45, // based off of common laptop usage patterns, assuming 2015 mbp
		glaptop: 100,
		desktop: 170,
	},
	constants: {
		router: 8,
		celltower: 2.95890 // Humar, I., et al. 2011. (10.8kWh / year)
	}
}
