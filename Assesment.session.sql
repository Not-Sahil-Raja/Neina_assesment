
-- @block
CREATE TABLE Tables (
    table_id INT AUTO_INCREMENT PRIMARY KEY,
    table_name VARCHAR(255),
    capacity INT NOT NULL,
    location VARCHAR(255)
);

-- @block
CREATE TABLE Reservations (
    reservation_id INT AUTO_INCREMENT PRIMARY KEY,
    table_id INT NOT NULL,
    date DATE NOT NULL,
    time_slot TIME NOT NULL,
    guest_count INT NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    contact VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (table_id) REFERENCES Tables(table_id) ON DELETE CASCADE,
    UNIQUE (table_id, date, time_slot)
);

-- @block
SELECT * FROM Tables;
SELECT * FROM Reservations;

-- @block
-- Insert data into Tables
INSERT INTO Tables (table_name, capacity, location) VALUES
('Table 1', 2, 'Patio'),
('Table 2', 4, 'Indoor'),
('Table 3', 8, 'Rooftop'),
('Table 4', 12, 'Indoor');

-- @block
-- Insert data into Reservations
INSERT INTO Reservations (table_id, date, time_slot, guest_count, customer_name, contact) VALUES
(1, '2023-10-01', '18:00:00', 2, 'John Doe', 'john.doe@example.com'),
(2, '2023-10-01', '19:00:00', 4, 'Jane Smith', 'jane.smith@example.com'),
(3, '2023-10-02', '20:00:00', 8, 'Alice Johnson', 'alice.johnson@example.com'),
(4, '2023-10-03', '21:00:00', 12, 'Bob Brown', 'bob.brown@example.com');

-- @block
SELECT time_slot  FROM Reservations r
WHERE  r.date = '2023-10-01'
AND r.table_id = '1'
