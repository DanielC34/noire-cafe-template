export type MenuCategoryId = 'coffee' | 'matcha' | 'tea' | 'patisserie';

export interface MenuItem {
  id: string;
  category: MenuCategoryId;
  name: string;
  description: string;
  price: number;
  origin: string;
  notes: string;
  brewSpec: string;
  caffeine: 'High' | 'Moderate' | 'Low' | 'Caffeine-Free';
  image: string;
  imageAlt: string;
}

export interface MenuCategoryGroup {
  id: MenuCategoryId;
  title: string;
  subtitle: string;
  items: MenuItem[];
}

export interface GalleryPhoto {
  id: string;
  title: string;
  caption: string;
  category: string;
  src: string;
  alt: string;
  spanClass: string;
  aspectClass: string;
}

export const NOIRE_IMAGES = {
  // Exclusive Hero centerpiece (transparent PNG cutout)
  heroSignatureColdFoam: '/src/assets/images/hero_signature_cold_foam_cutout.png',
  // Exclusive About / Story image
  storyRoastingBeans: '/src/assets/images/story_roasting_beans_1795215360093.jpg',
  // Exclusive Experience images
  experienceSanctuary: '/src/assets/images/experience_cafe_sanctuary_1795213168442.jpg',
  experienceCuppingLab: '/src/assets/images/experience_cupping_lab_1795215360985.jpg',
  // Individual Coffee Product photography
  productHouseEspresso: '/src/assets/images/product_house_espresso_1795215362543.jpg',
  productVelvetCortado: '/src/assets/images/menu_espresso_craft_1795213168591.jpg',
  productPourOver: '/src/assets/images/story_pour_over_1795213169405.jpg',
  productCardamomFlatWhite: '/src/assets/images/product_cardamom_flatwhite_1795217979210.jpg',
  productColdSteep: '/src/assets/images/product_cold_steep_1795217994747.jpg',
  // Individual Matcha Product photography
  productUjiMatcha: '/src/assets/images/menu_matcha_latte_1795218102983.jpg',
  productIcedYuzuMatcha: '/src/assets/images/product_iced_yuzu_matcha_1795218103733.jpg',
  productBlackSesameMatcha: '/src/assets/images/product_black_sesame_matcha_1795218103066.jpg',
  // Individual Tea & Botanicals photography
  productEarlGrey: '/src/assets/images/product_earl_grey_tea_1795218102921.jpg',
  productHojichaLatte: '/src/assets/images/product_hojicha_latte_1795218103369.jpg',
  productTurmericLatte: '/src/assets/images/product_turmeric_latte_1795217991850.jpg',
  // Individual Patisserie photography
  productButterCroissant: '/src/assets/images/product_butter_croissant_1795218120804.jpg',
  productChocolateTart: '/src/assets/images/product_chocolate_tart_1795218121132.jpg',
  productKouignAmann: '/src/assets/images/product_kouign_amann_1795218120093.jpg',
  productCardamomKnot: '/src/assets/images/product_cardamom_knot_1795218120128.jpg',
  // Exclusive Gallery scenes
  galleryBanquette: '/src/assets/images/gallery_banquette_morning_1795215362684.jpg',
  galleryEspressoGrinder: '/src/assets/images/gallery_espresso_grinder_1795216211059.jpg',
  galleryBrassBar: '/src/assets/images/hero_noire_espresso_1795213168567.jpg',
  galleryRoastShelf: '/src/assets/images/gallery_roast_shelf_1795215362461.jpg',
  galleryPatisseriePlate: '/src/assets/images/menu_artisan_pastry_1795213168624.jpg',
} as const;

export interface ImageResponsiveMeta {
  width: number;
  height: number;
  srcSet: string;
}

