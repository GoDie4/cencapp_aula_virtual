/*
  Warnings:

  - You are about to drop the `secciones_cursos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `secciones_cursos` DROP FOREIGN KEY `secciones_cursos_cursoId_fkey`;

-- DropTable
DROP TABLE `secciones_cursos`;

-- CreateTable
CREATE TABLE `Seccion` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `cursoId` VARCHAR(191) NOT NULL,
    `posicion` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Clases` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `duracion` VARCHAR(191) NOT NULL,
    `posicion` INTEGER NOT NULL,
    `url_video` VARCHAR(191) NOT NULL,
    `seccionId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CursoPagado` (
    `id` VARCHAR(191) NOT NULL,
    `mercadoPaymentId` VARCHAR(191) NOT NULL,
    `cursoId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `totalPagado` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CursoPagadoDetalles` (
    `id` VARCHAR(191) NOT NULL,
    `cursoPagadoId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Seccion` ADD CONSTRAINT `Seccion_cursoId_fkey` FOREIGN KEY (`cursoId`) REFERENCES `cursos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Clases` ADD CONSTRAINT `Clases_seccionId_fkey` FOREIGN KEY (`seccionId`) REFERENCES `Seccion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
