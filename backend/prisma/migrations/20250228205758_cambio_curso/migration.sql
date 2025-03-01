/*
  Warnings:

  - You are about to drop the column `cursoId` on the `cursos_detalles` table. All the data in the column will be lost.
  - Added the required column `certificacion` to the `cursos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `detallesId` to the `cursos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dirigido` to the `cursos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metodologia` to the `cursos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `presentacion` to the `cursos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cursos` DROP FOREIGN KEY `cursos_categoriaId_fkey`;

-- DropForeignKey
ALTER TABLE `cursos_detalles` DROP FOREIGN KEY `cursos_detalles_cursoId_fkey`;

-- DropForeignKey
ALTER TABLE `usuarios` DROP FOREIGN KEY `usuarios_rolId_fkey`;

-- DropIndex
DROP INDEX `cursos_categoriaId_fkey` ON `cursos`;

-- DropIndex
DROP INDEX `cursos_detalles_cursoId_key` ON `cursos_detalles`;

-- DropIndex
DROP INDEX `usuarios_rolId_fkey` ON `usuarios`;

-- AlterTable
ALTER TABLE `cursos` ADD COLUMN `certificacion` TEXT NOT NULL,
    ADD COLUMN `detallesId` VARCHAR(191) NOT NULL,
    ADD COLUMN `dirigido` TEXT NOT NULL,
    ADD COLUMN `metodologia` TEXT NOT NULL,
    ADD COLUMN `presentacion` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `cursos_detalles` DROP COLUMN `cursoId`;

-- AddForeignKey
ALTER TABLE `cursos` ADD CONSTRAINT `cursos_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `categorias`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cursos` ADD CONSTRAINT `cursos_detallesId_fkey` FOREIGN KEY (`detallesId`) REFERENCES `cursos_detalles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_rolId_fkey` FOREIGN KEY (`rolId`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
