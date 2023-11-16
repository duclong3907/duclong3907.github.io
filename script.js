// start video demo
document.addEventListener("DOMContentLoaded", function () {
  var button = document.querySelector(".video1");
  var volumeButton = document.querySelector("#volumeButton");
  var videoWrapper = document.querySelector("#videoWrapper");
  var videoContainer = document.querySelector("#videoContainer");
  var video = document.querySelector("#myVideo");
  var iconPlay = document.querySelector("#playButton");
  // var iconPause = document.querySelector("#pauseButton")
  var closeButton = document.querySelector("#closeButton");
  var isVideoVisible = false;
  var isVideoPlaying = false;
  var currentVolume = 1;
  var isMuted = false;

  button.addEventListener("click", function () {
    Swal.fire({
      icon: 'error',
      title: "Sorry for the inconvenience",
      text: "The website is currently not working because I can't find a reputable DNS. You can click Video Demo to see demo website.",
      showCancelButton: true,
      confirmButtonText: "Video Demo",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      customClass: {
        confirmButton: "swal-button--confirm",
        cancelButton: "swal-button--cancel"
      }
    }).then(function (result) {
      if (result.value && !isVideoVisible) {
        showVideo();
      }
    });
  });

  closeButton.addEventListener("click", function () {
    hideVideo();
  });

  video.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  document.addEventListener("click", function (event) {
    if (isVideoPlaying && !videoContainer.contains(event.target)) {
      hideVideo();
    }
  });

  video.addEventListener("play", function () {
    isVideoPlaying = true;
  });

  video.addEventListener("pause", function () {
    isVideoPlaying = false;
  });

  volumeButton.addEventListener("mousedown", function (event) {
    event.preventDefault(); // Ngăn chặn sự kiện click trên video
    if (isMuted) {
      video.volume = currentVolume;
      isMuted = false;
      volumeButton.innerHTML = '<i class="fa fa-volume-up"></i>';
    } else {
      video.volume = 0;
      isMuted = true;
      volumeButton.innerHTML = '<i class="fa fa-volume-off"></i>';
    }
  });


  video.addEventListener("wheel", function (event) {
    event.preventDefault();
    var delta = Math.max(-1, Math.min(1, (event.deltaY || -event.detail)));
    if (delta > 0) {
      currentVolume = Math.max(0, currentVolume - 0.1);
    } else {
      currentVolume = Math.min(1, currentVolume + 0.1);
    }
    video.volume = currentVolume;
  });

  function showVideo() {
    isVideoVisible = true;
    videoWrapper.style.display = "block";
    video.play();
  }

  function hideVideo() {
    isVideoVisible = false;
    video.pause();
    video.currentTime = 0;
    videoWrapper.style.display = "none";
  }

  video.addEventListener("timeupdate", function () {
    var progress = (video.currentTime / video.duration) * 100;
    progressBar.value = progress;

    var currentTime = formatTime(video.currentTime);
    var duration = formatTime(video.duration);
    timeDisplay.textContent = currentTime + " / " + duration;
  });

  progressBar.addEventListener("click", function (e) {
    var progressWidth = progressBar.offsetWidth;
    var clickedX = e.offsetX;
    var clickedProgress = (clickedX / progressWidth) * video.duration;
    video.currentTime = clickedProgress;
  });

  video.addEventListener("click", function () {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });

  iconPlay.addEventListener("mousedown", function (event) {
    event.preventDefault();
    if (video.paused) {
      video.play();
      iconPlay.innerHTML = '<i class="fa fa-pause"></i>';
    } else {
      video.pause();
      iconPlay.innerHTML = '<i class="fa fa-play"></i>';
    }
  });

  function formatTime(time) {
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time % 60);
    return pad(minutes) + ":" + pad(seconds);
  }

  function pad(value) {
    return value < 10 ? "0" + value : value;
  }

  var screenButton = document.querySelector("#screenButton");
  var videoContainer = document.querySelector("#videoContainer");

  screenButton.addEventListener("click", function () {
    if (!document.fullscreenElement) {
      enterFullscreen(videoContainer);
    } else {
      exitFullscreen();
    }
  });

  function enterFullscreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { // Firefox
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { // Chrome, Safari and Opera
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // IE/Edge
      element.msRequestFullscreen();
    }

  }

  function exitFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
      document.msExitFullscreen();
    }
  }


  document.addEventListener("fullscreenchange", function () {
    if (!document.fullscreenElement) {
      exitFullscreen();
    }
  });
});
// end video demo

// send mail
let popup = document.getElementById("popup");
let sendButton = document.querySelector('.sendMail');
sendButton.addEventListener("click", openPopup);

function openPopup() {
  var nameInput = document.getElementById("name");
  var emailInput = document.getElementById("email");
  var addressInput = document.getElementById("address");
  var phoneInput = document.getElementById("phone");
  var messageMail = document.getElementById("message");

  if (nameInput.value === "" || emailInput.value === "" || addressInput.value === "" || phoneInput.value === "") {
    Swal.fire({
      icon: 'warning',
      title: 'Please complete all information',
    });
  } else if (messageMail.value === "") {
    Swal.fire({
      icon: 'warning',
      title: 'Please fill in the message',
    });
  } else {
    popup.classList.add("open-popup");
    document.addEventListener("click", closePopupOutside);
  }
}

function closePopup() {
  popup.classList.remove("open-popup");
  document.removeEventListener("click", closePopupOutside);
}

function closePopupOutside(event) {
  if (!popup.contains(event.target) && event.target !== sendButton) {
    closePopup();
  }
}


var typed = new Typed(".text", {
  strings: ["Frontend Developer", "Backend Developer", "Web Developer"],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true
});

// circle skill
const circles = document.querySelectorAll('.circle');
circles.forEach(elem => {
  var dots = elem.getAttribute("data-dots");
  var marked = elem.getAttribute("data-percent");
  var percent = Math.floor(dots * marked / 100);
  var points = "";
  var rotate = 360 / dots;

  for (let i = 0; i < dots; i++) {
    points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
  }
  elem.innerHTML = points;

  const pointsMarked = elem.querySelectorAll('.points');
  for (let i = 0; i < percent; i++) {
    pointsMarked[i].classList.add('marked')
  }
})

// mix it up
var mixer = mixitup('.portfolio-gallery');

// active menu
let menuLi = document.querySelectorAll('header ul li a');
let section = document.querySelectorAll('section');

function activeMenu() {
  let len = section.length;
  while (--len && window.scrollY + 97 <= section[len].offsetTop) { }
  menuLi.forEach(sec => sec.classList.remove("active"));
  menuLi[len].classList.add("active");
}

activeMenu();
window.addEventListener("scroll", activeMenu);

//sticky navbar
const header = document.querySelector("header");
window.addEventListener("scroll", function () {
  header.classList.toggle("sticky", window.scrollY > 50)
})

// toggle icon navbar 
let menuIcon = document.querySelector("#menu-icon");
let navlist = document.querySelector(".navlist");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navlist.classList.toggle("open");
}

window.onscroll = () => {
  menuIcon.classList.remove("bx-x");
  navlist.classList.remove("open");
}

// parallax
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show-items");
    } else {
      entry.target.classList.remove("show-items");
    }
  });
});

const scrollScale = document.querySelectorAll(".scroll-scale");
scrollScale.forEach((el) => observer.observe(el));

const scrollBottom = document.querySelectorAll(".scroll-bottom");
scrollBottom.forEach((el) => observer.observe(el));

const scrollSTop = document.querySelectorAll(".scroll-top");
scrollTop.forEach((el) => observer.observe(el));
