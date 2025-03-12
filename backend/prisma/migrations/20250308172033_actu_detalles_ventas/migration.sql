-- AddForeignKey
ALTER TABLE `ventas_detalles` ADD CONSTRAINT `ventas_detalles_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `cursos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