export const NOIRE_IMAGE_META: Record<string, ImageResponsiveMeta> = {
  [NOIRE_IMAGES.heroSignatureColdFoam]: {
    width: 586,
    height: 760,
    srcSet:
      '/src/assets/images/responsive/hero_signature_cold_foam_cutout-360w.png 360w, /src/assets/images/hero_signature_cold_foam_cutout.png 586w',
  },
  [NOIRE_IMAGES.storyRoastingBeans]: {
    width: 960,
    height: 717,
    srcSet:
      '/src/assets/images/responsive/story_roasting_beans_1795215360093-480w.jpg 480w, /src/assets/images/responsive/story_roasting_beans_1795215360093-800w.jpg 800w, /src/assets/images/story_roasting_beans_1795215360093.jpg 960w',
  },
  [NOIRE_IMAGES.experienceSanctuary]: {
    width: 960,
    height: 536,
    srcSet:
      '/src/assets/images/responsive/experience_cafe_sanctuary_1795213168442-480w.jpg 480w, /src/assets/images/responsive/experience_cafe_sanctuary_1795213168442-800w.jpg 800w, /src/assets/images/experience_cafe_sanctuary_1795213168442.jpg 960w',
  },
  [NOIRE_IMAGES.experienceCuppingLab]: {
    width: 960,
    height: 717,
    srcSet:
      '/src/assets/images/responsive/experience_cupping_lab_1795215360985-480w.jpg 480w, /src/assets/images/responsive/experience_cupping_lab_1795215360985-800w.jpg 800w, /src/assets/images/experience_cupping_lab_1795215360985.jpg 960w',
  },
  [NOIRE_IMAGES.galleryBanquette]: {
    width: 960,
    height: 717,
    srcSet:
      '/src/assets/images/responsive/gallery_banquette_morning_1795215362684-480w.jpg 480w, /src/assets/images/responsive/gallery_banquette_morning_1795215362684-800w.jpg 800w, /src/assets/images/gallery_banquette_morning_1795215362684.jpg 960w',
  },
  [NOIRE_IMAGES.galleryEspressoGrinder]: {
    width: 960,
    height: 717,
    srcSet:
      '/src/assets/images/responsive/gallery_espresso_grinder_1795216211059-480w.jpg 480w, /src/assets/images/responsive/gallery_espresso_grinder_1795216211059-800w.jpg 800w, /src/assets/images/gallery_espresso_grinder_1795216211059.jpg 960w',
  },
  [NOIRE_IMAGES.galleryBrassBar]: {
    width: 960,
    height: 536,
    srcSet:
      '/src/assets/images/responsive/hero_noire_espresso_1795213168567-480w.jpg 480w, /src/assets/images/responsive/hero_noire_espresso_1795213168567-800w.jpg 800w, /src/assets/images/hero_noire_espresso_1795213168567.jpg 960w',
  },
  [NOIRE_IMAGES.galleryRoastShelf]: {
    width: 960,
    height: 717,
    srcSet:
      '/src/assets/images/responsive/gallery_roast_shelf_1795215362461-480w.jpg 480w, /src/assets/images/responsive/gallery_roast_shelf_1795215362461-800w.jpg 800w, /src/assets/images/gallery_roast_shelf_1795215362461.jpg 960w',
  },
  [NOIRE_IMAGES.galleryPatisseriePlate]: {
    width: 960,
    height: 717,
    srcSet:
      '/src/assets/images/responsive/menu_artisan_pastry_1795213168624-480w.jpg 480w, /src/assets/images/responsive/menu_artisan_pastry_1795213168624-800w.jpg 800w, /src/assets/images/menu_artisan_pastry_1795213168624.jpg 960w',
  },
  [NOIRE_IMAGES.productHouseEspresso]: {
    width: 960,
    height: 960,
    srcSet:
      '/src/assets/images/responsive/product_house_espresso_1795215362543-256w.jpg 256w, /src/assets/images/responsive/product_house_espresso_1795215362543-640w.jpg 640w, /src/assets/images/product_house_espresso_1795215362543.jpg 960w',
  },
  [NOIRE_IMAGES.productVelvetCortado]: {
    width: 960,
    height: 717,
    srcSet:
      '/src/assets/images/responsive/menu_espresso_craft_1795213168591-256w.jpg 256w, /src/assets/images/responsive/menu_espresso_craft_1795213168591-640w.jpg 640w, /src/assets/images/menu_espresso_craft_1795213168591.jpg 960w',
  },
  [NOIRE_IMAGES.productPourOver]: {
    width: 717,
    height: 960,
    srcSet:
      '/src/assets/images/responsive/story_pour_over_1795213169405-256w.jpg 256w, /src/assets/images/responsive/story_pour_over_1795213169405-640w.jpg 640w, /src/assets/images/story_pour_over_1795213169405.jpg 717w',
  },
  [NOIRE_IMAGES.productCardamomFlatWhite]: {
    width: 1024,
    height: 1024,
    srcSet:
      '/src/assets/images/responsive/product_cardamom_flatwhite_1795217979210-256w.jpg 256w, /src/assets/images/responsive/product_cardamom_flatwhite_1795217979210-640w.jpg 640w, /src/assets/images/product_cardamom_flatwhite_1795217979210.jpg 1024w',
  },
  [NOIRE_IMAGES.productColdSteep]: {
    width: 1024,
    height: 1024,
    srcSet:
      '/src/assets/images/responsive/product_cold_steep_1795217994747-256w.jpg 256w, /src/assets/images/responsive/product_cold_steep_1795217994747-640w.jpg 640w, /src/assets/images/product_cold_steep_1795217994747.jpg 1024w',
  },
  [NOIRE_IMAGES.productUjiMatcha]: {
    width: 1024,
    height: 1024,
    srcSet:
      '/src/assets/images/responsive/menu_matcha_latte_1795218102983-256w.jpg 256w, /src/assets/images/responsive/menu_matcha_latte_1795218102983-640w.jpg 640w, /src/assets/images/menu_matcha_latte_1795218102983.jpg 1024w',
  },
  [NOIRE_IMAGES.productIcedYuzuMatcha]: {
    width: 1024,
    height: 1024,
    srcSet:
      '/src/assets/images/responsive/product_iced_yuzu_matcha_1795218103733-256w.jpg 256w, /src/assets/images/responsive/product_iced_yuzu_matcha_1795218103733-640w.jpg 640w, /src/assets/images/product_iced_yuzu_matcha_1795218103733.jpg 1024w',
  },
  [NOIRE_IMAGES.productBlackSesameMatcha]: {
    width: 1024,
    height: 1024,
    srcSet:
      '/src/assets/images/responsive/product_black_sesame_matcha_1795218103066-256w.jpg 256w, /src/assets/images/responsive/product_black_sesame_matcha_1795218103066-640w.jpg 640w, /src/assets/images/product_black_sesame_matcha_1795218103066.jpg 1024w',
  },
  [NOIRE_IMAGES.productEarlGrey]: {
    width: 1024,
    height: 1024,
    srcSet:
      '/src/assets/images/responsive/product_earl_grey_tea_1795218102921-256w.jpg 256w, /src/assets/images/responsive/product_earl_grey_tea_1795218102921-640w.jpg 640w, /src/assets/images/product_earl_grey_tea_1795218102921.jpg 1024w',
  },
  [NOIRE_IMAGES.productHojichaLatte]: {
    width: 1024,
    height: 1024,
    srcSet:
      '/src/assets/images/responsive/product_hojicha_latte_1795218103369-256w.jpg 256w, /src/assets/images/responsive/product_hojicha_latte_1795218103369-640w.jpg 640w, /src/assets/images/product_hojicha_latte_1795218103369.jpg 1024w',
  },
  [NOIRE_IMAGES.productTurmericLatte]: {
    width: 1024,
    height: 1024,
    srcSet:
      '/src/assets/images/responsive/product_turmeric_latte_1795217991850-256w.jpg 256w, /src/assets/images/responsive/product_turmeric_latte_1795217991850-640w.jpg 640w, /src/assets/images/product_turmeric_latte_1795217991850.jpg 1024w',
  },
  [NOIRE_IMAGES.productButterCroissant]: {
    width: 1024,
    height: 1024,
    srcSet:
      '/src/assets/images/responsive/product_butter_croissant_1795218120804-256w.jpg 256w, /src/assets/images/responsive/product_butter_croissant_1795218120804-640w.jpg 640w, /src/assets/images/product_butter_croissant_1795218120804.jpg 1024w',
  },
  [NOIRE_IMAGES.productChocolateTart]: {
    width: 1024,
    height: 1024,
    srcSet:
      '/src/assets/images/responsive/product_chocolate_tart_1795218121132-256w.jpg 256w, /src/assets/images/responsive/product_chocolate_tart_1795218121132-640w.jpg 640w, /src/assets/images/product_chocolate_tart_1795218121132.jpg 1024w',
  },
  [NOIRE_IMAGES.productKouignAmann]: {
    width: 1024,
    height: 1024,
    srcSet:
      '/src/assets/images/responsive/product_kouign_amann_1795218120093-256w.jpg 256w, /src/assets/images/responsive/product_kouign_amann_1795218120093-640w.jpg 640w, /src/assets/images/product_kouign_amann_1795218120093.jpg 1024w',
  },
  [NOIRE_IMAGES.productCardamomKnot]: {
    width: 1024,
    height: 1024,
    srcSet:
      '/src/assets/images/responsive/product_cardamom_knot_1795218120128-256w.jpg 256w, /src/assets/images/responsive/product_cardamom_knot_1795218120128-640w.jpg 640w, /src/assets/images/product_cardamom_knot_1795218120128.jpg 1024w',
  },
};

