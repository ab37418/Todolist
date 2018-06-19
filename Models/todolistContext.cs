//using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using MySql.Data.MySqlClient;
using TodoApp.Models;

namespace TodoApp.Models{

    public class TodoListContext
    {
        public string ConnectionString { get; set; }

        public TodoListContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        private MySqlConnection GetConnection()
        {
            return new MySqlConnection(ConnectionString);
        }

        //public List<UserModel> GetAllUsers()
        public List<TodoListModel> GetAllUsers()
        {
            
            List<UserModel> userlist = new List<UserModel>();
            List <TodoListModel> todolistlist = new List<TodoListModel>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand users = new MySqlCommand("select * from user", conn);
                MySqlCommand userstodo = new MySqlCommand("select user.name,user.email, todoitem.* from user inner join todoitem on todoitem.owner = user.id", conn);
                

                using (var reader = userstodo.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        //userlist.Add(new UserModel()
                        todolistlist.Add(new TodoListModel()
                        {
                            /*Id = reader["Id"].ToString(),
                            Name = reader["Name"].ToString(),
                            Email = reader["Email"].ToString()*/
                            Id = reader["Id"].ToString(),
                            //Name = reader["Name"].ToString(),
                            Title = reader["Title"].ToString(),
                            Description = reader["Description"].ToString(),
                            Type = reader["Type"].ToString(),
                            Status = reader["Status"].ToString(),
                            Owner = reader["Name"].ToString(),
                            Email = reader["Email"].ToString()
                        });

                        
                    }
                }


            }
            //return userlist;
            return todolistlist;
            
        }

        public List<UserModel> GetAllTheUsers()
        {
            List <UserModel> theUserlist = new List<UserModel>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand users = new MySqlCommand("select * from user", conn);
                //MySqlCommand users = new MySqlCommand("select user.name,user.email, todoitem.* from user inner join todoitem on todoitem.owner = user.id", conn);
                
                using (var reader = users.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        //userlist.Add(new UserModel()
                        theUserlist.Add(new UserModel()
                        {
                            Id = reader["Id"].ToString(),
                            Name = reader["Name"].ToString(),
                            Email = reader["Email"].ToString()
                            
                        });  
                    }
                }
            }
            
            return theUserlist;
        }



        public List<TodoItemModel> GetAllItems()
        {
            
            
            List <TodoItemModel> todoitemlist = new List<TodoItemModel>();

            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                
                MySqlCommand items = new MySqlCommand("select * from todoitem", conn);

                using (var reader = items.ExecuteReader())
                {
                    while(reader.Read())
                    {
                        todoitemlist.Add(new TodoItemModel()
                        {
                            Id = reader["Id"].ToString(),
                            Title = reader["Title"].ToString(),
                            Description = reader["Description"].ToString(),
                            Type = reader["Type"].ToString(),
                            Status = reader["Status"].ToString()
                        });
                    }
                }
                


            }
            return todoitemlist;
            
        }

        
    }
}