const body = document.querySelector("body");

const IMG_NUMBER = 5;

// function handleImageLoad() {
//     console.log("finished loading..");
// }

function paintImage(imgNumber){
    const image = new Image();
    image.src = `images/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");
    body.prepend(image);
    
    // image.addEventListener("loading", handleImageLoad);  API에서 사용할때 쓰이는 코드
}

function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();