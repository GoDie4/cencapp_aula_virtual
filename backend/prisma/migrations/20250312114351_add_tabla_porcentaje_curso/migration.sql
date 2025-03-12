-- CreateTable
CREATE TABLE `PorcentajeCurso` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `cursoId` VARCHAR(191) NOT NULL,
    `porcentaje` INTEGER NOT NULL DEFAULT 0,
    `segundosDeClase` DOUBLE NOT NULL DEFAULT 0,
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PorcentajeCurso_userId_cursoId_key`(`userId`, `cursoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PorcentajeCurso` ADD CONSTRAINT `PorcentajeCurso_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PorcentajeCurso` ADD CONSTRAINT `PorcentajeCurso_cursoId_fkey` FOREIGN KEY (`cursoId`) REFERENCES `cursos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
