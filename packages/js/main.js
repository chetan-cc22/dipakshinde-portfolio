/*==================== MENU SHOW & HIDE ====================*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*==================== REMOVE MENU ON MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");
function linkAction() {
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll("[data-target]"),
  tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach((tc) =>
      tc.classList.remove("qualification__active")
    );
    target.classList.add("qualification__active");

    tabs.forEach((t) => t.classList.remove("qualification__active"));
    tab.classList.add("qualification__active");
  });
});

if (tabs.length > 0) tabs[0].click();

/*==================== SCROLL ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");
function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute("id");

    const link = document.querySelector(
      ".nav__menu a[href*=" + sectionId + "]"
    );
    if (!link) return;

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight)
      link.classList.add("active-link");
    else link.classList.remove("active-link");
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== HEADER SHADOW ====================*/
function scrollHeader() {
  const nav = document.getElementById("header");
  if (window.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SCROLL UP ====================*/
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up");
  if (window.scrollY >= 560) scrollUp.classList.add("show-scroll");
  else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

/*==================== DARK / LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
    iconTheme
  );
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  localStorage.setItem(
    "selected-theme",
    document.body.classList.contains(darkTheme) ? "dark" : "light"
  );
  localStorage.setItem(
    "selected-icon",
    themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun"
  );
});

/*==================== PRELOADER ====================*/
let preloader = document.getElementById("loading");
function preLoader() {
  if (preloader) preloader.style.display = "none";
}

/*====================================================
  EMAILJS CONFIGURATION (VERY IMPORTANT)
====================================================*/

// 👉 PASTE YOUR EMAILJS SERVICE ID HERE
const EMAILJS_SERVICE_ID = "service_su2rhql";

// 👉 PASTE YOUR CONTACT-US TEMPLATE ID HERE
const CONTACT_TEMPLATE_ID = "template_8wj0ifp";

// 👉 PASTE YOUR AUTO-REPLY TEMPLATE ID HERE
const AUTOREPLY_TEMPLATE_ID = "template_5zmvwz4";

/*==================== SEND EMAIL TO DIPAK ====================*/
const sendEmail = (params) => {
  return emailjs.send(
    EMAILJS_SERVICE_ID,
    CONTACT_TEMPLATE_ID,
    params
  );
};

/*==================== SEND AUTO REPLY TO USER ====================*/
const sendAutoReply = (params) => {
  return emailjs.send(
    EMAILJS_SERVICE_ID,
    AUTOREPLY_TEMPLATE_ID,
    params
  );
};

// /*==================== EMAIL VALIDATION ====================*/
// const validateEmail = (email, params) => {
//   const apiKey = "cf7383198f5a4c8a8b282a00c50dd08b";
//   const apiUrl = `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${encodeURIComponent(
//     email
//   )}`;

//   fetch(apiUrl)
//     .then((res) => res.json())
//     .then((data) => {
//       if (data.deliverability === "DELIVERABLE") {
//         sendEmail(params)
//           .then(() => sendAutoReply(params))
//           .then(() => {
//             document.getElementById("contact-form").reset();
//             alert("Message sent successfully!");
//             document.getElementById("email-submit").innerText = "Send Message";
//           })
//           .catch((err) => {
//             console.error(err);
//             alert("Email sending failed.");
//             document.getElementById("email-submit").innerText = "Send Message";
//           });
//       } else {
//         alert("Invalid email address");
//         document.getElementById("email-submit").innerText = "Send Message";
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//       sendEmail(params).then(() => sendAutoReply(params));
//     });
// };

/*==================== FORM SUBMIT ====================*/
document
  .getElementById("contact-form")
  .addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const emailRegex =
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      alert("Invalid email address");
      return;
    }

    document.getElementById("email-submit").innerText = "Sending...";

    const params = { name, email, message };
    sendEmail(params)
  .then(() => sendAutoReply(params))
  .then(() => {
    document.getElementById("contact-form").reset();
    alert("Message sent successfully!");
    document.getElementById("email-submit").innerText = "Send Message";
  })
  .catch((err) => {
    console.error(err);
    alert("Failed to send message. Please try again.");
    document.getElementById("email-submit").innerText = "Send Message";
  });
  });
