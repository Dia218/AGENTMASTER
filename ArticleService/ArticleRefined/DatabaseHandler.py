import json
import psycopg2

class DatabaseHandler:
    def __init__(
        self,
        config_path: str
    ) -> None:
        """
        
        """
        if not type(config_path) == str:  raise TypeError()
        
        # Initialize config parameters. 
        self.config_key = ["host", "user", "password", "dbname", "port"]
        for k in self.config_key :
            setattr(self, k, "")

        self._load_config(config_path) 
        conn_str = self._assemble_connection_string()
        self._connect(conn_str)

    def __del__(self) -> None:
        if not self.connection: return

        self.connection.close()

    def _load_config(self, config_path: str) -> None:
        """
            _load_config
                loads connection configuration from a given path.
                given path must indicate json file.
                
            parameters
                config_path 'str'
                    string indicating a path of configuration file.
            
            returns
                none
        """
        # Load config parameters from an input json file. 
        with open(config_path, "r", encoding="utf-8") as f:
            config_file = json.load(f)

            for k in self.config_key:
                try:
                    file_key = config_file[k]
                    setattr(self, k, file_key)
                except KeyError:
                    continue

    def _assemble_connection_string(self) -> str:
        """
            _assemble_connection_string
                connection string is a term used by psycopg2 module, 
                meaning login string that is specifying informations required
                to establish a connection between a program and a database
                following the format of 'key=value'
                usually includes host, username, password, port, dbname.

                Makes connection string from retrieved configuration by _load_config function.

            parameters
                none

            returns
                a connection string 'str'
        """  
        temp_connection_string = list()
        
        # Make a connection string. 
        # in the format of <parameter_key>=<parameter_value>.
        for k in self.config_key:
            param = "" if not (v := getattr(self, k)) else (k + "=" + v)
            temp_connection_string.append(param)

        connection_string = ' '.join([p for p in temp_connection_string if p != ""])
        return connection_string
    
    def _connect(self, conn_str: str) -> None:

        if not type(conn_str) == str: raise TypeError()

        if not (conn := psycopg2.connect(conn_str)): raise Exception()

        self.connection = conn
