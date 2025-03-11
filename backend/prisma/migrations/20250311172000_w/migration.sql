/*
  Warnings:

  - Added the required column `cursoId` to the `examenes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `examenes` ADD COLUMN `cursoId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `examenes` ADD CONSTRAINT `examenes_cursoId_fkey` FOREIGN KEY (`cursoId`) REFERENCES `cursos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
