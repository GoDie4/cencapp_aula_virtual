/*
  Warnings:

  - Added the required column `claseId` to the `Materiales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descripcion` to the `Materiales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `materiales` ADD COLUMN `claseId` VARCHAR(191) NOT NULL,
    ADD COLUMN `descripcion` TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE `Materiales` ADD CONSTRAINT `Materiales_claseId_fkey` FOREIGN KEY (`claseId`) REFERENCES `clases`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
