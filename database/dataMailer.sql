-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données :  `dataMailer`
--

CREATE DATABASE dataMailer CHARACTER SET utf8 COLLATE utf8_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `campaigns`
--

CREATE TABLE `campaigns` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `dateSend` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `campaigns`
--

INSERT INTO `campaigns` (`id`, `name`, `subject`, `content`, `dateSend`) VALUES
(1, 'Green friday', 'Lorem ipsum', 'Lorem ipsum', '2017-12-15 00:00:00');

-- --------------------------------------------------------

--
-- Structure de la table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `contacts`
--

INSERT INTO `contacts` (`id`, `email`) VALUES
(1, 'test@gmail.com'),
(2, 'test@yopmail.com'),
(3, 'testabcdefg@gmail.com'),
(4, 'testabcdefg@yopmail.com'),
(5, 'bertrand@gmail.com');

-- --------------------------------------------------------

--
-- Structure de la table `sends`
--

CREATE TABLE `sends` (
  `idCampaign` int(11) NOT NULL,
  `idContact` int(11) NOT NULL,
  `idStatus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `sends`
--

INSERT INTO `sends` (`idCampaign`, `idContact`, `idStatus`) VALUES
(1, 3, 1),
(1, 2, 3);

-- --------------------------------------------------------

--
-- Structure de la table `statuses`
--

CREATE TABLE `statuses` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `statuses`
--

INSERT INTO `statuses` (`id`, `name`) VALUES
(1, 'envoyé'),
(2, 'échec'),
(3, 'en attente'),
(4, 'annulé');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `email`, `password`) VALUES
(1, 'imie@imie.fr', '123');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `campaigns`
--
ALTER TABLE `campaigns`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `sends`
--
ALTER TABLE `sends`
  ADD KEY `idCampaign` (`idCampaign`),
  ADD KEY `idContact` (`idContact`);

--
-- Index pour la table `statuses`
--
ALTER TABLE `statuses`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `campaigns`
--
ALTER TABLE `campaigns`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pour la table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT pour la table `statuses`
--
ALTER TABLE `statuses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `sends`
--
ALTER TABLE `sends`
  ADD CONSTRAINT `sends_ibfk_1` FOREIGN KEY (`idCampaign`) REFERENCES `campaigns` (`id`),
  ADD CONSTRAINT `sends_ibfk_2` FOREIGN KEY (`idContact`) REFERENCES `contacts` (`id`),
  ADD CONSTRAINT `sends_ibfk_3` FOREIGN KEY (`idStatus`) REFERENCES `statuses` (`id`);

