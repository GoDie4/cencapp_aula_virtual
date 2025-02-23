-- CreateTable
CREATE TABLE `cursos` (
    `id` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(255) NOT NULL,
    `imagen` VARCHAR(255) NOT NULL,
    `precio` DECIMAL(65, 30) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cursos_detalles` (
    `id` VARCHAR(191) NOT NULL,
    `cursoId` VARCHAR(191) NOT NULL,
    `presentacion` TEXT NOT NULL,
    `dirigido` TEXT NOT NULL,
    `metodologia` TEXT NOT NULL,
    `certificacion` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `cursos_detalles_cursoId_key`(`cursoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cursos_detalles` ADD CONSTRAINT `cursos_detalles_cursoId_fkey` FOREIGN KEY (`cursoId`) REFERENCES `cursos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
