import {
  Discount,
  Product,
  RecentProducts,
  Comment,
  ProductOrder,
  ProductCustomer,
  EComShop,
  cart,
} from "pages/Ecommerce/type";

// IMage

// import product3 from "../../assets/images/product/img-3.png";
import product4 from "../../assets/images/product/img-4.png";
// import product5 from "../../assets/images/product/img-5.png";
import product6 from "../../assets/images/product/img-6.png";
import product7 from "../../assets/images/product/img-7.png";

import soil from "../../assets/images/materials/Soil.png";
import soil_lg from "../../assets/images/materials/soil-lg.png";
import dw from "../../assets/images/materials/dw.png";
import dw_lg from "../../assets/images/materials/dw-lg.png";
import coal from "../../assets/images/materials/coal.png";
import coal_lg from "../../assets/images/materials/coal-lg.png";
import gypsum from "../../assets/images/materials/gypsum.png";
import gypsum_lg from "../../assets/images/materials/gypsum_lg.png";

import cTiles from "../../assets/images/materials/ceramicTiles.png";
import cTiles_lg from "../../assets/images/materials/ceramicTiles-lg.png";

import steel from "../../assets/images/materials/steel.png";
import steel_lg from "../../assets/images/materials/steel-lg.png";

import silica from "../../assets/images/materials/silica.png";
import silica_lg from "../../assets/images/materials/silica-lg.png";

import lime from "../../assets/images/materials/lime.png";

const BUILDING_MATERIALS = "Building Materials";
const WATER = "Water";
const RAW_MATERIALS = "Raw Materials";

