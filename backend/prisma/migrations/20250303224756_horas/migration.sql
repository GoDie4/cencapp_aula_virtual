/*
  Warnings:

  - Added the required column `horas` to the `cursos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cursos` ADD COLUMN `horas` INTEGER NOT NULL;
