export interface Product {
    slug: string;
    name: string;
    category: "Kitchen" | "Textiles" | "Lighting" | "Decor";
    price: number;
    images: string[];
    description: string;
    variants?: string[];
    featured?: boolean;
  }
  
  export const products: Product[] = [
    // KITCHEN
    {
      slug: "bjork-pour-over-set",
      name: "Björk Pour-Over Set",
      category: "Kitchen",
      price: 68,
      images: [
        "/images/shop/bjork-pour-over-set-1.jpg",
        "/images/shop/bjork-pour-over-set-2.jpg",
      ],
      description:
        "Hand-thrown ceramic pour-over dripper and matching mug in a soft matte glaze. Slow coffee, made simple.",
      featured: true,
    },
    {
      slug: "kanel-mixing-bowls",
      name: "Kanel Stoneware Mixing Bowls (Set of 3)",
      category: "Kitchen",
      price: 84,
      images: [
        "/images/shop/kanel-mixing-bowls-1.jpg",
        "/images/shop/kanel-mixing-bowls-2.jpg",
      ],
      description:
        "Three nesting stoneware bowls in graduated sizes, finished with a warm speckled glaze. Equally at home prepping dinner or serving it.",
    },
    {
      slug: "fjord-cutting-board",
      name: "Fjord Oak Cutting Board",
      category: "Kitchen",
      price: 52,
      images: [
        "/images/shop/fjord-cutting-board-1.jpg",
        "/images/shop/fjord-cutting-board-2.jpg",
      ],
      description:
        "Solid oak board with a gently rounded edge and hanging hole. Oiled by hand, built to age well.",
      featured: true,
    },
    {
      slug: "malm-dinnerware-set",
      name: "Malm Dinnerware Set",
      category: "Kitchen",
      price: 128,
      images: [
        "/images/shop/malm-dinnerware-set-1.jpg",
        "/images/shop/malm-dinnerware-set-2.jpg",
      ],
      description:
        "A 16-piece stoneware set — dinner plates, side plates, and bowls — in a quiet, weathered white.",
      variants: ["Chalk White", "Stone Grey"],
      featured: true,
    },
  
    // TEXTILES
    {
      slug: "lin-linen-throw",
      name: "Lin Linen Throw Blanket",
      category: "Textiles",
      price: 96,
      images: [
        "/images/shop/lin-linen-throw-1.jpg",
        "/images/shop/lin-linen-throw-2.jpg",
      ],
      description:
        "Pre-washed European linen, woven with a soft stonewashed finish that only gets better with use.",
      variants: ["Oat", "Clay", "Moss"],
      featured: true,
    },
    {
      slug: "vinter-wool-throw",
      name: "Vinter Wool Throw",
      category: "Textiles",
      price: 118,
      images: [
        "/images/shop/vinter-wool-throw-1.jpg",
        "/images/shop/vinter-wool-throw-2.jpg",
      ],
      description:
        "A heavyweight wool throw with a fine herringbone weave, made for the coldest months.",
      variants: ["Charcoal", "Natural"],
    },
    {
      slug: "ren-bath-towels",
      name: "Ren Organic Cotton Bath Towels (Set of 2)",
      category: "Textiles",
      price: 44,
      images: [
        "/images/shop/ren-bath-towels-1.jpg",
        "/images/shop/ren-bath-towels-2.jpg",
      ],
      description:
        "Long-staple organic cotton towels with a dense, absorbent weave and a clean, undyed finish.",
    },
    {
      slug: "strand-table-runner",
      name: "Strand Linen Table Runner",
      category: "Textiles",
      price: 38,
      images: [
        "/images/shop/strand-table-runner-1.jpg",
        "/images/shop/strand-table-runner-2.jpg",
      ],
      description:
        "A simple washed-linen runner that softens any table setting without competing with it.",
    },
  
    // LIGHTING
    {
      slug: "glod-table-lamp",
      name: "Glöd Table Lamp",
      category: "Lighting",
      price: 145,
      images: [
        "/images/shop/glod-table-lamp-1.jpg",
        "/images/shop/glod-table-lamp-2.jpg",
      ],
      description:
        "A sculptural table lamp with a hand-finished base and a linen shade that casts a warm, even glow.",
      variants: ["Black", "Brass"],
      featured: true,
    },
    {
      slug: "ljus-pendant-light",
      name: "Ljus Pendant Light",
      category: "Lighting",
      price: 210,
      images: [
        "/images/shop/ljus-pendant-light-1.jpg",
        "/images/shop/ljus-pendant-light-2.jpg",
      ],
      description:
        "An opal glass pendant with a soft, diffused light, sized for above a table or kitchen island.",
    },
    {
      slug: "flamma-candle-holder",
      name: "Flamma Ceramic Candle Holder",
      category: "Lighting",
      price: 34,
      images: [
        "/images/shop/flamma-candle-holder-1.jpg",
        "/images/shop/flamma-candle-holder-2.jpg",
      ],
      description:
        "A single-taper holder in matte stoneware, cast from a hand-carved original.",
    },
    {
      slug: "skymning-floor-lamp",
      name: "Skymning Floor Lamp",
      category: "Lighting",
      price: 265,
      images: [
        "/images/shop/skymning-floor-lamp-1.jpg",
        "/images/shop/skymning-floor-lamp-2.jpg",
      ],
      description:
        "A tall, slender floor lamp in brushed oak and linen, built to anchor a reading corner.",
      featured: true,
    },
  
    // DECOR
    {
      slug: "sten-bookends",
      name: "Sten Marble Bookends (Pair)",
      category: "Decor",
      price: 58,
      images: [
        "/images/shop/sten-bookends-1.jpg",
        "/images/shop/sten-bookends-2.jpg",
      ],
      description:
        "Solid marble bookends with a soft honed finish, weighted enough to actually hold a shelf together.",
    },
    {
      slug: "gronska-planter",
      name: "Grönska Ceramic Planter",
      category: "Decor",
      price: 42,
      images: [
        "/images/shop/gronska-planter-1.jpg",
        "/images/shop/gronska-planter-2.jpg",
      ],
      description:
        "A rounded stoneware planter with a drainage hole and matching saucer, in an earthy matte glaze.",
      variants: ["Small", "Medium", "Large"],
    },
    {
      slug: "aska-wall-mirror",
      name: "Aska Wall Mirror",
      category: "Decor",
      price: 175,
      images: [
        "/images/shop/aska-wall-mirror-1.jpg",
        "/images/shop/aska-wall-mirror-2.jpg",
      ],
      description:
        "A slim, asymmetric wall mirror in blackened steel, equal parts function and sculpture.",
    },
    {
      slug: "tyst-wall-hanging",
      name: "Tyst Wool Wall Hanging",
      category: "Decor",
      price: 88,
      images: [
        "/images/shop/tyst-wall-hanging-first.jpg",
        "/images/shop/tyst-wall-hanging-second.jpg",
      ],
      description:
        "A hand-woven wool wall hanging in a muted, textural pattern — the kind of piece that quietly finishes a room.",
      featured: true,
    },
  ];