const productsData: Product[] = [
  {
    id: 4,
    image: steel,
    image_lg: steel_lg,
    name: "Steel",
    link: "#",
    category: BUILDING_MATERIALS,
    rating: 4.9,
    basePrice: 800,
    isOffer: false,
    offer: 0,
    reviews: 0,
    description:
      "Steel is a versatile and essential material in construction, manufacturing, and infrastructure projects. Our comprehensive testing service ensures the quality, strength, and durability of steel products, meeting industry standards and specifications.",

    specifications: [
      { type: "Chemical Composition", value: "ASTM A370" },
      { type: "Mechanical Properties", value: "ASTM A370" },
      { type: "Dimensional Tolerances", value: "ASTM A370" },
      { type: "Surface Finish", value: "ASTM A380" },
    ],

    additionalInfo: [
      {
        "High-Quality Construction":
          "Tested steel products guarantee high-quality construction, ensuring structural integrity and safety in buildings, bridges, and other infrastructure projects.",
      },
      {
        "Optimized Material Selection":
          "Our testing service assists in selecting the most suitable grade and type of steel for specific applications, maximizing performance and cost-effectiveness.",
      },
      {
        "Conformance to Standards":
          "Steel testing ensures conformance to relevant ASTM standards and specifications, providing assurance of product quality and compliance with industry requirements.",
      },
      {
        "Quality Assurance in Manufacturing":
          "By testing steel products at various stages of manufacturing, we ensure consistency, reliability, and adherence to customer specifications.",
      },
      {
        "Durability and Longevity":
          "Steel testing evaluates the material's resistance to corrosion, fatigue, and other forms of degradation, ensuring long-term durability and performance.",
      },
    ],
  },
  {
    id: 1,
    image: soil,
    image_lg: soil_lg,
    name: "Soil",
    link: "#",
    category: BUILDING_MATERIALS,
    rating: 5,
    basePrice: 500,
    isOffer: true,
    offer: 10,
    reviews: 0,
    description:
      "Understanding the composition and characteristics of soil is crucial for various industries, construction projects, and environmental studies. Our comprehensive soil material testing service provides in-depth analysis to help you make informed decisions.",

    specifications: [
      { type: "IS Code", value: "IS 2720 Part 16" },
      { type: "IS Code", value: "IS 2720 Part 16" },
      { type: "IS Code", value: "IS 2720 Part 16" },
      { type: "IS Code", value: "IS 2720 Part 16" },
    ],

    additionalInfo: [
      {
        "Optimize Construction Projects":
          "Accurate soil testing ensures that construction projects are built on a solid foundation, minimizing the risk of structural issues.",
      },
      {
        "Agricultural Planning":
          "Tailor agricultural practices to soil conditions, enhancing crop yield and sustainability.",
      },
      {
        "Water Management":
          "Assess soil permeability and drainage characteristics for effective water management.",
      },

      {
        "Environmental Impact Assessment":
          "Evaluate the environmental impact of land use and development by analyzing soil composition and contamination levels.",
      },

      {
        "Geotechnical Insights":
          "Gain insights into soil stability and engineering properties, essential for infrastructure projects.",
      },

      {
        "Regulatory Compliance":
          "Meet regulatory requirements by conducting necessary soil tests for construction and development projects.",
      },
    ],
  },

  {
    id: 2,
    image: soil,
    image_lg: soil_lg,
    name: "Fly Ash",
    link: "#",
    category: BUILDING_MATERIALS,
    rating: 4.5,
    basePrice: 350,
    isOffer: false,
    offer: 0,
    reviews: 0,
    description:
      "Fly Ash is a byproduct of coal combustion and is widely used as a supplementary cementitious material in concrete production. Our comprehensive testing service provides valuable insights into the properties and suitability of fly ash for various construction applications.",

    specifications: [
      { type: "Chemical Composition", value: "ASTM C618" },
      { type: "Physical Properties", value: "ASTM C618" },
      { type: "Particle Size Distribution", value: "ASTM C618" },
      { type: "Strength Activity Index", value: "ASTM C618" },
    ],

    additionalInfo: [
      {
        "Enhanced Concrete Performance":
          "Fly Ash improves concrete workability, durability, and strength, making it an ideal choice for sustainable construction.",
      },
      {
        "Reduced Environmental Impact":
          "Utilizing fly ash in concrete reduces the need for cement, leading to lower greenhouse gas emissions and conserving natural resources.",
      },
      {
        "Effective Waste Management":
          "By recycling fly ash, we contribute to sustainable waste management practices and reduce the environmental burden of coal combustion residues.",
      },
      {
        "Regulatory Compliance":
          "Our testing ensures that fly ash meets regulatory standards and specifications, guaranteeing its safe and effective use in construction projects.",
      },
      {
        "Optimized Mix Design":
          "Tailored testing services assist in optimizing concrete mix designs, maximizing the benefits of fly ash while meeting project requirements.",
      },
    ],
  },

  {
    id: 3,
    image: soil,
    image_lg: soil_lg,
    name: "Admixture",
    link: "#",
    category: BUILDING_MATERIALS,
    rating: 4.8,
    basePrice: 600,
    isOffer: true,
    offer: 15,
    reviews: 0,
    description:
      "Admixtures are chemical formulations added to concrete during mixing to enhance its performance and workability. Our specialized testing service ensures the quality and effectiveness of admixtures, contributing to superior concrete construction.",

    specifications: [
      { type: "Chemical Composition", value: "ASTM C494" },
      { type: "Physical Properties", value: "ASTM C494" },
      { type: "Compatibility with Cement", value: "ASTM C494" },
      { type: "Dosage Requirements", value: "ASTM C494" },
    ],

    additionalInfo: [
      {
        "Improved Concrete Properties":
          "Admixtures enhance concrete properties such as strength, durability, workability, and setting time, leading to better performance in various construction applications.",
      },
      {
        "Enhanced Construction Efficiency":
          "By optimizing concrete mix designs with admixtures, construction processes become more efficient, reducing labor costs and project timelines.",
      },
      {
        "Sustainability and Environmental Benefits":
          "Utilizing admixtures allows for the reduction of cement content in concrete mixes, resulting in lower carbon emissions and decreased environmental impact.",
      },
      {
        "Tailored Solutions":
          "Our testing service provides customized recommendations for admixture selection and dosage based on project requirements and performance objectives.",
      },
      {
        "Compliance with Standards":
          "Admixture testing ensures compliance with relevant ASTM standards and specifications, guaranteeing the quality and performance of concrete mixes.",
      },
    ],
  },

  {
    id: 5,
    image: dw,
    image_lg: dw_lg,
    name: "Drinking Water",
    link: "#",
    category: WATER,
    rating: 4.7,
    basePrice: 50,
    isOffer: true,
    offer: 5,
    reviews: 0,
    description:
      "Ensuring the quality and safety of drinking water is paramount for public health and well-being. Our comprehensive testing service evaluates the chemical, physical, and microbiological properties of drinking water to ensure compliance with regulatory standards and safeguard public health.",

    specifications: [
      { type: "Chemical Composition", value: "EPA Standards" },
      { type: "Microbiological Analysis", value: "EPA Standards" },
      { type: "Physical Properties", value: "EPA Standards" },
      { type: "Taste and Odor", value: "EPA Standards" },
    ],

    additionalInfo: [
      {
        "Health and Safety Compliance":
          "Our testing service ensures that drinking water meets regulatory standards for chemical contaminants, bacteria, and physical characteristics, safeguarding public health and safety.",
      },
      {
        "Early Detection of Contaminants":
          "Regular testing helps detect contaminants such as heavy metals, pesticides, and bacteria early, allowing for timely corrective measures and prevention of waterborne diseases.",
      },
      {
        "Quality Assurance for Consumers":
          "By testing drinking water quality, we provide assurance to consumers and stakeholders regarding the safety and purity of the water they consume.",
      },
      {
        "Environmental Protection":
          "Monitoring water quality contributes to the protection of water sources and ecosystems, ensuring sustainable water management and environmental conservation.",
      },
      {
        "Customized Testing Solutions":
          "Our testing services are tailored to the specific requirements of municipalities, water utilities, industries, and private individuals, providing personalized solutions for water quality assurance.",
      },
    ],
  },

  {
    id: 6,
    image: soil,
    image_lg: soil_lg,
    name: "Construction Water",
    link: "#",
    category: WATER,
    rating: 4.5,
    basePrice: 30,
    isOffer: false,
    offer: 0,
    reviews: 0,
    description:
      "Construction water plays a vital role in various construction activities, including concrete mixing, dust suppression, and compaction. Our testing service ensures the quality and suitability of construction water, contributing to the successful completion of construction projects.",

    specifications: [
      { type: "pH Level", value: "ASTM D1293" },
      { type: "Total Dissolved Solids (TDS)", value: "ASTM D5907" },
      { type: "Suspended Solids", value: "ASTM D5907" },
      { type: "Chloride Content", value: "ASTM D512" },
    ],

    additionalInfo: [
      {
        "Optimized Concrete Performance":
          "Testing construction water helps optimize concrete mix designs by ensuring the water quality meets specified requirements, leading to improved concrete performance and durability.",
      },
      {
        "Dust Suppression Efficiency":
          "Evaluation of construction water quality aids in effective dust suppression, reducing airborne particles and maintaining a safe and healthy working environment at construction sites.",
      },
      {
        "Prevention of Equipment Damage":
          "By testing for harmful contaminants, such as chloride ions, we help prevent corrosion and damage to construction equipment and infrastructure.",
      },
      {
        "Environmental Compliance":
          "Testing construction water ensures compliance with environmental regulations, minimizing the impact of construction activities on water resources and ecosystems.",
      },
      {
        "Cost-Effective Solutions":
          "Our testing service helps optimize water usage and treatment processes, reducing costs associated with water procurement, treatment, and disposal in construction projects.",
      },
    ],
  },

  {
    id: 7,
    image: coal,
    image_lg: coal_lg,
    name: "Coal",
    link: "#",
    category: RAW_MATERIALS,
    rating: 4.2,
    basePrice: 100,
    isOffer: true,
    offer: 10,
    reviews: 0,
    description:
      "Coal is a fundamental raw material in energy production, industrial manufacturing, and heating applications. Our specialized testing service evaluates the quality and properties of coal, ensuring its suitability for various applications and compliance with regulatory standards.",

    specifications: [
      { type: "Proximate Analysis", value: "ASTM D3172" },
      { type: "Ultimate Analysis", value: "ASTM D3176" },
      { type: "Moisture Content", value: "ASTM D3173" },
      { type: "Ash Content", value: "ASTM D3174" },
    ],

    additionalInfo: [
      {
        "Optimized Combustion Efficiency":
          "Testing coal quality helps optimize combustion processes, maximizing energy output and efficiency in power generation and industrial applications.",
      },
      {
        "Environmental Impact Assessment":
          "Evaluation of coal properties assists in assessing the environmental impact of coal combustion, including emissions of greenhouse gases, particulate matter, and pollutants.",
      },
      {
        "Quality Assurance for Industrial Use":
          "By ensuring consistent coal quality, we provide assurance to industries relying on coal as a primary energy source or feedstock, minimizing production disruptions and maintaining product quality.",
      },
      {
        "Compliance with Regulatory Standards":
          "Coal testing ensures compliance with regulatory standards and specifications, ensuring safe and environmentally responsible utilization of coal resources.",
      },
      {
        "Resource Management and Optimization":
          "Through comprehensive testing, we help optimize coal utilization, resource management, and process efficiency, contributing to sustainability and cost-effectiveness in coal-based industries.",
      },
    ],
  },

  {
    id: 8,
    image: soil,
    image_lg: soil_lg,
    name: "Bitumen",
    link: "#",
    category: BUILDING_MATERIALS,
    rating: 4.6,
    basePrice: 200,
    isOffer: true,
    offer: 20,
    reviews: 0,
    description:
      "Bitumen, also known as asphalt, is a crucial component in road construction and waterproofing applications. Our specialized testing service evaluates the quality, performance, and properties of bitumen, ensuring durability, longevity, and safety in infrastructure projects.",

    specifications: [
      { type: "Penetration Test", value: "ASTM D5" },
      { type: "Softening Point", value: "ASTM D36" },
      { type: "Ductility Test", value: "ASTM D113" },
      { type: "Flash Point", value: "ASTM D92" },
    ],

    additionalInfo: [
      {
        "Optimized Road Performance":
          "Testing bitumen quality ensures optimal performance in road construction, including enhanced durability, resistance to deformation, and improved pavement lifespan.",
      },
      {
        "Waterproofing Efficiency":
          "Evaluation of bitumen properties ensures effective waterproofing in roofing, paving, and sealing applications, protecting structures from water ingress and damage.",
      },
      {
        "Safety and Environmental Compliance":
          "Bitumen testing ensures compliance with safety and environmental regulations, including assessment of emissions, toxicity, and ecological impact, promoting sustainable and responsible use of bituminous materials.",
      },
      {
        "Customized Solutions for Project Requirements":
          "Our testing services offer customized solutions tailored to project specifications, including material selection, mix design optimization, and performance enhancement strategies.",
      },
      {
        "Quality Assurance and Performance Validation":
          "By validating bitumen quality and performance, we provide assurance to stakeholders, contractors, and authorities regarding the reliability and longevity of infrastructure projects.",
      },
    ],
  },

  {
    id: 9,
    image: soil,
    image_lg: soil_lg,
    name: "Bitumen Emulsion",
    link: "#",
    category: BUILDING_MATERIALS,
    rating: 4.7,
    basePrice: 250,
    isOffer: false,
    offer: 0,
    reviews: 0,
    description:
      "Bitumen emulsion is a versatile material used in various road construction and maintenance applications, including surface treatments, tack coats, and cold mix asphalt. Our specialized testing service ensures the quality, stability, and performance of bitumen emulsions, facilitating durable and cost-effective road solutions.",

    specifications: [
      { type: "Particle Size Distribution", value: "ASTM D244" },
      { type: "Storage Stability", value: "ASTM D6936" },
      { type: "Setting Time", value: "ASTM D244" },
      { type: "Viscosity", value: "ASTM D244" },
    ],

    additionalInfo: [
      {
        "Enhanced Road Surface Performance":
          "Testing bitumen emulsion quality ensures optimal performance in road surface treatments, providing improved adhesion, flexibility, and resistance to weathering and traffic-induced stresses.",
      },
      {
        "Cost-Effective Pavement Solutions":
          "Evaluation of bitumen emulsion properties allows for the development of cost-effective pavement solutions, including the use of cold mix asphalt and recycling techniques, reducing material and construction costs.",
      },
      {
        "Environmental Compatibility":
          "By assessing bitumen emulsion stability and environmental impact, we ensure compliance with regulatory standards and promote the use of environmentally friendly road construction and maintenance practices.",
      },
      {
        "Customized Formulations for Specific Applications":
          "Our testing services offer tailored solutions for different road construction and maintenance applications, including tack coats, chip seals, slurry seals, and microsurfacing, optimizing performance and longevity.",
      },
      {
        "Quality Assurance and Performance Validation":
          "Through rigorous testing, we provide assurance of bitumen emulsion quality and performance, supporting project stakeholders in achieving durable, safe, and sustainable road infrastructure.",
      },
    ],
  },

  {
    id: 10,
    image: cTiles,
    image_lg: cTiles_lg,
    name: "Ceramica Tiles",
    link: "#",
    category: BUILDING_MATERIALS,
    rating: 4.9,
    basePrice: 20,
    isOffer: true,
    offer: 5,
    reviews: 0,
    description:
      "Ceramica tiles are versatile and stylish materials used for flooring, wall cladding, and decorative purposes in residential, commercial, and industrial spaces. Our specialized testing service ensures the quality, durability, and aesthetic appeal of ceramica tiles, meeting the diverse needs and preferences of our clients.",

    specifications: [
      { type: "Dimensional Accuracy", value: "ASTM C499" },
      { type: "Water Absorption", value: "ASTM C373" },
      { type: "Breaking Strength", value: "ASTM C648" },
      { type: "Chemical Resistance", value: "ASTM C650" },
    ],

    additionalInfo: [
      {
        "Enhanced Aesthetic Appeal":
          "Testing ceramica tile quality ensures uniformity in color, texture, and finish, enhancing the aesthetic appeal and visual impact of interior and exterior spaces.",
      },
      {
        "Durability and Longevity":
          "Evaluation of ceramica tile strength and resistance properties ensures durability and longevity, withstanding wear, impact, moisture, and chemical exposure in high-traffic areas and challenging environments.",
      },
      {
        "Ease of Maintenance":
          "By assessing ceramica tile water absorption and chemical resistance, we provide insights into maintenance requirements and compatibility with cleaning agents, facilitating easy care and upkeep.",
      },
      {
        "Customized Solutions for Design Flexibility":
          "Our testing services offer tailored solutions for different ceramica tile types, sizes, and applications, allowing for design flexibility and customization to suit diverse architectural styles and project requirements.",
      },
      {
        "Quality Assurance and Performance Validation":
          "Through rigorous testing, we ensure ceramica tile quality and performance, providing assurance to architects, designers, contractors, and end-users of superior products that meet or exceed industry standards and expectations.",
      },
    ],
  },

  {
    id: 11,
    image: soil,
    image_lg: soil_lg,
    name: "Fine Aggregates",
    link: "#",
    category: BUILDING_MATERIALS,
    rating: 4.8,
    basePrice: 40,
    isOffer: false,
    offer: 0,
    reviews: 0,
    description:
      "Fine aggregates, often referred to as sand, are essential components in concrete, mortar, and asphalt mixtures. Our specialized testing service ensures the quality, gradation, and performance of fine aggregates, contributing to the strength, durability, and workability of construction materials.",

    specifications: [
      { type: "Grading", value: "ASTM C136" },
      { type: "Fineness Modulus", value: "ASTM C117" },
      { type: "Specific Gravity", value: "ASTM C128" },
      { type: "Absorption", value: "ASTM C128" },
    ],

    additionalInfo: [
      {
        "Optimized Concrete Mixtures":
          "Testing fine aggregate properties ensures proper grading, fineness modulus, and particle size distribution, optimizing concrete mixtures for desired strength, workability, and durability.",
      },
      {
        "Enhanced Cohesion and Bonding":
          "Evaluation of fine aggregate characteristics contributes to improved cohesion, bonding, and interlocking between particles, enhancing the overall performance and integrity of concrete and mortar.",
      },
      {
        "Uniformity and Consistency":
          "By assessing fine aggregate grading, fineness modulus, and specific gravity, we ensure uniformity and consistency in material properties, minimizing variations and ensuring predictable and reliable construction outcomes.",
      },
      {
        "Sustainable Construction Practices":
          "Testing fine aggregates supports the use of sustainable construction practices by optimizing material usage, reducing waste, and minimizing environmental impact through efficient resource utilization and performance-based specifications.",
      },
      {
        "Quality Assurance and Compliance":
          "Through rigorous testing, we provide quality assurance and compliance verification, ensuring that fine aggregates meet or exceed industry standards and project specifications, delivering reliable and durable construction materials.",
      },
    ],
  },

  {
    id: 12,
    image: soil,
    image_lg: soil_lg,
    name: "Coarse Aggregates",
    link: "#",
    category: BUILDING_MATERIALS,
    rating: 4.7,
    basePrice: 60,
    isOffer: true,
    offer: 10,
    reviews: 0,
    description:
      "Coarse aggregates, typically gravel or crushed stone, are essential components in concrete, asphalt, and road base materials. Our specialized testing service ensures the quality, gradation, and strength of coarse aggregates, contributing to the structural integrity and performance of construction projects.",

    specifications: [
      { type: "Gradation", value: "ASTM C136" },
      { type: "Specific Gravity", value: "ASTM C127" },
      { type: "Absorption", value: "ASTM C127" },
      { type: "Los Angeles Abrasion", value: "ASTM C131" },
    ],

    additionalInfo: [
      {
        "Optimized Concrete and Asphalt Mixtures":
          "Testing coarse aggregate properties ensures proper gradation, particle size distribution, and strength characteristics, optimizing concrete and asphalt mixtures for enhanced performance, durability, and longevity.",
      },
      {
        "Stability and Load-Bearing Capacity":
          "Evaluation of coarse aggregate properties contributes to improved stability, load-bearing capacity, and resistance to deformation, providing a solid foundation and support for structures, roads, and pavements.",
      },
      {
        "Resistance to Degradation and Wear":
          "By assessing coarse aggregate hardness, abrasion resistance, and durability, we ensure resistance to degradation and wear, maintaining structural integrity and appearance over time, even in harsh environmental conditions.",
      },
      {
        "Sustainable and Cost-Effective Solutions":
          "Testing coarse aggregates supports the use of sustainable and cost-effective construction practices by optimizing material selection, reducing material waste, and minimizing environmental impact through efficient resource utilization and performance-based specifications.",
      },
      {
        "Quality Assurance and Compliance":
          "Through rigorous testing, we provide quality assurance and compliance verification, ensuring that coarse aggregates meet or exceed industry standards and project specifications, delivering reliable and durable construction materials.",
      },
    ],
  },

  {
    id: 13,
    image: gypsum_lg,
    image_lg: gypsum,
    name: "Gypsum",
    link: "#",
    category: BUILDING_MATERIALS,
    rating: 4.6,
    basePrice: 30,
    isOffer: false,
    offer: 0,
    reviews: 0,
    description:
      "Gypsum is a versatile material used in construction for various applications, including plastering, drywall, and cement production. Our specialized testing service ensures the quality, purity, and performance of gypsum products, contributing to the structural integrity, aesthetics, and durability of buildings and infrastructure projects.",

    specifications: [
      { type: "Chemical Composition", value: "ASTM C471M" },
      { type: "Moisture Content", value: "ASTM C471M" },
      { type: "Fineness", value: "ASTM C471M" },
      { type: "Setting Time", value: "ASTM C471M" },
    ],

    additionalInfo: [
      {
        "Optimized Plastering and Drywalling":
          "Testing gypsum quality ensures optimal performance in plastering and drywalling applications, providing smooth finishes, excellent adhesion, and crack resistance for interior walls and ceilings.",
      },
      {
        "Enhanced Fire Resistance":
          "Evaluation of gypsum purity and composition contributes to improved fire resistance properties, enhancing building safety and compliance with fire safety regulations and standards.",
      },
      {
        "Efficient Cement Production":
          "By assessing gypsum fineness, setting time, and compatibility with other materials, we ensure efficient cement production processes, enhancing cement quality, workability, and performance.",
      },
      {
        "Environmental Sustainability":
          "Testing gypsum products supports environmentally sustainable construction practices by verifying product purity, recyclability, and low embodied energy, minimizing environmental impact and promoting green building initiatives.",
      },
      {
        "Quality Assurance and Compliance":
          "Through rigorous testing, we provide quality assurance and compliance verification, ensuring that gypsum products meet or exceed industry standards and project specifications, delivering reliable and high-performance construction materials.",
      },
    ],
  },

  {
    id: 14,
    image: lime,
    image_lg: lime,
    name: "Limestone",
    link: "#",
    category: BUILDING_MATERIALS,
    rating: 4.7,
    basePrice: 50,
    isOffer: true,
    offer: 10,
    reviews: 0,
    description:
      "Limestone is a versatile sedimentary rock used in various construction applications, including building facades, flooring, and aggregate for concrete. Our specialized testing service ensures the quality, durability, and suitability of limestone products, contributing to the aesthetics, functionality, and longevity of construction projects.",

    specifications: [
      { type: "Chemical Composition", value: "ASTM C25" },
      { type: "Physical Properties", value: "ASTM C25" },
      { type: "Compressive Strength", value: "ASTM C170" },
      { type: "Absorption", value: "ASTM C97" },
    ],

    additionalInfo: [
      {
        "Enhanced Building Aesthetics":
          "Testing limestone quality ensures consistent color, texture, and appearance, enhancing the aesthetic appeal and architectural charm of building facades, flooring, and decorative elements.",
      },
      {
        "Improved Structural Integrity":
          "Evaluation of limestone properties contributes to improved compressive strength, durability, and resistance to weathering, providing structural stability and longevity in construction applications.",
      },
      {
        "Sustainable Resource Management":
          "By assessing limestone composition and extraction practices, we promote sustainable resource management and environmental stewardship, minimizing environmental impact and conserving natural resources.",
      },
      {
        "Versatile Construction Applications":
          "Testing limestone suitability for various construction applications, including concrete aggregate, road base, and landscaping, ensures versatility and adaptability to diverse project requirements and specifications.",
      },
      {
        "Quality Assurance and Compliance":
          "Through rigorous testing, we provide quality assurance and compliance verification, ensuring that limestone products meet or exceed industry standards and project specifications, delivering reliable and high-performance construction materials.",
      },
    ],
  },

  {
    id: 15,
    image: soil,
    image_lg: soil_lg,
    name: "Ground Granulated Blast Furnace Slag (GGBS)",
    link: "#",
    category: BUILDING_MATERIALS,
    rating: 4.6,
    basePrice: 70,
    isOffer: true,
    offer: 15,
    reviews: 0,
    description:
      "Ground Granulated Blast Furnace Slag (GGBS) is a byproduct of the steel manufacturing process, used as a supplementary cementitious material in concrete production. Our specialized testing service ensures the quality, performance, and sustainability of GGBS, contributing to the strength, durability, and environmental friendliness of concrete structures.",

    specifications: [
      { type: "Chemical Composition", value: "ASTM C989" },
      { type: "Physical Properties", value: "ASTM C989" },
      { type: "Fineness", value: "ASTM C989" },
      { type: "Activity Index", value: "ASTM C989" },
    ],

    additionalInfo: [
      {
        "Improved Concrete Performance":
          "Testing GGBS quality ensures enhanced concrete performance, including improved workability, strength, durability, and resistance to sulfate attack and alkali-silica reaction.",
      },
      {
        "Environmental Sustainability":
          "By utilizing GGBS as a cement replacement, we promote environmental sustainability by reducing carbon emissions, conserving natural resources, and minimizing waste generation from steel production.",
      },
      {
        "Cost-Effective Construction":
          "By optimizing concrete mix designs with GGBS, we provide cost-effective construction solutions, reducing cement usage, lowering material costs, and extending the service life of concrete structures.",
      },
      {
        "Regulatory Compliance":
          "Our testing services ensure that GGBS meets regulatory requirements and industry standards, guaranteeing the quality, consistency, and compatibility of GGBS with cement and other concrete additives.",
      },
      {
        "Quality Assurance and Performance Validation":
          "Through rigorous testing, we provide quality assurance and performance validation, ensuring that GGBS enhances the long-term performance and sustainability of concrete structures in various construction applications.",
      },
    ],
  },

  {
    id: 16,
    image: silica,
    image_lg: silica_lg,
    name: "Microsilica (Silica Fume)",
    link: "#",
    category: BUILDING_MATERIALS,
    rating: 4.8,
    basePrice: 80,
    isOffer: false,
    offer: 0,
    reviews: 0,
    description:
      "Microsilica, also known as silica fume, is a byproduct of silicon metal or ferrosilicon alloy production, used as a supplementary cementitious material in concrete. Our specialized testing service ensures the quality, consistency, and performance of microsilica, enhancing the strength, durability, and sustainability of concrete structures.",

    specifications: [
      { type: "Chemical Composition", value: "ASTM C1240" },
      { type: "Physical Properties", value: "ASTM C1240" },
      { type: "Fineness", value: "ASTM C1240" },
      { type: "Specific Surface Area", value: "ASTM C1240" },
    ],

    additionalInfo: [
      {
        "Enhanced Concrete Strength and Durability":
          "Testing microsilica quality ensures enhanced concrete strength, durability, and resistance to chemical attack, abrasion, and corrosion, leading to longer service life and reduced maintenance costs for concrete structures.",
      },
      {
        "Improved Workability and Cohesion":
          "By optimizing concrete mix designs with microsilica, we enhance workability, flowability, and cohesion, facilitating easier placement, compaction, and finishing of concrete in various construction applications.",
      },
      {
        "Environmental Sustainability":
          "Utilizing microsilica in concrete reduces carbon emissions, conserves natural resources, and minimizes waste generation, contributing to environmentally sustainable construction practices and green building initiatives.",
      },
      {
        "Cost-Effective Construction Solutions":
          "Through the efficient use of microsilica, we provide cost-effective construction solutions by reducing cement content, improving concrete performance, and extending the service life of concrete structures, resulting in long-term savings and benefits.",
      },
      {
        "Quality Assurance and Performance Validation":
          "Our testing services ensure that microsilica meets regulatory requirements and industry standards, providing quality assurance and performance validation for concrete producers, contractors, and project stakeholders.",
      },
    ],
  },
];

