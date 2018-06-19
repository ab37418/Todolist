namespace TodoApp.Models
{
    public class TodoListModel {
        private TodoListContext context;

        //public string Name { get; set; }
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public string Status { get; set; }
        public string Owner { get; set; }
        public string Email { get; set; }
    }
}