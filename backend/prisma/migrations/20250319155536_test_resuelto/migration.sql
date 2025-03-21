/*
  Warnings:

  - Added the required column `tipo_prueba` to the `examen_resueltos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `examen_resueltos` ADD COLUMN `tipo_prueba` ENUM('EXAMEN', 'EJERCICIOS') NOT NULL;
