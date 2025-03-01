/*
  Warnings:

  - Added the required column `url_icono` to the `categorias` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `categorias` ADD COLUMN `url_icono` VARCHAR(255) NOT NULL;
