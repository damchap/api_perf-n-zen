-- CreateTable
CREATE TABLE "Role" (
    "ID_role" TEXT NOT NULL,
    "Role_name" TEXT NOT NULL,
    "Acces" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("ID_role")
);

-- CreateTable
CREATE TABLE "Questionnaire" (
    "ID_questionnaire" SERIAL NOT NULL,

    CONSTRAINT "Questionnaire_pkey" PRIMARY KEY ("ID_questionnaire")
);

-- CreateTable
CREATE TABLE "Theme" (
    "ID_theme" SERIAL NOT NULL,
    "Theme_name" TEXT NOT NULL,

    CONSTRAINT "Theme_pkey" PRIMARY KEY ("ID_theme")
);

-- CreateTable
CREATE TABLE "Sector" (
    "ID_sector" SERIAL NOT NULL,
    "Sector_name" TEXT NOT NULL,

    CONSTRAINT "Sector_pkey" PRIMARY KEY ("ID_sector")
);

-- CreateTable
CREATE TABLE "Compagny" (
    "ID_compagny" SERIAL NOT NULL,
    "Compagny_name" TEXT NOT NULL,
    "Postal_adress" TEXT NOT NULL,
    "Mail_adress" TEXT NOT NULL,
    "Activity_sector" TEXT NOT NULL,
    "ID_sector" INTEGER NOT NULL,

    CONSTRAINT "Compagny_pkey" PRIMARY KEY ("ID_compagny")
);

-- CreateTable
CREATE TABLE "Question" (
    "ID_question" SERIAL NOT NULL,
    "Title_question" TEXT NOT NULL,
    "ID_theme" INTEGER NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("ID_question")
);

-- CreateTable
CREATE TABLE "Person" (
    "ID_person" SERIAL NOT NULL,
    "First_name" TEXT NOT NULL,
    "Last_name" TEXT NOT NULL,
    "Mail_adress" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "ID_compagny" INTEGER NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("ID_person")
);

-- CreateTable
CREATE TABLE "Owner" (
    "ID_person" INTEGER NOT NULL,
    "ID_role" TEXT NOT NULL,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("ID_person","ID_role")
);

-- CreateTable
CREATE TABLE "Reply" (
    "ID_person" INTEGER NOT NULL,
    "ID_questionnaire" INTEGER NOT NULL,
    "ID_question" INTEGER NOT NULL,
    "Note" INTEGER NOT NULL,

    CONSTRAINT "Reply_pkey" PRIMARY KEY ("ID_person","ID_questionnaire","ID_question")
);

-- AddForeignKey
ALTER TABLE "Compagny" ADD CONSTRAINT "Compagny_ID_sector_fkey" FOREIGN KEY ("ID_sector") REFERENCES "Sector"("ID_sector") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_ID_theme_fkey" FOREIGN KEY ("ID_theme") REFERENCES "Theme"("ID_theme") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_ID_compagny_fkey" FOREIGN KEY ("ID_compagny") REFERENCES "Compagny"("ID_compagny") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Owner" ADD CONSTRAINT "Owner_ID_person_fkey" FOREIGN KEY ("ID_person") REFERENCES "Person"("ID_person") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Owner" ADD CONSTRAINT "Owner_ID_role_fkey" FOREIGN KEY ("ID_role") REFERENCES "Role"("ID_role") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_ID_person_fkey" FOREIGN KEY ("ID_person") REFERENCES "Person"("ID_person") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_ID_questionnaire_fkey" FOREIGN KEY ("ID_questionnaire") REFERENCES "Questionnaire"("ID_questionnaire") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_ID_question_fkey" FOREIGN KEY ("ID_question") REFERENCES "Question"("ID_question") ON DELETE RESTRICT ON UPDATE CASCADE;
