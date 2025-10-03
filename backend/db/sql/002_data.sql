-- init data
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

INSERT IGNORE INTO property (title, type, area, price, description) VALUES
('Cozy Apartment in Downtown', 'Rent', 'Nea Smyrni, Ελλάδα', 1200, 'A cozy 2-bedroom apartment located in the heart of the city.'),
('Spacious Family Home', 'Buy', 'Πανόραμα, Ελλάδα', 350000, 'A spacious 4-bedroom family home with a large backyard.'),
('Beachfront Condo', 'Buy', 'Γλυφάδα, Ελλάδα', 450000, 'A modern condo with stunning ocean views and direct beach access.'),
('Mountain Cabin Retreat', 'Rent', 'Μακρινίτσα, Ελλάδα', 800, 'A rustic cabin perfect for a weekend getaway in the mountains.'),
('Urban Loft', 'Exchange', 'Marousi, Ελλάδα', 2000, 'A stylish loft in the city center available for exchange with a similar property.'),
('Charity Housing', 'Donation', 'Marousi, Ελλάδα', 0, 'Affordable housing options available for those in need through donation.');