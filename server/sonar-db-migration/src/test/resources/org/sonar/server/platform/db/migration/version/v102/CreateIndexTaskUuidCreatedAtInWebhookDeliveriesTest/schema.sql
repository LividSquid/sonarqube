CREATE TABLE "WEBHOOK_DELIVERIES"(
    "UUID" CHARACTER VARYING(40) NOT NULL,
    "WEBHOOK_UUID" CHARACTER VARYING(40) NOT NULL,
    "PROJECT_UUID" CHARACTER VARYING(40) NOT NULL,
    "CE_TASK_UUID" CHARACTER VARYING(40),
    "ANALYSIS_UUID" CHARACTER VARYING(40),
    "NAME" CHARACTER VARYING(100) NOT NULL,
    "URL" CHARACTER VARYING(2000) NOT NULL,
    "SUCCESS" BOOLEAN NOT NULL,
    "HTTP_STATUS" INTEGER,
    "DURATION_MS" BIGINT NOT NULL,
    "PAYLOAD" CHARACTER LARGE OBJECT NOT NULL,
    "ERROR_STACKTRACE" CHARACTER LARGE OBJECT,
    "CREATED_AT" BIGINT NOT NULL
);
ALTER TABLE "WEBHOOK_DELIVERIES" ADD CONSTRAINT "PK_WEBHOOK_DELIVERIES" PRIMARY KEY("UUID");
CREATE INDEX "WD_WEBHOOK_UUID_CREATED_AT" ON "WEBHOOK_DELIVERIES"("WEBHOOK_UUID", "CREATED_AT" NULLS FIRST);
CREATE INDEX "WD_PROJECT_UUID_CREATED_AT" ON "WEBHOOK_DELIVERIES"("PROJECT_UUID", "CREATED_AT" NULLS FIRST);