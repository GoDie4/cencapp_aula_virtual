/*
  Warnings:

  - Added the required column `myme_type` to the `examenes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `examenes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `examenes` ADD COLUMN `myme_type` VARCHAR(191) NOT NULL,
    ADD COLUMN `size` INTEGER NOT NULL;
