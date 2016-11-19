from sqlalchemy import Table, MetaData, create_engine, String, Integer, DateTime, ForeignKey, Boolean, Column

if __name__ == '__main__':
    # Postgres.app on 5432 sharing pwa_db
    engine = create_engine("postgresql://localhost:5432/pwa_db")
    engine.execute("""
        CREATE TABLE Users (id serial NOT NULL,
                            username char(30) NOT NULL UNIQUE DEFAULT '0',
                            password char(30) NOT NULL,
                            CONSTRAINT Users_pk PRIMARY KEY (id)) WITH (OIDS=FALSE);
        CREATE TABLE Posts (username char(30) NOT NULL,
                            post char(140) NOT NULL,
                            isDone bool NOT NULL
        ) WITH (
          OIDS=FALSE
        );

ALTER TABLE Posts ADD CONSTRAINT Posts_fk0 FOREIGN KEY (username) REFERENCES Users(username);""")

engine.execute("insert into users(username,password) values('ivan','333')")
    # meta = MetaData()
    # users = Table('users', meta,
    #     Column('id', Integer, primary_key=True),
    #     Column('username', String(30), nullable=False),
    #     Column('password', String(100), nullable=False))
    
    # meta.create_all(engine)
    # conn = engine.connect()

    # conn.execute(users.insert(), [{'username': 'Ivan', 'password': 'abcd'}])
    
    # meta = MetaData()
    
    # posts = Table('posts', meta,
    #     Column('username', String(30), ForeignKey('users.c.username'), nullable=False),
    #     Column('post', String(100), nullable=False),
    #     Column('isDone', Boolean, nullable=False, default=False))

    # meta.create_all(engine)

    # conn.execute(posts.insert(), [{'username': 'Ivan', 'post':'hello_world', 'isDone': False }])
