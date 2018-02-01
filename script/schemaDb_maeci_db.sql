--
-- Database: `maeci_db`
--
CREATE TABLE users (    
    "id" NUMBER(38,0),
    "username" VARCHAR2(30 BYTE), 
    "password" VARCHAR2(32 BYTE), 
    "mail" VARCHAR2(32 BYTE), 
    "name" VARCHAR2(32 BYTE), 
    "surname" VARCHAR2(32 BYTE)
);

CREATE UNIQUE INDEX "USERS_PK" ON users ("id") ;
ALTER TABLE users MODIFY ("id" NOT NULL ENABLE);
ALTER TABLE users ADD CONSTRAINT "USERS_PK" PRIMARY KEY ("id") ENABLE;

INSERT INTO users ("id", "username", "password", "mail", "name", "surname") VALUES (1, 'admin', '1a1dc91c907325c69271ddf0c944bc72', '', '', '');

CREATE TABLE roles (	
    "role" VARCHAR2(30 BYTE), 
    "_user" NUMBER(38, 0), 
    "id" NUMBER(38,0)
);

CREATE UNIQUE INDEX "ROLES_PK" ON roles ("id");
ALTER TABLE roles ADD CONSTRAINT "ROLES_PK" PRIMARY KEY ("id");
ALTER TABLE roles MODIFY ("id" NOT NULL ENABLE);
ALTER TABLE roles ADD CONSTRAINT "ROLES_FK1" FOREIGN KEY ("_user")
	  REFERENCES users ("id") ENABLE;

INSERT INTO roles ("role", "_user", "id") VALUES ('ADMIN', '1', 1);


-- ENTITIES

--
-- Struttura della tabella `Immobile`
--

    CREATE TABLE Immobile (	
        "nome" varchar(30),
        
        -- RELAZIONI
        
        "id" NUMBER(38,0)
    );
    
    
    CREATE UNIQUE INDEX "Immobile_PK" ON Immobile ("id");
    ALTER TABLE Immobile ADD CONSTRAINT "Immobile_PK" PRIMARY KEY ("id");
    ALTER TABLE Immobile MODIFY ("id" NOT NULL ENABLE);


-- RELATIONS

    -- RELATIONS TABLE Immobile
    
        
        
        
        



