/*
  Warnings:

  - You are about to alter the column `nombre` on the `clases` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `url_video` on the `clases` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `seccionId` on the `clases` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `duracion` on the `clases` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.

*/
-- DropForeignKey
ALTER TABLE `clases` DROP FOREIGN KEY `clases_seccionId_fkey`;

-- DropIndex
DROP INDEX `clases_seccionId_fkey` ON `clases`;

-- AlterTable
ALTER TABLE `clases` MODIFY `nombre` VARCHAR(191) NOT NULL,
    MODIFY `url_video` VARCHAR(191) NOT NULL,
    MODIFY `seccionId` VARCHAR(191) NOT NULL,
    MODIFY `duracion` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `venta` (
    `id` VARCHAR(191) NOT NULL,
    `mercadoPaymentId` VARCHAR(191) NOT NULL,
    `cursoId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `totalPagado` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detalles_venta` (
    `id` VARCHAR(191) NOT NULL,
    `cursoPagadoId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comentarios` (
    `id` CHAR(36) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `claseId` VARCHAR(191) NOT NULL,
    `comentario` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `clases` ADD CONSTRAINT `clases_seccionId_fkey` FOREIGN KEY (`seccionId`) REFERENCES `secciones`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comentarios` ADD CONSTRAINT `comentarios_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comentarios` ADD CONSTRAINT `comentarios_claseId_fkey` FOREIGN KEY (`claseId`) REFERENCES `clases`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
