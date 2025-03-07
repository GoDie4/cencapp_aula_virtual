/*
  Warnings:

  - Added the required column `horas` to the `Clases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `posicion` to the `Seccion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `clases` ADD COLUMN `horas` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `seccion` ADD COLUMN `posicion` INTEGER NOT NULL;
