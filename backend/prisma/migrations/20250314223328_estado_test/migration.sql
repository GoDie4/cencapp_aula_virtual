/*
  Warnings:

  - Added the required column `estado` to the `examenes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `examenes` ADD COLUMN `estado` ENUM('Pendiente', 'EnProceso', 'Finalizado') NOT NULL;
