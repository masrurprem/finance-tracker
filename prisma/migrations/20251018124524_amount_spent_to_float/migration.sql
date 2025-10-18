/*
  Warnings:

  - You are about to alter the column `spent` on the `expense` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Double`.
  - You are about to alter the column `amount` on the `income` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Double`.

*/
-- AlterTable
ALTER TABLE `expense` MODIFY `spent` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `income` MODIFY `amount` DOUBLE NOT NULL;
