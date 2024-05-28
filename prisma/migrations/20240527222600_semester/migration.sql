/*
  Warnings:

  - Added the required column `semester` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_professorId_fkey";

-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "semester" INTEGER NOT NULL,
ALTER COLUMN "courseId" DROP NOT NULL,
ALTER COLUMN "professorId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "_ProfessorCourses" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProfessorCourses_AB_unique" ON "_ProfessorCourses"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfessorCourses_B_index" ON "_ProfessorCourses"("B");

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfessorCourses" ADD CONSTRAINT "_ProfessorCourses_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfessorCourses" ADD CONSTRAINT "_ProfessorCourses_B_fkey" FOREIGN KEY ("B") REFERENCES "Professor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
