-- CreateTable
CREATE TABLE `CardVenta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cardId` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `date_created` DATETIME(3) NOT NULL,
    `date_last_updated` DATETIME(3) NOT NULL,
    `expiration_month` INTEGER NOT NULL,
    `expiration_year` INTEGER NOT NULL,
    `first_six_digits` VARCHAR(191) NOT NULL,
    `last_four_digits` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MethodVenta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `methodId` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
