-- =================================================================
-- Script de création de la base de données "trouve_ton_artisan"
-- =================================================================

-- 1. Création de la base de données si elle n'existe pas
CREATE DATABASE IF NOT EXISTS trouve_ton_artisan
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 2. Sélection de la base de données pour les commandes suivantes
USE trouve_ton_artisan;

-- 3. Création de la table "categories"
-- Contient les grandes catégories de métiers (Bâtiment, Services, etc.)
DROP TABLE IF EXISTS artisans;
DROP TABLE IF EXISTS specialites;
DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

-- 4. Création de la table "specialites"
-- Contient les spécialités précises (Plomberie, Boulangerie, etc.)
CREATE TABLE specialites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    categorie_id INT,
    CONSTRAINT fk_specialite_categorie
        FOREIGN KEY (categorie_id) REFERENCES categories(id)
        ON DELETE SET NULL -- Si une catégorie est supprimée, la spécialité devient non catégorisée
) ENGINE=InnoDB;

-- 5. Création de la table "artisans"
-- Contient toutes les informations sur un artisan
CREATE TABLE artisans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    note FLOAT,
    location VARCHAR(255),
    about TEXT,
    website VARCHAR(255),
    image_url VARCHAR(255),
    is_artisan_of_the_month BOOLEAN DEFAULT FALSE,
    specialite_id INT,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    CONSTRAINT fk_artisan_specialite
        FOREIGN KEY (specialite_id) REFERENCES specialites(id)
        ON DELETE SET NULL -- Si une spécialité est supprimée, l'artisan est conservé
) ENGINE=InnoDB;