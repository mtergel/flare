import Container from "@/components/Container/Container";
import { themeColor } from "@/utils/const";
import clsx from "clsx";
import { NextSeo } from "next-seo";
import { Backpack, Mug, SpeechBubble } from "react-kawaii";
import Layout from "ui/Layout/Layout";
import { NextPageWithLayout } from "utils/types";

const containerClass = "py-24 md:py-12 grid grid-cols-1 md:grid-cols-2 gap-6";

const About: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo
        title="About"
        description="Flare is a information sharing community for developers. Share
                your insights for someone and for yourself."
      />
      <div className="h-full bg-paper">
        <Container size="common">
          <div className={containerClass}>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">Write for yourself.</h1>
              <p className="text-tMuted">
                Flare is a information sharing community for developers. Share
                your insights for someone and for yourself.
              </p>
            </div>
            <div className="flex items-center justify-center md:justify-end">
              <SpeechBubble size={220} mood="happy" color={themeColor} />
            </div>
          </div>
          <div className="py-12 md:py-24 flex flex-col-reverse md:grid md:grid-cols-2 gap-6">
            <div className="flex items-center justify-center md:justify-start">
              <Mug size={170} mood="lovestruck" color="#FDA4AF" />
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Motivation</h2>
              <p className="text-tMuted">
                This is a open source hobby project made with ❤️
              </p>
              <p className="text-tMuted">
                I&apos;ve wanted to keep track of something I learned while
                building a project for my portfolio.
              </p>
            </div>
          </div>
          <div className={containerClass}>
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">Contributing</h1>
              <p className="text-tMuted">
                Please feel free to contribute your ideas by posting what you
                learned!
              </p>
              <p className="text-tMuted"></p>

              <p className="text-tMuted">
                The project is{" "}
                <a
                  href="https://github.com/mtergel/flare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary"
                >
                  open source
                </a>
                <span>
                  {" "}
                  and if you&apos;d like it, feel free to{" "}
                  <a
                    href="https://www.buymeacoffee.com/trglm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary"
                  >
                    buy me a coffee!
                  </a>
                </span>
              </p>
            </div>
            <div className="flex items-center justify-center md:justify-end">
              <Backpack size={220} mood="blissful" color="#FDE047" />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

About.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default About;
