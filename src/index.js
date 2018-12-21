import dat from 'dat.gui'
import { draw } from './draw'

const gui = new dat.GUI()
const canvas = document.querySelector('canvas')


export const ctx = canvas.getContext('2d')

let cx
let cy

export const sf = {
    startRad: 0,
    angle: 0.3333,
    scale: 0.25,
    distFactor: 0.65,
    numSteps: 6,
    numTrees: 6,
    bend: 0.0001, // not int to fix dat.gui bug
    treeRot: 1,
    dotThreshold: 0,
    lineThreshold: 1,
    dotSize: 0.1,
    angleSpeed: 0
}

gui.add(sf, 'startRad', -300, 300)
gui.add(sf, 'scale', 0, 1)
gui.add(sf, 'angle', 0, 1)
gui.add(sf, 'distFactor', 0, 1)
gui.add(sf, 'numSteps', 0, 15).step(1)
gui.add(sf, 'numTrees', 1, 20).step(1)
gui.add(sf, 'treeRot', 0, 1)
gui.add(sf, 'bend', -1, 1)
gui.add(sf, 'lineThreshold', 0, 1)
gui.add(sf, 'dotThreshold', 0, 1)
gui.add(sf, 'dotSize', 0, 1)
gui.add(sf, 'angleSpeed', 0, 1)

const onResize = () => {
    cx = window.innerWidth / 2
    cy = window.innerHeight / 2

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

// Animation Loop
const animate = () => {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    draw(ctx, sf, [cx, cy])
}

window.addEventListener('resize', onResize)

onResize()
animate()
