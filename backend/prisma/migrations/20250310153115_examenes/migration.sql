-- CreateTable
CREATE TABLE `examenes` (
    `id` VARCHAR(191) NOT NULL,
    `url_archivo` VARCHAR(191) NOT NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `descripcion` TEXT NOT NULL,
    `cursoId` VARCHAR(191) NOT NULL,
    `fecha_inicio` DATETIME(3) NOT NULL,
    `fecha_fin` DATETIME(3) NOT NULL,
    `tiempo_limite` INTEGER NULL,
    `tipo_prueba` ENUM('EXAMEN', 'EJERCICIOS') NOT NULL,
    `puntaje_maxima` DECIMAL(65, 30) NOT NULL,
    `activo` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `examen_resueltos` (
    `id` VARCHAR(191) NOT NULL,
    `examenId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `url_archivo_resultado` VARCHAR(191) NOT NULL,
    `puntuacion_total` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `examenes` ADD CONSTRAINT `examenes_cursoId_fkey` FOREIGN KEY (`cursoId`) REFERENCES `cursos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `examen_resueltos` ADD CONSTRAINT `examen_resueltos_examenId_fkey` FOREIGN KEY (`examenId`) REFERENCES `examenes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `examen_resueltos` ADD CONSTRAINT `examen_resueltos_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
