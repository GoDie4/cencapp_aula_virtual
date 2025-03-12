/*
  Warnings:

  - You are about to drop the column `segundosDeClase` on the `porcentajecurso` table. All the data in the column will be lost.
  - Added the required column `ultimaClase` to the `PorcentajeCurso` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `porcentajecurso` DROP COLUMN `segundosDeClase`,
    ADD COLUMN `ultimaClase` JSON NOT NULL;
