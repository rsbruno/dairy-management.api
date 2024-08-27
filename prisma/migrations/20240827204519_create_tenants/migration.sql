-- CreateTable
CREATE TABLE "tenants" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "clientSecret" TEXT NOT NULL,

    CONSTRAINT "tenants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tenants_clientId_key" ON "tenants"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "tenants_clientSecret_key" ON "tenants"("clientSecret");
