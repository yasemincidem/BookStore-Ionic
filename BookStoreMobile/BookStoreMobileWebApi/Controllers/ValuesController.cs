using BookStoreMobileWebApi.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace BookStoreMobileWebApi.Controllers
{
	[Authorize]
	public class ValuesController : ApiController
	{
		bookstoreEntities db = new bookstoreEntities();

		[HttpPost]
		[Route("api/values/register")]
		public async Task register(User newuser)
		{
			if (!await CheckUserIsExists(newuser.email, newuser.password))
			{
				User user = new User
				{
					name = newuser.name,
					email = newuser.email,
					password = newuser.password
				};
				db.Entry(user).State = EntityState.Added;
				db.Users.Add(user);
				await db.SaveChangesAsync();
			}
		}
		[HttpPost]
		[Route("api/values/login")]
		public async Task login(User newuser)
		{
			var user = await db.Users.Where(r => r.email == newuser.email
			&& r.password == newuser.password).FirstOrDefaultAsync();
			if (user != null)
			{
				user.email = newuser.email;
				user.password = newuser.password;
			}
			db.Entry(user).State = EntityState.Modified;
			await db.SaveChangesAsync();
		}
		[HttpPost]
		[Route("api/values/AddToCarts")]
		public async Task AddToCarts(Book newBook)
		{
			var oldcart = await db.Carts.Where(r => r.bookId == newBook.bookId).FirstOrDefaultAsync();
			if (oldcart == null)
			{
				Cart cart = new Cart
				{
					bookId = newBook.bookId,
				};
				db.Entry(cart).State = EntityState.Added;
			}
			await db.SaveChangesAsync();
		}
		[HttpGet]
		[Route("api/values/CartList")]
		public async Task<List<Cart>> CartList()
		{
			var cart = await db.Carts.ToListAsync();
			return cart;
		}

		[HttpGet]
		[Route("api/values/BookList")]
		public async Task<List<Book>> BookList()
		{
			var book = await db.Books.ToListAsync();
			return book;
		}

		private async Task<bool> CheckUserIsExists(string email, string password)
		{
			try
			{

				return await db.Users.Where(u => u.email == email && u.password == password).CountAsync() > 0;
			}
			catch (Exception e)
			{
				return false;
			}
		}
	}
}
