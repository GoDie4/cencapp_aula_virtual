/*
  Warnings:

  - Added the required column `size` to the `Materiales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `materiales` ADD COLUMN `size` INTEGER NOT NULL;
