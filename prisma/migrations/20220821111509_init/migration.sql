-- CreateTable
CREATE TABLE "timePeriod" (
    "year" INTEGER NOT NULL,
    "quarter" INTEGER NOT NULL,
    "total" DECIMAL(65,30) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "timePeriod_year_quarter_key" ON "timePeriod"("year", "quarter");
