CREATE DATABASE [tea-shop-db]
GO

USE [tea-shop-db]
GO

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[status]') AND type in (N'U'))
BEGIN
    CREATE TABLE status (
        id INT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(255) NOT NULL
    );
END;

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[payment_method]') AND type in (N'U'))
BEGIN
    CREATE TABLE payment_method (
        id INT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(255) NOT NULL
    );
END;

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[product]') AND type in (N'U'))
BEGIN
    CREATE TABLE product (
        id INT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(255) NOT NULL,
        category INT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        created_date DATETIME NOT NULL,
        description NVARCHAR(MAX) NULL,
        available INT NOT NULL
    );
END;

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[purchase]') AND type in (N'U'))
BEGIN
    CREATE TABLE purchase (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        id_order BIGINT NOT NULL,
        id_product BIGINT NOT NULL,
        price FLOAT NOT NULL,
        quantity INT NOT NULL
    );
END;

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[user]') AND type in (N'U'))
BEGIN
    CREATE TABLE [user] (
        id INT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(255) NOT NULL,
        surname NVARCHAR(255) NOT NULL,
        password NVARCHAR(255) NOT NULL,
        address NVARCHAR(255) NOT NULL,
        created_date DATETIME NOT NULL
    );
END;

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[delivery_type]') AND type in (N'U'))
BEGIN
    CREATE TABLE delivery_type (
        id INT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(255) NOT NULL
    );
END;

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[payment_type]') AND type in (N'U'))
BEGIN
    CREATE TABLE payment_type (
        id INT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(255) NOT NULL
    );
END;

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[category]') AND type in (N'U'))
BEGIN
    CREATE TABLE category (
        id INT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(255) NOT NULL
    );
END;

IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[orders]') AND type in (N'U'))
BEGIN
    CREATE TABLE orders (
        id BIGINT IDENTITY(1,1) PRIMARY KEY,
        id_user BIGINT NOT NULL,
        amount FLOAT NOT NULL,
        purchase_date DATETIME NOT NULL,
        delivery_type INT NOT NULL,
        payment_type INT NOT NULL
    );
END;
