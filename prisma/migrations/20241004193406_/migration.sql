-- CreateTable
CREATE TABLE "persons" (
    "id" TEXT NOT NULL,
    "keycloakId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "persons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tenants" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "clientSecret" TEXT NOT NULL,
    "farmsId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tenants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "farms" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "farms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PersonsToTenants" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "persons_keycloakId_key" ON "persons"("keycloakId");

-- CreateIndex
CREATE UNIQUE INDEX "persons_username_key" ON "persons"("username");

-- CreateIndex
CREATE UNIQUE INDEX "tenants_clientId_key" ON "tenants"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "tenants_clientSecret_key" ON "tenants"("clientSecret");

-- CreateIndex
CREATE UNIQUE INDEX "tenants_farmsId_key" ON "tenants"("farmsId");

-- CreateIndex
CREATE UNIQUE INDEX "farms_cnpj_key" ON "farms"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "_PersonsToTenants_AB_unique" ON "_PersonsToTenants"("A", "B");

-- CreateIndex
CREATE INDEX "_PersonsToTenants_B_index" ON "_PersonsToTenants"("B");

-- AddForeignKey
ALTER TABLE "tenants" ADD CONSTRAINT "tenants_farmsId_fkey" FOREIGN KEY ("farmsId") REFERENCES "farms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PersonsToTenants" ADD CONSTRAINT "_PersonsToTenants_A_fkey" FOREIGN KEY ("A") REFERENCES "persons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PersonsToTenants" ADD CONSTRAINT "_PersonsToTenants_B_fkey" FOREIGN KEY ("B") REFERENCES "tenants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
