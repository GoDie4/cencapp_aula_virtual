/*
  Warnings:

  - You are about to drop the column `slug` on the `clases` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `comentarios` DROP FOREIGN KEY `comentarios_claseId_fkey`;

-- DropForeignKey
ALTER TABLE `comentarios` DROP FOREIGN KEY `comentarios_userId_fkey`;

-- DropIndex
DROP INDEX `comentarios_claseId_fkey` ON `comentarios`;

-- DropIndex
DROP INDEX `comentarios_userId_fkey` ON `comentarios`;

-- AlterTable
ALTER TABLE `clases` DROP COLUMN `slug`;

-- CreateTable
CREATE TABLE `venta` (
    `id` VARCHAR(191) NOT NULL,
    `mercadoPaymentId` VARCHAR(191) NOT NULL,
    `cursoId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `totalPagado` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `comentarios` ADD CONSTRAINT `comentarios_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comentarios` ADD CONSTRAINT `comentarios_claseId_fkey` FOREIGN KEY (`claseId`) REFERENCES `clases`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
