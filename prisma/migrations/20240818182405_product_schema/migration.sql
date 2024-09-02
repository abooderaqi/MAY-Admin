/*
  Warnings:

  - You are about to drop the column `image` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Product` table. All the data in the column will be lost.
  - Added the required column `category` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Product_image_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "image",
DROP COLUMN "name",
DROP COLUMN "quantity",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "colors" TEXT[],
ADD COLUMN     "expense" DOUBLE PRECISION NOT NULL DEFAULT 0.1,
ADD COLUMN     "media" TEXT[],
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "title" TEXT NOT NULL;
