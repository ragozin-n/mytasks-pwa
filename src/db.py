from sqlalchemy import Table, MetaData, create_engine, String, Integer, DateTime, ForeignKey, Boolean, Column, ForeignKeyConstraint

class DataBase(object):
    DB_PATH = "postgres://fpjotnzddzayus:570ffe920bc0c790d9eddce1fcbd269e836cf1992daaf77e041ed7266d43784d@ec2-107-20-193-74.compute-1.amazonaws.com:5432/d6cder18a6afpt"
    engine = create_engine(DB_PATH)
    meta = MetaData(bind=engine, reflect=True)

    users = Table('users', meta,
                Column('login', String(30), primary_key=True),
                Column('password', String(60), nullable=False),
                Column('fullName', String(80), nullable=False),
                extend_existing=True)
    posts = Table('tasks', meta,
                Column('id', Integer, primary_key=True, autoincrement=True),
                Column('username', String(30), ForeignKey('users.login') , nullable=False),
                Column('task', String(140), nullable=False),
                Column('isDone', Boolean, nullable=False, default=False),
                extend_existing=True)

    def init_db(self, engine):
        conn = engine.connect()

        if not engine.dialect.has_table(engine, 'users') and not engine.dialect.has_table(engine, 'posts'):
            self.meta.create_all(engine)
        return conn

# class User(Base):
#     __tablename__ = 'users';
    
#     login = Column('login', String(30), primary_key=True);
#     password = Column('password', String(30), nullable=False);
#     fullname = Column('fullName', String(80), nullable=False);

#     def __init__(self , login ,password , fullname):
#         self.login = login;
#         self.password = password;
#         self.fullname = fullname;

#     def __repr__(self):
#         return '<User %s>' % (self.fullname);

# class Task(Base):
#     __tablename__ = 'tasks';
#     id = Column('id', Integer, nullable=False);
#     username = Column('username', String(30), ForeignKey('users.login') , nullable=False);
#     task = Column('task', String(140), nullable=False);
#     isDone = Column('isDone', Boolean, nullable=False, default=False);

#     def __init__(self , username ,task , isDone):
#         self.username = username;
#         self.task = task;
#         self.isDone = isDone;

#     def __repr__(self):
#         return '<Task %s User %s>' % (self.task, self.username);
