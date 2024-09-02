/*
  Warnings:

  - You are about to drop the `_CollectionToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CollectionToProduct" DROP CONSTRAINT "_CollectionToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_CollectionToProduct" DROP CONSTRAINT "_CollectionToProduct_B_fkey";

-- DropTable
DROP TABLE "_CollectionToProduct";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_id_fkey" FOREIGN KEY ("id") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
