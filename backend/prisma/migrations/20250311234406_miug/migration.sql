-- DropForeignKey
ALTER TABLE `comentarios` DROP FOREIGN KEY `comentarios_claseId_fkey`;

-- DropForeignKey
ALTER TABLE `comentarios` DROP FOREIGN KEY `comentarios_userId_fkey`;

-- DropIndex
DROP INDEX `comentarios_claseId_fkey` ON `comentarios`;

-- DropIndex
DROP INDEX `comentarios_userId_fkey` ON `comentarios`;

-- AddForeignKey
ALTER TABLE `comentarios` ADD CONSTRAINT `comentarios_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comentarios` ADD CONSTRAINT `comentarios_claseId_fkey` FOREIGN KEY (`claseId`) REFERENCES `clases`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
