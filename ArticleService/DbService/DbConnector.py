import json

import psycopg2

class DbConnector:
    """
        DbConnector
            Enable to retrieve connection login information from json file.
            - Enable to keep important, secret informations of database locally. 
            - Easy connection establishment. 
            
        Example
            dbc = DbConnector()
            dhd = DbHandler(connector=dbc.connect())    
    """
    def __init__(
            self,
            path_config: str = "./connector_config.json") -> None:
        # Required information for creating a connection to postgresql. 
        self.host = None
        self.user = None
        self.password = None
        self.dbname = None
        self.port = None

        # Connecting string key information names. 
        self.connect_info = ["host", "user", "password", "dbname", "port"]

        self._load_connection_information(path_config)

    def connect(self) -> psycopg2.connect:
        """
            connect
                connects to the database, and returns the connecting object -- which is required to create a handler object. 

            parameters
                None

            returns
                psycopg2.connect
        """
        cs = self._assemble_connection_string

        self.connector = psycopg2.connect(cs)
        return self.connector
    
    def _load_connection_information(self, path_config: str) -> None:
        """
            _load_connection_information
                loads required information from a json file. 

            parameters
                path_config 'str'
                    specifies the path of json file.
                    
            returns
                None
        """
        with open(path_config, "r", encoding="utf-8") as f:
            f_connect_info = json.load(f)

            # Retrieve informations from json files. 
            for ci in self.connect_info:
                try:
                    json_key = f_connect_info[ci]
                except KeyError:
                    json_key = None
                finally:
                    # Regardless of key existance, some value must be saved into the member variable.
                    setattr(self, ci, json_key)

    def _assemble_connection_string(self) -> str:
        """
            _assemble_connection_string
                Make a libpq connection string based on the informations read from a json file.

            parameters
                None

            returns
                'str'
                assemble-completed connection string.
                "key=value" pair does not appears when the value is null or not written on the json file. 

                Example:
                    "port=7655 user=admin password=1234"
        """
        temp = list()

        for ci in self.connect_info:
            cs_part = "" if not getattr(self, ci) else (ci + "=" + getattr(self, ci))
            temp.append(cs_part)

        connecting_string = ' '.join([l for l in temp if l != ""])
        return connecting_string
