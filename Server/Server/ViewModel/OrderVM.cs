﻿namespace ProjectFunctionalTesting.ViewModel
{
    public class OrderVM
    {
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public string? UserEmail { get; set; }
        public string? ProductName { get; set; }
        public string? Status  { get; set; }
        public int? Price { get; set; }
        public string? ImageProductName {  get; set; }
        public string? OrderDate { get; set; }
        public int? Quantity { get; set; }

    }
}
