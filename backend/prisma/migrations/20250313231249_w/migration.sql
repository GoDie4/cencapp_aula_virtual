/*
  Warnings:

  - You are about to drop the column `myme_type` on the `examenes` table. All the data in the column will be lost.
  - Added the required column `mime_type` to the `examenes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `examenes` DROP COLUMN `myme_type`,
    ADD COLUMN `mime_type` VARCHAR(191) NOT NULL;
