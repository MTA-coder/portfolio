export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
  content: string;
  externalUrl?: string;
  author: {
    name: string;
    avatar: string;
    title: string;
  };
}

export const blogPosts: BlogPost[] = [
  {
    slug: "zone-js-angular-deep-dive",
    title: "Zone.js in Angular: Deep Dive into Its Evolution (Angular 16–19)",
    excerpt: "Explore how Angular has evolved its change detection mechanism from Zone.js dependency to Signal-based reactivity across Angular 16–19.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    date: "March 2, 2025",
    readTime: "3 min read",
    category: "Angular",
    externalUrl: "https://medium.com/@mahmmedtawfeqamirie/zone-js-in-angular-deep-dive-into-its-evolution-angular-16-19-22d2f9eb7e07",
    author: {
      name: "Mohammed Tawfeq Amiri",
      avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d",
      title: "Full Stack Developer"
    },
    content: `
      ## Zone.js in Angular: Deep Dive into Its Evolution

      Zone.js has been a fundamental part of Angular's Change Detection mechanism, allowing the framework to track and respond to asynchronous operations. It patches JavaScript's asynchronous APIs, such as \`setTimeout\`, \`setInterval\`, \`Promise\`, and \`XHR\`, allowing Angular to automatically trigger updates to the DOM.

      However, with Angular 16–19, Angular has significantly reduced its reliance on Zone.js, introducing new ways to handle change detection that improve performance and flexibility.

      ## 🔍 The Core Concept

      JavaScript does not inherently track when asynchronous operations complete. Zone.js solves this problem by intercepting these operations and notifying Angular when changes occur.

      ### 🔧 The Internal Mechanism

      1️⃣ **Patching Asynchronous APIs** — Whenever an async operation is performed, Zone.js creates a new zone to track that operation and ensures Angular is notified when the operation completes.

      2️⃣ **Executing Within a Zone** — When the async task finishes, Zone.js triggers Angular's Change Detection, ensuring the UI updates automatically.

      3️⃣ **Managing Execution Contexts** — Each operation runs in its own zone, making it easier for Angular to track changes and update only the affected parts.

      ## 🔥 Angular 16 — Introducing Zone-Less Mode

      Angular 16 officially introduced support for disabling Zone.js, allowing developers to manually trigger Change Detection using Signal-based Change Detection.

      ## ⚡ Angular 17 — Performance Enhancements & Hybrid Mode

      Zone.js behavior was optimized to better handle Microtasks and Macrotasks. Hybrid Mode was introduced, allowing both Zone.js and Zone-Less detection to coexist.

      ## 🚀 Angular 18 — Deep Integration with Signals

      Signal-based Change Detection was introduced as a better alternative to Zone.js. \`computed()\` and \`effect()\` functions allow for more intelligent updates.

      ## 🚀 Angular 19 — The End of Zone.js Dependency

      Signals became the default change detection system, making Zone.js fully optional. Full support for Standalone Components without requiring NgZone.

      ## 🎯 Should You Still Use Zone.js?

      ✅ Yes, if working with legacy projects.
      ✅ No, if starting a new project — Signal-based Change Detection is now the better approach.

      *Originally published on [Medium](https://medium.com/@mahmmedtawfeqamirie/zone-js-in-angular-deep-dive-into-its-evolution-angular-16-19-22d2f9eb7e07).*
    `
  },
  {
    slug: "responsively-responsive-design-testing",
    title: "Revolutionize Your Responsive Web Design Testing with Responsively",
    excerpt: "Effortlessly test your website on multiple devices and resolutions with Responsively — an open-source Electron-based browser with dev tools, click/scroll mirroring & batch screenshot export.",
    image: "https://images.unsplash.com/photo-1508830524289-0adcbe822b40",
    date: "September 28, 2023",
    readTime: "2 min read",
    category: "Tools",
    externalUrl: "https://medium.com/@mahmmedtawfeqamirie/revolutionize-your-responsive-web-design-testing-with-responsively-4ca72d4a85e0",
    author: {
      name: "Mohammed Tawfeq Amiri",
      avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d",
      title: "Full Stack Developer"
    },
    content: `
      ## The Challenge of Responsive Testing

      As a frontend developer, I have often faced the challenge of testing the responsiveness of my web applications. Despite using various browsers, I found it difficult to ensure that my sites were optimized for multiple devices. However, I stumbled upon a program that has proven to be a game-changer in this regard.

      ## What is Responsively?

      Responsively is an open-source browser, based on Electron, which helps you test your sites for multiple devices. It lets you test responsive designs on target screens side-by-side.

      ### Key Features

      - **Multi-Device Preview** — See how your web app looks on different devices simultaneously
      - **Development Tools** — Inspect elements and open dev tools like a pro
      - **Click/Scroll Mirroring** — Interactions sync across all device previews
      - **Batch Screenshot Export** — Capture screenshots of all devices at once
      - **Extensive Device Profiles** — Comes with a large collection of device profiles out of the box, plus the ability to add custom devices

      ## Why Responsively?

      You can see how your web app looks on different devices. It's super useful, and more than that, it is **FREE**. 🔥

      ### Download Links

      - **Windows**: ResponsivelyApp-Setup-1.8.0.exe
      - **Linux**: ResponsivelyApp-1.8.0.AppImage
      - **Mac (Intel)**: ResponsivelyApp-1.8.0.dmg
      - **Mac (Apple Silicon)**: ResponsivelyApp-1.8.0-arm64.dmg

      Website: [responsively.app](https://responsively.app/)

      *Originally published on [Medium](https://medium.com/@mahmmedtawfeqamirie/revolutionize-your-responsive-web-design-testing-with-responsively-4ca72d4a85e0).*
    `
  }
];
