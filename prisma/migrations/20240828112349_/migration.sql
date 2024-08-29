-- CreateTable
CREATE TABLE "occupations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "occupations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "persons" (
    "id" TEXT NOT NULL,
    "keycloakId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "occupationsId" TEXT NOT NULL,

    CONSTRAINT "persons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tenants" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "clientSecret" TEXT NOT NULL,

    CONSTRAINT "tenants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "occupations_name_key" ON "occupations"("name");

-- CreateIndex
CREATE UNIQUE INDEX "persons_keycloakId_key" ON "persons"("keycloakId");

-- CreateIndex
CREATE UNIQUE INDEX "persons_username_key" ON "persons"("username");

-- CreateIndex
CREATE UNIQUE INDEX "tenants_clientId_key" ON "tenants"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "tenants_clientSecret_key" ON "tenants"("clientSecret");

-- AddForeignKey
ALTER TABLE "persons" ADD CONSTRAINT "persons_occupationsId_fkey" FOREIGN KEY ("occupationsId") REFERENCES "occupations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
