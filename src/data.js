// 3D models
import modelLamp from './assets/meshes/StreetLamp.002.glb'
import modelBattery from './assets/meshes/MichaelH_Pixies_Battery_MOD.000.glb'
import modelContainer from './assets/meshes/Container.002.glb'
import modelBean from './assets/meshes/MichaelH_Pixies_Bean_MOD.002.glb'


const lamp = {
	url: modelLamp
}

const battery = {
	url: modelBattery
}

const container = {
	url: modelContainer,
	mass: 200,
}

const bean = {
	url: modelBean
}

export default { lamp, battery, container, bean }
