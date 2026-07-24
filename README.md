# AfriConnect Summit 2027
*Nom :SARR Ibrahima*
*Classe : L1 IAGE NR* 

## Description du projet
C'est une site vitrine pour "AfriConnect Summit", une conférence tech panafricaine
fictive qui se tient à Dakar, Sénégal, du 12 au 14 mars 2027. Le site
présente l'événement, son programme sur 3 jours, ses intervenants et
permet aux visiteurs de s'inscrire.
Le site comporte 4 pages : 
-Accueil, 
-Programme, 
-Intervenants, 
-Contact,

## Technologies utilisées
- HTML5 sémantique
- CSS3 (variables CSS, Flexbox, Grid, dark mode, animations au scroll, responsive) 
- JavaScript vanilla (aucun framework, aucune librairie)
- Google Fonts (Poppins + Inter)
- Bootstrap Icons (CDN)

## Fonctionnalités JavaScript implémentées
1. Dark mode / Light mode avec sauvegarde dans localStorage (persistant entre les pages)
2. Navbar qui change d'apparence au scroll + menu hamburger sur mobile
3. Animations d'apparition au scroll avec IntersectionObserver
4. Compte à rebours en temps réel jusqu'à la date de la conférence
5. Compteurs animés des chiffres clés (participants, intervenants...)
6. Onglets pour naviguer entre les 3 jours du programme
7. Filtrage dynamique des intervenants par thématique
8. Validation complète du formulaire d'inscription (regex email, longueur téléphone/message)
9. Bouton retour en haut après 300px de scroll
10. Année dynamique dans le footer

La FAQ de la page contact est un accordéon géré uniquement en CSS
(`:focus-within`), sans aucun JavaScript.

## Responsive
Le site est testé et adapté sur 3 breakpoints : 
-Mobile (375px),
-Tablette (768px), 
-Desktop (1200px et plus).

## Lien GitHub Pages
https://ibrahima-sarr14.github.io/Sarr-Ibrahima-AfriconnectSummit/

## Ressources consultées
- MDN Web Docs (https://developer.mozilla.org/fr/)
- CSS-Tricks pour Flexbox et Grid (https://css-tricks.com/)
- Images libres : Unsplash (https://unsplash.com/)
- Icônes : Bootstrap Icons (https://icons.getbootstrap.com/)
- Palette de couleurs : Coolors (https://coolors.co/)