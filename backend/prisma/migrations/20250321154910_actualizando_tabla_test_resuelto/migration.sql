/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `cursos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `cursos_slug_key` ON `cursos`(`slug`);
