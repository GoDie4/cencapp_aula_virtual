-- CreateTable
CREATE TABLE `Certificados` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `emitido_en` DATETIME(3) NOT NULL,
    `url_archivo` VARCHAR(191) NOT NULL,
    `size` INTEGER NOT NULL,
    `type_mime` VARCHAR(191) NOT NULL,
    `usuarioId` VARCHAR(191) NOT NULL,
    `cursoId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Certificados` ADD CONSTRAINT `Certificados_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Certificados` ADD CONSTRAINT `Certificados_cursoId_fkey` FOREIGN KEY (`cursoId`) REFERENCES `cursos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
