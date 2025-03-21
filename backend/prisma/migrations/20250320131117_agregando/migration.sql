-- AlterTable
ALTER TABLE `comentarios` ADD COLUMN `estado` ENUM('pendiente', 'respondido') NOT NULL DEFAULT 'pendiente';

-- CreateTable
CREATE TABLE `respuestas_comentarios` (
    `id` CHAR(36) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `comentarioId` VARCHAR(191) NOT NULL,
    `respuesta` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `respuestas_comentarios` ADD CONSTRAINT `respuestas_comentarios_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `respuestas_comentarios` ADD CONSTRAINT `respuestas_comentarios_comentarioId_fkey` FOREIGN KEY (`comentarioId`) REFERENCES `comentarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
