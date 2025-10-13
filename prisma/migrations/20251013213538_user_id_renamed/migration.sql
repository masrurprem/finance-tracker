/*
  Warnings:

  - You are about to drop the column `UserId` on the `expense` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `expense` DROP FOREIGN KEY `Expense_UserId_fkey`;

-- DropIndex
DROP INDEX `Expense_UserId_fkey` ON `expense`;

-- AlterTable
ALTER TABLE `expense` DROP COLUMN `UserId`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Expense` ADD CONSTRAINT `Expense_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
