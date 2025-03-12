/*
  Warnings:

  - Added the required column `mime_type` to the `Materiales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `materiales` ADD COLUMN `mime_type` VARCHAR(255) NOT NULL;
