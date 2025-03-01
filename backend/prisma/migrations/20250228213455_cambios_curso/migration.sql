/*
  Warnings:

  - Added the required column `banner` to the `cursos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cursos` ADD COLUMN `banner` VARCHAR(255) NOT NULL;
