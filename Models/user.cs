namespace TodoApp.Models
{
    public class UserModel {

        private TodoListContext context;

        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public object items { get; set; }
    }
    
}