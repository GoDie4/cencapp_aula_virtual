/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `clases` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `clases` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `clases` ADD COLUMN `slug` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `clases_slug_key` ON `clases`(`slug`);
