/*
  Warnings:

  - You are about to alter the column `porcentaje` on the `porcentajecurso` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `porcentajecurso` MODIFY `porcentaje` DOUBLE NOT NULL DEFAULT 0;
