# TPMailer
## TP de mise en pratique du cours d'API REST : création d'une application d'envoi de campagnes d'emailing

Application créée avec nodeJS.

## Détail de l'application
L'application Mailer permet de :
- Lister les campagnes d'emailing
- Supprimer une campagne
- Créer une campagne (sujet, contenu, date d'envoi)
- Modifier une campagne
- Envoyer la campagne à tous les contacts (l'envoi d'une campagne génère autant de mails que de contacts existants).

L'utilisateur doit être authentifié pour utiliser ce service, avec un identifiant et un mot de passe.

## Installation du projet
- Cloner le projet
- Dans un terminal, lancer la commande : ***npm install*** ; cette commande permettra d'installer tous les modules en dépendance du projet.

## Démarrer le serveur nodeJS
- Dans un terminal, lancer la commande : ***node index.js***