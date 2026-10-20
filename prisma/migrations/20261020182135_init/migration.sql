-- CreateTable
CREATE TABLE "Entry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "headword" TEXT NOT NULL,
    "normalized" TEXT NOT NULL,
    "definitions" JSONB NOT NULL,
    "synonyms" JSONB NOT NULL,
    "fields" JSONB NOT NULL,
    "sections" JSONB NOT NULL,
    "pages" JSONB NOT NULL,
    "region" TEXT NOT NULL DEFAULT '',
    "register" TEXT NOT NULL DEFAULT '',
    "kind" TEXT NOT NULL DEFAULT 'word',
    "source" TEXT NOT NULL DEFAULT 'original',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Contribution" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "headword" TEXT NOT NULL,
    "definition" TEXT NOT NULL,
    "example" TEXT NOT NULL DEFAULT '',
    "region" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL DEFAULT '',
    "clientId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "entryId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Contribution_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Vote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "entryId" INTEGER NOT NULL,
    "clientId" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    CONSTRAINT "Vote_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "Entry" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Entry_slug_key" ON "Entry"("slug");

-- CreateIndex
CREATE INDEX "Entry_normalized_idx" ON "Entry"("normalized");

-- CreateIndex
CREATE INDEX "Entry_region_idx" ON "Entry"("region");

-- CreateIndex
CREATE INDEX "Contribution_clientId_createdAt_idx" ON "Contribution"("clientId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_entryId_clientId_key" ON "Vote"("entryId", "clientId");
