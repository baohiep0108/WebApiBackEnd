using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Server.Model;
using System.Data;
using WebApi.Model;
using WebApiShopCart.Model;

namespace WebApi.Helper
{
    public class ApplicationDBContext : IdentityDbContext<ApplicationUser>
    {

        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options)
            : base(options)
        { }

        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<OrderDetail> OrderDetails { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            foreach (var entitytype in modelBuilder.Model.GetEntityTypes())
            {
                var tableName = entitytype.GetTableName();
                if (tableName.StartsWith("AspNet"))
                {
                    entitytype.SetTableName(tableName.Substring(6));
                }
            }
            modelBuilder.Entity<OrderDetail>()
                 .HasKey(od => new { od.OrderId, od.ProductId });

            modelBuilder.Entity<OrderDetail>()
                .HasOne(od => od.Order)
                .WithMany()
                .HasForeignKey(od => od.OrderId);

            modelBuilder.Entity<OrderDetail>()
                .HasOne(od => od.Product)
                .WithMany()
                .HasForeignKey(od => od.ProductId);
           

            modelBuilder.Entity<ApplicationUser>()
                .HasMany(o => o.Orders)
                .WithOne(u => u.User)
                .HasForeignKey(u => u.UserId)
                .OnDelete(DeleteBehavior.Cascade);

        }

    }
}
