const html = document.documentElement;
// Referencing my canvas element so I can change the picture displayed within it
const canvas = document.getElementById("scenery");
const context = canvas.getContext("2d");
// Creating a variable for my framecount (the number of frames making up the background animation) to map against the scroll position
const frameCount = 93;
const currentFrame = index => (
  `${index.toString().padStart(4, '0')}.jpg`
)

// Preloading the images so the webiste could have a better experience
// The code I used here is from this tutorial: https://css-tricks.com/lets-make-one-of-those-fancy-scrolling-animations-used-on-apple-product-pages/
const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

// Set canvas dimensions
canvas.width=1920;
canvas.height=1080;


// Create, load and draw the image
const img = new Image()
img.src = currentFrame(1);
img.onload=function(){
  context.drawImage(img, 0, 0);
}

const updateImage = index => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0);
}

let mainVideo = document.getElementById("myvideo");
let bod = document.getElementById("bod");

//where the magic happens :) the code checks for the Y-scroll position and displays the correspodning frame
window.addEventListener('scroll', () => {
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );
  //I added a variable called rgbval to control the color of the text on the page, so it looks like the text is lighting up in response to the sunrise in the animation.
  const rgbval =  20 + (255- (255-(frameIndex*9)));
  requestAnimationFrame(() => updateImage(frameIndex + 1))
  bod.style.color = `rgb(${rgbval},${rgbval},${rgbval})`;
  //the same variable is used to contorl the hooks opacity
  hook.style.opacity = `${(10/rgbval)*100}%`

  //checks if user has scrolled to the bottom of the page to display the video or not
  if (frameIndex > 91) {
    document.getElementById( 'myvideo' ).style.display = 'flex';
  } else {
    document.getElementById( 'myvideo' ).style.display = 'none';
  }
});

//calling the preload images function
preloadImages();

// This is to copy my email and the website link to the clipboard on click, and notify the user
function myFunction() {
  // Get the text field
  var copyText = document.getElementById("myInput");

  // Select the text field
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices
  document.getElementById( 'notify' ).style.visibility = 'visible';

   // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value);

}
function myFunction2() {
  // Get the text field
  var copyText = document.getElementById("myInput2");

  // Select the text field
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices
  document.getElementById( 'notify' ).style.visibility = 'visible';

   // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value);

}
