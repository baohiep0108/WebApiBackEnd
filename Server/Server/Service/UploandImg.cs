namespace ProjectFunctionalTesting.Service
{
    public class UploadImg
    {
        public static async Task<string> UploadImageAsync(IFormFile file, string folder)
        {
            try
            {
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                var path = Path.Combine(Directory.GetCurrentDirectory(), "Img", folder, fileName);
                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
                return fileName;
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to upload image: " + ex.Message);
            }
        }

        internal static async Task<string> UploadImageAsync(string? imgProfile, string v)
        {
            throw new NotImplementedException();
        }
    }

}

