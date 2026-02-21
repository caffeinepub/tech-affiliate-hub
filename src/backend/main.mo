import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";



actor {
  type Product = {
    title : Text;
    affiliateUrl : Text;
    description : Text;
    category : Text;
    price : Float;
  };

  module Product {
    public func compareByCategory(product1 : Product, product2 : Product) : Order.Order {
      Text.compare(product1.category, product2.category);
    };
  };

  let featuredProducts = Map.fromIter<Text, Product>(
    [
      (
        "macbook_pro",
        {
          title = "Apple 2025 MacBook Pro Laptop";
          affiliateUrl = "https://amzn.to/4tGqV5X";
          description = "15-inch Apple Silicon MacBook Pro with M4 Chip";
          category = "Laptops";
          price = 2999.99;
        },
      ),
      (
        "sony_earbuds",
        {
          title = "Sony WF-1000XM5";
          affiliateUrl = "https://amzn.to/4kHwBsg";
          description = "Wireless Noise Cancelling Earbuds";
          category = "Headphones";
          price = 279.99;
        },
      ),
      (
        "solakaka_keyboard",
        {
          title = "SOLAKAKA A75 75% Wireless Mechanical Keyboard";
          affiliateUrl = "https://amzn.to/4kICghQ";
          description = "75% Wireless Mechanical Keyboard";
          category = "Accessories";
          price = 109.99;
        },
      ),
      (
        "sony_bluetooth_speaker",
        {
          title = "Sony ULT Field 1 Waterproof Portable Bluetooth Speaker";
          affiliateUrl = "https://amzn.to/4kOY4bG";
          description = "Waterproof Portable Bluetooth Speaker";
          category = "Audio";
          price = 149.99;
        },
      ),
      (
        "dell_14",
        {
          title = "Dell 14 Laptop";
          affiliateUrl = "https://amzn.to/4tKYiV9";
          description = "Thin & Light 14-inch FHD Laptop for Students";
          category = "Laptops";
          price = 899.99;
        },
      ),
      (
        "airpods_4",
        {
          title = "Apple AirPods 4";
          affiliateUrl = "https://amzn.to/4cEgKsy";
          description = "2nd Generation with Wireless Charging";
          category = "Headphones";
          price = 149.99;
        },
      ),
      (
        "samsung_m07",
        {
          title = "Samsung Galaxy M07 Mobile";
          affiliateUrl = "https://amzn.to/40s3hwx";
          description = "Latest budget Samsung mobile with impressive features";
          category = "Mobiles";
          price = 14999.99;
        },
      ),
      (
        "samsung_m56_5g",
        {
          title = "Samsung Galaxy M56 5G Mobile";
          affiliateUrl = "https://amzn.to/46lDidP";
          description = "Feature-rich Samsung mobile with 5G support";
          category = "Mobiles";
          price = 24999.99;
        },
      ),
      (
        "iqoo_z10r_5g",
        {
          title = "iQOO Z10R 5G";
          affiliateUrl = "https://amzn.to/4qSl8I2";
          description = "High-performance 5G smartphone by iQOO";
          category = "Mobiles";
          price = 19999.99;
        },
      ),
      (
        "ant_gaming_combo",
        {
          title = "Ant Esports KM1410 Wired Gaming Keyboard and Mouse Combo";
          affiliateUrl = "https://amzn.to/4qSl8I2";
          description = "Affordable gaming peripherals combo by Ant Esports";
          category = "Gaming Peripherals";
          price = 1199.99;
        },
      ),
      (
        "lg_ac_1.5t_5star",
        {
          title = "LG 1.5 Ton 5 Star DUAL Inverter Split AC";
          affiliateUrl = "https://amzn.to/46jIpeB";
          description = "Energy-efficient 1.5 ton split AC by LG";
          category = "Air Conditioners";
          price = 44999.99;
        },
      ),
      (
        "lg_ua82_tv",
        {
          title = "LG 139 cm (55 inches) UA82 Series 4K Ultra HD Smart webOS LED TV 55UA82006LA";
          affiliateUrl = "https://amzn.to/3ZKn7mD";
          description = "55-inch 4K smart TV with webOS by LG";
          category = "TVs";
          price = 64999.99;
        },
      ),
      (
        "godrej_600l_fridge",
        {
          title = "Godrej 600L 3Star Frost Free Inverter Side By Side Refrigerator";
          affiliateUrl = "https://amzn.to/3ZKn7mD";
          description = "Large 600L inverter refrigerator by Godrej";
          category = "Refrigerators";
          price = 74999.99;
        },
      ),
      (
        "asus_tuf_a15",
        {
          title = "ASUS TUF A15";
          affiliateUrl = "https://amzn.to/46EwDM3";
          description = "High-performance gaming laptop by ASUS";
          category = "Laptops";
          price = 79999.99;
        },
      ),
      (
        "native_m2_pro_purifier",
        {
          title = "Native by Urban Company M2 PRO RO+UV+Copper+Alkaline 10-Stage Smart Water Purifier";
          affiliateUrl = "https://amzn.to/46EwDM3";
          description = "Smart 10-stage water purifier by Urban Company";
          category = "Water Purifiers";
          price = 17999.99;
        },
      ),
      (
        "amazon_fire_tv_stick",
        {
          title = "Amazon Fire TV Stick HD";
          affiliateUrl = "https://amzn.to/4c29fvl";
          description = "Popular streaming device for TVs";
          category = "Streaming Devices";
          price = 3999.99;
        },
      ),
      (
        "hollyland_lark_mic",
        {
          title = "Hollyland Lark M2 Wireless Microphone";
          affiliateUrl = "https://amzn.to/40nHiXE";
          description = "High-quality wireless microphone by Hollyland";
          category = "Microphones";
          price = 9999.99;
        },
      ),
      (
        "ecovacs_deebot_n30",
        {
          title = "ECOVACS DEEBOT N30 Plus White 2 in 1 Robot Vacuum and Mop";
          affiliateUrl = "https://amzn.to/3ZNOGvq";
          description = "Intelligent robotic vacuum and mop cleaner";
          category = "Robot Vacuums";
          price = 24999.99;
        },
      ),
    ].values()
  );

  let todaysDeals = Map.fromIter<Text, Product>(
    [
      (
        "deal1",
        {
          title = "2TB Portable SSD External Solid State Drive";
          affiliateUrl = "https://amzn.to/4cEU8Ik";
          description = "Up To 1000 MB/s, Portable External SSD Hard Drive USB C USB3.2 Gen 2, Compatible for PC Laptop PS5";
          category = "Today's Deals";
          price = 39.99;
        },
      ),
      (
        "deal2",
        {
          title = "SLUOTU 15200mAh Charger For iPhone";
          affiliateUrl = "https://amzn.to/4rNofSZ";
          description = "Mini-MagSafe-Power Bank With Stand For Apple";
          category = "Today's Deals";
          price = 29.67;
        },
      ),
      (
        "deal3",
        {
          title = "Apple Vision Pro Stand Charging Stand";
          affiliateUrl = "https://amzn.to/4cF4UOQ";
          description = "Agedatey Foldable Base Charging Station, With USB Extender for Apple Vision Pro, Apple Watch, Headphones, for Apple Vision Pro Accessories";
          category = "Today's Deals";
          price = 48.95;
        },
      ),
      (
        "deal4",
        {
          title = "Klsniur Webcam w Microphone";
          affiliateUrl = "https://amzn.to/4c14S3D";
          description = "𝗡𝗲𝘄 2K HD Computer Camera w/Privacy Cover, Plug Play for Mac, Laptop, Chrome OS";
          category = "Today's Deals";
          price = 14.99;
        },
      ),
      (
        "deal5",
        {
          title = "Microsoft Surface Laptop 7th Edition";
          affiliateUrl = "https://amzn.to/4asc1ZE";
          description = "Windows 11 Copilot+ PC (Snapdragon X Plus 12-core, 16GB RAM, 256GB SSD Storage) 13.8\" Touch Screen Display, Platinum";
          category = "Today's Deals";
          price = 999.00;
        },
      ),
      (
        "deal6",
        {
          title = "2024 HP Envy 16\" 2-in-1 360° Touchscreen Laptop";
          affiliateUrl = "https://amzn.to/3MI2Db1";
          description = "13th Gen Intel i7-1355u, 16GB RAM, 1TB SSD, GTX 3050, Backlit Keyboard, AI Chip for Windows 11 Home Copilot";
          category = "Today's Deals";
          price = 1199.00;
        },
      ),
      (
        "deal7",
        {
          title = "Mini Portable Projector";
          affiliateUrl = "https://amzn.to/4cDedyK";
          description = "5G Wifi Bluetooth Projector, Native 1080P HD, 17.7\" To 200\" Display, 500 ANSI Lumen, Compatible with Android/iOS/Windows/TV Stick";
          category = "Today's Deals";
          price = 159.99;
        },
      ),
      (
        "deal8",
        {
          title = "Dell XPS 14 Laptop";
          affiliateUrl = "https://amzn.to/4c73yw6";
          description = "Intel Core Ultra 7 155H, 16GB LPDDR5x RAM, 512GB SSD PCIe NVMe Storage, 14.5\" 3.2K OLED Touchscreen Display, NVIDIA GeForce RTX 4050, Windows 11 Pro";
          category = "Today's Deals";
          price = 1399.00;
        },
      ),
      (
        "deal9",
        {
          title = "HP Envy Move 23.8” All-in-One PC";
          affiliateUrl = "https://amzn.to/46EubFl";
          description = "Snapdragon X Elite 12-Core, Qualcomm Adreno Graphics, Windows 11 Home Copilot+ All-in-One";
          category = "Today's Deals";
          price = 999.00;
        },
      ),
      (
        "deal10",
        {
          title = "Samsung Galaxy Book4 Pro 16\" Laptop";
          affiliateUrl = "https://amzn.to/4c0KijU";
          description = "Premium Metal Body, Touchscreen, 13th Gen Intel Core i7-1360p, Intel Arc Graphics, 1TB SSD, 32GB RAM, Windows 11 Pro";
          category = "Today's Deals";
          price = 1699.00;
        },
      ),
    ].values()
  );

  public query ({ caller }) func getFeaturedProduct(productId : Text) : async Product {
    switch (featuredProducts.get(productId)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  public query ({ caller }) func getAllFeaturedProducts() : async [Product] {
    featuredProducts.values().toArray();
  };

  public query ({ caller }) func getTodaysDeal(dealId : Text) : async Product {
    switch (todaysDeals.get(dealId)) {
      case (null) { Runtime.trap("Deal not found") };
      case (?deal) { deal };
    };
  };

  public query ({ caller }) func getAllTodaysDeals() : async [Product] {
    todaysDeals.values().toArray();
  };

  public query ({ caller }) func getProductsByCategory(category : Text) : async [Product] {
    let filteredProducts = featuredProducts.values().toArray().filter(
      func(product) { product.category == category }
    );
    filteredProducts.sort(Product.compareByCategory);
  };
};
