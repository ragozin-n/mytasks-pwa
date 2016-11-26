from sqlalchemy import Table, MetaData, create_engine, String, Integer, DateTime, ForeignKey, Boolean, Column, ForeignKeyConstraint

class DataBase(object):
    users = Table()
    posts = Table()

    def init_db():
        engine = create_engine("postgresql://localhost:5432/pwa_db")
        meta = MetaData(bind=engine, reflect=True)

        conn = engine.connect()

        if not engine.dialect.has_table(engine, 'users') and not engine.dialect.has_table(engine, 'posts'):
            DataBase.users = Table('users', meta,
                Column('login', String(30), primary_key=True),
                Column('password', String(30), nullable=False),
                Column('fullName', String(80), nullable=False))
            DataBase.posts = Table('tasks', meta,
                Column('id', Integer, nullable=False),
                Column('username', String(30), ForeignKey('users.login') , nullable=False),
                Column('task', String(140), nullable=False),
                Column('isDone', Boolean, nullable=False, default=False))
            meta.create_all(engine)
        return conn;