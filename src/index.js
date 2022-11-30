import './css/navbar.css';
import './css/index.css';
import './css/portfolio.css';
import './parallax/parallax.css';
import './parallax/parallax.js';

var cursor = document.querySelector('.cursor');
var cursorinner = document.querySelector('.cursor2');
var a = document.querySelectorAll('a');

document.addEventListener('mousemove', function(e){
  cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
});

document.addEventListener('mousemove', function(e){
    var x = e.clientX;
    var y = e.clientY;
    cursorinner.style.left = x + 'px';
    cursorinner.style.top = y + 'px';
});

document.addEventListener('mousedown', function(){
    cursor.classList.add('click');
    cursorinner.classList.add('cursorinnerhover')
});

document.addEventListener('mouseup', function(){
    cursor.classList.remove('click')
    cursorinner.classList.remove('cursorinnerhover')
});

a.forEach(item => {
    item.addEventListener('mouseover', () => {
    cursor.classList.add('hover');
    });
    item.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
    });
})

window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");

    loader.classList.add("loader-hidden");

    loader.addEventListener("transitionend", () => {
    document.body.removeChild("loader");
    });
});

const zoomElement = document.querySelector('.zoom');
const fadeElement = document.querySelector('.fade');
const afterZoomElement = document.querySelector('.afterzoom');
const imgElement = document.querySelector('img');
const widthVar = document.body.clientWidth;
const heightVar = zoomElement.clientHeight;
const imageVar_widthVar = imgElement.clientWidth;
const imageVar_heightVar = imgElement.clientHeight;
const zoomVar_SPEED = 50; // Lower is faster
const zoomVar_breakpointVar = widthVar / imageVar_widthVar; // When it should stop zooming in
const imageVar_heightVar_MAX = imageVar_heightVar * zoomVar_breakpointVar;
const absoluteVar = zoomVar_breakpointVar * zoomVar_SPEED; // Absolute position, when the Element reached maximum size

// Fade --------------------------------------------------------------------------------------
const FADE_SPEED = 400; // Lower is faster
let fade = 1;
let prev = 0;
// -------------------------------------------------------------------------------------- Fade

function anim() {
  let scroll = window.scrollY;
  let temp = scroll / zoomVar_SPEED;
  let zoom = temp > 1 ? temp : 1;

  // Only update the Elements scale, when we are below the breakpoint
    if (zoom < zoomVar_breakpointVar) { 
  // Only scale the Image, so the Zoom element does not mess with the document width
    imgElement.style.transform = `scale(${zoom})`;
    // Sets the Elements position to fixed, so it can resize without scrolling away
    zoomElement.style.top = '0px';
    zoomElement.style.position = 'fixed';
    } else {
    // Makes sure the Element always reaches Max Size
    imgElement.style.transform = `scale(${zoomVar_breakpointVar})`;
    // Sets the elements position to absolute, so it will scroll with the rest of the document
    zoomElement.style.position = 'absolute';
    zoomElement.style.top = absoluteVar + 'px';
    }

  // Fade --------------------------------------------------------------------------------------
    let dif = prev - scroll;

    if (zoom < zoomVar_breakpointVar - FADE_SPEED / zoomVar_SPEED) {
    fade = 1;
    } else if (zoom > zoomVar_breakpointVar) {
    fade = 0;
    } else {
    fade += dif / FADE_SPEED;
    }

    fadeElement.style.opacity = fade;
    prev = scroll;
  // --------------------------------------------------------------------------------------------
}

// Resets scroll position on every reload
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

document.addEventListener('scroll', () => window.requestAnimationFrame(anim));

// Fade --------------------------------------------------------------------------------------
zoomElement.style.opacity = 1;
// --------------------------------------------------------------------------------------------

// Positions the afterZoom element right below the zoomed image
afterZoomElement.style.top = absoluteVar + imageVar_heightVar_MAX / 2 + heightVar / 2 + 'px';

const menuItem = document.querySelector(".project-item");

function followImageCursor(event, menuItem) {
    const contentBox = menuItem.getBoundingClientRect();
    const dx = event.pageX - contentBox.x;
    const dy = event.pageY - contentBox.y;
    menuItem.children[1].style.transform = `translate(${dx}px, ${dy}px)`;
}

menuItem.addEventListener("mousemove", (event) => {
    setInterval(followImageCursor(event, menuItem), 1000);
});

// Circle Courser------------------------------------------------------------------------------