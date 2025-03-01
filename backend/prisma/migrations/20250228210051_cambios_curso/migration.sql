/*
  Warnings:

  - You are about to drop the column `detallesId` on the `cursos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `cursos` DROP FOREIGN KEY `cursos_detallesId_fkey`;

-- DropIndex
DROP INDEX `cursos_detallesId_fkey` ON `cursos`;

-- AlterTable
ALTER TABLE `cursos` DROP COLUMN `detallesId`;
