const poloTshirts = [
        {
          productCode: "POLO-WHITE-001",
          SKU: "POLO-M-WHITE",
          name: "Classic White Polo T-Shirt",
          slug: "classic-white-polo-t-shirt",
          description: "Elegant white polo t-shirt with premium fabric and custom logo print.",
          HSNCode: "61099090",
          type: "Clothing",
          quantity: 1000,
          GSTRate: 5,
          brand: "PremiumWear",
          fabricType: "Cotton Blend",
          size: ["S", "M", "L", "XL", "XXL"],
          colour: ["White"],
          weight: 200,
          dimensions: {
            length: 70,
            width: 50,
            height: 5
          },
          minOrderQty: 10,
          maxOrderQty: 1000,
          availabilityDate: new Date(),
          price: {
            priceCode: "POLO-WHITE-PRICE",
            singlePrice: 599,
            sales_0_50: 549,
            sales_50_100: 499,
            sales_100_above: 449,
            discountPrice: 499,
            discount: {
              type: "percentage",
              value: 15,
              validUntil: new Date("2023-12-31")
            },
            currency: "INR",
            taxIncluded: true,
            effectiveFrom: new Date(),
            effectiveTo: new Date("2024-12-31")
          },
          image: "/assets/products/polo/classic-white (2).webp",
          subImages: [
            "/assets/products/polo/classic-white (2).webp",
            "/assets/products/polo/classic-white (1).webp",
            "/assets/products/polo/classic-white (3).webp",
            "/assets/products/polo/classic-white (4).webp"
          ],
          tags: [
            "white polo t-shirt",
            "custom logo polo",
            "branded white polo shirt",
            "corporate polo t-shirt"
          ],
          keywords: ["polo", "white", "corporate", "branded"],
          isFeatured: true,
          isPublished: true,
          ratings: {
            average: 4.5,
            count: 120
          },
          metaTitle: "Custom White Polo T-Shirts | Branded Corporate Polos",
          metaDescription: "Premium white polo t-shirts for corporate branding and team uniforms with custom logo printing.",
          audit: {
            createdBy: "admin",
            updatedBy: "admin"
          }
        },
        {
          productCode: "POLO-NAVY-002",
          SKU: "POLO-M-NAVY",
          name: "Navy Blue Polo T-Shirt",
          slug: "navy-blue-polo-t-shirt",
          description: "Stylish navy blue polo t-shirt, perfect for office and events branding.",
          HSNCode: "61099090",
          type: "Clothing",
          quantity: 800,
          GSTRate: 5,
          brand: "PremiumWear",
          fabricType: "Cotton Blend",
          size: ["S", "M", "L", "XL", "XXL"],
          colour: ["Navy Blue"],
          weight: 200,
          dimensions: {
            length: 70,
            width: 50,
            height: 5
          },
          minOrderQty: 10,
          maxOrderQty: 1000,
          availabilityDate: new Date(),
          price: {
            priceCode: "POLO-NAVY-PRICE",
            singlePrice: 599,
            sales_0_50: 549,
            sales_50_100: 499,
            sales_100_above: 449,
            discountPrice: 499,
            discount: {
              type: "percentage",
              value: 15,
              validUntil: new Date("2023-12-31")
            },
            currency: "INR",
            taxIncluded: true,
            effectiveFrom: new Date(),
            effectiveTo: new Date("2024-12-31")
          },
          image: "/assets/products/polo/navy-blue (2).webp",
          subImages: [
            "/assets/products/polo/navy-blue (2).webp",
            "/assets/products/polo/navy-blue (1).webp",
            "/assets/products/polo/navy-blue (3).webp",
            "/assets/products/polo/navy-blue (4).webp"
          ],
          tags: [
            "navy blue polo t-shirt",
            "corporate navy polo",
            "custom navy polo tee",
            "logo printed polo shirt"
          ],
          keywords: ["polo", "navy", "corporate", "branded"],
          isFeatured: true,
          isPublished: true,
          ratings: {
            average: 4.3,
            count: 95
          },
          metaTitle: "Custom Navy Blue Polo T-Shirts | Branded Polos",
          metaDescription: "Premium navy blue polo t-shirts for corporate branding and team uniforms.",
          audit: {
            createdBy: "admin",
            updatedBy: "admin"
          }
        },
        {
          productCode: "POLO-BLACK-003",
          SKU: "POLO-M-BLACK",
          name: "Black Polo T-Shirt",
          slug: "black-polo-t-shirt",
          description: "Premium black polo t-shirt with soft cotton blend and logo embroidery option.",
          HSNCode: "61099090",
          type: "Clothing",
          quantity: 900,
          GSTRate: 5,
          brand: "PremiumWear",
          fabricType: "Cotton Blend",
          size: ["S", "M", "L", "XL", "XXL"],
          colour: ["Black"],
          weight: 200,
          dimensions: {
            length: 70,
            width: 50,
            height: 5
          },
          minOrderQty: 10,
          maxOrderQty: 1000,
          availabilityDate: new Date(),
          price: {
            priceCode: "POLO-BLACK-PRICE",
            singlePrice: 599,
            sales_0_50: 549,
            sales_50_100: 499,
            sales_100_above: 449,
            discountPrice: 499,
            discount: {
              type: "percentage",
              value: 15,
              validUntil: new Date("2023-12-31")
            },
            currency: "INR",
            taxIncluded: true,
            effectiveFrom: new Date(),
            effectiveTo: new Date("2024-12-31")
          },
          image: "/assets/products/polo/black (3).webp",
          subImages: [
            "/assets/products/polo/black (3).webp",
            "/assets/products/polo/black (2).webp",
            "/assets/products/polo/black (1).webp",
            "/assets/products/polo/black (4).webp"
          ],
          tags: [
            "black polo t-shirt",
            "branded polo shirt black",
            "custom corporate polo black",
            "event staff polo shirt"
          ],
          keywords: ["polo", "black", "corporate", "branded"],
          isFeatured: true,
          isPublished: true,
          ratings: {
            average: 4.7,
            count: 150
          },
          metaTitle: "Custom Black Polo T-Shirts | Premium Branded Polos",
          metaDescription: "Premium black polo t-shirts for corporate branding and team uniforms with logo embroidery.",
          audit: {
            createdBy: "admin",
            updatedBy: "admin"
          }
        },
        {
          productCode: "POLO-GREY-004",
          SKU: "POLO-M-GREY",
          name: "Grey Polo T-Shirt",
          slug: "grey-polo-t-shirt",
          description: "Lightweight grey polo t-shirt designed for all-day comfort and corporate branding.",
          HSNCode: "61099090",
          type: "Clothing",
          quantity: 750,
          GSTRate: 5,
          brand: "PremiumWear",
          fabricType: "Cotton Blend",
          size: ["S", "M", "L", "XL", "XXL"],
          colour: ["Grey"],
          weight: 200,
          dimensions: {
            length: 70,
            width: 50,
            height: 5
          },
          minOrderQty: 10,
          maxOrderQty: 1000,
          availabilityDate: new Date(),
          price: {
            priceCode: "POLO-GREY-PRICE",
            singlePrice: 599,
            sales_0_50: 549,
            sales_50_100: 499,
            sales_100_above: 449,
            discountPrice: 499,
            discount: {
              type: "percentage",
              value: 15,
              validUntil: new Date("2023-12-31")
            },
            currency: "INR",
            taxIncluded: true,
            effectiveFrom: new Date(),
            effectiveTo: new Date("2024-12-31")
          },
          image: "/assets/products/polo/grey (3).webp",
          subImages: [
            "/assets/products/polo/grey (3).webp",
            "/assets/products/polo/grey (2).webp",
            "/assets/products/polo/grey (1).webp",
            "/assets/products/polo/grey (4).webp"
          ],
          tags: [
            "grey polo t-shirt",
            "custom grey polo shirt",
            "corporate wear polo",
            "branded grey polo"
          ],
          keywords: ["polo", "grey", "corporate", "branded"],
          isFeatured: false,
          isPublished: true,
          ratings: {
            average: 4.2,
            count: 85
          },
          metaTitle: "Custom Grey Polo T-Shirts | Corporate Branded Polos",
          metaDescription: "Lightweight grey polo t-shirts perfect for corporate branding and all-day comfort.",
          audit: {
            createdBy: "admin",
            updatedBy: "admin"
          }
        },
        {
          productCode: "POLO-RED-005",
          SKU: "POLO-M-RED",
          name: "Red Polo T-Shirt",
          slug: "red-polo-t-shirt",
          description: "Bold red polo t-shirt ideal for events, promotions, and team uniforms.",
          HSNCode: "61099090",
          type: "Clothing",
          quantity: 700,
          GSTRate: 5,
          brand: "PremiumWear",
          fabricType: "Cotton Blend",
          size: ["S", "M", "L", "XL", "XXL"],
          colour: ["Red"],
          weight: 200,
          dimensions: {
            length: 70,
            width: 50,
            height: 5
          },
          minOrderQty: 10,
          maxOrderQty: 1000,
          availabilityDate: new Date(),
          price: {
            priceCode: "POLO-RED-PRICE",
            singlePrice: 599,
            sales_0_50: 549,
            sales_50_100: 499,
            sales_100_above: 449,
            discountPrice: 499,
            discount: {
              type: "percentage",
              value: 15,
              validUntil: new Date("2023-12-31")
            },
            currency: "INR",
            taxIncluded: true,
            effectiveFrom: new Date(),
            effectiveTo: new Date("2024-12-31")
          },
          image: "/assets/products/polo/red (1).webp",
          subImages: [
            "/assets/products/polo/red (1).webp",
            "/assets/products/polo/red (2).webp",
            "/assets/products/polo/red (3).webp",
            "/assets/products/polo/red (4).webp"
          ],
          tags: [
            "red polo t-shirt",
            "custom red polo shirt",
            "branded red polo",
            "event promotion polo"
          ],
          keywords: ["polo", "red", "event", "promotional"],
          isFeatured: false,
          isPublished: true,
          ratings: {
            average: 4.0,
            count: 65
          },
          metaTitle: "Custom Red Polo T-Shirts | Promotional Event Polos",
          metaDescription: "Vibrant red polo t-shirts perfect for events, promotions and team branding.",
          audit: {
            createdBy: "admin",
            updatedBy: "admin"
          }
        },
        {
          productCode: "POLO-ROYALBLUE-006",
          SKU: "POLO-M-ROYALBLUE",
          name: "Royal Blue Polo T-Shirt",
          slug: "royal-blue-polo-t-shirt",
          description: "Royal blue polo t-shirt with durable stitching and stylish fit for branding.",
          HSNCode: "61099090",
          type: "Clothing",
          quantity: 850,
          GSTRate: 5,
          brand: "PremiumWear",
          fabricType: "Cotton Blend",
          size: ["S", "M", "L", "XL", "XXL"],
          colour: ["Royal Blue"],
          weight: 200,
          dimensions: {
            length: 70,
            width: 50,
            height: 5
          },
          minOrderQty: 10,
          maxOrderQty: 1000,
          availabilityDate: new Date(),
          price: {
            priceCode: "POLO-ROYALBLUE-PRICE",
            singlePrice: 599,
            sales_0_50: 549,
            sales_50_100: 499,
            sales_100_above: 449,
            discountPrice: 499,
            discount: {
              type: "percentage",
              value: 15,
              validUntil: new Date("2023-12-31")
            },
            currency: "INR",
            taxIncluded: true,
            effectiveFrom: new Date(),
            effectiveTo: new Date("2024-12-31")
          },
          image: "/assets/products/polo/royal-blue (3).webp",
          subImages: [
            "/assets/products/polo/royal-blue (3).webp",
            "/assets/products/polo/royal-blue (2).webp",
            "/assets/products/polo/royal-blue (1).webp",
            "/assets/products/polo/royal-blue (4).webp"
          ],
          tags: [
            "royal blue polo t-shirt",
            "custom blue polo shirt",
            "logo embroidered blue polo",
            "stylish branded polo"
          ],
          keywords: ["polo", "royal blue", "corporate", "branded"],
          isFeatured: true,
          isPublished: true,
          ratings: {
            average: 4.4,
            count: 110
          },
          metaTitle: "Custom Royal Blue Polo T-Shirts | Branded Corporate Polos",
          metaDescription: "Premium royal blue polo t-shirts with durable stitching perfect for corporate branding.",
          audit: {
            createdBy: "admin",
            updatedBy: "admin"
          }
        },
        {
          productCode: "POLO-GREEN-007",
          SKU: "POLO-M-GREEN",
          name: "Green Polo T-Shirt",
          slug: "green-polo-t-shirt",
          description: "Eco-friendly green polo t-shirt made with breathable cotton fabric.",
          HSNCode: "61099090",
          type: "Clothing",
          quantity: 600,
          GSTRate: 5,
          brand: "PremiumWear",
          fabricType: "Organic Cotton",
          size: ["S", "M", "L", "XL", "XXL"],
          colour: ["Green"],
          weight: 200,
          dimensions: {
            length: 70,
            width: 50,
            height: 5
          },
          minOrderQty: 10,
          maxOrderQty: 1000,
          availabilityDate: new Date(),
          price: {
            priceCode: "POLO-GREEN-PRICE",
            singlePrice: 649,
            sales_0_50: 599,
            sales_50_100: 549,
            sales_100_above: 499,
            discountPrice: 549,
            discount: {
              type: "percentage",
              value: 15,
              validUntil: new Date("2023-12-31")
            },
            currency: "INR",
            taxIncluded: true,
            effectiveFrom: new Date(),
            effectiveTo: new Date("2024-12-31")
          },
          image: "/assets/products/polo/green (2).webp",
          subImages: [
            "/assets/products/polo/green (2).webp",
            "/assets/products/polo/green (1).webp",
            "/assets/products/polo/green (3).webp",
            "/assets/products/polo/green (4).webp"
          ],
          tags: [
            "green polo t-shirt",
            "custom green polo shirt",
            "eco friendly polo shirt",
            "branded green polo"
          ],
          keywords: ["polo", "green", "eco-friendly", "organic"],
          isFeatured: false,
          isPublished: true,
          ratings: {
            average: 4.6,
            count: 75
          },
          metaTitle: "Eco-Friendly Green Polo T-Shirts | Organic Cotton Polos",
          metaDescription: "Sustainable green polo t-shirts made with breathable organic cotton fabric.",
          audit: {
            createdBy: "admin",
            updatedBy: "admin"
          }
        },
        {
          productCode: "POLO-YELLOW-008",
          SKU: "POLO-M-YELLOW",
          name: "Yellow Polo T-Shirt",
          slug: "yellow-polo-t-shirt",
          description: "Vibrant yellow polo t-shirt that stands out in team events and promotions.",
          HSNCode: "61099090",
          type: "Clothing",
          quantity: 550,
          GSTRate: 5,
          brand: "PremiumWear",
          fabricType: "Cotton Blend",
          size: ["S", "M", "L", "XL", "XXL"],
          colour: ["Yellow"],
          weight: 200,
          dimensions: {
            length: 70,
            width: 50,
            height: 5
          },
          minOrderQty: 10,
          maxOrderQty: 1000,
          availabilityDate: new Date(),
          price: {
            priceCode: "POLO-YELLOW-PRICE",
            singlePrice: 599,
            sales_0_50: 549,
            sales_50_100: 499,
            sales_100_above: 449,
            discountPrice: 499,
            discount: {
              type: "percentage",
              value: 15,
              validUntil: new Date("2023-12-31")
            },
            currency: "INR",
            taxIncluded: true,
            effectiveFrom: new Date(),
            effectiveTo: new Date("2024-12-31")
          },
          image: "/assets/products/polo/yellow (2).webp",
          subImages: [
            "/assets/products/polo/yellow (2).webp",
            "/assets/products/polo/yellow (1).webp",
            "/assets/products/polo/yellow (3).webp",
            "/assets/products/polo/yellow (4).webp"
          ],
          tags: [
            "yellow polo t-shirt",
            "custom yellow polo",
            "branded polo shirt yellow",
            "team polo yellow"
          ],
          keywords: ["polo", "yellow", "vibrant", "promotional"],
          isFeatured: false,
          isPublished: true,
          ratings: {
            average: 3.9,
            count: 45
          },
          metaTitle: "Vibrant Yellow Polo T-Shirts | Promotional Team Polos",
          metaDescription: "Eye-catching yellow polo t-shirts perfect for team events and promotions.",
          audit: {
            createdBy: "admin",
            updatedBy: "admin"
          }
        },
        {
          productCode: "POLO-MAROON-009",
          SKU: "POLO-M-MAROON",
          name: "Maroon Polo T-Shirt",
          slug: "maroon-polo-t-shirt",
          description: "Sophisticated maroon polo t-shirt with embroidered logo branding.",
          HSNCode: "61099090",
          type: "Clothing",
          quantity: 650,
          GSTRate: 5,
          brand: "PremiumWear",
          fabricType: "Cotton Blend",
          size: ["S", "M", "L", "XL", "XXL"],
          colour: ["Maroon"],
          weight: 200,
          dimensions: {
            length: 70,
            width: 50,
            height: 5
          },
          minOrderQty: 10,
          maxOrderQty: 1000,
          availabilityDate: new Date(),
          price: {
            priceCode: "POLO-MAROON-PRICE",
            singlePrice: 599,
            sales_0_50: 549,
            sales_50_100: 499,
            sales_100_above: 449,
            discountPrice: 499,
            discount: {
              type: "percentage",
              value: 15,
              validUntil: new Date("2023-12-31")
            },
            currency: "INR",
            taxIncluded: true,
            effectiveFrom: new Date(),
            effectiveTo: new Date("2024-12-31")
          },
          image: "/assets/products/polo/maroon (1).webp",
          subImages: [
            "/assets/products/polo/maroon (1).webp",
            "/assets/products/polo/maroon (2).webp",
            "/assets/products/polo/maroon (3).webp",
            "/assets/products/polo/maroon (4).webp"
          ],
          tags: [
            "maroon polo t-shirt",
            "custom maroon polo shirt",
            "branded maroon polo",
            "corporate event polo"
          ],
          keywords: ["polo", "maroon", "sophisticated", "corporate"],
          isFeatured: false,
          isPublished: true,
          ratings: {
            average: 4.1,
            count: 60
          },
          metaTitle: "Sophisticated Maroon Polo T-Shirts | Corporate Branding",
          metaDescription: "Elegant maroon polo t-shirts with embroidered logo options for corporate branding.",
          audit: {
            createdBy: "admin",
            updatedBy: "admin"
          }
        },
        {
          productCode: "POLO-SKYBLUE-010",
          SKU: "POLO-M-SKYBLUE",
          name: "Sky Blue Polo T-Shirt",
          slug: "sky-blue-polo-t-shirt",
          description: "Comfortable sky blue polo t-shirt perfect for summer promotions and staff wear.",
          HSNCode: "61099090",
          type: "Clothing",
          quantity: 700,
          GSTRate: 5,
          brand: "PremiumWear",
          fabricType: "Cotton Blend",
          size: ["S", "M", "L", "XL", "XXL"],
          colour: ["Sky Blue"],
          weight: 200,
          dimensions: {
            length: 70,
            width: 50,
            height: 5
          },
          minOrderQty: 10,
          maxOrderQty: 1000,
          availabilityDate: new Date(),
          price: {
            priceCode: "POLO-SKYBLUE-PRICE",
            singlePrice: 599,
            sales_0_50: 549,
            sales_50_100: 499,
            sales_100_above: 449,
            discountPrice: 499,
            discount: {
              type: "percentage",
              value: 15,
              validUntil: new Date("2023-12-31")
            },
            currency: "INR",
            taxIncluded: true,
            effectiveFrom: new Date(),
            effectiveTo: new Date("2024-12-31")
          },
          image: "/assets/products/polo/sky-blue (1).webp",
          subImages: [
            "/assets/products/polo/sky-blue (1).webp",
            "/assets/products/polo/sky-blue (2).webp",
            "/assets/products/polo/sky-blue (3).webp",
            "/assets/products/polo/sky-blue (4).webp"
          ],
          tags: [
            "sky blue polo t-shirt",
            "custom sky blue polo",
            "branded polo shirt blue",
            "staff wear polo shirt"
          ],
          keywords: ["polo", "sky blue", "summer", "staff wear"],
          isFeatured: false,
          isPublished: true,
          ratings: {
            average: 4.3,
            count: 80
          },
          metaTitle: "Sky Blue Polo T-Shirts | Summer Staff Wear",
          metaDescription: "Comfortable sky blue polo t-shirts perfect for summer staff uniforms and promotions.",
          audit: {
            createdBy: "admin",
            updatedBy: "admin"
          }
        },
        {
          productCode: "POLO-ORANGE-011",
          SKU: "POLO-M-ORANGE",
          name: "Orange Polo T-Shirt",
          slug: "orange-polo-t-shirt",
          description: "Bright orange polo t-shirt ideal for branding at outdoor events and promotions.",
          HSNCode: "61099090",
          type: "Clothing",
          quantity: 500,
          GSTRate: 5,
          brand: "PremiumWear",
          fabricType: "Cotton Blend",
          size: ["S", "M", "L", "XL", "XXL"],
          colour: ["Orange"],
          weight: 200,
          dimensions: {
            length: 70,
            width: 50,
            height: 5
          },
          minOrderQty: 10,
          maxOrderQty: 1000,
          availabilityDate: new Date(),
          price: {
            priceCode: "POLO-ORANGE-PRICE",
            singlePrice: 599,
            sales_0_50: 549,
            sales_50_100: 499,
            sales_100_above: 449,
            discountPrice: 499,
            discount: {
              type: "percentage",
              value: 15,
              validUntil: new Date("2023-12-31")
            },
            currency: "INR",
            taxIncluded: true,
            effectiveFrom: new Date(),
            effectiveTo: new Date("2024-12-31")
          },
          image: "/assets/products/polo/orange (1).webp",
          subImages: [
            "/assets/products/polo/orange (1).webp",
            "/assets/products/polo/orange (2).webp",
            "/assets/products/polo/orange (3).webp",
            "/assets/products/polo/orange (4).webp"
          ],
          tags: [
            "orange polo t-shirt",
            "custom orange polo shirt",
            "event wear polo",
            "branded orange polo"
          ],
          keywords: ["polo", "orange", "bright", "event"],
          isFeatured: false,
          isPublished: true,
          ratings: {
            average: 3.8,
            count: 40
          },
          metaTitle: "Bright Orange Polo T-Shirts | Outdoor Event Wear",
          metaDescription: "Vibrant orange polo t-shirts perfect for outdoor events and promotional branding.",
          audit: {
            createdBy: "admin",
            updatedBy: "admin"
          }
        },
        {
          productCode: "POLO-PURPLE-012",
          SKU: "POLO-M-PURPLE",
          name: "Purple Polo T-Shirt",
          slug: "purple-polo-t-shirt",
          description: "Trendy purple polo t-shirt designed for stylish branding and corporate use.",
          HSNCode: "61099090",
          type: "Clothing",
          quantity: 600,
          GSTRate: 5,
          brand: "PremiumWear",
          fabricType: "Cotton Blend",
          size: ["S", "M", "L", "XL", "XXL"],
          colour: ["Purple"],
          weight: 200,
          dimensions: {
            length: 70,
            width: 50,
            height: 5
          },
          minOrderQty: 10,
          maxOrderQty: 1000,
          availabilityDate: new Date(),
          price: {
            priceCode: "POLO-PURPLE-PRICE",
            singlePrice: 599,
            sales_0_50: 549,
            sales_50_100: 499,
            sales_100_above: 449,
            discountPrice: 499,
            discount: {
              type: "percentage",
              value: 15,
              validUntil: new Date("2023-12-31")
            },
            currency: "INR",
            taxIncluded: true,
            effectiveFrom: new Date(),
            effectiveTo: new Date("2024-12-31")
          },
          image: "/assets/products/polo/purple (1).webp",
          subImages: [
            "/assets/products/polo/purple (1).webp",
            "/assets/products/polo/purple (2).webp",
            "/assets/products/polo/purple (3).webp",
            "/assets/products/polo/purple (4).webp"
          ],
          tags: [
            "purple polo t-shirt",
            "custom purple polo shirt",
            "branded polo purple",
            "stylish corporate polo"
          ],
          keywords: ["polo", "purple", "trendy", "corporate"],
          isFeatured: false,
          isPublished: true,
          ratings: {
            average: 4.0,
            count: 55
          },
          metaTitle: "Trendy Purple Polo T-Shirts | Stylish Corporate Wear",
          metaDescription: "Fashionable purple polo t-shirts designed for corporate branding and stylish team uniforms.",
          audit: {
            createdBy: "admin",
            updatedBy: "admin"
          }
        },
        {
          productCode: "POLO-PINK-013",
          SKU: "POLO-M-PINK",
          name: "Pink Polo T-Shirt",
          slug: "pink-polo-t-shirt",
          description: "Soft pink polo t-shirt suitable for events, campaigns, and casual corporate wear.",
          HSNCode: "61099090",
          type: "Clothing",
          quantity: 550,
          GSTRate: 5,
          brand: "PremiumWear",
          fabricType: "Cotton Blend",
          size: ["S", "M", "L", "XL", "XXL"],
          colour: ["Pink"],
          weight: 200,
          dimensions: {
            length: 70,
            width: 50,
            height: 5
          },
          minOrderQty: 10,
          maxOrderQty: 1000,
          availabilityDate: new Date(),
          price: {
            priceCode: "POLO-PINK-PRICE",
            singlePrice: 599,
            sales_0_50: 549,
            sales_50_100: 499,
            sales_100_above: 449,
            discountPrice: 499,
            discount: {
              type: "percentage",
              value: 15,
              validUntil: new Date("2023-12-31")
            },
            currency: "INR",
            taxIncluded: true,
            effectiveFrom: new Date(),
            effectiveTo: new Date("2024-12-31")
          },
          image: "/assets/products/polo/pink (1).webp",
          subImages: [
            "/assets/products/polo/pink (1).webp",
            "/assets/products/polo/pink (2).webp",
            "/assets/products/polo/pink (3).webp",
            "/assets/products/polo/pink (4).webp"
          ],
          tags: [
            "pink polo t-shirt",
            "custom pink polo shirt",
            "branded pink polo",
            "corporate wear pink polo"
          ],
          keywords: ["polo", "pink", "soft", "casual"],
          isFeatured: false,
          isPublished: true,
          ratings: {
            average: 4.2,
            count: 70
          },
          metaTitle: "Soft Pink Polo T-Shirts | Casual Corporate Wear",
          metaDescription: "Comfortable pink polo t-shirts suitable for events, campaigns and casual corporate branding.",
          audit: {
            createdBy: "admin",
            updatedBy: "admin"
          }
        },
        {
          productCode: "POLO-OLIVE-014",
          SKU: "POLO-M-OLIVE",
          name: "Olive Polo T-Shirt",
          slug: "olive-polo-t-shirt",
          description: "Casual olive polo t-shirt made with premium cotton and durable stitching.",
          HSNCode: "61099090",
          type: "Clothing",
          quantity: 650,
          GSTRate: 5,
          brand: "PremiumWear",
          fabricType: "Cotton Blend",
          size: ["S", "M", "L", "XL", "XXL"],
          colour: ["Olive"],
          weight: 200,
          dimensions: {
            length: 70,
            width: 50,
            height: 5
          },
          minOrderQty: 10,
          maxOrderQty: 1000,
          availabilityDate: new Date(),
          price: {
            priceCode: "POLO-OLIVE-PRICE",
            singlePrice: 599,
            sales_0_50: 549,
            sales_50_100: 499,
            sales_100_above: 449,
            discountPrice: 499,
            discount: {
              type: "percentage",
              value: 15,
              validUntil: new Date("2023-12-31")
            },
            currency: "INR",
            taxIncluded: true,
            effectiveFrom: new Date(),
            effectiveTo: new Date("2024-12-31")
          },
          image: "/assets/products/polo/olive (1).webp",
          subImages: [
            "/assets/products/polo/olive (1).webp",
            "/assets/products/polo/olive (2).webp",
            "/assets/products/polo/olive (3).webp",
            "/assets/products/polo/olive (4).webp"
          ],
          tags: [
            "olive polo t-shirt",
            "custom olive polo shirt",
            "branded olive polo",
            "stylish olive green polo"
          ],
          keywords: ["polo", "olive", "casual", "durable"],
          isFeatured: false,
          isPublished: true,
          ratings: {
            average: 4.1,
            count: 60
          },
          metaTitle: "Olive Green Polo T-Shirts | Casual Durable Polos",
          metaDescription: "Premium olive green polo t-shirts with durable stitching perfect for casual corporate wear.",
          audit: {
            createdBy: "admin",
            updatedBy: "admin"
          }
        }
      ]
    
  module.exports = poloTshirts;