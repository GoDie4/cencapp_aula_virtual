/*
  Warnings:

  - You are about to drop the `seccion` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `clases` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `clases` DROP FOREIGN KEY `Clases_seccionId_fkey`;

-- DropForeignKey
ALTER TABLE `seccion` DROP FOREIGN KEY `Seccion_cursoId_fkey`;

-- DropIndex
DROP INDEX `Clases_seccionId_fkey` ON `clases`;

-- AlterTable
ALTER TABLE `clases` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- DropTable
DROP TABLE `seccion`;

-- CreateTable
CREATE TABLE `secciones` (
    `id` VARCHAR(191) NOT NULL,
    `posicion` INTEGER NOT NULL,
    `cursoId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `secciones` ADD CONSTRAINT `secciones_cursoId_fkey` FOREIGN KEY (`cursoId`) REFERENCES `cursos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `clases` ADD CONSTRAINT `clases_seccionId_fkey` FOREIGN KEY (`seccionId`) REFERENCES `secciones`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
