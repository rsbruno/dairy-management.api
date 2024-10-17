-- CreateTable
CREATE TABLE "transactions_types" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "code" VARCHAR(100) NOT NULL,

    CONSTRAINT "transactions_types_pkey" PRIMARY KEY ("id")
);
