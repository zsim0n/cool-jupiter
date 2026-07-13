[![Netlify Status](https://api.netlify.com/api/v1/badges/c623195c-8ea3-403c-ac22-329375b70373/deploy-status)](https://app.netlify.com/sites/cool-jupiter/deploys)

# Cool Jupiter: Things – Zoltansimon.me

Welcome to the repository for *Cool Jupiter: Things*, my personal Astro-powered blog hosted on [Zoltansimon.me](https://zoltansimon.me). This project uses Astro, PicoCSS, and MDX to create a minimalist and fast blog experience. The repository contains both published posts and drafts.

## 🚀 Project Structure

This project follows the [Astro project structure guidelines](https://docs.astro.build/en/basics/project-structure/). In addition to standard directories, there are two folders dedicated to MDX content: `posts` for published posts and `drafts` for work-in-progress posts.

```text
/
├── ...
├── src/
│   ├── posts/
│   │   ├── my-blog-post.mdx
│   │   └── assets/
│   │       └── my-blog-post/
│   │           └── image.png
│   ├── drafts/
│   │   └── a-draft-post.mdx
│   ├── ...
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

## 🧞 Usage

This project uses npm to manage dependencies and scripts. The typical commands are:

- `npm install` to install all dependencies.
- `npm run dev` to run the development server (usually available at [http://localhost:4321](http://localhost:4321)).
- `npm run build` to create a production build.
- `npm run preview` to preview the production build locally.


## ☁️ Hosted on Netlify

This site is deployed on Netlify using a continuous deployment workflow that integrates with GitHub. Each time you push changes to your repository, Netlify automatically triggers a build and deploys the updated site.

For a step-by-step guide on setting up continuous deployment with GitHub and Netlify, see [Netlify's Get Started with Continuous Deployment](https://docs.netlify.com/configure-builds/get-started/).

## 👀 Learn more

If you're interested in migrating your content from Contentful to this setup, check out this [Contentful Export Converter](https://gist.github.com/zsim0n/5b4df135921dc3a2b827cb27844ade34). 

## 🤝 Contributing

Contributions are welcome! If you have ideas for improvements, find a bug, or would like to add new content, please feel free to open an issue or submit a pull request. For significant changes, it’s best to start a discussion via an issue first.


## 🙏 Credits

Explore these resources to dive deeper into the technologies powering this project!

- [Astro Documentation](https://docs.astro.build) – Official Astro docs covering both basics and advanced topics.
- [PicoCSS](https://picocss.com) – Lightweight CSS library used for styling.
- [MDX Documentation](https://mdxjs.com/docs/using-mdx/) – Learn how MDX allows you to blend Markdown with JSX.
- [Netlify Documentation](https://docs.netlify.com/) – Information on deploying and managing your site on Netlify.

## 📝 Licensing

For full license details, please see [LICENSE.md](LICENSE.md).
