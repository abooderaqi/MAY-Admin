/*
  Warnings:

  - A unique constraint covering the columns `[collectionId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `collectionId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_id_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "collectionId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_collectionId_key" ON "Product"("collectionId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
