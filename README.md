<div id="top"></div>

<br />
<div align="center">
  <a href="https://github.com/mtergel/flare">
    <img src="https://res.cloudinary.com/flare-community/image/upload/v1639730267/static/logo_medium_mfiqae.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Flare</h3>

  <p align="center">
    <div>
       Write for yourself
    </div>
    <br />
    <a href="https://flare-community.vercel.app/">View Demo</a>
    ·
    <a href="https://github.com/mtergel/flare/issues">Report Bug</a>
    ·
    <a href="https://github.com/mtergel/flare/issues">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#motivation">Motivation</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

![Flare](https://res.cloudinary.com/flare-community/image/upload/v1639734527/static/flare_zuaewx.png)

Flare is an information-sharing community for developers. Share your insights with someone. It is fully responsive and has dark mode support.
You can write using markdown. It supports syntax highlighting, GitHub syntactic, and others. Preview articles and publish them for others to see. Or create a scribble to organize details in a thread format.


### Motivation
Open-source hobby project made with ❤️. I've written this project from scratch to share what I have learned while building a project for my portfolio. Here is my lighthouse scores for home page which has ISR enabled.
![Lighthouse Scores](https://res.cloudinary.com/flare-community/image/upload/v1640054785/static/Screen_Shot_2021-12-21_at_10.44.20_yhghdp.png)


### Built With

* [Next.js](https://nextjs.org/)
* [Supabase](https://supabase.com/)
* [TailwindCSS](https://tailwindcss.com/)
* [Radix UI](https://www.radix-ui.com/)

## Getting Started

 To get a local copy up and running follow these simple example steps.

### Prerequisites
Create a Supabase project.
Enable authentication. The project uses only Google and Github OAuth providers.

Todo: Create a script to replicate schema, for now, you can copy the [schema](/Supbase%20Schema.png). Or you can use the generated [types](/src/utils/generated.ts) file for reference.

### Installation
- Clone the repo
```
git clone https://github.com/mtergel/flare
```
- Install dependecies
```
yarn install
```
- Create an  `.env.local` file. Add these values.
```
 NEXT_PUBLIC_SUPABASE_URL=
 NEXT_PUBLIC_SUPABASE_ANON_KEY=
 NEXT_PUBLIC_SALT=
 SERVICE_KEY=
 SUPABASE_JWT_SECRET=
```
- Run the development server. 
```
yarn dev
```
Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

<!-- ROADMAP -->
## Roadmap

- [ ] Notification
- [ ] Users follows/followers
- [ ] Tag following

See the [open issues](https://github.com/mtergel/flare/issues) for a full list of proposed features (and known issues).


<!-- CONTRIBUTING -->
## Contributing

I have no experience building backends so any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

If use like using the site feel free to buy me a coffee.

<a href="https://www.buymeacoffee.com/trglm" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- CONTACT -->
## Contact

Tergel Munkhdelger - [Portfolio](https://portfolio-three-orpin.vercel.app/) - tergelm@gmail.com

Project Link: [https://github.com/mtergel/flare/](https://github.com/mtergel/flare)


<!-- ACKNOWLEDGMENTS -->
## Acknowledgments
It is heavily inspired from [Zenn.dev](https://zenn.dev/).
* [Zenn.dev](https://zenn.dev/)

<p align="right">(<a href="#top">back to top</a>)</p>
