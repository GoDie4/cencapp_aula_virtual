/*
  Warnings:

  - A unique constraint covering the columns `[categoriaId]` on the table `cursos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoriaId` to the `cursos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cursos` ADD COLUMN `categoriaId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `cursos_categoriaId_key` ON `cursos`(`categoriaId`);

-- AddForeignKey
ALTER TABLE `cursos` ADD CONSTRAINT `cursos_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `categorias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
