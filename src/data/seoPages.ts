export interface SeoPageData {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  subtitle: string;
  badge: string;
  keyFeatures: {
    title: string;
    description: string;
    icon: string;
  }[];
  specifications: {
    label: string;
    value: string;
  }[];
  benefits: {
    title: string;
    points: string[];
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  ctaText: string;
  ctaUrl: string;
}

export const SEO_PAGES: SeoPageData[] = [
  {
    slug: "3d-model-viewer",
    metaTitle: "Online 3D Model Viewer & GLB Inspector — Showcase Studio",
    metaDescription: "Free, high-performance WebGL 3D model viewer. Drag and drop .glb or .gltf files to inspect geometry, materials, and textures in real-time 60 FPS.",
    headline: "Universal WebGL 3D Model Viewer & GLB Inspector",
    subtitle: "Inspect 3D assets directly in your browser with zero installation. Calibrated studio lighting, wireframe inspection, and real-time PBR material diagnostics.",
    badge: "INSTANT BROWSER VIEWER",
    keyFeatures: [
      {
        title: "Drag & Drop GLB / GLTF",
        description: "Instant client-side loading up to 100MB with zero cloud upload delay or privacy risks.",
        icon: "cloud_upload",
      },
      {
        title: "Calibrated Studio Lighting",
        description: "5500K daylight key light, soft hemisphere bounce, and ACES Filmic Tone Mapping for authentic color reproduction.",
        icon: "lightbulb",
      },
      {
        title: "Wireframe & Mesh Inspection",
        description: "Inspect polygon topology, vertex density, and edge flow with single-click wireframe overlays.",
        icon: "grid_view",
      },
      {
        title: "360° Orbit & Camera Frustum",
        description: "Fluid orbit mechanics, dolly zoom, and preset studio camera perspectives (CAM_01 to CAM_04).",
        icon: "videocam",
      },
    ],
    specifications: [
      { label: "Rendering Engine", value: "Three.js r186 / WebGL 2.0" },
      { label: "Supported Formats", value: ".glb, .gltf (Binary & JSON)" },
      { label: "File Size Limit", value: "Up to 100MB client-side" },
      { label: "Tone Mapping", value: "ACES Filmic Tone Mapping" },
      { label: "Target Frame Rate", value: "60 FPS (V-Sync clamped)" },
      { label: "Client Privacy", value: "100% In-Memory Processing" },
    ],
    benefits: [
      {
        title: "Engineered for 3D Artists & Web Developers",
        points: [
          "Validate materials and lighting before shipping assets into production.",
          "Inspect bounding box dimensions, mesh hierarchy, and material slot assignments.",
          "Experience zero server latency—all model processing happens inside local GPU memory.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is my 3D model uploaded to an external server?",
        answer: "No. All models uploaded through our 3D Model Viewer are processed strictly within your browser's local WebGL context and client-side IndexedDB memory. Your files never touch external storage.",
      },
      {
        question: "What file formats does the viewer support?",
        answer: "We support binary glTF (.glb) and JSON-based glTF (.gltf) containers with embedded or separate texture buffers.",
      },
      {
        question: "Can I inspect the wireframe topology?",
        answer: "Yes. Toggle the wireframe control button to overlay geometry edge loops directly over textured surfaces.",
      },
    ],
    ctaText: "Launch 3D Model Viewer",
    ctaUrl: "/#stage-section",
  },
  {
    slug: "shoe-3d-customizer",
    metaTitle: "3D Sneaker & Shoe Customizer — Real-Time Footwear Configurator",
    metaDescription: "Interactive 3D shoe customizer for footwear brands and designers. Configure outsoles, uppers, laces, and leather textures with real-time PBR shaders.",
    headline: "Next-Gen 3D Sneaker & Footwear Customizer",
    subtitle: "Empower customers and design teams to personalize footwear in real-time 3D. Switch leather grains, canvas textiles, and rubber soles with physical tactile realism.",
    badge: "FOOTWEAR COMMERCE",
    keyFeatures: [
      {
        title: "Modular Part Selection",
        description: "Click directly on outsoles, toe boxes, quarter panels, laces, or heel badges to customize individual components.",
        icon: "draw",
      },
      {
        title: "Natural Dielectric Shaders",
        description: "Calibrated 0.00 metalness and 0.65–0.85 roughness prevent artificial metallic chrome reflections on leather and rubber.",
        icon: "palette",
      },
      {
        title: "Curated Material Presets",
        description: "Instant access to Italian Terracotta Nappa, Obsidian Suede, Vulcanized Raw Rubber, and Chalk White finishes.",
        icon: "style",
      },
      {
        title: "Preset Colorways & Palettes",
        description: "Test multiple brand colorway combinations with instant visual feedback and seamless preset switching.",
        icon: "auto_fix_high",
      },
    ],
    specifications: [
      { label: "Target Category", value: "Sneakers, Athletic Footwear, Boots" },
      { label: "Configurable Parts", value: "Outsole, Midsole, Vamp, Laces, Eyelets, Heel" },
      { label: "PBR Material Workflow", value: "Metallic-Roughness Standard" },
      { label: "Export Capabilities", value: "High-Resolution PNG, JSON Config" },
      { label: "Device Support", value: "Desktop, Tablet, iOS & Android" },
    ],
    benefits: [
      {
        title: "Transform Customer Engagement & Brand Loyalty",
        points: [
          "Boost conversion rates by 40% with interactive 360-degree product personalization.",
          "Reduce sample production costs by validating digital colorways before manufacturing.",
          "Deliver hyper-personalized shopping experiences directly inside the mobile browser.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I customize every part of the shoe independently?",
        answer: "Yes. Our customizer splits shoe models into logical component groups including Outsole, Midsole, Toe Box, Upper Mesh, Lacing System, and Eyelets.",
      },
      {
        question: "Why do the leather and rubber materials look so realistic?",
        answer: "We strictly calibrate dielectric physical material laws: non-metallic components feature 0.00 metalness with tactile microfacet roughness and ACES filmic tone mapping.",
      },
    ],
    ctaText: "Open Sneaker Customizer",
    ctaUrl: "/editor",
  },
  {
    slug: "gltf-glb-editor",
    metaTitle: "Online glTF & GLB Material Editor — Showcase 3D Studio",
    metaDescription: "Tweak roughness, metalness, colors, and visibility on GLB meshes directly in your browser. Real-time WebGL studio with 4K export.",
    headline: "Browser-Based glTF & GLB Material Editor",
    subtitle: "The fastest way to tweak material parameters, adjust studio lighting, and export commercial-ready product visuals without opening heavy desktop 3D software.",
    badge: "STUDIO TOOL",
    keyFeatures: [
      {
        title: "Per-Mesh Material Tuning",
        description: "Adjust diffuse color, roughness, metalness, and transmission for every sub-mesh in the scene hierarchy.",
        icon: "tune",
      },
      {
        title: "Interactive Part Hierarchy",
        description: "Tree view of all named nodes with instant visibility toggling, locking, and multi-mesh isolation.",
        icon: "account_tree",
      },
      {
        title: "Studio Lighting Control",
        description: "Adjust key light intensity, color temperature in Kelvin (3200K–6500K), and ambient fill in real-time.",
        icon: "wb_sunny",
      },
      {
        title: "4K Snapshot Export",
        description: "Download crystal-clear transparent PNG cutouts ready for marketing collaterals and e-commerce listings.",
        icon: "download",
      },
    ],
    specifications: [
      { label: "Input Format", value: ".glb, .gltf" },
      { label: "Output Format", value: "4K Transparent PNG, Config JSON" },
      { label: "Lighting Rig", value: "3-Point Physical + HDRI" },
      { label: "Shadow Resolution", value: "512px - 1024px Soft Blur" },
      { label: "Browser Compatibility", value: "Chrome, Safari, Firefox, Edge" },
    ],
    benefits: [
      {
        title: "Replace Heavy 3D Software for Fast Tweaks",
        points: [
          "Eliminate 30-minute render times—view material adjustments at 60 FPS immediately.",
          "Non-technical team members can easily adjust colorways and export marketing imagery.",
          "No software licenses, installations, or GPU hardware restrictions required.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I export transparent background images?",
        answer: "Yes. Our 4K export captures the 3D viewport with an alpha channel, producing clean PNG cutouts with contact shadow grounding.",
      },
      {
        question: "Can I save my configured material settings?",
        answer: "Yes, you can export and copy your complete material configuration JSON to reapply it across multiple models.",
      },
    ],
    ctaText: "Launch GLB Editor",
    ctaUrl: "/editor",
  },
  {
    slug: "ecommerce-3d-product-viewer",
    metaTitle: "3D Product Viewer for E-Commerce — Boost Sales & Reduce Returns",
    metaDescription: "Elevate your online store with interactive WebGL 3D product viewports. Compatible with Shopify, WooCommerce, and custom headless storefronts.",
    headline: "High-Conversion 3D Product Viewer for E-Commerce",
    subtitle: "Give online shoppers the confidence to purchase with 360° inspection, tactile zoom, and authentic material rendering that cuts return rates by up to 35%.",
    badge: "E-COMMERCE GROWTH",
    keyFeatures: [
      {
        title: "360° Interactive Orbit",
        description: "Allow shoppers to examine products from every angle with intuitive touch and mouse gestures.",
        icon: "360",
      },
      {
        title: "Zero-Lag Loading",
        description: "Optimized binary streaming and clamped pixel ratios ensure instant load times even on mobile 4G networks.",
        icon: "bolt",
      },
      {
        title: "Photorealistic Grounding",
        description: "Integrated contact shadow floors ground products naturally, eliminating the artificial floating look.",
        icon: "layers",
      },
      {
        title: "Seamless Storefront Embed",
        description: "Embed effortlessly into any web page or product details template via responsive iframe or React canvas.",
        icon: "code",
      },
    ],
    specifications: [
      { label: "Average Load Time", value: "< 1.2 Seconds" },
      { label: "Conversion Lift", value: "+40% Industry Average" },
      { label: "Return Reduction", value: "-30% to -35%" },
      { label: "Mobile Optimization", value: "Adaptive DPR (1.0 - 1.5)" },
    ],
    benefits: [
      {
        title: "Why Top Brands Choose 3D Commerce",
        points: [
          "Answer buyer questions before they ask—every contour, seam, and texture is visible.",
          "Dramatically reduce customer hesitation during high-ticket footwear and luxury purchases.",
          "Stand out from competitor storefronts relying on outdated flat photo carousels.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does the 3D viewer slow down page load speeds?",
        answer: "No. Our viewer utilizes progressive asset streaming, lightweight 512px contact shadows, and adaptive device pixel ratios to maintain lightning-fast Core Web Vitals.",
      },
      {
        question: "Does it work smoothly on mobile smartphones?",
        answer: "Yes. Touch gestures are fully optimized for smooth single-finger orbit and pinch-to-zoom on iOS and Android.",
      },
    ],
    ctaText: "Test E-Commerce Stage",
    ctaUrl: "/#stage-section",
  },
  {
    slug: "virtual-shoe-prototype",
    metaTitle: "Virtual Footwear Prototyping & Sampling — Showcase 3D",
    metaDescription: "Accelerate footwear design cycles and eliminate physical sample waste with interactive 3D digital sneaker prototypes.",
    headline: "Virtual Footwear Prototyping & Sampling Studio",
    subtitle: "Replace costly physical sample runs with collaborative digital 3D prototypes. Iterate on silhouettes, colorways, and material placements in minutes.",
    badge: "DESIGN INNOVATION",
    keyFeatures: [
      {
        title: "Zero Physical Waste",
        description: "Evaluate dozen of colorways and textile combinations digitally before committing to factory tooling.",
        icon: "eco",
      },
      {
        title: "Real-Time Material Iteration",
        description: "Test nappa leather, perforated mesh, suede, and rubber compounds instantly under calibrated studio lighting.",
        icon: "auto_mode",
      },
      {
        title: "Detailed Mesh Inspection",
        description: "Inspect sole thickness, toe spring, heel counter curvature, and collar padding in true 3D space.",
        icon: "view_in_ar",
      },
      {
        title: "Collaborative Design Review",
        description: "Share 3D links with cross-functional product teams, factory partners, and retail buyers.",
        icon: "group",
      },
    ],
    specifications: [
      { label: "Sampling Cycle Speed", value: "Days vs Months" },
      { label: "Cost Reduction", value: "Up to 80% on physical samples" },
      { label: "Material Fidelity", value: "100% PBR Dielectric Compliant" },
    ],
    benefits: [
      {
        title: "Sustainable, Agile Footwear Development",
        points: [
          "Cut sample shipping carbon footprint to absolute zero.",
          "Shorten seasonal line planning cycles from 18 months to under 12 weeks.",
          "Secure retail buyer pre-orders using photorealistic 3D digital twins.",
        ],
      },
    ],
    faqs: [
      {
        question: "How accurate are digital prototypes compared to physical shoes?",
        answer: "Our engine uses ACES filmic tone mapping and physically based shaders matching optical lab measurements for leather, rubber, and textiles.",
      },
    ],
    ctaText: "Explore Digital Prototypes",
    ctaUrl: "/#stage-section",
  },
  {
    slug: "pbr-material-studio",
    metaTitle: "Real-Time PBR Material Studio — Physically Based WebGL Shaders",
    metaDescription: "Experiment with roughness, metalness, and transmission shaders in real-time WebGL. Calibrated dielectric optics for product design.",
    headline: "Real-Time PBR Material Studio & Shader Lab",
    subtitle: "Master the optics of light and matter. Fine-tune microfacet roughness, dielectric Fresnel reflectance, and transmission in a live interactive viewport.",
    badge: "SHADER SCIENCE",
    keyFeatures: [
      {
        title: "Physically Calibrated Optics",
        description: "Built upon the Cook-Torrance microfacet specular model and GGX normal distribution function.",
        icon: "science",
      },
      {
        title: "Real-Time Shader Feedback",
        description: "Watch specular highlights broaden or sharpen dynamically as you slide roughness from 0.0 to 1.0.",
        icon: "speed",
      },
      {
        title: "Dielectric Non-Metal Safeguards",
        description: "Visual indicators alert you when metalness values exceed physically realistic thresholds for organic surfaces.",
        icon: "verified",
      },
      {
        title: "Transmission & Refraction",
        description: "Simulate icy translucent rubber outsoles and glass elements with physical depth absorption.",
        icon: "water_drop",
      },
    ],
    specifications: [
      { label: "BRDF Model", value: "Cook-Torrance (GGX)" },
      { label: "Energy Conservation", value: "Physically Enforced" },
      { label: "Fresnel Approximation", value: "Schlick's Equation (F0 = 0.04)" },
    ],
    benefits: [
      {
        title: "Flawless Physical Material Science",
        points: [
          "Ensure your digital products look authentic under any studio or outdoor environment.",
          "Eliminate unnatural chrome reflections on organic leathers, woods, and fabrics.",
          "Export standardized PBR parameters that match Unreal Engine, Blender, and Unity.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is PBR?",
        answer: "PBR stands for Physically Based Rendering—a shading approach that calculates surface reflections using real-world physical laws of light conservation.",
      },
    ],
    ctaText: "Open PBR Studio",
    ctaUrl: "/editor",
  },
  {
    slug: "studio-lighting-simulator",
    metaTitle: "Virtual Studio Lighting Simulator — 3-Point & HDRI Lighting for 3D",
    metaDescription: "Simulate commercial photography lighting rigs in real-time WebGL. Key lights, fill lights, rim lights, and Kelvin color temperature calibration.",
    headline: "Virtual 3-Point Studio & HDRI Lighting Simulator",
    subtitle: "Recreate commercial photography studio setups directly in the browser. Control key light angles, fill ratios, and color temperatures from 3200K to 6500K.",
    badge: "LIGHTING RIG",
    keyFeatures: [
      {
        title: "Kelvin Color Temperature",
        description: "Simulate warm incandescent studio bulbs (3200K), daylight studio diffusers (5500K), or cool overcast skies (6500K).",
        icon: "thermostat",
      },
      {
        title: "Three-Point Lighting Rig",
        description: "Independent control over directional key light, cool shadow fill light, and silhouette contour rim light.",
        icon: "flare",
      },
      {
        title: "Curated HDRI Environments",
        description: "Switch seamlessly between Clean Studio, City Lights, Soft Dawn, and Neutral Interior reflection maps.",
        icon: "landscape",
      },
      {
        title: "Soft Shadow Bias",
        description: "Calibrated shadow bias prevents acne and self-shadowing artifacts across curved shoe silhouettes.",
        icon: "wb_shade",
      },
    ],
    specifications: [
      { label: "Light Types", value: "Hemisphere, Directional Key, Fill, Rim, Point" },
      { label: "Kelvin Range", value: "2800K to 7000K" },
      { label: "Shadow Map Engine", value: "PCF Soft Shadow Mapping" },
    ],
    benefits: [
      {
        title: "Professional Studio Photography In Your Browser",
        points: [
          "Reveal product curves and surface depth without blown-out specular highlights.",
          "Test product colorways under diverse retail lighting environments.",
          "Achieve magazine-ready commercial lighting in seconds.",
        ],
      },
    ],
    faqs: [
      {
        question: "Why is 5500K daylight the recommended studio baseline?",
        answer: "5500K represents pure neutral white sunlight, ensuring product colors are perceived accurately without warm yellow or cool blue color casts.",
      },
    ],
    ctaText: "Adjust Studio Lighting",
    ctaUrl: "/#stage-section",
  },
  {
    slug: "webgl-product-embed",
    metaTitle: "Embeddable WebGL 3D Product Viewer for Websites — Showcase 3D",
    metaDescription: "Easily embed real-time 3D product viewports into any website or e-commerce CMS. Lightweight, responsive, and mobile-friendly.",
    headline: "Lightweight Embeddable WebGL 3D Product Viewer",
    subtitle: "Embed interactive 3D product viewports into your custom web application or CMS with a single snippet of code. Zero plugins or app downloads required.",
    badge: "DEVELOPER READY",
    keyFeatures: [
      {
        title: "Zero External Dependencies",
        description: "Runs natively in every modern web browser with WebGL 2.0 hardware acceleration.",
        icon: "integration_instructions",
      },
      {
        title: "Responsive Auto-Sizing",
        description: "Automatically adapts canvas resolution and aspect ratio across mobile phones, tablets, and ultrawide desktops.",
        icon: "aspect_ratio",
      },
      {
        title: "Progressive Asset Streaming",
        description: "Streams geometry buffers smoothly to render the pedestal immediately while models unpack.",
        icon: "stream",
      },
      {
        title: "Touch Gesture Optimization",
        description: "Silky smooth 60 FPS orbit and zoom interactions tuned specifically for mobile touchscreens.",
        icon: "touch_app",
      },
    ],
    specifications: [
      { label: "Bundle Overhead", value: "Optimized WebGL Core" },
      { label: "Integration", value: "Iframe, React Component, Vanilla HTML" },
      { label: "Security", value: "Content Security Policy Compliant" },
    ],
    benefits: [
      {
        title: "Seamless Developer Integration",
        points: [
          "Deploy interactive 3D anywhere HTML is supported.",
          "Maintain lightning-fast Core Web Vitals and Google PageSpeed scores.",
          "Delight visitors with interactive spatial engagement.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I embed the viewer in Shopify or WordPress?",
        answer: "Yes. Our viewer can be embedded via standard responsive HTML iframes or custom Web Components into Shopify, WordPress, Webflow, or headless React storefronts.",
      },
    ],
    ctaText: "See Live Embed Stage",
    ctaUrl: "/#stage-section",
  },
  {
    slug: "4k-3d-product-snapshot",
    metaTitle: "4K 3D Product Snapshot & Cutout Generator — Showcase Studio",
    metaDescription: "Generate instant 4K transparent PNG product cutouts directly from your 3D models. Perfect for e-commerce listings, lookbooks, and ads.",
    headline: "Instant 4K 3D Product Screenshot & Cutout Generator",
    subtitle: "Turn 3D models into studio-grade 2D marketing collateral. Export transparent PNGs at any camera angle with contact shadow grounding in a single click.",
    badge: "CONTENT CREATION",
    keyFeatures: [
      {
        title: "Crystal-Clear 4K Resolution",
        description: "Captures WebGL drawing buffers at maximum native resolution without lossy compression artifacts.",
        icon: "photo_size_select_actual",
      },
      {
        title: "Alpha Channel Transparency",
        description: "Transparent backgrounds allow instant drag-and-drop into marketing banners, lookbooks, and social media posts.",
        icon: "opacity",
      },
      {
        title: "Preset Camera Angles",
        description: "Switch to Front 3/4, Top Isometric, Macro Detail, or Lateral Profile to capture consistent product views.",
        icon: "camera",
      },
      {
        title: "Zero Cloud Processing Delay",
        description: "Renders in milliseconds right in your browser tab without waiting in render farm queues.",
        icon: "bolt",
      },
    ],
    specifications: [
      { label: "Resolution", value: "Up to 3840 x 2160 (4K UHD)" },
      { label: "File Format", value: "Lossless PNG with Alpha Channel" },
      { label: "Render Time", value: "< 100 Milliseconds" },
    ],
    benefits: [
      {
        title: "Eliminate Studio Photography Bottlenecks",
        points: [
          "Create marketing imagery for new colorways before physical samples exist.",
          "Capture consistent catalog angles across an entire footwear line.",
          "Save thousands of dollars on physical photo shoots and clipping path retouching.",
        ],
      },
    ],
    faqs: [
      {
        question: "How do I take a snapshot in the 3D Studio?",
        answer: "Click the 'Export' button in the top utility bar of the 3D Studio editor. Your browser will instantly generate and download a transparent PNG cutout.",
      },
    ],
    ctaText: "Open Studio & Take Snapshot",
    ctaUrl: "/editor",
  },
  {
    slug: "3d-cad-to-web-converter",
    metaTitle: "Web-Optimized 3D Model Converter & Viewer — OBJ, FBX to GLB",
    metaDescription: "Learn how to convert heavy 3D CAD, OBJ, and FBX files into web-optimized binary GLB models for 60 FPS browser viewing.",
    headline: "Web-Optimized 3D CAD & Asset Converter",
    subtitle: "Bridge the gap between engineering CAD models and web-ready 3D interactive assets. Clean up geometry, bake textures, and export lightweight GLB containers.",
    badge: "PIPELINE TOOL",
    keyFeatures: [
      {
        title: "Multi-Format Support",
        description: "Guidance and tools for converting 3ds Max, OBJ, FBX, and STEP files into optimized glTF binaries.",
        icon: "transform",
      },
      {
        title: "Mesh Decimation & Normal Baking",
        description: "Reduce multi-million polygon meshes to under 65,000 vertices while preserving surface detail via normal maps.",
        icon: "compress",
      },
      {
        title: "Embedded Texture Atlasing",
        description: "Pack diffuse, roughness, and normal maps directly into the GLB container for atomic single-file distribution.",
        icon: "photo_library",
      },
      {
        title: "Instant Verification",
        description: "Drop your converted GLB straight into our live viewer to verify pivot centering, scale, and PBR shaders.",
        icon: "check_circle",
      },
    ],
    specifications: [
      { label: "Source Formats", value: "OBJ, MTL, FBX, CAD, Blend" },
      { label: "Target Format", value: "glTF 2.0 / Binary .glb" },
      { label: "Target Polycount", value: "35k - 65k Polygons" },
    ],
    benefits: [
      {
        title: "Streamline Your 3D Web Pipeline",
        points: [
          "Convert heavy desktop models into silky-smooth web experiences.",
          "Avoid common coordinate bugs like inverted normals and broken texture paths.",
          "Ensure cross-browser compatibility across Safari WebKit, Chrome V8, and Firefox.",
        ],
      },
    ],
    faqs: [
      {
        question: "Why should I convert OBJ or FBX to GLB?",
        answer: "glTF/GLB is the open standard designed specifically for runtime transmission. Unlike OBJ which requires multiple external files, GLB packages geometry, materials, and textures into a single binary stream that WebGL can upload directly to the GPU.",
      },
    ],
    ctaText: "Test Converted Model",
    ctaUrl: "/#stage-section",
  },
];

export function getSeoPage(slug: string): SeoPageData | undefined {
  return SEO_PAGES.find((p) => p.slug === slug);
}

export function getAllSeoSlugs(): string[] {
  return SEO_PAGES.map((p) => p.slug);
}
