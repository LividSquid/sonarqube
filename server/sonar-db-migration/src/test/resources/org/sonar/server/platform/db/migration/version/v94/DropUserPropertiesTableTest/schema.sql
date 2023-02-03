CREATE TABLE "USER_PROPERTIES"(
    "UUID" CHARACTER VARYING(40) NOT NULL,
    "USER_UUID" CHARACTER VARYING(255) NOT NULL,
    "KEE" CHARACTER VARYING(100) NOT NULL,
    "TEXT_VALUE" CHARACTER VARYING(4000) NOT NULL,
    "CREATED_AT" BIGINT NOT NULL,
    "UPDATED_AT" BIGINT NOT NULL
);
ALTER TABLE "USER_PROPERTIES" ADD CONSTRAINT "PK_USER_PROPERTIES" PRIMARY KEY("UUID");