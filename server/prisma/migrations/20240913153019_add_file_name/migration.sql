/*
  Warnings:

  - Added the required column `fileName` to the `Attachment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attachment" ADD COLUMN     "fileName" VARCHAR(255) NOT NULL;
