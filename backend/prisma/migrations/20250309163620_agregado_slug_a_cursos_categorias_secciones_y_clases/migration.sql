-- AlterTable
ALTER TABLE `categorias` ADD COLUMN `slug` VARCHAR(255) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `clases` ADD COLUMN `slug` VARCHAR(255) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `cursos` ADD COLUMN `slug` VARCHAR(255) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `secciones` ADD COLUMN `slug` VARCHAR(255) NOT NULL DEFAULT '';
