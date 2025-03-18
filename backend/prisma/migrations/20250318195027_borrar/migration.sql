/*
  Warnings:

  - Added the required column `mime_type` to the `examen_resueltos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `examen_resueltos` ADD COLUMN `mime_type` VARCHAR(191) NOT NULL;
