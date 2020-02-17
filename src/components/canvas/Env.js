import { useEffect } from 'react'
import { UnsignedByteType, PMREMGenerator } from 'three'
import { useThree } from 'react-three-fiber'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

import HDRI from '../../assets/images/royal_esplanade_1k.hdr'


export default () => {
	const { gl, scene } = useThree()
	const pmremGenerator = new PMREMGenerator(gl)
	pmremGenerator.compileEquirectangularShader()

  useEffect(() => {
		new RGBELoader()
			.setDataType(UnsignedByteType)
			.load(HDRI, texture => {

				const envMap = pmremGenerator.fromEquirectangular(texture).texture

				scene.background = envMap
				scene.environment = envMap

				texture.dispose()
				pmremGenerator.dispose()
			})
	}, [])

	return null
}
