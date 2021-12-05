CREATE TABLE IF NOT EXISTS settings
(
    id         SERIAL,
    lang       VARCHAR(255),
    slug       VARCHAR(255),
    value      VARCHAR(255),
    "default"  VARCHAR(255),
    created_at DATE DEFAULT NOW() NOT NULL,
    updated_at DATE,
    CONSTRAINT settings_pkey
        PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS teams
(
    id       SERIAL,
    name     VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    poc      VARCHAR(255),
    CONSTRAINT teams_pkey
        PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS users
(
    id          SERIAL,
    username    VARCHAR(255)          NOT NULL,
    password    VARCHAR(255)          NOT NULL,
    email       VARCHAR(255)          NOT NULL,
    team_id     INTEGER               NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE NOT NULL,
    first_name  VARCHAR(255),
    last_name   VARCHAR(255),
    CONSTRAINT users_pkey
        PRIMARY KEY (id),
    CONSTRAINT users_team_id_fkey
        FOREIGN KEY (team_id) REFERENCES teams,
    CONSTRAINT users_team_id_fkey1
        FOREIGN KEY (team_id) REFERENCES teams
);

CREATE UNIQUE INDEX IF NOT EXISTS users_email_uindex
    ON users (email);

CREATE TABLE IF NOT EXISTS projects
(
    id           SERIAL,
    name         VARCHAR(255)       NOT NULL,
    created_at   DATE DEFAULT NOW() NOT NULL,
    updated_at   DATE,
    completed_at DATE,
    CONSTRAINT projects_pkey
        PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS tickets
(
    id           SERIAL,
    subject      VARCHAR(255)       NOT NULL,
    content      VARCHAR(1000)      NOT NULL,
    html         VARCHAR(255),
    priority     VARCHAR(255),
    status       VARCHAR(255),
    project_id   INTEGER,
    user_id      INTEGER,
    settings_id  INTEGER,
    created_at   DATE DEFAULT NOW() NOT NULL,
    updated_at   DATE,
    completed_at DATE,
    CONSTRAINT tickets_pkey
        PRIMARY KEY (id),
    CONSTRAINT tickets_user_id_fkey
        FOREIGN KEY (user_id) REFERENCES users,
    CONSTRAINT tickets_settings_id_fkey
        FOREIGN KEY (settings_id) REFERENCES settings,
    CONSTRAINT tickets_user_id_fkey1
        FOREIGN KEY (user_id) REFERENCES users,
    CONSTRAINT tickets_settings_id_fkey1
        FOREIGN KEY (settings_id) REFERENCES settings,
    CONSTRAINT tickets_project_id_fkey
        FOREIGN KEY (project_id) REFERENCES projects
);

CREATE TABLE IF NOT EXISTS comments
(
    id         SERIAL,
    content    VARCHAR(1000),
    user_id    INTEGER,
    ticket_id  INTEGER,
    created_at DATE DEFAULT NOW() NOT NULL,
    updated_at DATE,
    html       VARCHAR(255),
    CONSTRAINT comments_pkey
        PRIMARY KEY (id),
    CONSTRAINT comments_user_id_fkey
        FOREIGN KEY (user_id) REFERENCES users,
    CONSTRAINT comments_ticket_id_fkey
        FOREIGN KEY (ticket_id) REFERENCES tickets,
    CONSTRAINT comments_user_id_fkey1
        FOREIGN KEY (user_id) REFERENCES users,
    CONSTRAINT comments_ticket_id_fkey1
        FOREIGN KEY (ticket_id) REFERENCES tickets
);
