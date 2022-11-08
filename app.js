import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
console.log(OrbitControls)
const canvas = document.querySelector('canvas.webgl')
//cursor


//debug
const gui = new dat.GUI()
const parameters = {
    color: 0xfff000,
}
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = - (event.clientY / sizes.height - 0.5)

})

//texture
/* Not the better vesion but it's work
const image = new Image()
const texture = new THREE.Texture(image)
image.onload = () => {
    texture.needsUpdate = true
}
image.src = '/texture/door.jpg'
*/
//////////////////////////////////////////////
/*font */
const fontLoader = new FontLoader()
fontLoader.load(
    '/fonts/Fredoka Medium_Regular.json',
    (font) =>
    {
        const textGeometry = new TextGeometry(
            'Lord Beubeuh',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 4
            }
        )
        const textMaterial = new THREE.MeshBasicMaterial()
        textMaterial.wireframe =true
        const text = new THREE.Mesh(textGeometry, textMaterial)
        text.position.set(-2, 2,0)
        scene.add(text)
    }
)






//////////////////////////////////////////////
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = () => {
    console.log('onStart')
}
loadingManager.onLoad = () => {
    console.log('onloaded')
}
loadingManager.onProgress = () => {
    console.log('onProgress')
}
loadingManager.onError = () => {
    console.log('onError')
}
const textureLoader = new THREE.TextureLoader(loadingManager)
const colortexture = textureLoader.load('/texture/door.jpg')
const alphaTexture = textureLoader.load('/texture/Doors/opacity.jpg')
const heightTexture = textureLoader.load('/texture/Doors/height.png')
const normalTexture = textureLoader.load('/texture/Doors/normal.jpg')
const ambianceOcculusionTexture = textureLoader.load('/texture/Doors/oca.jpg')
const metalnessTexture = textureLoader.load('/texture/Doors/metallic.jpg')
const rougnessTexture = textureLoader.load('/texture/Doors/roughness.jpg')
/*colortexture.repeat.x = 2
colortexture.repeat.y = 3
colortexture.wrapS = THREE.MirroredRepeatWrapping
colortexture.wrapT = THREE.MirroredRepeatWrapping

colortexture.offset.x = 0.5
*/
colortexture.minFilter = THREE.NearestFilter
// Scene
const scene = new THREE.Scene()
//axis helper
const axisHelper = new THREE.AxesHelper()
scene.add(axisHelper)

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5)
const geometry2 = new THREE.SphereGeometry(1, 32, 32)
const geometrie3 = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5)
/*const positionArray = new Float32Array([
    0,0,0,
    0,1,0,
    1,0,0,
    1,1,0,
    1,0,0,
    0,1,0,
])
const positionAttribute = new THREE.BufferAttribute(positionArray, 3)
const geometry = new THREE.BufferGeometry()
geometry.setAttribute('position', positionAttribute)*/

/*positionArray[0] = 0
positionArray[1] = 0
positionArray[2] = 0

positionArray[3] = 0
positionArray[4] = 1
positionArray[5] = 0

positionArray[6] = 1
positionArray[7] = 0
positionArray[8] = 0*/


/*const material = new THREE.MeshBasicMaterial({ 
    color: parameters.color,
 })*/
 const material = new THREE.MeshBasicMaterial({
        map: colortexture,
        
 })
const material3 = new THREE.MeshBasicMaterial({
    color: 0xffffff,
})
const mesh3 = new THREE.Mesh(geometrie3, material3)
mesh3.position.set(2,0,0)
scene.add(mesh3)
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
const material2 = new THREE.MeshNormalMaterial()
const mesh2 = new THREE.Mesh(geometry2, material2)
mesh2.position.set(2, 3, -1)
scene.add(mesh2)
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material3
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 1
scene.add(plane)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
})
//light
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3)
directionalLight.castShadow = true

directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024

directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 6

directionalLight.shadow.camera.top = 2
directionalLight.shadow.camera.right = 2
directionalLight.shadow.camera.bottom = - 2
directionalLight.shadow.camera.left = - 2

directionalLight.position.set(2, 2, - 1)
gui.add(directionalLight, 'intensity').min(0).max(1).step(0.001)
gui.add(directionalLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(directionalLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(directionalLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(directionalLight)

const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
directionalLightCameraHelper.visible = false
scene.add(directionalLightCameraHelper)

// Spot light
const spotLight = new THREE.SpotLight(0xffffff, 0.3, 10, Math.PI * 0.3)
spotLight.castShadow = true

spotLight.shadow.mapSize.width = 1024
spotLight.shadow.mapSize.height = 1024

spotLight.shadow.camera.near = 1
spotLight.shadow.camera.far = 6

spotLight.shadow.camera.fov = 30

spotLight.position.set(0, 2, 2)
scene.add(spotLight)
scene.add(spotLight.target)

const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera)
spotLightCameraHelper.visible = false
scene.add(spotLightCameraHelper)

// Point light
const pointLight = new THREE.PointLight(0xffffff, 0.3)

pointLight.castShadow = true

pointLight.shadow.mapSize.width = 1024
pointLight.shadow.mapSize.height = 1024

pointLight.shadow.camera.near = 0.1
pointLight.shadow.camera.far = 5

pointLight.position.set(- 1, 1, 0)
scene.add(pointLight)

const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera)
pointLightCameraHelper.visible = false
scene.add(pointLightCameraHelper)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1,1000)
camera.position.z = 3
scene.add(camera)

window.requestAnimationFrame(() =>
{
})

directionalLight.castShadow = true

mesh.castShadow = true

// ...
plane.receiveShadow = true

//controls
const controls = new OrbitControls(camera, canvas)
controls.enableZoom = true
controls.enableDamping = true
controls.update()

// Renderer

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.render(scene, camera)
//debug
gui.add(mesh.position, 'x', -10, 10, 0.1)
gui.add(mesh.position, 'y', -10, 10, 0.1)
gui.add(mesh.position, 'z', -10, 10, 0.1)
gui.add(mesh,'visible')
gui.add(material,'wireframe')
gui
    .addColor(parameters, 'color')
    .onChange(function (e) {
        material.color.set(parameters.color)
    })


//clock
const clock = new THREE.Clock()

//animation
//gsap.to(mesh.position, { duration: 1, delay: 1, x: 5 })
//gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 })

let time = Date.now()
renderer.shadowMap.enabled = true

const tick = () => {
   //clock
    const elapsedTime = clock.getElapsedTime()


    //time
    const CurrentTime = Date.now()
    const deltaTime = CurrentTime - time
    time = CurrentTime


    //update object
    mesh2.scale.y = Math.sin(elapsedTime)*0.2+1
    //mesh.rotation.y = Math.sin(elapsedTime) 
    mesh2.position.y = Math.sin(elapsedTime) *4
    mesh2.position.x = Math.cos(elapsedTime) *4
    //mesh.rotation.x = Math.cos(elapsedTime)

    //update camera
    //camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2
    //camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2
    //camera.position.y = cursor.y * 3
    //camera.lookAt(mesh.position)
    //update controls
    controls.update()

    //render
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()
