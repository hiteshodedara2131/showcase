export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: "Technology" | "3D Design" | "E-Commerce" | "Materials" | "Optimization";
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  tags: string[];
  featured?: boolean;
  content: {
    introduction: string;
    sections: {
      heading: string;
      body: string[];
      codeSnippet?: {
        language: string;
        code: string;
      };
      callout?: {
        title: string;
        text: string;
      };
    }[];
    conclusion: string;
  };
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "optimizing-gltf-glb-webgl-performance",
    title: "Mastering GLTF & GLB Optimization for 60 FPS WebGL Performance",
    excerpt: "Discover essential techniques for compressing geometry, decimation, and texture atlasing to deliver instant loading 3D experiences on web browsers.",
    date: "Sep 24, 2026",
    readTime: "7 min read",
    category: "Optimization",
    featured: true,
    author: {
      name: "Marcus Vance",
      role: "Lead Graphics Engineer",
      avatar: "MV",
    },
    tags: ["WebGL", "glTF", "Draco", "Performance", "Optimization"],
    content: {
      introduction:
        "In modern web-based 3D applications, asset delivery speed and frame rate are the primary determinants of user engagement. A 50MB uncompressed CAD model will freeze mobile viewports and cause bounce rates to soar. By mastering glTF pipeline optimization, mesh decimation, and texture mipmap management, developers can reduce asset weight by up to 85% while maintaining visual fidelity.",
      sections: [
        {
          heading: "1. The Anatomy of a Lean glTF Binary (.glb)",
          body: [
            "glTF (GL Transmission Format) has become the undisputed JPEG of 3D. A .glb container bundles JSON scene hierarchy, binary vertex buffers, index arrays, and embedded image buffers into a contiguous memory stream that WebGL can upload directly to GPU VRAM.",
            "However, raw exports from DCC tools like Blender or 3ds Max often retain bloated metadata, redundant skin weights, and unindexed vertex attributes. Stripping unused attributes such as duplicate UV coordinates (TEXCOORD_1 when unused) and empty animation channels is the first step toward optimization.",
          ],
          callout: {
            title: "Memory Rule of Thumb",
            text: "Aim for total vertex count under 65,000 per product specimen and texture budgets under 15MB total VRAM allocation for instantaneous mobile rendering.",
          },
        },
        {
          heading: "2. Draco Geometry Compression vs Meshopt",
          body: [
            "Draco compression quantization compresses geometry position, normals, and texture coordinates into compact bitstreams. While Draco delivers ultra-small file sizes over HTTP, it incurs a CPU decompression cost on the client thread.",
            "Meshoptimizer (meshopt) compression offers a modern alternative: near-instantaneous decompression speed with SIMD/Wasm, allowing models to unpack directly into WebGL vertex buffer objects with negligible UI thread stutter.",
          ],
          codeSnippet: {
            language: "bash",
            code: "# Quantize and optimize GLB with gltf-transform\ngltf-transform optimize input.glb output.glb \\\n  --simplify --ratio 0.75 \\\n  --compress meshopt \\\n  --texture-compress webp",
          },
        },
        {
          heading: "3. Texture Compression: WebP and KTX2 Basis Universal",
          body: [
            "Textures frequently consume 80% or more of total 3D asset size. Using standard uncompressed PNGs forces browsers to decompress full 24-bit RGB arrays into browser RAM, often exceeding mobile memory limits.",
            "Basis Universal (KTX2) supercompression allows textures to remain compressed even inside GPU memory, decoding on the fly into native desktop/mobile hardware formats (BC7, ASTC, ETC2). When KTX2 is unavailable, WebP diffuse maps with lossy compression offer superior size-to-quality ratios over JPEG.",
          ],
        },
      ],
      conclusion:
        "By enforcing a systematic glTF optimization pipeline, high-fidelity 3D product configurators can consistently load in under 1.5 seconds and sustain a rock-solid 60 FPS across both desktop and mobile devices.",
    },
  },
  {
    slug: "physically-based-rendering-footwear-guide",
    title: "The Ultimate Guide to PBR Materials for Digital Footwear & Sneakers",
    excerpt: "Learn how to achieve tactile realism across leather grain, vulcanized rubber, mesh knit, and suede without unsightly metallic chrome artifacts.",
    date: "Sep 20, 2026",
    readTime: "8 min read",
    category: "Materials",
    featured: true,
    author: {
      name: "Elena Rostova",
      role: "Principal 3D Material Specialist",
      avatar: "ER",
    },
    tags: ["PBR", "Footwear", "Shaders", "Three.js", "Texturing"],
    content: {
      introduction:
        "Footwear is one of the most demanding product categories in real-time computer graphics. Sneakerheads and online shoppers expect to discern between soft tumbled calfskin, porous mesh, nubuck suede, and vulcanized gum rubber. A single misplaced parameter—such as setting metalness above 0.05 on leather—turns a luxury sneaker into an artificial steel sculpture.",
      sections: [
        {
          heading: "1. The Dielectric Rule: Metalness Must Be Zero",
          body: [
            "In physical optics, materials divide strictly into conductors (metals) and dielectrics (non-metals). Leather, suede, canvas, rubber, cotton laces, and polyurethane foam are 100% dielectric.",
            "For all non-metal shoe components, set metalness strictly to 0.00. Dielectrics reflect approximately 4% of light at normal incidence (F0 ~ 0.04), which Three.js MeshStandardMaterial computes automatically when metalness is 0. Only metallic eyelets, lace locks, and zipper pulls should have metalness values between 0.85 and 1.00.",
          ],
        },
        {
          heading: "2. Roughness Calibration for Organic Footwear Textiles",
          body: [
            "Roughness dictates microfacet distribution—how sharp or diffuse the reflection specular hotspot appears. Real footwear materials fall into specific, predictable roughness ranges:",
            "• Suede & Nubuck: 0.85 – 0.95 (Extremely diffuse, soft velvety response)\n• Heavyweight Canvas & Knit: 0.80 – 0.90 (Matte textile sheen with micro-shadowing)\n• Tumbled & Nappa Leather: 0.62 – 0.75 (Subtle tactile sheen with clear form definition)\n• Vulcanized Outsole Rubber: 0.65 – 0.80 (Dense, non-reflective matte finish)\n• Patent Leather (High Gloss): 0.15 – 0.25 (Crisp, mirror-like specular highlights)",
          ],
        },
        {
          heading: "3. Normal Maps and Micro-Depth Illusions",
          body: [
            "Without normal maps, flat polygons cannot convey the tactile grain of pebbled leather or woven polyester laces. Use 16-bit tangent-space normal maps with gentle strength (0.3 – 0.6) to avoid harsh pitch black artifacts under directional key lights.",
          ],
          codeSnippet: {
            language: "typescript",
            code: "// Natural Leather Material Definition in Three.js\nconst leatherMaterial = new THREE.MeshStandardMaterial({\n  color: new THREE.Color('#d9532f'),\n  roughness: 0.72, // Soft tactile matte\n  metalness: 0.00, // Strictly dielectric non-metal\n  normalMap: leatherNormalTexture,\n  normalScale: new THREE.Vector2(0.45, 0.45),\n});",
          },
        },
      ],
      conclusion:
        "True physical realism comes not from cranking specular reflections, but from respecting the optical boundaries of real-world materials: zero metalness for organic surfaces and carefully calibrated microfacet roughness.",
    },
  },
  {
    slug: "why-ecommerce-needs-interactive-3d-viewers",
    title: "Why E-Commerce Brands Are Replacing 2D Photography with Real-Time 3D Viewers",
    excerpt: "Analyzing the measurable impact of WebGL 3D product configurators on conversion rates, return rates, and customer confidence in digital retail.",
    date: "Sep 18, 2026",
    readTime: "6 min read",
    category: "E-Commerce",
    author: {
      name: "Sophia Chen",
      role: "Digital Retail Strategist",
      avatar: "SC",
    },
    tags: ["E-Commerce", "Conversion", "3D Commerce", "Retail Tech"],
    content: {
      introduction:
        "Static 2D studio photography has reached its limit. Even 8 high-resolution product photos cannot answer fundamental spatial questions: 'How thick is the sole from the rear angle?', 'How does this material interact with indoor warm lighting?', or 'How does the silhouette look when tilted 45 degrees?' Real-time 3D viewers bridge this sensory gap.",
      sections: [
        {
          heading: "1. The Measurable Metric Shift: +40% Conversion, -30% Returns",
          body: [
            "Global retail studies show that replacing static carousel images with interactive 3D product viewports increases purchase conversion by an average of 40%.",
            "More importantly, customer return rates plummet by 30% to 35%. The primary driver of e-commerce footwear and apparel returns is 'the product did not match my expectation in person.' When shoppers inspect every stitch, outsole angle, and material sheen in 360 degrees before checkout, uncertainty evaporates.",
          ],
        },
        {
          heading: "2. The Cost Efficiency of Virtual Prototyping",
          body: [
            "Physical photography requires manufacturing physical sample colorways, shipping them to photo studios, hiring stylists and photographers, and conducting post-production retouching. For a shoe line with 12 colorways, this process costs tens of thousands of dollars and weeks of delay.",
            "With a digital 3D master asset, unlimited colorways, materials, and lighting setups can be generated programmatically in real time with zero physical waste.",
          ],
        },
      ],
      conclusion:
        "Interactive 3D is not a gimmick; it is the modern standard for product transparency and customer confidence in digital retail.",
    },
  },
  {
    slug: "studio-lighting-in-three-js-r3f",
    title: "Calibrating Cinematic Three-Point Studio Lighting in Three.js and R3F",
    excerpt: "How to combine physical key, fill, and rim lights with HDRI environment maps for commercial-grade studio presentations in React Three Fiber.",
    date: "Sep 15, 2026",
    readTime: "7 min read",
    category: "Technology",
    author: {
      name: "Marcus Vance",
      role: "Lead Graphics Engineer",
      avatar: "MV",
    },
    tags: ["Lighting", "Three.js", "R3F", "HDRI", "WebGL"],
    content: {
      introduction:
        "Even the most detailed 3D model looks amateurish under flat or harsh lighting. Studio photographers spend decades mastering the interplay between key lights, soft diffusers, and contour rims. In WebGL, we translate these classical optical techniques into mathematically balanced light components.",
      sections: [
        {
          heading: "1. The Balanced Three-Point Studio Rig",
          body: [
            "• Key Directional Light: Positioned 45° to the side and slightly elevated. Sets the dominant shadow direction and form definition. Intensity: 1.2 – 1.4.\n• Soft Fill Light: Positioned opposite the key light at a lower angle with cool tint (5800K). Fills harsh cast shadows without creating competing specular spots. Intensity: 0.4 – 0.5.\n• Contour Rim Light: Positioned behind the subject facing back toward the camera. Highlights silhouette edges and separates the product cleanly from the background. Intensity: 0.45 – 0.6.",
          ],
        },
        {
          heading: "2. Ambient Light vs Hemisphere Light",
          body: [
            "Generic AmbientLight illuminates all surfaces equally from all angles, flattening depth and destroying curvature. Replace it with a HemisphereLight configured with a white sky color and a warm/neutral floor bounce color.",
          ],
          codeSnippet: {
            language: "tsx",
            code: "<hemisphereLight args={['#ffffff', '#deded8', 0.75]} />\n<directionalLight\n  position={[4, 5.5, 4]}\n  intensity={1.3}\n  color='#fffdfa'\n  castShadow\n  shadow-mapSize={[512, 512]}\n  shadow-bias={-0.0001}\n/>\n<directionalLight position={[-4, 3, -2]} intensity={0.45} color='#f0f4f8' />\n<directionalLight position={[0, 4, -4]} intensity={0.5} color='#ffffff' />",
          },
        },
      ],
      conclusion:
        "Balanced lighting treats every polygon with care, illuminating seams and contours naturally while preventing harsh specular blowouts.",
    },
  },
  {
    slug: "dielectric-vs-metallic-realistic-materials",
    title: "Dielectric vs Metallic: Avoiding the 'Steel Look' in 3D Product Renders",
    excerpt: "A deep dive into Fresnel equations, conductive vs non-conductive reflections, and why software defaults often ruin organic 3D models.",
    date: "Sep 12, 2026",
    readTime: "6 min read",
    category: "Materials",
    author: {
      name: "Elena Rostova",
      role: "Principal 3D Material Specialist",
      avatar: "ER",
    },
    tags: ["PBR", "Fresnel", "Materials", "Physics", "Three.js"],
    content: {
      introduction:
        "The most common complaint from clients reviewing real-time 3D models is: 'Why does my leather sneaker look like it was stamped out of polished aluminum?' This flaw stems from a fundamental misunderstanding of the PBR metallic-roughness workflow.",
      sections: [
        {
          heading: "1. The Physics of Surface Reflection",
          body: [
            "Conductors (metals) have no diffuse reflection; all reflected light comes from the surface layer, and the reflection is tinted by the metal's albedo (e.g., gold reflects yellow).",
            "Dielectrics (non-metals) transmit refracted light into their sub-surface, scattering it as diffuse albedo color, while reflecting a pure white specular highlight governed by the Fresnel effect.",
            "When a non-metal material is given a metalness value like 0.20 or 0.35, the shader extinguishes its rich diffuse color and turns the surface into tinted chrome. The solution is simple: keep metalness at 0.00 for all organic matter.",
          ],
        },
      ],
      conclusion:
        "Respecting the binary nature of metallic vs dielectric materials is the single most important rule in professional 3D product rendering.",
    },
  },
  {
    slug: "building-browser-based-3d-customizer",
    title: "How to Build a High-Performance Browser-Based 3D Product Customizer",
    excerpt: "Architecture patterns for managing modular GLTF meshes, material states, colorway presets, and client-side 4K snapshot rendering.",
    date: "Sep 10, 2026",
    readTime: "9 min read",
    category: "Technology",
    author: {
      name: "Marcus Vance",
      role: "Lead Graphics Engineer",
      avatar: "MV",
    },
    tags: ["Architecture", "Customizer", "Next.js", "React", "State Management"],
    content: {
      introduction:
        "Designing an interactive 3D configurator requires unifying two different paradigms: the declarative reactive UI model of React and the imperative, frame-by-frame graphics loop of WebGL.",
      sections: [
        {
          heading: "1. State Architecture: Decoupling UI State from Scene Graph",
          body: [
            "Never store Three.js Mesh or Material references inside React component state. Doing so triggers unnecessary React reconciliation on every frame.",
            "Instead, store a serializable, normalized dictionary of part IDs and their PBR configurations (color, roughness, metalness, visibility). A lightweight hook then syncs these values imperatively into the cached meshes.",
          ],
        },
      ],
      conclusion:
        "A cleanly decoupled architecture ensures the 3D viewport remains responsive, fluid, and scalable across hundreds of configurable components.",
    },
  },
  {
    slug: "aces-filmic-tone-mapping-webgl",
    title: "ACES Filmic Tone Mapping: Photorealistic Highlights in WebGL",
    excerpt: "Understand how Academy Color Encoding System (ACES) filmic tone mapping compresses HDR light intensities into physical camera curves.",
    date: "Sep 08, 2026",
    readTime: "5 min read",
    category: "Technology",
    author: {
      name: "Marcus Vance",
      role: "Lead Graphics Engineer",
      avatar: "MV",
    },
    tags: ["ACES", "ToneMapping", "WebGL", "ColorScience"],
    content: {
      introduction:
        "In physical photography, high-intensity light sources do not immediately clip into flat white shapes; they roll off with a soft, photographic S-curve shoulder. Standard WebGL clamping without tone mapping produces harsh, blown-out artifacts.",
      sections: [
        {
          heading: "1. Why ACES Filmic Is Essential for 3D Commerce",
          body: [
            "Setting toneMapping to THREE.ACESFilmicToneMapping compresses HDR specular values above 1.0 into an organic, cinematic curve. Leather highlights maintain texture depth rather than washing out into clipped white spots.",
          ],
          codeSnippet: {
            language: "tsx",
            code: "<Canvas\n  gl={{\n    antialias: true,\n    toneMapping: THREE.ACESFilmicToneMapping,\n    toneMappingExposure: 1.05,\n  }}\n>",
          },
        },
      ],
      conclusion:
        "ACES Filmic tone mapping transforms clinical digital renders into photographic, editorial product showcases.",
    },
  },
  {
    slug: "contact-shadows-and-grounding-in-threejs",
    title: "Realistic Contact Shadows: Grounding 3D Products on Digital Pedestals",
    excerpt: "How to use blurred contact shadow planes and ambient occlusion to eliminate floating product artifacts without costly dynamic shadow maps.",
    date: "Sep 05, 2026",
    readTime: "6 min read",
    category: "3D Design",
    author: {
      name: "Elena Rostova",
      role: "Principal 3D Material Specialist",
      avatar: "ER",
    },
    tags: ["Shadows", "Pedestal", "Three.js", "ContactShadows"],
    content: {
      introduction:
        "A common flaw in web 3D viewports is the 'floating object syndrome'—products appear suspended in empty space with no spatial relationship to their ground plane. Contact shadows anchor the object firmly in physical reality.",
      sections: [
        {
          heading: "1. The Power of ContactShadows from Drei",
          body: [
            "Rather than calculating expensive real-time cascaded shadow maps from multiple directional lights, @react-three/drei's ContactShadows renders an orthographic depth map looking up from the ground plane.",
            "This creates soft, natural ambient occlusion directly beneath soles, heel counters, and pedestals with minimal GPU overhead.",
          ],
        },
      ],
      conclusion:
        "Proper grounding transforms abstract geometry into tangible, physical merchandise.",
    },
  },
  {
    slug: "air-jordan-dior-3d-case-study",
    title: "Case Study: Recreating the Iconic Air Jordan 1 Low Dior in Real-Time 3D",
    excerpt: "A technical breakdown of modeling, Dior Oblique jacquard texturing, icy translucent outsoles, and 60 FPS WebGL delivery.",
    date: "Sep 02, 2026",
    readTime: "8 min read",
    category: "3D Design",
    author: {
      name: "Marcus Vance",
      role: "Lead Graphics Engineer",
      avatar: "MV",
    },
    tags: ["CaseStudy", "JordanDior", "Sneakers", "Modeling", "WebGL"],
    content: {
      introduction:
        "The Air Jordan 1 Low Dior is one of the most celebrated sneaker collaborations in modern luxury streetwear. Translating its handcrafted Italian leather and Dior Oblique monogram into a browser-based 3D model required surgical precision.",
      sections: [
        {
          heading: "1. Capturing the Subtle Dior Grey Palette",
          body: [
            "The signature 'Dior Grey' leather features a precise cool-neutral undertone (#bec2c8) that shifts subtly depending on the color temperature of surrounding studio lighting. Under 5500K daylight simulation, the material displays balanced micro-sheen.",
          ],
        },
        {
          heading: "2. The Icy Translucent Outsole",
          body: [
            "The sneaker's icy blue outsole reveals the Dior typography underneath. In WebGL, we achieve this through transmission shaders with subtle subsurface absorption, allowing the ground contact shadow to register through the rubber sole.",
          ],
        },
      ],
      conclusion:
        "Faithful digital recreation honors the craftsmanship of original footwear masters while unlocking infinite interactive potential.",
    },
  },
  {
    slug: "future-of-virtual-prototyping-for-brands",
    title: "Virtual Prototyping: Reducing Sample Waste in Footwear & Fashion",
    excerpt: "How real-time 3D pipelines are enabling sustainable, zero-waste product development and rapid iterative design for modern fashion brands.",
    date: "Aug 28, 2026",
    readTime: "7 min read",
    category: "E-Commerce",
    author: {
      name: "Sophia Chen",
      role: "Digital Retail Strategist",
      avatar: "SC",
    },
    tags: ["Sustainability", "FashionTech", "Prototyping", "FutureOfCommerce"],
    content: {
      introduction:
        "Traditional footwear design requires producing 4 to 8 physical sample rounds before a single pair enters production. Most physical samples end up incinerated or in landfills. Virtual 3D prototyping replaces this wasteful cycle with zero-emission digital iteration.",
      sections: [
        {
          heading: "1. Accelerating Time-to-Market from Months to Days",
          body: [
            "Designers, brand managers, and retail buyers can review digital 3D prototypes in collaborative browser sessions, tweaking colorways, textures, and sidewall heights in real time. Decision loops that once took weeks now happen in single meetings.",
          ],
        },
      ],
      conclusion:
        "3D product modeling is not merely a marketing asset; it is the foundation of sustainable, agile manufacturing.",
    },
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return BLOG_POSTS.map((p) => p.slug);
}
