document.getElementById("year").textContent = new Date().getFullYear();

const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const stored = localStorage.getItem("theme");
if (stored) root.setAttribute("data-theme", stored);

themeToggle.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
});

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  })
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");
const submitBtn = form.querySelector(".form-submit");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  status.className = "form-status";
  status.textContent = "";

  if (!form.checkValidity()) {
    status.classList.add("error");
    status.textContent = "Please fill in all fields with a valid email.";
    form.reportValidity();
    return;
  }

  if (form.action.includes("YOUR_FORM_ID")) {
    status.classList.add("error");
    status.textContent =
      "Form not yet configured. Add your Formspree form ID in index.html.";
    return;
  }

  submitBtn.classList.add("is-loading");
  submitBtn.disabled = true;
  submitBtn.querySelector(".submit-label").textContent = "Sending...";

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      status.classList.add("success");
      status.textContent = "Thanks! Your message is on its way. ✓";
      form.reset();
    } else {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error || "Something went wrong.");
    }
  } catch (err) {
    status.classList.add("error");
    status.textContent =
      "Couldn't send right now. Email me directly at casepoint20252026@gmail.com.";
  } finally {
    submitBtn.classList.remove("is-loading");
    submitBtn.disabled = false;
    submitBtn.querySelector(".submit-label").textContent = "Send message";
  }
});
