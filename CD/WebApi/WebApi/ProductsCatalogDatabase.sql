USE master;
GO

IF EXISTS(SELECT *
          FROM sys.databases
          WHERE name = 'ProductsCatalog')
BEGIN
	ALTER DATABASE ProductsCatalog SET SINGLE_USER WITH ROLLBACK IMMEDIATE
	DROP DATABASE ProductsCatalog
END;
GO

CREATE DATABASE ProductsCatalog;
GO

USE ProductsCatalog;
GO

CREATE TABLE Categories
(
    Id     INT          NOT NULL IDENTITY (1, 1) PRIMARY KEY,
    [Name] NVARCHAR(50) NOT NULL
);
GO

INSERT INTO Categories
VALUES ('cell phone'),
       ('camera & photo'),
       ('tablet'),
       ('headphones & earbuds');
GO

CREATE TABLE Products
(
    Id            INT            NOT NULL IDENTITY (1, 1) PRIMARY KEY,
    [Name]        NVARCHAR(100)  NOT NULL,
    ImageUrl      NVARCHAR(1000) NOT NULL,
    Price         MONEY          NOT NULL,
    [Description] NVARCHAR(2000) NULL,
    CategoryId    INT            NOT NULL,
    FOREIGN KEY (CategoryId) REFERENCES Categories (Id)
);
GO

INSERT INTO Products([Name], ImageUrl, Price, [Description], CategoryId)
VALUES ('Cell phone Google Pixel 7 Pro 12/512GB Snow', 'https://content1.rozetka.com.ua/goods/images/big/292244218.png',
        49587, 'Google Pixel 7 Pro', 1),
       ('Cell phone Samsung Galaxy S22 Ultra 12/1TB Phantom Black',
        'https://content1.rozetka.com.ua/goods/images/big/253281475.jpg', 79130, 'Samsung Galaxy S22 Ultra', 1),
       ('Cell phone Apple iPhone 14 Pro Max 1TB Gold',
        'https://i.allo.ua/media/catalog/product/cache/1/image/710x600/602f0fa2c1f0d1ba5e241f914e856ff9/w/w/wwen_iphone14pro_q422_gold_pdp-images_position-1a_2.jpg',
        89499, 'Apple Iphone 14 Pro Max', 1),
       ('Cell phone OnePlus 10 Pro 8/128GB Black',
        'https://content2.rozetka.com.ua/goods/images/original/282509621.jpg', 28431, 'OnePlus 10 Pro', 1),
       ('Camera Canon EOS R 24-105 mm F4-7.1 IS STM Kit Black (3075C129AA)',
        'https://content2.rozetka.com.ua/goods/images/big/139379315.jpg', 81099, 'Camera Canon', 2),
       ('Tablet Apple iPad Pro 11 M2 Wi-Fi 1TB Space Gray',
        'https://ilounge.ua/files/products/apple-ipad-pro-11-m2-2022-wi-fi-1tb-space-gray-mnxk3-1.650x650.webp', 76999,
        'Apple iPad Pro', 3),
       ('Earbuds Apple AirPods Pro with MagSafe Charging Case 2022 (2-nd generation)',
        'https://i.citrus.world/imgcache/size_800/uploads/shop/5/e/5eaf5cf431986f2718541a91aa34038e.jpg', 12699,
        'Earbuds Apple AirPods Pro', 4);
GO

CREATE TRIGGER TriggerProductsDelete
    ON Products
    AFTER DELETE
    AS
BEGIN
    SET NOCOUNT ON

    DECLARE @categoryId int = (SELECT TOP 1 CategoryId FROM DELETED)

    IF ((SELECT COUNT(*) FROM Products WHERE CategoryId = @categoryId) = 0)
        DELETE FROM Categories WHERE Id = @categoryId
END;
GO

ALTER DATABASE ProductsCatalog SET MULTI_USER;
GO