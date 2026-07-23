// main.js
// toutes les fonctionnalités JS du site AfriConnect Summit
// pas de jquery, pas de framework, que du JS normal

document.addEventListener("DOMContentLoaded", function(){

  // ---- dark mode ----
  const btnTheme = document.getElementById("themeToggle");
  const iconTheme = btnTheme ? btnTheme.querySelector("i") : null;
  let themeSauvegarde = localStorage.getItem("theme");

  if(themeSauvegarde === "dark"){
    document.documentElement.setAttribute("data-theme", "dark");
    if(iconTheme) iconTheme.className = "bi bi-sun-fill";
  }

  if(btnTheme){
    btnTheme.addEventListener("click", function(){
      if(document.documentElement.getAttribute("data-theme") === "dark"){
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("theme","light");
        if(iconTheme) iconTheme.className = "bi bi-moon-stars-fill";
      }else{
        document.documentElement.setAttribute("data-theme","dark");
        localStorage.setItem("theme","dark");
        if(iconTheme) iconTheme.className = "bi bi-sun-fill";
      }
    });
  }

  // ---- navbar qui change quand on scroll ----
  const nav = document.getElementById("navbar");
  window.addEventListener("scroll", function(){
    if(nav){
      if(window.scrollY > 80){
        nav.classList.add("scrolled");
      }else{
        nav.classList.remove("scrolled");
      }
    }
  });

  // ---- menu hamburger mobile ----
  const burger = document.getElementById("hamburger");
  const menu = document.getElementById("navLinks");
  if(burger && menu){
    burger.addEventListener("click", function(){
      burger.classList.toggle("open");
      menu.classList.toggle("open");
    });
    // on ferme le menu si on clique sur un des liens
    const liens = menu.querySelectorAll("a");
    for(let i=0; i<liens.length; i++){
      liens[i].addEventListener("click", function(){
        burger.classList.remove("open");
        menu.classList.remove("open");
      });
    }
  }

  // ---- annee automatique dans le footer ----
  const anneeSpan = document.getElementById("year");
  if(anneeSpan){
    let d = new Date();
    anneeSpan.textContent = d.getFullYear();
  }

  // ---- bouton retour en haut ----
  const btnTop = document.getElementById("backToTop");
  if(btnTop){
    window.addEventListener("scroll", function(){
      if(window.scrollY > 300){
        btnTop.classList.add("show");
      }else{
        btnTop.classList.remove("show");
      }
    });
    btnTop.addEventListener("click", function(){
      window.scrollTo({top:0, behavior:"smooth"});
    });
  }

  // ---- animation au scroll avec IntersectionObserver ----
  const elementsReveal = document.querySelectorAll(".reveal");
  if(elementsReveal.length > 0){
    let observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: 0.15});

    elementsReveal.forEach(function(el){
      observer.observe(el);
    });
  }

  // ---- countdown vers la date du sommet ----
  const jourEl = document.getElementById("days");
  if(jourEl){
    const heureEl = document.getElementById("hours");
    const minEl = document.getElementById("minutes");
    const secEl = document.getElementById("seconds");
    const dateCible = new Date("2027-03-12T09:00:00").getTime();

    function majCountdown(){
      const maintenant = new Date().getTime();
      const diff = dateCible - maintenant;

      if(diff <= 0){
        jourEl.textContent = "00";
        heureEl.textContent = "00";
        minEl.textContent = "00";
        secEl.textContent = "00";
        return;
      }

      const j = Math.floor(diff / (1000*60*60*24));
      const h = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
      const m = Math.floor((diff % (1000*60*60)) / (1000*60));
      const s = Math.floor((diff % (1000*60)) / 1000);

      jourEl.textContent = j < 10 ? "0"+j : j;
      heureEl.textContent = h < 10 ? "0"+h : h;
      minEl.textContent = m < 10 ? "0"+m : m;
      secEl.textContent = s < 10 ? "0"+s : s;
    }

    majCountdown();
    setInterval(majCountdown, 1000);
  }

  // ---- compteurs animes des stats ----
  const chiffres = document.querySelectorAll(".stat-number");
  if(chiffres.length > 0){
    let dejaLance = false;
    const statsSection = document.getElementById("stats");

    let obsStats = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting && !dejaLance){
          dejaLance = true;
          chiffres.forEach(function(chiffre){
            const cible = parseInt(chiffre.getAttribute("data-target"));
            let compteur = 0;
            const pas = cible / 75; // 75 étapes environ pour l'animation

            let intervalle = setInterval(function(){
              compteur += pas;
              if(compteur >= cible){
                chiffre.textContent = cible;
                clearInterval(intervalle);
              }else{
                chiffre.textContent = Math.floor(compteur);
              }
            }, 20);
          });
        }
      });
    }, {threshold:0.4});

    if(statsSection) obsStats.observe(statsSection);
  }

  // ---- onglets du programme (jour 1/2/3) ----
  const boutonsTab = document.querySelectorAll(".tab-btn");
  if(boutonsTab.length > 0){
    boutonsTab.forEach(function(btn){
      btn.addEventListener("click", function(){
        const jour = btn.getAttribute("data-day");

        boutonsTab.forEach(function(b){ b.classList.remove("active"); });
        document.querySelectorAll(".tab-content").forEach(function(c){
          c.classList.remove("active");
        });

        btn.classList.add("active");
        document.getElementById("day-"+jour).classList.add("active");
      });
    });
  }

  // ---- filtres intervenants ----
  const boutonsFiltre = document.querySelectorAll(".filter-btn");
  const cartesIntervenants = document.querySelectorAll("#speakersGrid .speaker-card");
  if(boutonsFiltre.length > 0){
    boutonsFiltre.forEach(function(btn){
      btn.addEventListener("click", function(){
        const filtre = btn.getAttribute("data-filter");

        boutonsFiltre.forEach(function(b){ b.classList.remove("active"); });
        btn.classList.add("active");

        cartesIntervenants.forEach(function(carte){
          const cat = carte.getAttribute("data-category");
          if(filtre === "tous" || cat === filtre){
            carte.classList.remove("hidden");
          }else{
            carte.classList.add("hidden");
          }
        });
      });
    });
  }

  // ---- validation du formulaire d'inscription ----
  const formu = document.getElementById("registerForm");
  if(formu){
    formu.addEventListener("submit", function(e){
      e.preventDefault();

      let ok = true;

      const nom = document.getElementById("fullname");
      const mail = document.getElementById("email");
      const tel = document.getElementById("phone");
      const partic = document.getElementById("participation");
      const pays = document.getElementById("country");
      const msg = document.getElementById("message");
      const succes = document.getElementById("successMessage");

      // nom : juste requis
      if(nom.value.trim() === ""){
        afficherErreur(nom, "error-fullname", "Le nom complet est requis.");
        ok = false;
      }else{
        afficherOk(nom, "error-fullname");
      }

      // email avec une petite regex
      const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!regexMail.test(mail.value.trim())){
        afficherErreur(mail, "error-email", "Email invalide.");
        ok = false;
      }else{
        afficherOk(mail, "error-email");
      }

      // telephone, minimum 8 chiffres (on enleve tout sauf les chiffres)
      const chiffresTel = tel.value.replace(/\D/g, "");
      if(chiffresTel.length < 8){
        afficherErreur(tel, "error-phone", "Numéro trop court (8 chiffres min).");
        ok = false;
      }else{
        afficherOk(tel, "error-phone");
      }

      if(partic.value === ""){
        afficherErreur(partic, "error-participation", "Choisis un type de participation.");
        ok = false;
      }else{
        afficherOk(partic, "error-participation");
      }

      if(pays.value === ""){
        afficherErreur(pays, "error-country", "Choisis ton pays.");
        ok = false;
      }else{
        afficherOk(pays, "error-country");
      }

      if(msg.value.trim().length < 20){
        afficherErreur(msg, "error-message", "20 caractères minimum pour le message.");
        ok = false;
      }else{
        afficherOk(msg, "error-message");
      }

      if(ok){
        succes.classList.add("show");
        formu.reset();
        formu.querySelectorAll(".valid, .invalid").forEach(function(champ){
          champ.classList.remove("valid","invalid");
        });
        setTimeout(function(){
          succes.classList.remove("show");
        }, 5000);
      }
    });
  }

  function afficherErreur(champ, idErreur, texte){
    champ.classList.add("invalid");
    champ.classList.remove("valid");
    document.getElementById(idErreur).textContent = texte;
  }

  function afficherOk(champ, idErreur){
    champ.classList.add("valid");
    champ.classList.remove("invalid");
    document.getElementById(idErreur).textContent = "";
  }

});