const recentProducts: RecentProducts[] = [
  {
    id: 1,
    img: product7,
    name: "Wireless Headphone",
    link: "",
    rating: 4,
    oldPrice: 240,
    newPrice: 225,
  },
  {
    id: 2,
    img: product4,
    name: "Smiley Plain T-shirt",
    link: "",
    rating: 4,
    oldPrice: 150,
    newPrice: 145,
  },
  {
    id: 3,
    img: product6,
    name: "Sky blue color T-shirt",
    link: "",
    rating: 4,
    oldPrice: 138,
    newPrice: 135,
  },
];

const comments: Comment[] = [
  {
    id: 1,
    img: "avatar2",
    name: "Brian",
    description:
      "If several languages coalesce, the grammar of the resulting language.",
    date: "5 hrs ago",
  },
  {
    id: 2,
    img: "avatar4",
    name: "Denver",
    description:
      "To an English person, it will seem like simplified English, as a skeptical Cambridge",
    date: "07 Oct, 2019",
    childComment: [
      {
        id: 1,
        img: "avatar5",
        name: "Henry",
        description:
          "Their separate existence is a myth. For science, music, sport, etc.",
        date: "08 Oct, 2019",
      },
    ],
  },
  {
    id: 3,
    img: "Null",
    name: "Neal",
    description:
      "Everyone realizes why a new common language would be desirable.",
    date: "05 Oct, 2019",
  },
];

