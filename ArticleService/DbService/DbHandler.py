import psycopg2

class DbHandler:
    """
        DbInserter
            A class that is in charge of creating a connection to a db, send query to the db connected. 

            class initializer must be provided with connection object. 

        Example
            DbHandler(psycopg2.connect(
                dbname = "john's secret vault",
                user = "John",
                password = "Hey, don't memorize this!!!"
            ))

            dbh = DbHandler(DbConnector("./sv_config/db_config.json").connect())

            dbh.insert(
                tbname="students",
                attributes=("student_number", "name", "year", "class"),
                values=("31105", "김상덕", "3", "11")
            )

        Recommendation
            - I STRONGLY advise not to include(hardcode) any dbname, user, password in the program code. 
            - Information regarding database MUST NOT BE EXPOSED to the public. 
            - Use provided class named: DbConnector. 
    """
    def __init__(
            self,
            connector: psycopg2.connect = None
        ):
        if not connector: raise Exception("Database connecting object did not provided.")
        if not type(connector) == psycopg2.connection: raise Exception("Valid database connecting object did not provided.")

        # Register connector object as a member. 
        self.connector = connector

        # Create a cursor object.
            # Cursor object is in charge of sending querys to the database. 
        self.cursor = self.connector.cursor()


    def insert(self, 
            tbname: str,
            attributes: tuple = tuple(),
            values: tuple = tuple()
        ) -> None:
        """
            insert
                A function 

            parameter
                tbname 'str'
                    The name of a table.
                attributes 'tuple'
                    The tuple of 'str', consist of strings specifying the name of each attributes.
                values 'tuple'
                    The tuple of various values, consist of values specifying the value of each attributes.

            returns 
                None
        """
        if type(tbname) != str: raise TypeError()
        if list(filter(lambda x: type(x) != str, attributes)): raise Exception("All elements in attributes must be string.")
        if not len(attributes) == len(values): raise Exception("Attributes and values must have same size.")

        # Make a query from attribute and value:
        q, av = self._assemble_query(tbname= tbname,
                                     attributes= attributes,
                                     values= values)

        try:
            self.cursor.execute(q, av)
            self.connector.commit()
        except e as e:
            print(e)
            print("db error occured!")
        
    def _assemble_query(
            self,
            tbname: str, 
            attributes: tuple, 
            values: tuple) -> tuple:
        """
            _assemble_query
                assemble query informations into query string.
                
            parameter
                tbname 'str'
                    The name of a table.
                attributes 'tuple'
                    The tuple of 'str', consist of strings specifying the name of each attributes.
                values 'tuple'
                    The tuple of various values, consist of values specifying the value of each attributes.

            returns
                'tuple' of 'str'
                    [0] main query command
                    [1] attribute values tuple
                        
        """
        query_command = "INSERT INTO " + tbname + "(" + ", ".join(attributes) + ") " + \
        "VALUES " + "(" + ', '.join(['%s'] * len(values)) + ");"
        attribute_values = tuple(v for v in values)

        return query_command, attribute_values
    
    def __del__(self):
        self.connector.close()