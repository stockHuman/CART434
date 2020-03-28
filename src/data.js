// 3D models
import modelLamp from './assets/meshes/StreetLamp.glb'
import modelBattery from './assets/meshes/Battery.glb'
import modelContainer from './assets/meshes/Container.glb'
import modelBean from './assets/meshes/Bean.glb'
import modelPlane from './assets/meshes/Plane.glb'


const lamp = {
	url: modelLamp,
	mass: 5
}

const battery = {
	url: modelBattery,
	mass: 1
}

const container = {
	url: modelContainer,
	mass: 200,
}

const bean = {
	url: modelBean,
	mass: 0.4
}

const airplane = {
	url: modelPlane,
	mass: 600
}

export default { lamp, battery, container, bean, airplane }