const discountData: Discount[] = [
  { label: "Less than 10%", value: 0 },
  { label: "10% or more", value: 10 },
  { label: "20% or more", value: 20 },
  { label: "30% or more", value: 30 },
  { label: "40% or more", value: 40 },
  { label: "50% or more", value: 50 },
];

const orders: ProductOrder[] = [
  {
    id: 1,
    orderId: "#SK2540",
    billingName: "Neal Matthews",
    orderDate: "07 Oct, 2019",
    total: "400",
    badgeClass: "success",
    paymentStatus: "Paid",
    methodIcon: "fa-cc-mastercard",
    paymentMethod: "Mastercard",
  },
  {
    id: 2,
    orderId: "#SK2541",
    billingName: "Jamal Burnett",
    orderDate: "07 Oct, 2019",
    total: "380",
    badgeClass: "danger",
    paymentStatus: "Chargeback",
    methodIcon: "fa-cc-visa",
    paymentMethod: "Visa",
  },
  {
    id: 3,
    orderId: "#SK2542",
    billingName: "Juan Mitchell",
    orderDate: "06 Oct, 2019",
    total: "384",
    badgeClass: "success",
    paymentStatus: "Paid",
    methodIcon: "fa-cc-paypal",
    paymentMethod: "Paypal",
  },
  {
    id: 4,
    orderId: "#SK2543",
    billingName: "Barry Dick",
    orderDate: "05 Oct, 2019",
    total: "412",
    badgeClass: "success",
    paymentStatus: "Paid",
    methodIcon: "fa-cc-mastercard",
    paymentMethod: "Mastercard",
  },
  {
    id: 5,
    orderId: "#SK2544",
    billingName: "Ronald Taylor",
    orderDate: "04 Oct, 2019",
    total: "404",
    badgeClass: "warning",
    paymentStatus: "Refund",
    methodIcon: "fa-cc-visa",
    paymentMethod: "Visa",
  },
  {
    id: 6,
    orderId: "#SK2545",
    billingName: "Jacob Hunter",
    orderDate: "04 Oct, 2019",
    total: "392",
    badgeClass: "success",
    paymentStatus: "Paid",
    methodIcon: "fa-cc-paypal",
    paymentMethod: "Paypal",
  },
  {
    id: 7,
    orderId: "#SK2546",
    billingName: "William Cruz",
    orderDate: "03 Oct, 2019",
    total: "374",
    badgeClass: "success",
    paymentStatus: "Paid",
    methodIcon: "fas fa-money-bill-alt",
    paymentMethod: "COD",
  },
  {
    id: 8,
    orderId: "#SK2547",
    billingName: "Dustin Moser",
    orderDate: "02 Oct, 2019",
    total: "350",
    badgeClass: "success",
    paymentStatus: "Paid",
    methodIcon: "fa-cc-paypal",
    paymentMethod: "Mastercard",
  },
  {
    id: 9,
    orderId: "#SK2548",
    billingName: "Clark Benson",
    orderDate: "01 Oct, 2019",
    total: "345",
    badgeClass: "warning",
    paymentStatus: "Refund",
    methodIcon: "fa-cc-paypal",
    paymentMethod: "Visa",
  },
  {
    id: 10,
    orderId: "#SK2540",
    billingName: "Neal Matthews",
    orderDate: "07 Oct, 2019",
    total: "400",
    badgeClass: "success",
    paymentStatus: "Paid",
    methodIcon: "fa-cc-mastercard",
    paymentMethod: "Mastercard",
  },
  {
    id: 11,
    orderId: "#SK2541",
    billingName: "Jamal Burnett",
    orderDate: "07 Oct, 2019",
    total: "380",
    badgeClass: "danger",
    paymentStatus: "Chargeback",
    methodIcon: "fa-cc-visa",
    paymentMethod: "Visa",
  },
  {
    id: 12,
    orderId: "#SK2542",
    billingName: "Juan Mitchell",
    orderDate: "06 Oct, 2019",
    total: "384",
    badgeClass: "success",
    paymentStatus: "Paid",
    methodIcon: "fa-cc-paypal",
    paymentMethod: "Paypal",
  },
  {
    id: 13,
    orderId: "#SK2543",
    billingName: "Barry Dick",
    orderDate: "05 Oct, 2019",
    total: "412",
    badgeClass: "success",
    paymentStatus: "Paid",
    methodIcon: "fa-cc-mastercard",
    paymentMethod: "Mastercard",
  },
  {
    id: 14,
    orderId: "#SK2540",
    billingName: "Neal Matthews",
    orderDate: "07 Oct, 2019",
    total: "400",
    badgeClass: "success",
    paymentStatus: "Paid",
    methodIcon: "fa-cc-mastercard",
    paymentMethod: "Mastercard",
  },
  {
    id: 15,
    orderId: "#SK2541",
    billingName: "Jamal Burnett",
    orderDate: "07 Oct, 2019",
    total: "380",
    badgeClass: "danger",
    paymentStatus: "Chargeback",
    methodIcon: "fa-cc-visa",
    paymentMethod: "Visa",
  },
  {
    id: 16,
    orderId: "#SK2542",
    billingName: "Juan Mitchell",
    orderDate: "06 Oct, 2019",
    total: "384",
    badgeClass: "success",
    paymentStatus: "Paid",
    methodIcon: "fa-cc-paypal",
    paymentMethod: "Paypal",
  },
  {
    id: 17,
    orderId: "#SK2543",
    billingName: "Barry Dick",
    orderDate: "05 Oct, 2019",
    total: "412",
    badgeClass: "success",
    paymentStatus: "Paid",
    methodIcon: "fa-cc-mastercard",
    paymentMethod: "Mastercard",
  },
  {
    id: 18,
    orderId: "#SK2544",
    billingName: "Ronald Taylor",
    orderDate: "04 Oct, 2019",
    total: "404",
    badgeClass: "warning",
    paymentStatus: "Refund",
    methodIcon: "fa-cc-visa",
    paymentMethod: "Visa",
  },
  {
    id: 19,
    orderId: "#SK2545",
    billingName: "Jacob Hunter",
    orderDate: "04 Oct, 2019",
    total: "392",
    badgeClass: "success",
    paymentStatus: "Paid",
    methodIcon: "fa-cc-paypal",
    paymentMethod: "Paypal",
  },
  {
    id: 20,
    orderId: "#SK2546",
    billingName: "William Cruz",
    orderDate: "03 Oct, 2019",
    total: "374",
    badgeClass: "success",
    paymentStatus: "Paid",
    methodIcon: "fas fa-money-bill-alt",
    paymentMethod: "COD",
  },
  {
    id: 21,
    orderId: "#SK2547",
    billingName: "Dustin Moser",
    orderDate: "02 Oct, 2019",
    total: "350",
    badgeClass: "success",
    paymentStatus: "Paid",
    methodIcon: "fa-cc-paypal",
    paymentMethod: "Mastercard",
  },
  {
    id: 22,
    orderId: "#SK2548",
    billingName: "Clark Benson",
    orderDate: "01 Oct, 2019",
    total: "345",
    badgeClass: "warning",
    paymentStatus: "Refund",
    methodIcon: "fa-cc-paypal",
    paymentMethod: "Visa",
  },
  {
    id: 23,
    orderId: "#SK2540",
    billingName: "Neal Matthews",
    orderDate: "08 Oct, 2019",
    total: "400",
    badgeClass: "success",
    paymentStatus: "Paid",
    methodIcon: "fa-cc-mastercard",
    paymentMethod: "Mastercard",
  },
  {
    id: 24,
    orderId: "#SK2541",
    billingName: "Jamal Burnett",
    orderDate: "07 Oct, 2019",
    total: "380",
    badgeClass: "danger",
    paymentStatus: "Chargeback",
    methodIcon: "fa-cc-visa",
    paymentMethod: "Visa",
  },
  {
    id: 25,
    orderId: "#SK2542",
    billingName: "Juan Mitchell",
    orderDate: "06 Oct, 2019",
    total: "384",
    badgeClass: "success",
    paymentStatus: "Paid",
    methodIcon: "fa-cc-paypal",
    paymentMethod: "Paypal",
  },
  {
    id: 26,
    orderId: "#SK2543",
    billingName: "Barry Dick",
    orderDate: "05 Oct, 2019",
    total: "412",
    badgeClass: "success",
    paymentStatus: "Paid",
    methodIcon: "fa-cc-mastercard",
    paymentMethod: "Mastercard",
  },
];

