/*
  Warnings:

  - You are about to drop the column `cursoId` on the `examenes` table. All the data in the column will be lost.
  - Added the required column `claseId` to the `examenes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `examenes` DROP FOREIGN KEY `examenes_cursoId_fkey`;

-- DropIndex
DROP INDEX `examenes_cursoId_fkey` ON `examenes`;

-- AlterTable
ALTER TABLE `examenes` DROP COLUMN `cursoId`,
    ADD COLUMN `claseId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `examenes` ADD CONSTRAINT `examenes_claseId_fkey` FOREIGN KEY (`claseId`) REFERENCES `clases`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