export const MENU_GROUPS: MenuCategoryGroup[] = [
  {
    id: 'coffee',
    title: 'Coffee',
    subtitle: 'Single-origin espresso & slow filter extractions',
    items: [
      {
        id: 'noire-espresso',
        category: 'coffee',
        name: 'NOIRÉ House Espresso',
        description:
          'A syrupy, double ristretto pulled from our washed Guatemalan & Ethiopian blend with thick hazelnut crema.',
        price: 4.0,
        origin: 'Huehuetenango & Sidama',
        notes: 'Dark Cacao · Roasted Hazelnut · Dried Fig',
        brewSpec: '18.5g in · 34g out · 29s at 93.5°C',
        caffeine: 'High',
        image: NOIRE_IMAGES.productHouseEspresso,
        imageAlt: 'Matte black ceramic demitasse filled with tiger-striped espresso crema',
      },
      {
        id: 'velvet-cortado',
        category: 'coffee',
        name: 'Velvet Cortado',
        description:
          'Equal parts double espresso and textured grass-fed milk or barista oat, balanced for clarity and warmth.',
        price: 4.75,
        origin: 'Colombia Huila',
        notes: 'Burnt Sugar · Roasted Almond · Velvet Cream',
        brewSpec: '1:1 Espresso to Microfoam · 60°C Milk',
        caffeine: 'High',
        image: NOIRE_IMAGES.productVelvetCortado,
        imageAlt: 'Double espresso cortado with delicate microfoam rosetta in dark stoneware',
      },
      {
        id: 'single-origin-v60',
        category: 'coffee',
        name: 'Hand-Poured V60 Filter',
        description:
          'Clean, tea-like clarity brewed to order in three slow concentric pours to highlight floral acidity.',
        price: 6.0,
        origin: 'Ethiopia Yirgacheffe',
        notes: 'Bergamot · White Peach · Jasmine Blossom',
        brewSpec: '16g to 260ml · 3:10 Total Brew Time',
        caffeine: 'High',
        image: NOIRE_IMAGES.productPourOver,
        imageAlt: 'Barista pouring hot water from matte black kettle into glass V60 filter',
      },
      {
        id: 'cardamom-flat-white',
        category: 'coffee',
        name: 'Black Cardamom Flat White',
        description:
          'Double espresso infused with freshly crushed green and smoked black cardamom pods and silky microfoam.',
        price: 5.5,
        origin: 'Kenya Nyeri Reserve',
        notes: 'Crushed Cardamom · Blackcurrant · Cocoa',
        brewSpec: 'Double Ristretto · Whole Pod Infusion',
        caffeine: 'High',
        image: NOIRE_IMAGES.productCardamomFlatWhite,
        imageAlt: 'Stoneware flat white dusted with crushed cardamom beside whole pods',
      },
      {
        id: 'cold-steep-reserve',
        category: 'coffee',
        name: '18-Hour Cold Steep Reserve',
        description:
          'Slow-immersed natural-process beans served over a hand-carved crystal ice block with orange oil.',
        price: 5.25,
        origin: 'Costa Rica Tarrazú',
        notes: 'Blood Orange · Molasses · Dark Cherry',
        brewSpec: '18h Cold Immersion · Filtered at 4°C',
        caffeine: 'High',
        image: NOIRE_IMAGES.productColdSteep,
        imageAlt: 'Cut-crystal rocks glass with cold steep coffee, clear ice, and orange twist',
      },
    ],
  },
  {
    id: 'matcha',
    title: 'Matcha',
    subtitle: 'First-harvest Uji cultivars stone-milled to order',
    items: [
      {
        id: 'uji-ceremonial-latte',
        category: 'matcha',
        name: 'Uji Ceremonial Matcha',
        description:
          'Hand-whisked shade-grown Samidori cultivar with creamy steamed milk and zero added bitterness.',
        price: 6.5,
        origin: 'Uji, Kyoto Prefecture',
        notes: 'Sweet Umami · Steamed Spinach · Cream',
        brewSpec: '3g Matcha · 75°C Spring Water · Bamboo Chasen',
        caffeine: 'Moderate',
        image: NOIRE_IMAGES.productUjiMatcha,
        imageAlt: 'Ceremonial stone-ground matcha latte in ceramic bowl with bamboo whisk',
      },
      {
        id: 'iced-yuzu-matcha',
        category: 'matcha',
        name: 'Iced Yuzu Tonic Matcha',
        description:
          'Vibrant ceremonial matcha layered slowly over cold-pressed Japanese yuzu juice and sparkling mineral water.',
        price: 7.25,
        origin: 'Uji & Kochi Prefecture',
        notes: 'Bright Yuzu · Crisp Pine · Mineral Finish',
        brewSpec: 'Chilled Layered Pour · Sparkling Base',
        caffeine: 'Moderate',
        image: NOIRE_IMAGES.productIcedYuzuMatcha,
        imageAlt: 'Tall ribbed glass with layered ceremonial matcha over iced yuzu tonic',
      },
      {
        id: 'black-sesame-matcha',
        category: 'matcha',
        name: 'Roasted Black Sesame Matcha',
        description:
          'Nutty house-ground Kurogoma paste folded with warm oat milk and topped with rich ceremonial matcha foam.',
        price: 7.5,
        origin: 'Kyoto & Hokkaido Blend',
        notes: 'Toasted Sesame · Green Tea · Raw Honey',
        brewSpec: 'Stone-Ground Paste · 65°C Oat Microfoam',
        caffeine: 'Moderate',
        image: NOIRE_IMAGES.productBlackSesameMatcha,
        imageAlt: 'Velvety roasted black sesame oat milk topped with ceremonial matcha microfoam',
      },
    ],
  },
  {
    id: 'tea',
    title: 'Tea & More',
    subtitle: 'Whole-leaf harvests and caffeine-free infusions',
    items: [
      {
        id: 'smoked-earl-grey',
        category: 'tea',
        name: 'Smoked Bergamot Earl Grey',
        description:
          'Single-estate Assam black tea scented with cold-pressed Calabrian bergamot peel and subtle pine smoke.',
        price: 4.5,
        origin: 'Assam, India',
        notes: 'Calabrian Citrus · Cedar Smoke · Malt',
        brewSpec: '4g Whole Leaf · 96°C · 4 min Steep',
        caffeine: 'Moderate',
        image: NOIRE_IMAGES.productEarlGrey,
        imageAlt: 'Matte charcoal teapot and teacup filled with Assam Earl Grey and bergamot curl',
      },
      {
        id: 'hojicha-latte',
        category: 'tea',
        name: 'Slow-Roasted Hojicha Latte',
        description:
          'Charcoal-roasted Japanese bancha tea whisked into velvety steamed milk with notes of caramel and toasted oak.',
        price: 6.0,
        origin: 'Shizuoka, Japan',
        notes: 'Toasted Oak · Maple · Roasted Walnut',
        brewSpec: 'Low Caffeine · Whisked Micro-Powder',
        caffeine: 'Low',
        image: NOIRE_IMAGES.productHojichaLatte,
        imageAlt: 'Warm toasted-caramel roasted hojicha tea latte in speckled stoneware mug',
      },
      {
        id: 'saffron-turmeric-elixir',
        category: 'tea',
        name: 'Golden Saffron & Turmeric',
        description:
          'Freshly grated heirloom turmeric root, Kashmiri saffron threads, ginger, and cracked black pepper.',
        price: 6.75,
        origin: 'Kashmir & Malabar',
        notes: 'Warm Ginger · Floral Saffron · Raw Honey',
        brewSpec: '100% Caffeine-Free · Simmered Tonic',
        caffeine: 'Caffeine-Free',
        image: NOIRE_IMAGES.productTurmericLatte,
        imageAlt: 'Golden turmeric latte garnished with crimson saffron threads in matte black cup',
      },
    ],
  },
  {
    id: 'patisserie',
    title: 'Desserts',
    subtitle: 'Laminated morning pastries baked before dawn',
    items: [
      {
        id: 'cultured-butter-croissant',
        category: 'patisserie',
        name: 'Cultured Butter Croissant',
        description:
          '72-hour cold-fermented sourdough laminated with French Charentes-Poitou butter for honeycomb layers.',
        price: 4.25,
        origin: 'Baked In-House at 05:30',
        notes: 'Cultured Butter · Crisp Amber Crust · Honeyed Crumb',
        brewSpec: '27 Honeycomb Layers · Sea Salt Finish',
        caffeine: 'Caffeine-Free',
        image: NOIRE_IMAGES.productButterCroissant,
        imageAlt: 'Flaky golden laminated French butter croissant on matte stoneware plate',
      },
      {
        id: 'valrhona-ganache-tart',
        category: 'patisserie',
        name: '70% Valrhona Ganache Tart',
        description:
          'Crisp dark cocoa pâte sucrée filled with Guanaja dark chocolate espresso ganache and flaky Maldon salt.',
        price: 6.5,
        origin: 'Single-Origin Cacao',
        notes: 'Bitter Cocoa · Espresso · Sea Salt',
        brewSpec: '70% Guanaja Couverture · Served Chilled',
        caffeine: 'Low',
        image: NOIRE_IMAGES.productChocolateTart,
        imageAlt: 'Rich dark chocolate ganache tartlet finished with flaky sea salt on dark plate',
      },
      {
        id: 'brown-butter-kouign',
        category: 'patisserie',
        name: 'Brown Butter Kouign-Amann',
        description:
          'Caramelized Breton pastry folded with toasted hazelnut brown butter and raw demerara sugar.',
        price: 5.25,
        origin: 'Brittany Tradition',
        notes: 'Toasted Milk Solids · Caramelized Sugar · Flaky',
        brewSpec: 'Cast-Iron Mold · Caramel Crust',
        caffeine: 'Caffeine-Free',
        image: NOIRE_IMAGES.productKouignAmann,
        imageAlt: 'Caramelized Breton brown-butter kouign-amann pastry on raw stoneware plate',
      },
      {
        id: 'cardamom-brioche-knot',
        category: 'patisserie',
        name: 'Nordic Cardamom Knot',
        description:
          'Braided rich brioche dough brushed with vanilla bean syrup and generously dusted with freshly milled cardamom.',
        price: 5.0,
        origin: 'Swedish Fika Craft',
        notes: 'Fresh Cardamom · Vanilla Bean · Soft Brioche',
        brewSpec: 'Stone-Milled Spelt & Heritage Wheat',
        caffeine: 'Caffeine-Free',
        image: NOIRE_IMAGES.productCardamomKnot,
        imageAlt: 'Braided Nordic cardamom brioche bun dusted with crushed cardamom and pearl sugar',
      },
    ],
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-1',
    title: 'Sunlit Walnut Banquette',
    caption: 'Quiet morning light across our corner walnut seating and travertine side tables.',
    category: 'Space',
    src: NOIRE_IMAGES.galleryBanquette,
    alt: 'Minimalist walnut banquette seating beside tall steel-framed café windows',
    spanClass: 'md:col-span-2',
    aspectClass: 'aspect-[16/10]',
  },
  {
    id: 'gal-2',
    title: 'Single-Dose Calibration',
    caption: 'Matte black burr grinder and brass tamper calibrated before first light.',
    category: 'Precision',
    src: NOIRE_IMAGES.galleryEspressoGrinder,
    alt: 'Matte black single-dose specialty coffee grinder beside oak knockbox and brass tamper',
    spanClass: 'md:col-span-1',
    aspectClass: 'aspect-[4/3] md:h-full',
  },
  {
    id: 'gal-3',
    title: 'The Brass Espresso Bar',
    caption: 'Our custom brass espresso bar extracting syrupy single-origin ristretto shots.',
    category: 'Espresso',
    src: NOIRE_IMAGES.galleryBrassBar,
    alt: 'Brushed brass espresso machine extracting golden espresso crema',
    spanClass: 'md:col-span-1',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'gal-4',
    title: 'Roastery Canisters & Vessels',
    caption: 'Small-batch harvest tins and hand-thrown ceramics lined against deep forest plaster.',
    category: 'Roastery',
    src: NOIRE_IMAGES.galleryRoastShelf,
    alt: 'Matte black coffee canisters and stoneware vessels on walnut shelf',
    spanClass: 'md:col-span-1',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'gal-5',
    title: 'Dawn Patisserie Service',
    caption: '72-hour cultured butter croissants and 70% dark chocolate tartlets plated to order.',
    category: 'Bakery',
    src: NOIRE_IMAGES.galleryPatisseriePlate,
    alt: 'Flaky French croissant and dark chocolate tartlet on ceramic plate',
    spanClass: 'md:col-span-1',
    aspectClass: 'aspect-[4/3]',
  },
];

export const OPENING_HOURS = [
  {days: 'Monday – Friday', hours: '07:00 – 20:00'},
  {days: 'Saturday', hours: '08:00 – 22:00'},
  {days: 'Sunday', hours: '08:00 – 18:00'},
];