const customerData: ProductCustomer[] = [
  {
    id: 1,
    username: "Stephen Rash",
    phone: "325-250-1106",
    email: "StephenRash@teleworm.us",
    address: "2470 Grove Street Bethpage, NY 11714",
    rating: "4.2",
    walletBalance: "5412",
    joiningDate: "07 Oct, 2019",
  },
  {
    id: 2,
    username: "Juan Mays",
    phone: "443-523-4726",
    email: "JuanMays@armyspy.com",
    address: "3755 Harron Drive Salisbury, MD 21875",
    rating: "4.0",
    walletBalance: "5632",
    joiningDate: "06 Oct, 2019",
  },
  {
    id: 3,
    username: "Scott Henry",
    phone: "704-629-9535",
    email: "ScottHenry@jourrapide.com",
    address: "3632 Snyder Avenue Bessemer City, NC 2801",
    rating: "4.4",
    walletBalance: "7523",
    joiningDate: "06 Oct, 2019",
  },
  {
    id: 4,
    username: "Cody Menendez",
    phone: "701-832-5838",
    email: "CodyMenendez@armyspy.com",
    address: "4401 Findley Avenue Minot, ND 58701",
    rating: "4.1",
    walletBalance: "6325",
    joiningDate: "05 Oct, 2019",
  },
  {
    id: 5,
    username: "Jason Merino",
    phone: "706-219-4095",
    email: "JasonMerino@dayrep.com",
    address: "3159 Holly Street Cleveland, GA 30528",
    rating: "3.8",
    walletBalance: "4523",
    joiningDate: "04 Oct, 2019",
  },
  {
    id: 6,
    username: "Kyle Aquino",
    phone: "415-232-5443",
    email: "KyleAquino@teleworm.us",
    address: "4861 Delaware Avenue San Francisco, CA 94143",
    rating: "4.0",
    walletBalance: "5412",
    joiningDate: "03 Oct, 2019",
  },
  {
    id: 7,
    username: "David Gaul",
    phone: "314-483-4679",
    email: "DavidGaul@teleworm.us",
    address: "1207 Cottrill Lane Stlouis, MO 63101",
    rating: "4.2",
    walletBalance: "6180",
    joiningDate: "02 Oct, 2019",
  },
  {
    id: 8,
    username: "John McCray",
    phone: "253-661-7551",
    email: "JohnMcCray@armyspy.com",
    address: "3309 Horizon Circle Tacoma, WA 98423",
    rating: "4.1",
    walletBalance: "52870",
    joiningDate: "02 Oct, 2019",
  },
  {
    id: 9,
    username: "Stephen Rash",
    phone: "325-250-1106",
    email: "StephenRash@teleworm.us",
    address: "2470 Grove Street Bethpage, NY 11714",
    rating: "4.2",
    walletBalance: "5412",
    joiningDate: "07 Oct, 2019",
  },
  {
    id: 10,
    username: "Juan Mays",
    phone: "443-523-4726",
    email: "JuanMays@armyspy.com",
    address: "3755 Harron Drive Salisbury, MD 21875",
    rating: "4.0",
    walletBalance: "5632",
    joiningDate: "06 Oct, 2019",
  },
  {
    id: 11,
    username: "Scott Henry",
    phone: "704-629-9535",
    email: "ScottHenry@jourrapide.com",
    address: "3632 Snyder Avenue Bessemer City, NC 2801",
    rating: "4.4",
    walletBalance: "7523",
    joiningDate: "06 Oct, 2019",
  },
  {
    id: 12,
    username: "Cody Menendez",
    phone: "701-832-5838",
    email: "CodyMenendez@armyspy.com",
    address: "4401 Findley Avenue Minot, ND 58701",
    rating: "4.1",
    walletBalance: "6325",
    joiningDate: "05 Oct, 2019",
  },
  {
    id: 13,
    username: "Jason Merino",
    phone: "706-219-4095",
    email: "JasonMerino@dayrep.com",
    address: "3159 Holly Street Cleveland, GA 30528",
    rating: "3.8",
    walletBalance: "4523",
    joiningDate: "04 Oct, 2019",
  },
];
const shops: EComShop[] = [
  {
    id: 1,
    color: "primary",
    name: "Brendle's",
    product: 112,
    balance: "13,575",
    profileLink: "#",
  },
  {
    id: 2,
    color: "warning",
    name: "Tech Hifi",
    product: 104,
    balance: "11,145",
    profileLink: "#",
  },
  {
    id: 3,
    color: "danger",
    name: "Lafayette",
    product: 126,
    balance: "12,356",
    profileLink: "#",
  },
  {
    id: 4,
    color: "success",
    name: "Packer",
    product: 102,
    balance: "11,228",
    profileLink: "#",
  },
  {
    id: 5,
    color: "info",
    name: "Nedick's",
    product: 96,
    balance: "9,235",
    profileLink: "#",
  },
  {
    id: 6,
    color: "dark",
    name: "Hudson's",
    product: 120,
    balance: "14,794",
    profileLink: "#",
  },
  {
    id: 7,
    color: "dark",
    name: "Tech Hifi",
    product: 104,
    balance: "11,145",
    profileLink: "#",
  },
  {
    id: 8,
    color: "primary",
    name: "Brendle's",
    product: 112,
    balance: "13,575",
    profileLink: "#",
  },
  {
    id: 9,
    color: "success",
    name: "Lafayette",
    product: 120,
    balance: "12,356",
    profileLink: "#",
  },
];

