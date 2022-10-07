const html = document.documentElement;
const canvas = document.getElementById("scenery");
const context = canvas.getContext("2d");
console.log("hello AGAIN!");
const frameCount = 93;
// const rgbval;
const currentFrame = index => (
  `grass_anis/${index.toString().padStart(4, '0')}.jpg`
)

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
img.src = currentFrame(1); // we'll make this dynamic in the next step, for now we'll just load image 1 of our sequence
img.onload=function(){
  context.drawImage(img, 0, 0);
}

const updateImage = index => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0);
}

let mainVideo = document.getElementById("mainvid");
let bod = document.getElementById("bod");

window.addEventListener('scroll', () => {
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );
  const rgbval =  20 + (255- (255-(frameIndex*9)));
  requestAnimationFrame(() => updateImage(frameIndex + 1))
  bod.style.color = `rgb(${rgbval},${rgbval},${rgbval})`;
  if (frameIndex > 91) {
    document.getElementById( 'mainvid' ).style.display = 'flex';
    // document.getElementById( 'mainvid' ).vid.play();
  } else {
    document.getElementById( 'mainvid' ).style.display = 'none';
  }
});
preloadImages();


function myFunction() {
  // Get the text field
  var copyText = document.getElementById("myInput");

  // Select the text field
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices
  document.getElementById( 'subhead' ).style.visibility = 'visible';

   // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value);

}
