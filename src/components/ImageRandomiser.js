import img1 from ".././chuck-norris-1.jpg";
import img2 from ".././chuck-norris-2.jpg";
import img3 from ".././chuck-norris-3.jpg";

const images = [img1, img2, img3]

const randomise = () => {
   // console.log(images.length)
   const randomNumber = Math.floor(Math.random() * Math.floor(images.length));
   return images[randomNumber]
}

export default randomise