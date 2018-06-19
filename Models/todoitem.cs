namespace TodoApp.Models
{
    public class TodoItemModel {
        private TodoListContext context;

        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public string Status { get; set; }
        public string Owner { get; set; }
    }
}