/*
  Warnings:

  - You are about to drop the column `certificacion` on the `cursos` table. All the data in the column will be lost.
  - You are about to drop the column `dirigido` on the `cursos` table. All the data in the column will be lost.
  - You are about to drop the column `metodologia` on the `cursos` table. All the data in the column will be lost.
  - You are about to drop the column `objetivo` on the `cursos` table. All the data in the column will be lost.
  - You are about to drop the column `presentacion` on the `cursos` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cursoId]` on the table `cursos_detalles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cursoId` to the `cursos_detalles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cursos` DROP COLUMN `certificacion`,
    DROP COLUMN `dirigido`,
    DROP COLUMN `metodologia`,
    DROP COLUMN `objetivo`,
    DROP COLUMN `presentacion`;

-- AlterTable
ALTER TABLE `cursos_detalles` ADD COLUMN `cursoId` VARCHAR(191) NOT NULL,
    ADD COLUMN `objetivo` LONGTEXT NOT NULL DEFAULT '',
    MODIFY `presentacion` LONGTEXT NULL DEFAULT '',
    MODIFY `dirigido` LONGTEXT NULL DEFAULT '',
    MODIFY `metodologia` LONGTEXT NULL DEFAULT '',
    MODIFY `certificacion` LONGTEXT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `secciones_cursos` MODIFY `cursoId` CHAR(36) NOT NULL,
    MODIFY `seccionId` CHAR(36) NOT NULL;

-- CreateTable
CREATE TABLE `beneficios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `icono` VARCHAR(255) NOT NULL,
    `texto` TEXT NOT NULL,
    `cursoId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cursos_usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cursoId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `avance` VARCHAR(191) NULL,
    `tipo` ENUM('MATRICULADO', 'CARGO') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `cursos_detalles_cursoId_key` ON `cursos_detalles`(`cursoId`);

-- AddForeignKey
ALTER TABLE `cursos_detalles` ADD CONSTRAINT `cursos_detalles_cursoId_fkey` FOREIGN KEY (`cursoId`) REFERENCES `cursos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `beneficios` ADD CONSTRAINT `beneficios_cursoId_fkey` FOREIGN KEY (`cursoId`) REFERENCES `cursos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cursos_usuarios` ADD CONSTRAINT `cursos_usuarios_cursoId_fkey` FOREIGN KEY (`cursoId`) REFERENCES `cursos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cursos_usuarios` ADD CONSTRAINT `cursos_usuarios_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `secciones_cursos` ADD CONSTRAINT `secciones_cursos_cursoId_fkey` FOREIGN KEY (`cursoId`) REFERENCES `cursos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
