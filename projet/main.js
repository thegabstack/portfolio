// main.js - atualizado
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".sidebar a");
  links.forEach(link => {
    // set active based on current path / hash
    if (link.getAttribute("href") === window.location.pathname.split("/").pop() || 
        (link.getAttribute("href") === "index.html" && window.location.pathname.endsWith("/"))) {
      link.classList.add("active");
    }
    link.addEventListener("click", (e) => {
      links.forEach(l => l.classList.remove("active"));
      e.currentTarget.classList.add("active");
      // smooth scroll if anchor
      const href = e.currentTarget.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({behavior:"smooth", block:"center"});
      }
    });
  });

  // Optional: highlight section when scrolling
  const sections = document.querySelectorAll("main section, main h1");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = entry.target.id;
      if(entry.isIntersecting && id){
        const a = document.querySelector(`.sidebar a[href="#${id}"]`);
        if(a){
          links.forEach(l => l.classList.remove("active"));
          a.classList.add("active");
        }
      }
    });
  }, {threshold:0.35});
  sections.forEach(s => observer.observe(s));
});
