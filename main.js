let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let loadImage = (src, callback) => {
  let img = document.createElement("img");
  img.onload = () => callback(img);
  img.src = src;
};

let imagePath = (frameNumber, animation) => {
  return "images/" + animation + "/" + frameNumber + ".png";
};

let frames = {
  idle: [1, 2, 3, 4, 5, 6, 7, 8],
  kick: [1, 2, 3, 4, 5, 6, 7],
  punch: [1, 2, 3, 4, 5, 6, 7],
  block: [1, 2, 3, 4, 5, 6, 7, 8, 9],
};

let loadImages = (callback) => {
  let images = { idle: [], kick: [], punch: [], block: [] };
  let imagesToLoad = 0;

  //callback with an array of images
  ["idle", "kick", "punch","block"].forEach((animation) => {
    let animationFrames = frames[animation];
    imagesToLoad = imagesToLoad + animationFrames.length;

    animationFrames.forEach((frameNumber) => {
      let path = imagePath(frameNumber, animation);

      loadImage(path, (image) => {
        images[animation][frameNumber - 1] = image;
        imagesToLoad = imagesToLoad - 1;

        if (imagesToLoad === 0) {
          callback(images);
        }
      });
    });
  });
};

let animate = (ctx, images, animation, callback) => {
  images[animation].forEach((image, index) => {
    setTimeout(() => {
      ctx.clearRect(0, 280, 500, 500);
      ctx.drawImage(image, 0, 280, 500, 500);
    }, index * 100);
  });

  setTimeout(callback, images[animation].length * 100);
};

loadImages((images) => {
  let queuedAnimation = [];

  let aux = () => {
    let selectedAnimation;
    if (queuedAnimation.length === 0) {
      selectedAnimation = "idle";
    } else {
      selectedAnimation = queuedAnimation.shift();
    }
    animate(ctx, images, selectedAnimation, aux);
  };

  aux();
  document.getElementById("kick").onclick = () => {
    queuedAnimation.push("kick");
  };
  document.getElementById("punch").onclick = () => {
    queuedAnimation.push("punch");
  };
  document.getElementById("block").onclick = () => {
    queuedAnimation.push("block");
  };
  
  document.addEventListener('keyup', (event) => {
    const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
    console.log("Key pressed" + key);
    if (key === "ArrowLeft") {
      queuedAnimation.push("kick");
    }
    else if (key === "ArrowRight") {
      queuedAnimation.push("punch");
    }
    else if (key === "ArrowDown") {
      queuedAnimation.push("block");
    }
  });
});
