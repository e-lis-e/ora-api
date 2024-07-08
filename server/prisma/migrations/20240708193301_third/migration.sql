/*
  Warnings:

  - You are about to alter the column `type` on the `restriction` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.
  - You are about to drop the column `restrictions` on the `service` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `restriction` MODIFY `type` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `service` DROP COLUMN `restrictions`;
