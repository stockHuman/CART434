import { useEffect } from 'react'
import { UnsignedByteType, PMREMGenerator } from 'three'
import { useThree } from 'react-three-fiber'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

import HDRI from '../../assets/images/royal_esplanade_1k.hdr'


export default () => {
	const { gl, scene } = useThree()
	const pmremGenerator = new PMREMGenerator(gl)
	const loader = new RGBELoader()
	loader.setDataType(UnsignedByteType)
	pmremGenerator.compileEquirectangularShader()

	// note: performance seems severly impacted by this method
  useEffect(() => {
		loader.load(HDRI, texture => {
			const envMap = pmremGenerator.fromEquirectangular(texture).texture

			// scene.background = envMap
			scene.environment = envMap

			texture.dispose()
			pmremGenerator.dispose()
		})
	}, [scene, loader, pmremGenerator])

	return null
}
