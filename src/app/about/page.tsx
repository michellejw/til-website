import React from "react";
import { SiteHeader, SiteFooter } from "@/components/site_header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Github } from "lucide-react";

const AboutPage = () => {
  return (
    <>
      <SiteHeader />
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-3xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>About This TIL Site</CardTitle>
            </CardHeader>
            <CardContent className="prose">
              <p className="text-gray-600">
                This is a collection of quick notes, code snippets, libraries,
                or just things I&apos;ve come across along the way.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-2">Why TILs?</h3>
              <p className="text-gray-600">
                As I work through various projects, I often stumble upon these
                interesting tools or approaches. This site is a way for me to
                document those little discoveries so that I can find them again
                in the future.
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-2">
                Sharing is caring
              </h3>
              <p className="text-gray-600">
                The code used to build this site is fully open source. If you
                want to see it, clone it, use it, just head over to the git
                repository:{" "}
                <a
                  href="https://github.com/michellejw/til-website"
                  className="text-blue-600 hover:text-blue-800"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  til-website on Github
                </a>
              </p>
              <p className="text-gray-600">
                All you need to get started is node.js, npm (or yarn), and git.
                The repository readme walks through how to run locally, how to
                add pages, and some suggestions on how to deploy.
              </p>
              <p className="text-gray-600">
                Fair warning: I am not a javascript/react programmer. You might
                find anything from serious programming issues to poor formatting
                or organizational choices. Use at your own peril!
              </p>

              <h3 className="text-lg font-semibold mt-6 mb-2">
                Technical Details
              </h3>
              <p className="text-gray-600">This site is built with:</p>
              <ul className="list-disc pl-6 text-gray-600">
                <li>Next.js for the framework</li>
                <li>Tailwind CSS for styling</li>
                <li>Markdown for content</li>
                <li>shadcn/ui for components</li>
              </ul>

              <div className="mt-8">
                <a
                  href="https://github.com/michellejw/til-website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
                >
                  <Github className="w-5 h-5" />
                  <span>View the source code on GitHub</span>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <SiteFooter />
    </>
  );
};

export default AboutPage;
