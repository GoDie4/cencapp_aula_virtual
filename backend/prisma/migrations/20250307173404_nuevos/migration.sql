/*
  Warnings:

  - You are about to drop the `clases` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `secciones` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `clases` DROP FOREIGN KEY `clases_seccionId_fkey`;

-- DropForeignKey
ALTER TABLE `secciones` DROP FOREIGN KEY `secciones_cursoId_fkey`;

-- DropTable
DROP TABLE `clases`;

-- DropTable
DROP TABLE `secciones`;
