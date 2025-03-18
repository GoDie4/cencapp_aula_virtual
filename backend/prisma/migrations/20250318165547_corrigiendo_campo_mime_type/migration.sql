/*
  Warnings:

  - You are about to drop the column `type_mime` on the `certificados` table. All the data in the column will be lost.
  - Added the required column `mime_type` to the `Certificados` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `certificados` DROP COLUMN `type_mime`,
    ADD COLUMN `mime_type` VARCHAR(191) NOT NULL;
