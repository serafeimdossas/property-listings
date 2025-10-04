-- init data
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

INSERT IGNORE INTO property (
  title,
  type,
  area_id,
  area,
  price,
  description,
  floor_level,
  square_meters,
  bedrooms,
  bathrooms,
  year_built,
  is_furnished
) VALUES
('Cozy Apartment in Downtown', 'Rent', 'ChIJvXOxxEy8oRQRl3mevrHaz1U', 'Nea Smyrni, Ελλάδα', 1200, 'A cozy 2-bedroom apartment located in the heart of the city.', 2, 75, 2, 1, 2015, TRUE),
('Spacious Family Home', 'Buy', 'ChIJD94HcElHqBQRv7k3I9nyBGs', 'Πανόραμα, Ελλάδα', 350000, 'A spacious 4-bedroom family home with a large backyard.', 1, 240, 4, 2, 2010, FALSE),
('Beachfront Condo', 'Buy', 'ChIJr3Ztlyi-oRQR6El5e7CyRpM', 'Γλυφάδα, Ελλάδα', 450000, 'A modern condo with stunning ocean views and direct beach access.', 3, 120, 3, 2, 2018, TRUE),
('Mountain Cabin Retreat', 'Rent', 'ChIJj9XXfkNtpxQRI7DWvz5TNAM', 'Μακρινίτσα, Ελλάδα', 800, 'A rustic cabin perfect for a weekend getaway in the mountains.', 0, 90, 2, 1, 2005, TRUE),
('Urban Loft', 'Exchange', 'ChIJN6QK8dmYoRQRbzNbL4ODpQY', 'Marousi, Ελλάδα', 2000, 'A stylish loft in the city center available for exchange with a similar property.', 4, 110, 1, 1, 2012, TRUE),
('Charity Housing', 'Donation', 'ChIJN6QK8dmYoRQRbzNbL4ODpQY', 'Marousi, Ελλάδα', 0, 'Affordable housing options available for those in need through donation.', 1, 85, 2, 1, 2008, FALSE);
