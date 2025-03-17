/*
  Warnings:

  - You are about to drop the column `puntuacion_total` on the `examen_resueltos` table. All the data in the column will be lost.
  - Added the required column `puntaje_final` to the `examen_resueltos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `examen_resueltos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mime_type` to the `examenes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `examenes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `examen_resueltos` DROP COLUMN `puntuacion_total`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `estado` ENUM('Pendiente', 'EnRevision', 'Finalizado') NOT NULL DEFAULT 'EnRevision',
    ADD COLUMN `puntaje_final` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `examenes` ADD COLUMN `estado` ENUM('Pendiente', 'EnRevision', 'Finalizado') NOT NULL DEFAULT 'Pendiente',
    ADD COLUMN `mime_type` VARCHAR(191) NOT NULL,
    ADD COLUMN `size` INTEGER NOT NULL;
