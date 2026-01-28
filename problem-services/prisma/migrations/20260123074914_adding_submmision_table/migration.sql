-- CreateTable
CREATE TABLE `Submission` (
    `id` VARCHAR(191) NOT NULL,
    `problemId` VARCHAR(191) NOT NULL,
    `language` VARCHAR(191) NOT NULL,
    `sourceCode` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `runTime` INTEGER NULL,
    `memory` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
