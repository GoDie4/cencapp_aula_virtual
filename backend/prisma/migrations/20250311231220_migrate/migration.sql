/*
  Warnings:

  - You are about to drop the `venta` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `examenes` MODIFY `claseId` VARCHAR(191) NULL,
    MODIFY `cursoId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `venta`;
