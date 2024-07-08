-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Restriction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('CELIACO', 'LACTOSE', 'DIABETES', 'HIPERTENSAO', 'VEGANO', 'VEGETARIANO', 'APLV', 'TIREOIDE', 'FRUTOS_DO_MAR', 'NOZES') NOT NULL,

    UNIQUE INDEX `Restriction_type_key`(`type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserRestriction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `restrictionId` INTEGER NOT NULL,

    UNIQUE INDEX `UserRestriction_userId_restrictionId_key`(`userId`, `restrictionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `News` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NewsRestriction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `newsId` INTEGER NOT NULL,
    `restrictionId` INTEGER NOT NULL,

    UNIQUE INDEX `NewsRestriction_newsId_restrictionId_key`(`newsId`, `restrictionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Service` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `restrictions` ENUM('CELIACO', 'LACTOSE', 'DIABETES', 'HIPERTENSAO', 'VEGANO', 'VEGETARIANO', 'APLV', 'TIREOIDE', 'FRUTOS_DO_MAR', 'NOZES') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServiceRestriction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `serviceId` INTEGER NOT NULL,
    `restrictionId` INTEGER NOT NULL,

    UNIQUE INDEX `ServiceRestriction_serviceId_restrictionId_key`(`serviceId`, `restrictionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserRestriction` ADD CONSTRAINT `UserRestriction_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRestriction` ADD CONSTRAINT `UserRestriction_restrictionId_fkey` FOREIGN KEY (`restrictionId`) REFERENCES `Restriction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NewsRestriction` ADD CONSTRAINT `NewsRestriction_newsId_fkey` FOREIGN KEY (`newsId`) REFERENCES `News`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NewsRestriction` ADD CONSTRAINT `NewsRestriction_restrictionId_fkey` FOREIGN KEY (`restrictionId`) REFERENCES `Restriction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServiceRestriction` ADD CONSTRAINT `ServiceRestriction_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServiceRestriction` ADD CONSTRAINT `ServiceRestriction_restrictionId_fkey` FOREIGN KEY (`restrictionId`) REFERENCES `Restriction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
