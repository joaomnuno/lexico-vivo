-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "entryId" INTEGER NOT NULL,
    "clientId" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    CONSTRAINT "Activity_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Activity_day_kind_idx" ON "Activity"("day", "kind");

-- CreateIndex
CREATE UNIQUE INDEX "Activity_entryId_clientId_kind_day_key" ON "Activity"("entryId", "clientId", "kind", "day");
