/*
  Warnings:

  - Added the required column `nombre` to the `secciones` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `secciones` ADD COLUMN `nombre` VARCHAR(191) NOT NULL;
