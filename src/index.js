import './css/styles.css';

const zoomElement = document.querySelector('.zoom')
const fadeElement = document.querySelector('.fade')
const afterZoomElement = document.querySelector('.afterzoom')
const imgElement = document.querySelector('img')
const widthVar = document.body.clientWidth
const heightVar = zoomElement.clientHeight
const imageVar_widthVar = imgElement.clientWidth
const imageVar_heightVar = imgElement.clientHeight
const zoomVar_SPEED = 1 // Lower is faster
const zoomVar_breakpointVar = widthVar / imageVar_widthVar // When it should stop zooming in
const imageVar_heightVar_MAX = imageVar_heightVar * zoomVar_breakpointVar
const absoluteVar = zoomVar_breakpointVar * zoomVar_SPEED // Absolute position, when the Element reached maximum size

// Fade --------------------------------------------------------------------------------------
const FADE_SPEED = 500 // Lower is faster
let fade = 1
let prev = 0
// -------------------------------------------------------------------------------------- Fade

function anim() {
    let scroll = window.scrollY
    let temp = scroll / zoomVar_SPEED
    let zoom = temp > 1 ? temp : 1

    // Only update the Elements scale, when we are below the breakpoint
    if (zoom < zoomVar_breakpointVar) {
        // Only scale the Image, so the Zoom element does not mess with the document width
        imgElement.style.transform = `scale(${zoom})`
        // Sets the Elements position to fixed, so it can resize without scrolling away
        zoomElement.style.top = '0px'
        zoomElement.style.position = 'fixed'
    } else {
        // Makes sure the Element always reaches Max Size
        imgElement.style.transform = `scale(${zoomVar_breakpointVar})`
        // Sets the elements position to absolute, so it will scroll with the rest of the document
        zoomElement.style.position = 'absolute'
        zoomElement.style.top = absoluteVar + 'px'
    }

    // Fade --------------------------------------------------------------------------------------
    let dif = prev - scroll

    if (zoom < zoomVar_breakpointVar - FADE_SPEED / zoomVar_SPEED) {
        fade = 1
    } else if (zoom > zoomVar_breakpointVar) {
        fade = 0
    } else {
        fade += dif / FADE_SPEED
    }

    fadeElement.style.opacity = fade
    prev = scroll
    // -------------------------------------------------------------------------------------- Fade
}

// Resets scroll position on every reload
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
}

document.addEventListener('scroll', () => window.requestAnimationFrame(anim))

// Fade --------------------------------------------------------------------------------------
zoomElement.style.opacity = 1
// -------------------------------------------------------------------------------------- Fade

// Positions the afterZoom element right below the zoomed image
afterZoomElement.style.top = absoluteVar + imageVar_heightVar_MAX / 2 + heightVar / 2 + 'px'