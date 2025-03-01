-- DropForeignKey
ALTER TABLE `cursos` DROP FOREIGN KEY `cursos_categoriaId_fkey`;

-- DropIndex
DROP INDEX `cursos_categoriaId_key` ON `cursos`;

-- AddForeignKey
ALTER TABLE `cursos` ADD CONSTRAINT `cursos_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `categorias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