let productComments = [
  {
    commentId: 1,
    user: {
      name: "Brian",
      profile: "avatar2",
    },
    comment:
      "If several languages coalesce, the grammar of the resulting language.",
    time: "5 hrs ago",
    hasLiked: false,
  },
  {
    commentId: 2,
    user: {
      name: "Denver",
      profile: "avatar4",
    },
    comment:
      "To an English person, it will seem like simplified English, as a skeptical Cambridge",
    time: "07 Oct, 2019",
    hasLiked: false,
    replies: [
      {
        commentId: 2,
        replyId: 1,
        user: {
          name: "Henry",
          profile: "avatar5",
        },
        comment:
          "Their separate existence is a myth. For science, music, sport, etc.",
        time: "08 Oct, 2019",
        hasLiked: false,
      },
    ],
  },
  {
    commentId: 3,
    user: {
      name: "Neal",
      profile: "avatar3",
    },
    comment: "Everyone realizes why a new common language would be desirable.",
    time: "05 Oct, 2019",
    hasLiked: false,
  },
];

const productListvar: cart[] = [
  // {
  //   id: 1,
  //   img: product1,
  //   name: "Half sleeve T-shirt",
  //   color: "Maroon",
  //   price: 450,
  //   data_attr: 2,
  //   total: 900,
  // },
  // {
  //   id: 2,
  //   img: product2,
  //   name: "Light blue T-shirt",
  //   color: "Light blue",
  //   price: 225,
  //   data_attr: 1,
  //   total: 225,
  // },
  // {
  //   id: 3,
  //   img: product3,
  //   name: "Black Color T-shirt",
  //   color: "Black",
  //   price: 152,
  //   data_attr: 2,
  //   total: 304,
  // },
  // {
  //   id: 4,
  //   img: product4,
  //   name: "Hoodie (Blue)",
  //   color: "Blue",
  //   price: 145,
  //   data_attr: 2,
  //   total: 290,
  // },
  // {
  //   id: 5,
  //   img: product5,
  //   name: "Half sleeve T-Shirt",
  //   color: "Light orange",
  //   price: 138,
  //   data_attr: 1,
  //   total: 138,
  // },
  // {
  //   id: 6,
  //   img: product6,
  //   name: "Green color T-shirt",
  //   color: "Green",
  //   price: 152,
  //   data_attr: 2,
  //   total: 304,
  // },
];

export {
  productsData,
  recentProducts,
  comments,
  discountData,
  orders,
  shops,
  customerData,
  productComments,
  productListvar,
};
