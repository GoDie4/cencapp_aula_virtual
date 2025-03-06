/*
  Warnings:

  - You are about to drop the column `horas` on the `clases` table. All the data in the column will be lost.
  - Added the required column `duracion` to the `clases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `posicion` to the `clases` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `clases` DROP COLUMN `horas`,
    ADD COLUMN `duracion` VARCHAR(255) NOT NULL,
    ADD COLUMN `posicion` INTEGER NOT NULL;
