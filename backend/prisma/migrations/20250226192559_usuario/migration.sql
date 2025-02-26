/*
  Warnings:

  - Added the required column `activo` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `activo` BOOLEAN NOT NULL,
    MODIFY `rolId` INTEGER NOT NULL DEFAULT 1;
