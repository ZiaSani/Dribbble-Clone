const cursor = document.querySelector(".cursor");
document.addEventListener("mousemove", function (e) {
  gsap.to(cursor, {
    x: e.clientX,
    y: e.clientY,
    backgroundColor: randomColor(),
    duration: 0.2,
    ease: "linear",
  });
});

const randomColor = () =>
  `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0")}`;

function changeBackgroundColor() {
  const element = document.querySelector("#random-color");
  element.style.backgroundColor = randomColor();
  element.style.transition = "all ease 0.5s";
}
function imageEffect() {
  const throttleFunction = (func, delay) => {
    let prev = 0;
    return (...args) => {
      let now = new Date().getTime();
      if (now - prev > delay) {
        prev = now;
        return func(...args);
      }
    };
  };

  const imageUrls = [
    "Images_Folder/img_url_01.avif",
    "Images_Folder/img_url_02.jpg",
    "Images_Folder/img_url_03.jpg",
    "Images_Folder/img_url_04.png",
    "Images_Folder/img_url_05.jpg",
    "Images_Folder/img_url_06.jpg",
    "Images_Folder/img_url_07.avif",
    "Images_Folder/img_url_08.png",
    "Images_Folder/img_url_09.png",
    "Images_Folder/img_url_10.jpg",
    "Images_Folder/img_url_11.jpg",
    "Images_Folder/img_url_12.jpg",
    "Images_Folder/img_url_13.avif",
    "Images_Folder/img_url_14.jpg",
    "Images_Folder/img_url_15.jpg",
    // Add more URLs as needed
  ];

  // Function to get a random image URL
  function getRandomImageUrl() {
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    return imageUrls[randomIndex];
  }

  const box = document.querySelector(".content-inner"); // Ensure this selector is correct
  box.style.cursor = "none";
  box.addEventListener(
    "mousemove",
    throttleFunction((dets) => {
      function createImageDiv() {
        let imageDiv = document.createElement("div");
        imageDiv.style.position = "absolute";
        imageDiv.style.zIndex = "1000";
        imageDiv.style.overflow = "hidden";
        imageDiv.style.height = "220px";
        imageDiv.style.width = "190px";
        imageDiv.style.top = dets.clientY + "px";
        imageDiv.style.left = dets.clientX + "px";
        return imageDiv;
      }

      function createImageTag() {
        let imageTag = document.createElement("img");
        imageTag.style.height = "100%";
        imageTag.style.maxWidth = "100%";
        imageTag.loading = "lazy";
        imageTag.style.objectPosition = "center";
        imageTag.style.transform = "translateY(100%)";
        imageTag.setAttribute("src", getRandomImageUrl());
        return imageTag;
      }

      let createDivElement = createImageDiv();
      document.body.appendChild(createDivElement);

      let createImage = createImageTag();
      createDivElement.appendChild(createImage);

      if (typeof gsap !== "undefined") {
        // Entry animation
        gsap.to(createImage, {
          y: "0",
          ease: "Power5",
          duration: 0.5,
        });

        // Exit animation
        gsap.to(createImage, {
          y: "100%",
          ease: "Power5",
          delay: 1, // Adjust delay as needed
          duration: 0.5,
          onComplete: function () {
            createDivElement.remove();
          },
        });
      } else {
        console.error("GSAP library is not loaded");
      }

        setTimeout(function () {
          createDivElement.remove();
        }, 500);
      console.log("ENTERED");
    }, 300)
  );
}
setInterval(changeBackgroundColor, 3000);
// imageEffect();
